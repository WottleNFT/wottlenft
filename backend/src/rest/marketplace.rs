use crate::error::Error;
use crate::marketplace::un_goals::UnGoal;
use crate::rest::{parse_address, AppState};
use crate::Result;
use actix_web::{get, post, web, HttpResponse, Scope};
use cardano_serialization_lib::utils::{from_bignum, BigNum};
use cardano_serialization_lib::{AssetName, PolicyID};
use serde::{Deserialize, Serialize};
use serde_json::json;

#[get("")]
async fn get_all_sales(data: web::Data<AppState>) -> Result<HttpResponse> {
    let sales = data
        .marketplace
        .holder
        .get_nfts_for_sale(&data.pool)
        .await?;
    Ok(HttpResponse::Ok().json(sales))
}

#[derive(Deserialize, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct Sell {
    seller_address: String,
    policy_id: String,
    asset_name: String,
    un_goal: UnGoal,
    price: u64,
}

#[post("/sell")]
async fn sell_nft(
    sell_details: web::Json<Sell>,
    data: web::Data<AppState>,
) -> Result<HttpResponse> {
    let sell_details = sell_details.into_inner();
    if sell_details.price < 5_000_000 {
        return Err(Error::Message(
            "Price cannot be less than 5 ADA".to_string(),
        ));
    }
    let seller_address = parse_address(&sell_details.seller_address)?;
    let policy_id = PolicyID::from_bytes(hex::decode(sell_details.policy_id)?)?;
    let asset_name = AssetName::new(sell_details.asset_name.into_bytes())?;
    let tx = data
        .marketplace
        .sell(
            &seller_address,
            policy_id,
            asset_name,
            sell_details.un_goal,
            sell_details.price,
            &data.pool,
        )
        .await?;
    Ok(HttpResponse::Ok().json(json!({
        "transaction": hex::encode(tx.to_bytes())
    })))
}

pub fn create_marketplace_service() -> Scope {
    web::scope("/marketplace")
        .service(sell_nft)
        .service(get_all_sales)
}
