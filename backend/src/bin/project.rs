use backend::coin::TransactionWitnessSetParams;
use backend::decode_private_key;
use backend::error::{Error, Result};
use backend::marketplace::holder::SellMetadata;
use backend::nft::NftPolicy;
use backend::transaction::Submitter;
use cardano_serialization_lib::address::{
    Address, BaseAddress, EnterpriseAddress, NetworkInfo, StakeCredential,
};
use cardano_serialization_lib::crypto::{PrivateKey, TransactionHash, Vkeywitnesses};
use cardano_serialization_lib::impl_mockchain::key::EitherEd25519SecretKey;
use cardano_serialization_lib::metadata::{
    encode_json_value_to_metadatum, AuxiliaryData, GeneralTransactionMetadata, MetadataJsonSchema,
    TransactionMetadatum,
};
use cardano_serialization_lib::utils::{
    hash_transaction, make_vkey_witness, min_ada_required, to_bignum, Int,
};
use cardano_serialization_lib::{
    AssetName, Assets, Mint, MintAssets, MultiAsset, NativeScripts, Transaction, TransactionOutput,
    TransactionWitnessSet,
};
use serde::{Deserialize, Serialize};
use serde_json::{Map, Value};
use sqlx::PgPool;
use std::fs;
use std::iter::FromIterator;

fn remove_label(path: &str, metadata_file_name: &str, final_file_name: &str) -> Result<()> {
    if std::fs::File::open(final_file_name).is_ok() {
        Ok(())
    } else {
        println!("{}/{}", path, metadata_file_name);
        let metadata = fs::read_to_string(format!("{}/{}", path, metadata_file_name)).unwrap();
        let json = serde_json::from_str::<Value>(&metadata).unwrap();
        let processed = json.get("721").unwrap().get("").unwrap();

        Ok(fs::write(
            final_file_name,
            serde_json::to_string_pretty(processed).unwrap(),
        )?)
    }
}

fn rename_assets(metadata_full_path: &str) -> Result<()> {
    let json = serde_json::from_str::<Map<String, Value>>(
        &fs::read_to_string(metadata_full_path).unwrap(),
    )
    .unwrap();
    let mut new_map = Map::with_capacity(json.len());
    for (key, value) in json {
        let name = value
            .as_object()
            .unwrap()
            .get("name")
            .unwrap()
            .as_str()
            .unwrap()
            .to_string();
        new_map.insert(name, value);
    }
    fs::write(
        metadata_full_path,
        serde_json::to_string_pretty(&new_map).unwrap(),
    );
    Ok(())
}

fn upload_metadata_images(
    metadata_file_path: &str,
    path: &str,
    pinata_key: &str,
    pinata_secret: &str,
) -> Result<()> {
    println!("Beginning upload...");
    let metadata =
        serde_json::from_slice::<Value>(&fs::read(&metadata_file_path).unwrap()).unwrap();

    let mut metadata_obj = metadata.as_object().unwrap().clone();

    let mut to_upload = Vec::with_capacity(metadata_obj.len());
    for (key, val) in metadata_obj.iter_mut() {
        let val_obj = val.as_object().unwrap();
        let img = val_obj.get("image").unwrap().as_str().unwrap();
        if img.is_empty() {
            to_upload.push(key.clone());
        }
    }

    let len = to_upload.len();
    let mut count = 0;
    println!("Length: {}", len);
    for upload in to_upload {
        let val = metadata_obj.get_mut(&upload).unwrap();
        let mut obj = val.as_object().unwrap().clone();
        let id = obj.get("id").unwrap().as_i64().unwrap();
        let hash = upload_file(path, id, pinata_key, pinata_secret);
        match hash {
            Ok(hash) => {
                obj.insert("image".to_string(), format!("ipfs://{}", hash).into());
                *val = obj.into();
                fs::write(
                    metadata_file_path,
                    serde_json::to_string_pretty(&metadata_obj).unwrap(),
                )?;
                count += 1;
                println!("Uploaded {} | {}/{}", id, count, len);
            }
            Err(_) => {
                println!("Failed to upload {}", id);
            }
        }
    }

    Ok(())
}

