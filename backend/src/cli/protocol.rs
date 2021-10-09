use serde::{Deserialize, Deserializer, Serialize};
use serde_json::Value;
use std::collections::HashMap;

const MIN_UTXO_VALUE: u64 = 1000000;

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct ProtocolParams {
    pub tx_fee_per_byte: u64,
    #[serde(alias = "minUTxOValue")]
    #[serde(deserialize_with = "min_utxo_value")]
    pub min_utxo_value: u64,
    pub stake_pool_deposit: u64,
    pub tx_fee_fixed: u64,
    pub stake_address_deposit: u64,
    pub max_tx_size: u32,
    pub max_value_size: u32,
    pub utxo_cost_per_word: u64,
    #[serde(flatten)]
    pub rest: HashMap<String, Value>,
}

fn min_utxo_value<'de, D>(deserializer: D) -> Result<u64, D::Error>
where
    D: Deserializer<'de>,
{
    let opt = Option::deserialize(deserializer)?;
    Ok(opt.unwrap_or(MIN_UTXO_VALUE))
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct BlockInformation {
    pub epoch: u32,
    pub hash: String,
    pub slot: u64,
    pub block: u64,
    pub era: String,
    pub sync_progress: String,
}
