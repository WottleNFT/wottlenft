use cardano_serialization_lib::{
    error::JsError,
    utils::{BigNum, Coin},
    Mint, NativeScripts, Transaction, TransactionBody, TransactionOutput, TransactionWitnessSet,
};

use crate::cli::protocol::ProtocolParams;
use crate::Result;
use cardano_serialization_lib::crypto::{
    BootstrapWitnesses, PrivateKey, TransactionHash, Vkeywitnesses,
};
use cardano_serialization_lib::fees::{min_fee, LinearFee};
use cardano_serialization_lib::metadata::AuxiliaryData;
use cardano_serialization_lib::plutus::{PlutusList, PlutusScripts, Redeemers};
use cardano_serialization_lib::tx_builder::TransactionBuilder;
use cardano_serialization_lib::utils::{
    hash_transaction, make_vkey_witness, min_ada_required, to_bignum, TransactionUnspentOutput,
    Value,
};

lazy_static! {
    static ref PRIVATE_KEY: PrivateKey = PrivateKey::generate_ed25519().unwrap();
}

const MAX_TRIES: usize = 10;

#[derive(Debug, thiserror::Error)]
pub enum CoinSelectionFailure {
    #[error("Total value of initial UTxO set is less than total value of requested output")]
    BalanceInsufficient,

    #[error("Number of entries in initial UTxO set is smaller than number of entries in requested output set")]
    NotFragmentedEnough,

    #[error("Number of entries are depleted before ideal selection can be made")]
    FullyDepleted,

    #[error("Maximum input count limit exceeded")]
    MaximumInputCountExceeded,

    #[error("{}", 0)]
    Other(String),
}

impl From<JsError> for CoinSelectionFailure {
    fn from(e: JsError) -> Self {
        Self::Other(e.to_string())
    }
}

pub struct TransactionWitnessSetParams<'a> {
    pub vkey_count: u32,
    pub native_scripts: Option<&'a NativeScripts>,
    pub bootstraps: Option<&'a BootstrapWitnesses>,
    pub plutus_scripts: Option<&'a PlutusScripts>,
    pub plutus_data: Option<&'a PlutusList>,
    pub redeemers: Option<&'a Redeemers>,
}

impl<'a> Default for TransactionWitnessSetParams<'a> {
    fn default() -> Self {
        Self {
            vkey_count: 1,
            native_scripts: None,
            bootstraps: None,
            plutus_scripts: None,
            plutus_data: None,
            redeemers: None,
        }
    }
}

pub fn create_n_vkey_witnesses(n: u32, hash: &TransactionHash) -> Vkeywitnesses {
    let mut vkey_witnesses = Vkeywitnesses::new();
    for _ in 0..n {
        vkey_witnesses.add(&make_vkey_witness(hash, &PRIVATE_KEY));
    }
    vkey_witnesses
}

fn create_dummy_tx_witness_set(
    params: &TransactionWitnessSetParams,
    hash: &TransactionHash,
) -> TransactionWitnessSet {
    let mut tx_witness_set = TransactionWitnessSet::new();
    let vkey_witnesses = create_n_vkey_witnesses(params.vkey_count, hash);
    tx_witness_set.set_vkeys(&vkey_witnesses);

    if let Some(native_scripts) = params.native_scripts {
        tx_witness_set.set_native_scripts(native_scripts);
    }

    if let Some(bootstraps) = params.bootstraps {
        tx_witness_set.set_bootstraps(bootstraps);
    }

    if let Some(plutus_scripts) = params.plutus_scripts {
        tx_witness_set.set_plutus_scripts(plutus_scripts);
    }

    if let Some(plutus_data) = params.plutus_data {
        tx_witness_set.set_plutus_data(plutus_data);
    }

    if let Some(redeemers) = params.redeemers {
        tx_witness_set.set_redeemers(redeemers);
    }

    tx_witness_set
}

pub fn calculate_maximum_fees(protocol_params: &ProtocolParams) -> Coin {
    to_bignum(
        protocol_params.tx_fee_fixed
            + protocol_params.max_tx_size as u64 * protocol_params.tx_fee_per_byte,
    )
}

pub fn build_transaction_body(
    utxos: Vec<TransactionUnspentOutput>,
    outputs: Vec<TransactionOutput>,
    ttl: u32,
    protocol_params: &ProtocolParams,
    fees: Option<Coin>,
    mint: Option<Mint>,
    witness_params: &TransactionWitnessSetParams,
    auxiliary_data: Option<AuxiliaryData>,
) -> Result<TransactionBody> {
    let mut fees = fees.unwrap_or_else(|| calculate_maximum_fees(protocol_params));

    for _ in 0..MAX_TRIES {
        let mut tx_builder = largest_first_coin_selection(
            outputs.clone(),
            utxos.clone(),
            fees,
            protocol_params,
            ttl,
        )?;

        if let Some(aux_data) = &auxiliary_data {
            tx_builder.set_auxiliary_data(aux_data);
        }

        let mut tx_body = tx_builder.build()?;

        if let Some(m) = &mint {
            tx_body.set_mint(m);
        }

        let witness_set = create_dummy_tx_witness_set(witness_params, &hash_transaction(&tx_body));
        let tx = Transaction::new(&tx_body, &witness_set, auxiliary_data.clone());

        let calculated_fees = min_fee(
            &tx,
            &calc_linear_fee(
                protocol_params.tx_fee_per_byte,
                protocol_params.tx_fee_fixed,
            ),
        )?;

        if calculated_fees.eq(&fees) {
            return Ok(tx_body);
        }

        fees = calculated_fees
    }

    Err(CoinSelectionFailure::BalanceInsufficient.into())
}