fn upload_file(
    path: &str,
    index: i64,
    pinata_api_key: &str,
    pinata_secret_api_key: &str,
) -> Result<String> {
    use reqwest::blocking::{multipart, Client};
    let file_name = format!("{}/images/{}.png", path, index);
    let form = multipart::Form::new().file("file", &file_name)?;

    let client = Client::new();
    let res = client
        .post("https://api.pinata.cloud/pinning/pinFileToIPFS")
        .header("pinata_api_key", pinata_api_key)
        .header("pinata_secret_api_key", pinata_secret_api_key)
        .multipart(form)
        .send();

    let hash = res.and_then(|r| r.json::<Value>()).map(|js| {
        js.as_object().and_then(|map| {
            map.get("IpfsHash")
                .map(|val| val.to_string())
                .map(|s| s.replace("\"", ""))
        })
    });

    match hash {
        Ok(op) => match op {
            Some(s) => Ok(s),
            None => Err(Error::Message("No hash found".to_string())),
        },
        Err(e) => Err(e.into()),
    }
}

struct Minter {
    private_key: PrivateKey,
    address: Address,
    address_bech32: String,
}

impl Minter {
    pub fn new(key_path: &str, is_testnet: bool) -> Self {
        let private_key = decode_private_key(key_path).unwrap();
        let pub_key_hash = private_key.to_public().hash();
        let network = if is_testnet {
            NetworkInfo::testnet().network_id()
        } else {
            NetworkInfo::mainnet().network_id()
        };
        let address =
            EnterpriseAddress::new(network, &StakeCredential::from_keyhash(&pub_key_hash))
                .to_address();
        let address_bech32 = address.to_bech32(None).unwrap();
        Self {
            address,
            address_bech32,
            private_key,
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
struct MintingKeyDetails {
    key_bech32: String,
    slot: u32,
}

impl MintingKeyDetails {
    fn key(&self) -> PrivateKey {
        let bytes = hex::decode(&self.key_bech32).unwrap();
        PrivateKey::from_normal_bytes(&bytes).unwrap()
    }
}

async fn mint_batch(
    minter: Minter,
    pool: PgPool,
    submitter: Submitter,
    path: &str,
    metadata_file: &str,
    completed_file: &str,
    details_file: &str,
    seller_addr_str: &str,
    is_testnet: bool,
) -> Result<()> {
    let original_metadata_file = format!("{}/{}", path, metadata_file);
    let completed_metadata_file = format!("{}/{}", path, completed_file);
    let completed = fs::read(&completed_metadata_file);

    let mut completed_map = Map::new();
    if let Ok(bytes) = completed {
        if let Ok(map) = serde_json::from_slice::<Map<String, Value>>(&bytes) {
            completed_map = map;
        }
    }

    let metadata_json = fs::read(&original_metadata_file)
        .map(|b| serde_json::from_slice::<Map<String, Value>>(&b).unwrap())
        .unwrap();

    let mut todo: Map<String, Value> = Map::new();
    for (key, value) in metadata_json {
        if !completed_map.contains_key(&key) {
            todo.insert(key.clone(), value.clone());
        }
    }

    println!("{}", todo.len());

    let current_slot = backend::cardano_db_sync::get_slot_number(&pool).await?;
    println!("Current slot {}", current_slot);

    let details_path = format!("{}/{}", path, details_file);
    let minting_key_details = fs::read(&details_path)
        .and_then(|bytes| {
            serde_json::from_slice::<MintingKeyDetails>(&bytes).map_err(|e| std::io::Error::from(e))
        })
        .unwrap_or_else(|e| {
            let new_key = PrivateKey::generate_ed25519().unwrap();
            let key_bech32 = hex::encode(new_key.as_bytes());
            let slot = current_slot + (60 * 60 * 72);

            let mint_details = MintingKeyDetails { key_bech32, slot };
            let mint_details_str = serde_json::to_string_pretty(&mint_details).unwrap();
            fs::write(&details_path, mint_details_str);
            mint_details
        });

    println!("{:?}", &minting_key_details);
    let nft_policy = NftPolicy::from_existing(minting_key_details.key(), minting_key_details.slot);
    println!("Policy: {}", nft_policy.to_json());
    let mut seller_address = Address::from_bech32(seller_addr_str).unwrap();
    if is_testnet {
        let base_addr = BaseAddress::from_address(&seller_address).unwrap();
        seller_address = BaseAddress::new(
            NetworkInfo::testnet().network_id(),
            &base_addr.payment_cred(),
            &base_addr.stake_cred(),
        )
        .to_address();
    }

    let sale_details = SellMetadata {
        seller_address,
        price: 35_000_000,
    };

    let sale_metadatum = sale_details
        .create_sell_nft_metadata()
        .unwrap()
        .metadata()
        .unwrap();

    let todo_tuples: Vec<(String, Value)> = todo.into_iter().collect();
    for chunk in todo_tuples.chunks(35) {
        let params = backend::cardano_db_sync::get_protocol_params(&pool).await?;
        let current_slot = backend::cardano_db_sync::get_slot_number(&pool).await?;
        let mut cardano_output = cardano_serialization_lib::utils::Value::new(&to_bignum(0));
        let mut assets = Assets::new();
        let mut mint_assets = MintAssets::new();

        let mut nft_metadata_map = Map::with_capacity(50);
        for (s, v) in chunk.iter() {
            nft_metadata_map.insert(s.clone(), v.clone());
            let asset_name = v
                .as_object()
                .and_then(|m| m.get("name"))
                .and_then(|op| op.as_str())
                .map(|s| AssetName::new(s.to_string().into_bytes()).unwrap())
                .unwrap();

            assets.insert(&asset_name, &to_bignum(1));
            mint_assets.insert(&asset_name, Int::new_i32(1));
        }
        let mut multiasset = MultiAsset::new();
        multiasset.insert(&nft_policy.hash, &assets);
        cardano_output.set_multiasset(&multiasset);
        let min = min_ada_required(&cardano_output, &params.minimum_utxo_value);
        cardano_output.set_coin(&min);

        let mut outer_metadata_map = Map::with_capacity(1);
        outer_metadata_map.insert(
            hex::encode(nft_policy.hash.to_bytes()),
            Value::from(nft_metadata_map),
        );
        let cardano_metadata = encode_json_value_to_metadatum(
            Value::from(outer_metadata_map),
            MetadataJsonSchema::BasicConversions,
        )
        .unwrap();

        let batch_metadata = {
            let mut clone = sale_metadatum.clone();
            clone.insert(&to_bignum(721), &cardano_metadata);
            clone
        };

        let mut tx_outputs = vec![TransactionOutput::new(&minter.address, &cardano_output)];
        let native_scripts = {
            let mut ns = NativeScripts::new();
            ns.add(&nft_policy.script);
            ns
        };

        let witness_set_params = TransactionWitnessSetParams {
            vkey_count: 2,
            native_scripts: Some(&native_scripts),
            ..Default::default()
        };

        let utxos =
            backend::cardano_db_sync::query_user_address_utxo(&pool, &minter.address).await?;

        let mint = {
            let mut mint = Mint::new();
            mint.insert(&nft_policy.hash, &mint_assets);
            mint
        };

        let aux_data = {
            let mut aux_data = AuxiliaryData::new();
            aux_data.set_metadata(&batch_metadata);
            aux_data
        };

        let tx_body = backend::coin::build_transaction_body(
            utxos,
            vec![],
            tx_outputs,
            current_slot + (60 * 60),
            &params,
            None,
            Some(mint),
            &witness_set_params,
            Some(aux_data.clone()),
        )
        .unwrap();

        let tx_hash = hash_transaction(&tx_body);
        let witnesses = {
            let mut ws = TransactionWitnessSet::new();
            ws.set_native_scripts(&native_scripts);

            let mut vkey_ws = Vkeywitnesses::new();
            let vkey = make_vkey_witness(&tx_hash, &nft_policy.skey);
            vkey_ws.add(&vkey);
            let vkey = make_vkey_witness(&tx_hash, &minter.private_key);
            vkey_ws.add(&vkey);

            ws.set_vkeys(&vkey_ws);
            ws
        };

        let tx = Transaction::new(&tx_body, &witnesses, Some(aux_data));
        let tx_hash = submitter.submit_tx(&tx).await;

        match tx_hash {
            Ok(tx_hash) => {
                println!("Submitted: {}", tx_hash);
                for (s, v) in chunk {
                    completed_map.insert(s.clone(), v.clone());
                }
                let tx_hash =
                    TransactionHash::from_bytes(hex::decode(tx_hash.clone()).unwrap()).unwrap();
                let mut minted = backend::cardano_db_sync::query_if_nft_minted(&pool, &tx_hash)
                    .await
                    .unwrap_or(false);
                while !minted {
                    std::thread::sleep(std::time::Duration::from_secs(5));
                    minted = backend::cardano_db_sync::query_if_nft_minted(&pool, &tx_hash)
                        .await
                        .unwrap_or(false);
                }

                fs::write(
                    &completed_metadata_file,
                    serde_json::to_string_pretty(&completed_map).unwrap(),
                )
                .unwrap();
            }
            Err(e) => {
                println!("{:?}", e);
                return Ok(());
            }
        }
    }

    Ok(())
}

#[actix_web::main]
async fn main() -> Result<()> {
    let ROOT_PATH: String = dotenv::var("ROOT_PATH").unwrap();
    let USER_METADATA_FILE: String = dotenv::var("USER_METADATA_FILE").unwrap();
    let METADATA_FILE: String = dotenv::var("METADATA_FILE").unwrap();
    let COMPLETED_FILE: String = dotenv::var("COMPLETED_FILE").unwrap();
    let IS_TEST: bool = dotenv::var("IS_TEST").unwrap().parse().unwrap();

    let DB_URL: String = dotenv::var("DB_URL").unwrap();
    let KEY_PATH: String = dotenv::var("KEY_PATH").unwrap();
    let SUBMIT_URL: String = dotenv::var("SUBMIT_URL").unwrap();
    let KEY_DETAILS: String = dotenv::var("KEY_DETAILS").unwrap();
    let SELLER_ADDRESS: String = dotenv::var("SELLER_ADDRESS").unwrap();
    let PINATA_KEY: String = dotenv::var("PINATA_KEY").unwrap();
    let PINATA_SECRET: String = dotenv::var("PINATA_SECRET").unwrap();

    let metadata_file = format!("{}/{}", &ROOT_PATH, &METADATA_FILE);
    remove_label(&ROOT_PATH, &USER_METADATA_FILE, &metadata_file)?;

    upload_metadata_images(&metadata_file, &ROOT_PATH, &PINATA_KEY, &PINATA_SECRET)?;
    rename_assets(&metadata_file);
    let minter = Minter::new(&KEY_PATH, IS_TEST);
    println!("Minter address: {}", &minter.address_bech32);
    let db_pool = PgPool::connect(&DB_URL).await?;
    let submitter = Submitter::for_url(&SUBMIT_URL);
    mint_batch(
        minter,
        db_pool,
        submitter,
        &ROOT_PATH,
        &METADATA_FILE,
        &COMPLETED_FILE,
        &KEY_DETAILS,
        &SELLER_ADDRESS,
        IS_TEST,
    )
    .await?;
    Ok(())
}
