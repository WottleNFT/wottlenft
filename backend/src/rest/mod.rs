mod address;
mod nft;

use crate::{
    cli::command::CardanoCli, config::Config, nft::WottleNftMinter, transaction::Submitter, Result,
};
use actix_web::{App, HttpServer};

struct AppState {
    cli: CardanoCli,
    submitter: Submitter,
    minter: WottleNftMinter,
}

pub async fn start_server(config: Config) -> Result<()> {
    let minter =
        WottleNftMinter::from_cbor_hex(&config.nft_signing_key, &config.nft_verification_key)?;
    Ok(HttpServer::new(move || {
        App::new()
            .app_data(AppState {
                cli: CardanoCli::from_config(&config),
                submitter: Submitter::for_url(&config.submit_api_base_url),
                minter: minter.clone(),
            })
            .service(address::create_address_service())
            .service(nft::create_nft_service())
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await?)
}
