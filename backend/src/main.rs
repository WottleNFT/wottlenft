mod cli;
mod coin;
mod config;
mod error;
mod nft;
mod rest;
mod transaction;

use cardano_serialization_lib::crypto::*;
use envconfig::Envconfig;
use error::Result;

use crate::error::Error;

#[actix_web::main]
async fn main() -> Result<()> {
    let config = config::Config::init_from_env().unwrap();
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