fn largest_first_coin_selection(
    outputs: Vec<TransactionOutput>,
    mut utxos: Vec<TransactionUnspentOutput>,
    fees: Coin,
    params: &ProtocolParams,
    ttl: u32,
) -> Result<TransactionBuilder> {
    let min_utxo_value = to_bignum(params.min_utxo_value);
    utxos.sort_by_key(|utxo| utxo.output().amount().coin());

    let (outputs, total_output_amount) = calculate_output_amount(outputs, fees, &min_utxo_value)?;

    let mut tx_builder = start_transaction(params, ttl);
    tx_builder.set_fee(&fees);
    outputs.iter().try_for_each(|o| tx_builder.add_output(o))?;

    let mut selected_amount = BigNum::zero();

    while let Some(utxo) = utxos.pop() {
        let amt = utxo.output().amount();
        if amt.multiasset().is_some() {
            // Has asset so we leave a minimum amount inside to preserve the assets
            let min_amount = min_ada_required(&amt, &min_utxo_value);
            let extracted_amount = amt
                .coin()
                .checked_sub(&min_amount)
                .map_err(|_| CoinSelectionFailure::BalanceInsufficient)?;

            tx_builder.add_output(&set_output_lovelace(&utxo.output(), &min_amount))?;
            selected_amount = selected_amount.checked_add(&extracted_amount)?;
        } else {
            // We consume this input
            selected_amount = selected_amount.checked_add(&amt.coin())?;
        }
        tx_builder.add_input(
            &utxo.output().address(),
            &utxo.input(),
            &utxo.output().amount(),
        );

        if selected_amount.ge(&total_output_amount) {
            let change_amount = min_ada_required(&Value::new(&min_utxo_value), &min_utxo_value);
            if selected_amount
                .checked_sub(&total_output_amount)?
                .lt(&change_amount)
            {
                continue;
            }
            let change_value = Value::new(&selected_amount.checked_sub(&total_output_amount)?);
            let change_output = TransactionOutput::new(&utxo.output().address(), &change_value);
            tx_builder.add_output(&change_output)?;
            return Ok(tx_builder);
        }
    }

    Err(CoinSelectionFailure::BalanceInsufficient.into())
}

fn calc_linear_fee(tx_fee_per_byte: u64, tx_fee_fixed: u64) -> LinearFee {
    LinearFee::new(&to_bignum(tx_fee_per_byte), &to_bignum(tx_fee_fixed))
}

fn start_transaction(params: &ProtocolParams, ttl: u32) -> TransactionBuilder {
    let mut tx_builder = TransactionBuilder::new(
        &calc_linear_fee(params.tx_fee_per_byte, params.tx_fee_fixed),
        &to_bignum(params.min_utxo_value),
        &to_bignum(params.stake_pool_deposit),
        &to_bignum(params.stake_address_deposit),
        params.max_value_size,
        params.max_tx_size,
    );

    tx_builder.set_ttl(ttl);
    tx_builder
}

fn calculate_output_amount(
    outputs: Vec<TransactionOutput>,
    fees: Coin,
    min_utxo_value: &BigNum,
) -> Result<(Vec<TransactionOutput>, Coin)> {
    let mut total = fees;

    let mut new_outputs = Vec::with_capacity(outputs.len());
    for output in outputs {
        let amount = output.amount();
        let min_lovelace = min_ada_required(&amount, min_utxo_value);
        if amount.coin().lt(&min_lovelace) {
            total = total.checked_add(&min_lovelace)?;
            new_outputs.push(set_output_lovelace(&output, &min_lovelace));
        } else {
            total = total.checked_add(&amount.coin())?;
            new_outputs.push(output);
        }
    }

    Ok((new_outputs, total))
}

fn set_output_lovelace(output: &TransactionOutput, new_lovelace: &Coin) -> TransactionOutput {
    let data_hash = output.data_hash();
    let mut new_amount = output.amount();
    new_amount.set_coin(new_lovelace);

    let mut new_output = TransactionOutput::new(&output.address(), &new_amount);
    if let Some(data) = data_hash {
        new_output.set_data_hash(&data);
    }

    new_output
}
