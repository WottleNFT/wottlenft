mod cli;
mod coin;
mod config;
mod error;
mod nft;
mod rest;
mod transaction;

use cbor_event::cbor;
use cli::{command::CardanoCli, protocol::ProtocolParams};
use coin::{CoinSelectionOutput, CoinSelector};

use cardano_serialization_lib::{
    address::*,
    crypto::*,
    metadata::{AuxiliaryData, GeneralTransactionMetadata, MetadataMap, TransactionMetadatum},
    tx_builder,
    utils::{hash_transaction, make_vkey_witness},
    TransactionWitnessSet,
};
use envconfig::Envconfig;
use error::Result;
use nft::{NftTransactionBuilder, WottleNftMetadata, WottleNftMinter};
use serde_json::json;

use crate::{
    cli::protocol::MIN_UTXO_VALUE,
    error::Error,
    transaction::{build_transaction, start_transaction, Submitter},
};

#[actix_web::main]
async fn main() -> Result<()> {
    std::env::set_var("TESTNET", "true");
    std::env::set_var("TESTNET_MAGIC", "1097911063");
    std::env::set_var("CARDANO_CLI_PATH", "/home/tkl/.local/bin/cardano-cli");
    std::env::set_var("SUBMIT_API_BASE_URL", "http://localhost:8090");
    std::env::set_var(
        "NFT_POLICY_VERIFICATION_KEY",
        "582036f6f351cdb20c289fa436eeac66bdb7829ce03d4130313e15bc7b4329b64c07",
    );
    std::env::set_var(
        "NFT_POLICY_SIGNING_KEY",
        "5820979937b4a2457e3e855a5d809a75d4e3b7e986850c1bb4a5e024ac15d7e40e9f",
    );

    let config = config::Config::init_from_env().unwrap();
    let cli = CardanoCli::from_config(&config);
    let block_info = cli.query_block_information()?;
    let params = cli.query_parameters()?;
    let my_address =
        Address::from_bech32("addr_test1vrfj87kgld0t4fsglq543ckwpljthlvhp7kpldtym4drnvczva8qj")?;

    let out = cli.query_utxo(&my_address)?;

    let nami_address =
    Address::from_bech32("addr_test1qpaazezj9llctl9ua2au4x40pxunjye748fvjt5hepykgnycycwumqyqx0805cpgrrefu6e4j70x7f9fqgnuj6xqyauspjqx5a")?;
    let minter =
        WottleNftMinter::from_cbor_hex(&config.nft_signing_key, &config.nft_verification_key)?;
    let nft = WottleNftMetadata::new(
        "wottle's nft".to_string(),
        "my description".to_string(),
        "https://placekitten.com/408/287".to_string(),
    );
    let nft_tx_builder = NftTransactionBuilder::new(minter, nft, block_info, params)?;

    let tx = nft_tx_builder.create_transaction(&my_address, out)?;
    let tx_hash = hash_transaction(&tx.body());

    let mut witness_set = TransactionWitnessSet::new();
    let mut vkey_witnesses = Vkeywitnesses::new();
    let key =
        decode_private_key("58202c157f21be0edd340d0037509323701cadd20ffc4aff915888a2ea7e84624330")?;
    let vkey_witness = make_vkey_witness(&tx_hash, &key);
    vkey_witnesses.add(&vkey_witness);
    witness_set.set_vkeys(&vkey_witnesses);

    let tx = NftTransactionBuilder::combine_witness_set(tx, witness_set)?;

    // // Sender

    // let submitter = Submitter::for_url(&config.submit_api_base_url);
    // let tx_id = submitter.submit_tx(&tx).await?;
    // println!("tx_id: {}", tx_id);

    rest::start_server(config).await?;

    Ok(())
}

fn decode_public_key(cbor_hex: &str) -> Result<PublicKey> {
    let hex_decode = hex::decode(cbor_hex.as_bytes())?;
    use cbor_event::de::*;
    use std::io::Cursor;
    let mut raw = Deserializer::from(Cursor::new(hex_decode));
    let bytes = raw.bytes()?;

    Ok(PublicKey::from_bytes(&bytes)?)
}

fn decode_private_key(cbor_hex: &str) -> Result<PrivateKey> {
    let hex_decode = hex::decode(cbor_hex.as_bytes())?;
    use cbor_event::de::*;
    use std::io::Cursor;
    let mut raw = Deserializer::from(Cursor::new(hex_decode));
    let bytes = raw.bytes()?;

    Ok(PrivateKey::from_normal_bytes(&bytes)?)
}

fn harden(num: u32) -> u32 {
    0x80000000 + num
}

fn test() -> Result<()> {
    let root_key = Bip32PrivateKey::generate_ed25519_bip32()?;

    let acc_key = root_key
        .derive(harden(1852))
        .derive(harden(1815))
        .derive(harden(0));

    let utxo_pub_key = acc_key.derive(0).derive(0).to_public();

    let stake_key = acc_key.derive(2).derive(0).to_public();

    let base_addr = BaseAddress::new(
        NetworkInfo::testnet().network_id(),
        &StakeCredential::from_keyhash(&utxo_pub_key.to_raw_key().hash()),
        &StakeCredential::from_keyhash(&stake_key.to_raw_key().hash()),
    );

    Ok(())
}
