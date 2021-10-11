use std::num::ParseIntError;

use crate::{error::Error, Result};
use cardano_serialization_lib::address::Address;
use cardano_serialization_lib::crypto::{DataHash, TransactionHash};
use cardano_serialization_lib::utils::TransactionUnspentOutput;
use cardano_serialization_lib::{
    crypto::ScriptHash,
    utils::{from_bignum, to_bignum, BigNum, Value},
    AssetName, Assets, MultiAsset, TransactionInput, TransactionOutput,
};
use serde::ser::SerializeStruct;
use serde::{Serialize, Serializer};

#[derive(serde::Serialize)]
struct AssetJson {
    policy_id: String,
    asset_name: String,
    qty: u64,
}

pub struct UtxoJson<'a>(pub &'a TransactionUnspentOutput);

impl<'a> From<&'a TransactionUnspentOutput> for UtxoJson<'a> {
    fn from(t: &'a TransactionUnspentOutput) -> Self {
        Self(t)
    }
}

impl<'a> Serialize for UtxoJson<'a> {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let utxo = &self.0;
        let tx_input = utxo.input();
        let mut serialize_struct = serializer.serialize_struct("Utxo", 4)?;
        serialize_struct.serialize_field(
            "tx_hash",
            &hex::encode(tx_input.transaction_id().to_bytes()),
        )?;
        serialize_struct.serialize_field("tx_idx", &tx_input.index())?;

        let tx_output = utxo.output();
        serialize_struct.serialize_field("lovelace", &from_bignum(&tx_output.amount().coin()))?;

        let mut asset_jsons = vec![];

        if let Some(asset) = tx_output.amount().multiasset() {
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
                                asset_name: String::from_utf8(asset_name.name())
                                    .unwrap_or_else(|_| hex::encode(asset_name.to_bytes())),
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

pub fn transform_utxo_output<'a, T>(mut iter: T, addr: &Address) -> Result<TransactionUnspentOutput>
where
    T: Iterator<Item = &'a str>,
{
    let tx_hash = iter
        .next()
        .ok_or_else(|| Error::Message("Transaction ID expected but not present".to_string()))
        .and_then(|s| Ok(hex::decode(s)?))
        .and_then(|b| Ok(TransactionHash::from_bytes(b)?))?;

    let tx_idx = iter
        .next()
        .ok_or_else(|| Error::Message("Idx expected but not present".to_string()))
        .and_then(|idx| {
            idx.parse::<u32>()
                .map_err(|err: ParseIntError| Error::Message(err.to_string()))
        })?;

    let tx_input = TransactionInput::new(&tx_hash, tx_idx);

    let remainder: String = iter.collect::<Vec<&str>>().join(" ");
    let amounts = remainder.split('+');
    let mut data_hash = None;

    let mut value = Value::new(&to_bignum(0));
    let mut multi_asset = MultiAsset::new();

    for amount in amounts {
        if amount.contains("TxOutDatumHash") {
            // Script UTxOs
            if amount.contains("TxOutDatumHashNone") {
                continue;
            } else {
                let mut split = amount.split_whitespace();
                let script_hash = split
                    .next()
                    .and_then(|_| split.next())
                    .and_then(|_| split.next())
                    .ok_or_else(|| {
                        Error::Message(format!("Expected script data hash but obtained {}", amount))
                    })
                    .map(|s| s.replace("\"", ""))
                    .and_then(|s| Ok(hex::decode(s)?))
                    .and_then(|b| Ok(DataHash::from_bytes(b)?))?;
                data_hash = Some(script_hash);
            }
        } else if amount.contains("lovelace") {
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
                .split('.');

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

    let mut tx_output = TransactionOutput::new(addr, &value);
    if let Some(d) = data_hash {
        tx_output.set_data_hash(&d);
    }

    Ok(TransactionUnspentOutput::new(&tx_input, &tx_output))
}
