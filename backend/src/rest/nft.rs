use crate::{
    cardano_db_sync::{get_protocol_params, get_slot_number, query_user_address_utxo},
    nft::{NftTransactionBuilder, WottleNftMetadata},
    Result,
};
use actix_web::{post, web, HttpResponse, Scope};
use cardano_serialization_lib::{Transaction, TransactionWitnessSet};
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
    let address = super::parse_address(&create_nft.address)?;
    let utxos = query_user_address_utxo(&data.pool, &address).await?;
    let slot = get_slot_number(&data.pool).await?;
    let params = get_protocol_params(&data.pool).await?;

    let nft_tx_builder = NftTransactionBuilder::new(create_nft.nft, slot, params)?;

    let tx = nft_tx_builder.create_transaction(&address, &data.tax_address, utxos)?;

    Ok(HttpResponse::Ok().json(json!({
        "transaction": hex::encode(tx.to_bytes()),
        "policy": {
            "id": nft_tx_builder.policy_id(),
            "json": nft_tx_builder.policy_json()
        }
    })))
}

#[derive(Deserialize)]
struct Signature {
    signature: String,
    transaction: String,
}
#[post("/sign")]
async fn sign_nft_transaction(
    signature: web::Json<Signature>,
    data: web::Data<AppState>,
) -> Result<HttpResponse> {
    let Signature {
        signature,
        transaction,
    } = signature.into_inner();

    let transaction = Transaction::from_bytes(hex::decode(transaction)?)?;
    let tx_witness_set = TransactionWitnessSet::from_bytes(hex::decode(signature)?)?;

    let tx = NftTransactionBuilder::combine_witness_set(transaction, tx_witness_set)?;

    let tx_id = data.submitter.submit_tx(&tx).await?;
    Ok(HttpResponse::Ok().json(json!({ "tx_id": tx_id })))
}

pub fn create_nft_service() -> Scope {
    web::scope("/nft")
        .service(create_nft_transaction)
        .service(sign_nft_transaction)
}
