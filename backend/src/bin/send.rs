use backend::cardano_db_sync::{
    get_protocol_params, get_slot_number, query_user_address_nfts, query_user_address_utxo,
};
use backend::coin::{build_transaction_body, TransactionWitnessSetParams};
use backend::decode_private_key;
use backend::error::Result;
use backend::transaction::Submitter;
use cardano_serialization_lib::address::{
    Address, EnterpriseAddress, NetworkInfo, StakeCredential,
};
use cardano_serialization_lib::crypto::{ScriptHash, Vkeywitnesses};
use cardano_serialization_lib::utils::{
    hash_transaction, make_vkey_witness, min_ada_required, to_bignum, Value,
};
use cardano_serialization_lib::{
    Assets, MultiAsset, Transaction, TransactionOutput, TransactionWitnessSet,
};
use sqlx::PgPool;
use std::collections::{HashMap, HashSet};

#[actix_web::main]
async fn main() -> Result<()> {
    let TO_ADDRESS = "addr1q9tcvgg3mg6zaj9l0ucqc286hqh8msj2damusgt5ey0td0rcfcgmpldw48wtcg7228r7jyq5xmrwuzm6y3466ls3grhs522rxy";
    let orcs_address = Address::from_bech32(TO_ADDRESS)?;
    let POLICY_ID = "6113dafb03b4eb0d6fbad8eecaf13d12d37d5df9c9bcf9ca05144d20";
    let DB_URL: String = dotenv::var("DB_URL").unwrap();
    let KEY_PATH: String = dotenv::var("KEY_PATH").unwrap();
    let SUBMIT_URL: String = dotenv::var("SUBMIT_URL").unwrap();
    let SELLER_ADDRESS: String = dotenv::var("SELLER_ADDRESS").unwrap();
    let db_pool = PgPool::connect(&DB_URL).await?;

    let market_key_file = "/home/tkl/cardano-src/testnet/keys/projects/projects.skey";
    let private_key = decode_private_key(market_key_file)?;
    let pub_key_hash = private_key.to_public().hash();
    let network = if false {
        NetworkInfo::testnet().network_id()
    } else {
        NetworkInfo::mainnet().network_id()
    };
    let address =
        EnterpriseAddress::new(network, &StakeCredential::from_keyhash(&pub_key_hash)).to_address();
    let address_bech32 = address.to_bech32(None)?;
    println!("{}", address_bech32);
    let utxos = query_user_address_utxo(&db_pool, &address).await?;
    println!("{:?}", utxos.len());

    let slot = get_slot_number(&db_pool).await?;
    let protocol_params = get_protocol_params(&db_pool).await?;
    let tx_witness_params = TransactionWitnessSetParams {
        vkey_count: 1,
        ..Default::default()
    };
    let mut outputs = vec![];
    let mut inputs = vec![];

    let mut map = HashMap::new();
    for utxo in &utxos {
        map.insert(
            hex::encode(utxo.input().transaction_id().to_bytes()),
            utxo.clone(),
        );
    }

    let mut amount = 35_000_000;
    let mut count = 0;
    let mut value = Value::new(&to_bignum(amount));
    let mut multiasset = MultiAsset::new();
    let mut assets = Assets::new();
    let mut policy: Option<ScriptHash> = None;
    for utxo in utxos.iter().take(25) {
        if let Some(ma) = utxo.output().amount().multiasset() {
            for i in 0..ma.keys().len() {
                let key = ma.keys().get(i);
                policy = Some(key.clone());
                let asset = ma.get(&key);
                if let Some(asset) = asset {
                    for j in 0..asset.keys().len() {
                        let asset_name = asset.keys().get(j);
                        assets.insert(&asset_name, &to_bignum(1));
                        count += 1;

                        if count == 300 {
                            multiasset.insert(&key, &assets);
                            value.set_multiasset(&multiasset);
                            // let coin =
                            //     min_ada_required(&value, &protocol_params.minimum_utxo_value);
                            // value.set_coin(&coin);
                            let output = TransactionOutput::new(&orcs_address, &value);
                            outputs.push(output);

                            count = 0;
                            value = Value::new(&to_bignum(amount));
                            multiasset = MultiAsset::new();
                            assets = Assets::new();
                        }
                    }
                }
            }
            inputs.push(utxo.clone());
        }
    }

    if count > 0 {
        multiasset.insert(&policy.unwrap(), &assets);
        value.set_multiasset(&multiasset);
        let mut amt = (amount / 300) * count;
        if amt < 1_000_000 {
            amt = 1_500_000
        }
        value.set_coin(&to_bignum(amt));
        let output = TransactionOutput::new(&orcs_address, &value);
        outputs.push(output);
    }

    let tx_body = build_transaction_body(
        utxos,
        inputs,
        outputs,
        slot + 360000,
        &protocol_params,
        None,
        None,
        &tx_witness_params,
        None,
    )?;

    println!("{:?}", tx_body.fee());
    let mut input_money = to_bignum(0);
    for i in 0..tx_body.inputs().len() {
        let input = map
            .get(&hex::encode(
                tx_body.inputs().get(i).transaction_id().to_bytes(),
            ))
            .unwrap();
        println!("Input: {:?}", input);

        input_money = input_money
            .checked_add(&input.output().amount().coin())
            .unwrap();
    }

    let mut output_money = tx_body.fee();
    for i in 0..tx_body.outputs().len() {
        println!("{:?}", tx_body.outputs().get(i));
        output_money = output_money
            .checked_add(&tx_body.outputs().get(i).amount().coin())
            .unwrap();
    }

    println!("Input {:?} | Output {:?}", input_money, output_money);
    let tx_hash = hash_transaction(&tx_body);
    let vkey = make_vkey_witness(&tx_hash, &private_key);
    let mut tx_witness_set = TransactionWitnessSet::new();
    let mut vkeys = Vkeywitnesses::new();
    vkeys.add(&vkey);
    tx_witness_set.set_vkeys(&vkeys);

    let tx = Transaction::new(&tx_body, &tx_witness_set, None);
    let submitter = Submitter::for_url(&SUBMIT_URL);

    submitter.submit_tx(&tx).await?;
    Ok(())
}
