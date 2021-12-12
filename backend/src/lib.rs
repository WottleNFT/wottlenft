#[macro_use]
extern crate lazy_static;

pub mod cardano_db_sync;
pub mod coin;
pub mod config;
pub mod error;
pub mod marketplace;
pub mod nft;
pub mod rest;
pub mod transaction;
pub use cardano_serialization_lib;
pub use envconfig;

use error::{Error, Result};
use std::fs::File;

#[derive(serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
struct TextEnvelope {
    r#type: String,
    description: String,
    cbor_hex: String,
}

fn read_key(path: &str) -> Result<TextEnvelope> {
    let file = File::open(path)?;
    Ok(serde_json::from_reader(file)?)
}

pub fn decode_public_key(key_path: &str) -> Result<cardano_serialization_lib::crypto::PublicKey> {
    let text_envelope = read_key(key_path)?;
    let hex_decode = hex::decode(text_envelope.cbor_hex.as_bytes())?;
    use cbor_event::de::*;
    use std::io::Cursor;
    let mut raw = Deserializer::from(Cursor::new(hex_decode));
    let bytes = raw.bytes()?;

    Ok(cardano_serialization_lib::crypto::PublicKey::from_bytes(
        &bytes,
    )?)
}

pub fn decode_private_key(key_path: &str) -> Result<cardano_serialization_lib::crypto::PrivateKey> {
    let text_envelope = read_key(key_path)?;
    let hex_decode = hex::decode(text_envelope.cbor_hex.as_bytes())?;
    use cbor_event::de::*;
    use std::io::Cursor;
    let mut raw = Deserializer::from(Cursor::new(hex_decode));
    let bytes = raw.bytes()?;

    Ok(cardano_serialization_lib::crypto::PrivateKey::from_normal_bytes(&bytes)?)
}
