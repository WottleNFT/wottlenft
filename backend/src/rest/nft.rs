use crate::{
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
