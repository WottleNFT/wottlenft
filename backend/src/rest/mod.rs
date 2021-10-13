mod address;
mod nft;

use crate::{config::Config, error::Error, transaction::Submitter, Result};
use actix_cors::Cors;
use actix_web::{web::Data, App, HttpServer};
use cardano_serialization_lib::address::Address;
use sqlx::postgres::PgPool;

struct AppState {
    pool: PgPool,
    submitter: Submitter,
    tax_address: Address,
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
    let tax_address = Address::from_bech32(&config.nft_bech32_tax_address)?;
    let db_pool = PgPool::connect(&config.database_url).await?;
    let address = format!("0.0.0.0:{}", config.port);
    println!("Starting server on {}", &address);
    Ok(HttpServer::new(move || {
        App::new()
            .wrap(
                Cors::default()
                    .allow_any_origin()
                    .allow_any_method()
                    .allow_any_header(),
            )
            .app_data(Data::new(AppState {
                pool: db_pool.clone(),
                submitter: Submitter::for_url(&config.submit_api_base_url),
                tax_address: tax_address.clone(),
            }))
            .service(address::create_address_service())
            .service(nft::create_nft_service())
    })
    .bind(address)?
    .run()
    .await?)
}
