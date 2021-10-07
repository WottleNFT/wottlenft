use crate::{
    nft::{NftTransactionBuilder, WottleNftMetadata},
    Result,
};
use actix_web::{post, web, HttpResponse, Scope};
use cardano_serialization_lib::{
    address::Address,
    utils::{from_bignum, BigNum},
};
use serde::Deserialize;
use serde_json::json;

use crate::rest::AppState;

#[derive(Deserialize)]
struct CreateNft {
    address: String,
    #[serde(flatten)]
    nft: WottleNftMetadata,
}

#[post("/create")]
async fn create_nft_transaction(
    create_nft: web::Json<CreateNft>,
    data: web::Data<AppState>,
) -> Result<HttpResponse> {
    let create_nft = create_nft.into_inner();
    let address_bech32 = &create_nft.address;
    let address = Address::from_bech32(address_bech32)?;
    let utxos = data.cli.query_utxo(&address)?;
    let block_info = data.cli.query_block_information()?;
    let params = data.cli.query_parameters()?;
    let nft_tx_builder =
        NftTransactionBuilder::new(data.minter.clone(), create_nft.nft, block_info, params)?;

    let tx = nft_tx_builder.create_transaction(&address, utxos)?;

    Ok(HttpResponse::Ok().json(json!({
        "transaction": hex::encode(tx.to_bytes())
    })))
}

#[post("/sign")]
async fn sign_nft_transaction(
    path: web::Path<String>,
    data: web::Data<AppState>,
) -> Result<HttpResponse> {
    let address_bech32 = path.into_inner();
    let address = Address::from_bech32(&address_bech32)?;
    let utxos = data.cli.query_utxo(&address)?;

    let mut balance = BigNum::zero();
    for utxo in utxos {
        balance = balance.checked_add(&utxo.value.coin())?;
    }
    Ok(HttpResponse::Ok().json(json!({ "total_value": from_bignum(&balance) })))
}

pub fn create_nft_service() -> Scope {
    web::scope("/nft")
        .service(create_nft_transaction)
        .service(sign_nft_transaction)
}
