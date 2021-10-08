mod address;
mod nft;

use crate::{
    cli::command::CardanoCli, config::Config, nft::WottleNftMinter, transaction::Submitter, Result,
};
use actix_cors::Cors;
use actix_web::{web::Data, App, HttpServer};

struct AppState {
    cli: CardanoCli,
    submitter: Submitter,
    minter: WottleNftMinter,
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
