use std::convert::TryFrom;

use cardano_serialization_lib::{
    address::Address,
    crypto::{PrivateKey, PublicKey, ScriptHash, TransactionHash, Vkeywitnesses},
    metadata::{AuxiliaryData, GeneralTransactionMetadata, MetadataMap, TransactionMetadatum},
    utils::{hash_transaction, make_vkey_witness, min_ada_required, to_bignum, Int, Value},
    AssetName, Assets, Mint, MintAssets, MultiAsset, NativeScript, NativeScripts, ScriptAll,
    ScriptHashNamespace, ScriptPubkey, TimelockExpiry, Transaction, TransactionOutput,
    TransactionWitnessSet,
};
use serde::Deserialize;

use crate::coin::TransactionWitnessSetParams;
use crate::error::Error::Js;
use crate::{
    cli::protocol::{BlockInformation, ProtocolParams},
    decode_private_key, decode_public_key,
    error::Error,
    Result,
};
use cardano_serialization_lib::utils::TransactionUnspentOutput;

#[derive(Deserialize)]
pub struct WottleNftMetadata {
    name: String,
    description: String,
    image: String,
}

impl WottleNftMetadata {
    pub fn new(name: String, description: String, image: String) -> Self {
        Self {
            name,
            description,
            image,
        }
    }
}

impl std::convert::TryFrom<&WottleNftMetadata> for MetadataMap {
    type Error = crate::Error;

    fn try_from(value: &WottleNftMetadata) -> Result<Self> {
        let mut nft_metadata_map = MetadataMap::new();

        nft_metadata_map.insert(
            &TransactionMetadatum::new_text("name".to_string())?,
            &TransactionMetadatum::new_text(value.name.clone())?,
        );

        nft_metadata_map.insert(
            &TransactionMetadatum::new_text("description".to_string())?,
            &TransactionMetadatum::new_text(value.description.clone())?,
        );

        nft_metadata_map.insert(
            &TransactionMetadatum::new_text("image".to_string())?,
            &TransactionMetadatum::new_text(value.image.clone())?,
        );

        nft_metadata_map.insert(
            &TransactionMetadatum::new_text("author".to_string())?,
            &TransactionMetadatum::new_text("© 2021 WottleNFT".to_string())?,
        );

        Ok(nft_metadata_map)
    }
}

pub struct WottleNftMinter {
    skey: PrivateKey,
    vkey: PublicKey,
    address: Option<Address>,
}

impl Clone for WottleNftMinter {
    fn clone(&self) -> Self {
        Self {
            skey: PrivateKey::from_normal_bytes(&self.skey.as_bytes()).unwrap(),
            vkey: self.vkey.clone(),
            address: self.address.clone(),
        }
    }
}

pub struct Policy {
    pub script: NativeScript,
    pub hash: ScriptHash,
}

impl WottleNftMinter {
    pub fn from_keys(
        skey_path: &str,
        vkey_path: &str,
        nft_tax_address: &Option<String>,
    ) -> Result<WottleNftMinter> {
        let address = match nft_tax_address {
            Some(s) => match Address::from_bech32(&s) {
                Ok(addr) => Some(addr),
                Err(err) => return Err(Js(err)),
            },
            None => None,
        };
        Ok(Self {
            skey: decode_private_key(skey_path)?,
            vkey: decode_public_key(vkey_path)?,
            address,
        })
    }

    pub fn generate_policy(&self, expiry_slot: u32) -> Result<Policy> {
        let pub_key_script = NativeScript::new_script_pubkey(&ScriptPubkey::new(&self.vkey.hash()));
        let time_expiry_script =
            NativeScript::new_timelock_expiry(&TimelockExpiry::new(expiry_slot));

        let mut native_scripts = NativeScripts::new();
        native_scripts.add(&pub_key_script);
        native_scripts.add(&time_expiry_script);

        let script = NativeScript::new_script_all(&ScriptAll::new(&native_scripts));
        let hash =
            ScriptHash::from_bytes(script.hash(ScriptHashNamespace::NativeScript).to_bytes())?;

        Ok(Policy { script, hash })
    }
}

const EXPIRY_IN_SECONDS: u32 = 3600;
const NFT_STANDARD_LABEL: u64 = 721;

pub struct NftTransactionBuilder {
    minter: WottleNftMinter,
    policy: Policy,
    asset_value: Value,
    asset_name: AssetName,
    metadata: GeneralTransactionMetadata,
    block_info: BlockInformation,
    params: ProtocolParams,
}

impl NftTransactionBuilder {
    pub fn new(
        minter: WottleNftMinter,
        nft: WottleNftMetadata,
        block_info: BlockInformation,
        params: ProtocolParams,
    ) -> Result<Self> {
        let policy = minter.generate_policy(block_info.slot as u32 + EXPIRY_IN_SECONDS)?;
        let (asset_value, asset_name) =
            Self::generate_asset_and_value(&policy, &nft, params.min_utxo_value)?;
        let metadata = Self::build_metadata(&policy, &nft)?;

        Ok(Self {
            minter,
            policy,
            asset_value,
            asset_name,
            metadata,
            params,
            block_info,
        })
    }

    fn str_to_asset_name(s: &str) -> String {
        s.to_ascii_lowercase().split_whitespace().collect()
    }

