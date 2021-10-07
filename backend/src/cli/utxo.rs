use std::num::ParseIntError;

use crate::{error::Error, Result};
use cardano_serialization_lib::{
    crypto::ScriptHash,
    utils::{from_bignum, to_bignum, BigNum, Value},
    AssetName, Assets, MultiAsset,
};
use serde::ser::SerializeStruct;

#[derive(serde::Serialize)]
struct AssetJson {
    policy_id: String,
    asset_name: String,
    qty: u64,
}

#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord)]
pub struct Utxo {
    pub tx_hash: String,
    pub tx_idx: usize,
    pub value: Value,
}

impl serde::ser::Serialize for Utxo {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut serialize_struct = serializer.serialize_struct("Utxo", 4)?;
        serialize_struct.serialize_field("tx_hash", &self.tx_hash)?;
        serialize_struct.serialize_field("tx_idx", &self.tx_idx)?;

        serialize_struct.serialize_field("lovelace", &from_bignum(&self.value.coin()))?;

        let mut asset_jsons = vec![];

        if let Some(asset) = self.value.multiasset() {
            let policies = asset.keys();
            let n_policies = policies.len();
            for i in 0..n_policies {
                let policy_id = policies.get(i);
                if let Some(assets) = asset.get(&policy_id) {
                    let asset_names = assets.keys();
                    let n_assets = asset_names.len();
                    for j in 0..n_assets {
                        let asset_name = asset_names.get(j);
                        let optional_qty = assets.get(&asset_name);
                        if let Some(qty) = optional_qty {
                            asset_jsons.push(AssetJson {
                                qty: from_bignum(&qty),
                                policy_id: hex::encode(policy_id.to_bytes()),
                                asset_name: hex::encode(asset_name.to_bytes()),
                            });
                        }
                    }
                }
            }
        };
        serialize_struct.serialize_field("assets", &asset_jsons)?;
        serialize_struct.end()
    }
}

pub fn transform_utxo_output<'a, T>(mut iter: T) -> Result<Utxo>
where
    T: Iterator<Item = &'a str>,
{
    let tx_hash = iter
        .next()
        .ok_or_else(|| Error::Message("Transaction ID expected but not present".to_string()))?
        .to_string();

    let tx_idx = iter
        .next()
        .ok_or_else(|| Error::Message("Idx expected but not present".to_string()))?
        .parse()
        .map_err(|err: ParseIntError| Error::Message(err.to_string()))?;

    let remainder: String = iter.collect::<Vec<&str>>().join(" ");
    let amounts = remainder.split("+");

    let mut value = Value::new(&to_bignum(0));
    let mut multi_asset = MultiAsset::new();

    for amount in amounts {
        if amount.contains("TxOutDatumHash") {
            // We don't handle this for now
            continue;
        }

        if amount.contains("lovelace") {
            // Amount in lovelace
            value.set_coin(&BigNum::from_str(
                amount.split_whitespace().next().ok_or_else(|| {
                    Error::Message(format!("Invalid lovelace amount: {}", amount))
                })?,
            )?);
        } else {
            // This is an asset
            let mut split = amount.split_whitespace();

            let qty = split.next().ok_or_else(|| {
                Error::Message(format!("Expected qty of asset but got: {}", amount))
            })?;

            let mut policy_and_name = split
                .next()
                .ok_or_else(|| {
                    Error::Message(format!(
                        "Expected policy and name of asset but got: {}",
                        amount
                    ))
                })?
                .split(".");

            let policy =
                ScriptHash::from_bytes(hex::decode(policy_and_name.next().ok_or_else(|| {
                    Error::Message(format!("Expected policy id hash but got {}", amount))
                })?)?)?;

            let asset_name = AssetName::new(
                policy_and_name
                    .next()
                    .ok_or_else(|| {
                        Error::Message(format!("Expected asset name but got {}", amount))
                    })?
                    .as_bytes()
                    .to_vec(),
            )?;

            let assets = {
                let mut asset = Assets::new();
                asset.insert(
                    &asset_name,
                    &to_bignum(
                        qty.parse::<u64>()
                            .map_err(|e| Error::Message(e.to_string()))?,
                    ),
                );

                asset
            };

            multi_asset.insert(&policy, &assets);
        }
    }

    if multi_asset.len() > 0 {
        value.set_multiasset(&multi_asset);
    }

    Ok(Utxo {
        tx_hash,
        tx_idx,
        value,
    })
}
