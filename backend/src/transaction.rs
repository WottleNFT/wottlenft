use crate::{cli::protocol::MIN_UTXO_VALUE, coin::CoinSelectionOutput, Result};
use cardano_serialization_lib::{
    address::Address, crypto::TransactionHash, fees::LinearFee, tx_builder::TransactionBuilder,
    utils::to_bignum, Transaction, TransactionInput,
};
use reqwest::{
    header::{HeaderMap, HeaderValue},
    Client, Url,
};

use crate::cli::protocol::ProtocolParams;

const TWO_HOURS: u32 = 60 * 60 * 2;

pub fn start_transaction(params: &ProtocolParams, current_slot: u64) -> TransactionBuilder {
    let mut tx_builder = TransactionBuilder::new(
        &LinearFee::new(
            &to_bignum(params.tx_fee_per_byte),
            &to_bignum(params.tx_fee_fixed),
        ),
        &to_bignum(params.min_utxo_value.unwrap_or(MIN_UTXO_VALUE)),
        &to_bignum(params.stake_pool_deposit),
        &to_bignum(params.stake_address_deposit),
        params.max_value_size,
        params.max_tx_size,
    );

    tx_builder.set_ttl(current_slot as u32 + TWO_HOURS);

    tx_builder
}

pub fn build_transaction(
    tx_builder: &mut TransactionBuilder,
    coin_selection_output: &CoinSelectionOutput,
    sender_address: &Address,
) -> Result<()> {
    let CoinSelectionOutput {
        selected_utxos,
        outputs,
        ..
    } = coin_selection_output;

    for utxo in selected_utxos {
        tx_builder.add_input(
            sender_address,
            &TransactionInput::new(
                &TransactionHash::from_bytes(hex::decode(utxo.tx_hash.clone())?)?,
                utxo.tx_idx as u32,
            ),
            &utxo.value,
        );
    }

    for output in outputs {
        tx_builder.add_output(output)?;
    }

    Ok(())
}

#[derive(Clone)]
pub struct Submitter {
    submit_url: Url,
    client: Client,
}

impl Submitter {
    pub fn for_url(base_url: &str) -> Self {
        // If a wrong URL was passed in we want it to panic and stop
        let submit_url = Url::parse(base_url)
            .and_then(|url| url.join("/api/submit/tx"))
            .unwrap();

        let mut headers = HeaderMap::new();
        headers.insert("Content-Type", HeaderValue::from_static("application/cbor"));

        let client = reqwest::Client::builder()
            .default_headers(headers)
            .build()
            .unwrap();

        Self { submit_url, client }
    }

    pub async fn submit_tx(&self, tx: &Transaction) -> Result<String> {
        let res = self
            .client
            .post(self.submit_url.as_ref())
            .body(tx.to_bytes())
            .send()
            .await?;

        let text = res.text().await?;

        Ok(text)
    }
}
