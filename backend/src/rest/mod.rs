mod address;
mod nft;

use crate::{
    cli::command::CardanoCli, config::Config, error::Error, nft::WottleNftMinter,
    transaction::Submitter, Result,
};
use actix_cors::Cors;
use actix_web::{web::Data, App, HttpServer};
use cardano_serialization_lib::address::Address;

struct AppState {
    cli: CardanoCli,
    submitter: Submitter,
    minter: WottleNftMinter,
}

pub fn parse_address(address: &str) -> Result<Address> {
    match Address::from_bech32(address) {
        Ok(addr) => Ok(addr),
        Err(_) => {
            match hex::decode(address)
                .map_err(|_| ())
                .and_then(|hex_decoded| Address::from_bytes(hex_decoded).map_err(|_| ()))
            {
                Ok(addr) => Ok(addr),
                Err(_) => Err(Error::Message("Invalid address provided".to_string())),
            }
        }
    }
}

pub async fn start_server(config: Config) -> Result<()> {
    let minter = WottleNftMinter::from_keys(
        &config.nft_signing_key_path,
        &config.nft_verification_key_path,
    )?;
    let address = format!("127.0.0.1:{}", config.port);
    println!("Starting server on {}", address);
    Ok(HttpServer::new(move || {
        App::new()
            .wrap(
                Cors::default()
                    .allow_any_origin()
                    .allow_any_method()
                    .allow_any_header(),
            )
            .app_data(Data::new(AppState {
                cli: CardanoCli::from_config(&config),
                submitter: Submitter::for_url(&config.submit_api_base_url),
                minter: minter.clone(),
            }))
            .service(address::create_address_service())
            .service(nft::create_nft_service())
    })
    .bind(address)?
    .run()
    .await?)
}