    fn generate_asset_and_value(
        policy: &Policy,
        nft: &WottleNftMetadata,
        min_utxo_value: u64,
    ) -> Result<(Value, AssetName)> {
        let mut value = Value::new(&to_bignum(min_utxo_value));
        let mut assets = Assets::new();
        let asset_name = AssetName::new(Self::str_to_asset_name(&nft.name).as_bytes().to_vec())?;
        assets.insert(&asset_name, &to_bignum(1));
        let mut multi_asset = MultiAsset::new();
        multi_asset.insert(&policy.hash, &assets);
        value.set_multiasset(&multi_asset);

        let min = min_ada_required(&value, &to_bignum(min_utxo_value));
        value.set_coin(&min);

        Ok((value, asset_name))
    }

    fn build_metadata(
        policy: &Policy,
        nft: &WottleNftMetadata,
    ) -> Result<GeneralTransactionMetadata> {
        let nft_metadata_map = MetadataMap::try_from(nft)?;

        let mut nft_asset = MetadataMap::new();
        nft_asset.insert(
            &TransactionMetadatum::new_text(Self::str_to_asset_name(&nft.name))?,
            &TransactionMetadatum::new_map(&nft_metadata_map),
        );

        let mut policy_metadata = MetadataMap::new();
        policy_metadata.insert(
            &TransactionMetadatum::new_text(hex::encode(policy.hash.to_bytes()))?,
            &TransactionMetadatum::new_map(&nft_asset),
        );

        Ok({
            let mut general_metadata = GeneralTransactionMetadata::new();
            general_metadata.insert(
                &to_bignum(NFT_STANDARD_LABEL),
                &TransactionMetadatum::new_map(&policy_metadata),
            );
            general_metadata
        })
    }

    pub fn create_transaction(
        &self,
        receiver: &Address,
        utxos: Vec<TransactionUnspentOutput>,
    ) -> Result<Transaction> {
        let mut tx_outputs = vec![TransactionOutput::new(receiver, &self.asset_value)];

        if let Some(addr) = &self.minter.address {
            let min_utxo_value = &to_bignum(self.params.min_utxo_value);

            let tax_amount = min_ada_required(&Value::new(&min_utxo_value), &min_utxo_value);
            tx_outputs.push(TransactionOutput::new(addr, &Value::new(&tax_amount)));
        }

        let native_scripts = &self.create_native_scripts();
        let witness_set_params: TransactionWitnessSetParams = TransactionWitnessSetParams {
            vkey_count: 2,
            native_scripts: Some(native_scripts),
            ..Default::default()
        };

        let tx_body = crate::coin::build_transaction_body(
            utxos,
            tx_outputs,
            self.block_info.slot as u32 + EXPIRY_IN_SECONDS,
            &self.params,
            None,
            Some(self.create_mint()),
            &witness_set_params,
            Some(self.create_auxiliary_data()),
        )?;

        let tx_hash = hash_transaction(&tx_body);
        let witnesses = self.get_witness_set(&tx_hash);
        let mut aux_data = AuxiliaryData::new();
        aux_data.set_metadata(&self.metadata);
        let transaction = Transaction::new(&tx_body, &witnesses, Some(aux_data));
        Ok(transaction)
    }

    pub fn combine_witness_set(
        tx: Transaction,
        witness_set: TransactionWitnessSet,
    ) -> Result<Transaction> {
        let body = tx.body();
        let auxiliary_data = tx.auxiliary_data();
        let mut prev_witness_set = tx.witness_set();

        let mut prev_witnesses = prev_witness_set.vkeys().ok_or(Error::Unknown)?;

        if let Some(vkeys) = witness_set.vkeys() {
            for i in 0..vkeys.len() {
                prev_witnesses.add(&vkeys.get(i));
            }
        }

        prev_witness_set.set_vkeys(&prev_witnesses);
        Ok(Transaction::new(&body, &prev_witness_set, auxiliary_data))
    }

    fn create_mint(&self) -> Mint {
        let mut mint = Mint::new();
        let mut mint_assets = MintAssets::new();
        mint_assets.insert(&self.asset_name, Int::new_i32(1));
        mint.insert(&self.policy.hash, &mint_assets);
        mint
    }

    fn create_auxiliary_data(&self) -> AuxiliaryData {
        let mut aux_data = AuxiliaryData::new();
        aux_data.set_metadata(&self.metadata);
        aux_data
    }

    fn create_native_scripts(&self) -> NativeScripts {
        let mut native_scripts = NativeScripts::new();
        native_scripts.add(&self.policy.script);
        native_scripts
    }

    fn get_witness_set(&self, tx_hash: &TransactionHash) -> TransactionWitnessSet {
        let mut witnesses = TransactionWitnessSet::new();
        witnesses.set_native_scripts(&self.create_native_scripts());
        witnesses.set_vkeys(&self.get_vkey_witnesses(tx_hash));
        witnesses
    }

    fn get_vkey_witnesses(&self, tx_hash: &TransactionHash) -> Vkeywitnesses {
        let mut vkey_witnesses = Vkeywitnesses::new();
        let vkey_witness = make_vkey_witness(tx_hash, &self.minter.skey);
        vkey_witnesses.add(&vkey_witness);
        vkey_witnesses
    }
}
