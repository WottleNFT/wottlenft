use crate::Result;
use actix_web::{get, web, HttpResponse, Scope};
use cardano_serialization_lib::{
    address::Address,
    utils::{from_bignum, BigNum},
};
use serde_json::json;

use crate::rest::AppState;

#[get("/{address}/utxo")]
async fn get_all_utxos(path: web::Path<String>, data: web::Data<AppState>) -> Result<HttpResponse> {
    let address = super::parse_address(&path.into_inner())?;
    let utxos = data.cli.query_utxo(&address)?;
    Ok(HttpResponse::Ok().json(utxos))
}

#[get("/{address}/balance")]
async fn get_address_balance(
    path: web::Path<String>,
    data: web::Data<AppState>,
) -> Result<HttpResponse> {
    let address = super::parse_address(&path.into_inner())?;
    let utxos = data.cli.query_utxo(&address)?;

    let mut balance = BigNum::zero();
    for utxo in utxos {
        balance = balance.checked_add(&utxo.value.coin())?;
    }
    Ok(HttpResponse::Ok().json(json!({ "total_value": from_bignum(&balance) })))
}

pub fn create_address_service() -> Scope {
    web::scope("/address")
        .service(get_all_utxos)
        .service(get_address_balance)
}
