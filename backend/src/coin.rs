use cardano_serialization_lib::{
    error::JsError,
    utils::{BigNum, Coin},
    TransactionOutput,
};
use std::{cmp::Reverse, result::Result};

use crate::cli::utxo::Utxo;

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

#[derive(Debug)]
pub struct CoinSelectionInput {
    pub outputs: Vec<TransactionOutput>,
    pub utxos: Vec<Utxo>,
    pub limit: u32,
}

#[derive(Debug)]
pub struct CoinSelectionOutput {
    pub selected_utxos: Vec<Utxo>,
    pub outputs: Vec<TransactionOutput>,
    pub change: Vec<Coin>,
    pub remaining_utxos: Vec<Utxo>,
}

type CoinSelectionResult = Result<CoinSelectionOutput, CoinSelectionFailure>;
pub trait CoinSelector {
    fn select_coins(input: CoinSelectionInput) -> CoinSelectionResult;
}

pub struct LargestFirst;

impl CoinSelector for LargestFirst {
    fn select_coins(
        CoinSelectionInput {
            outputs,
            mut utxos,
            limit,
        }: CoinSelectionInput,
    ) -> CoinSelectionResult {
        use std::cmp::Ordering::*;

        let requested_amount = outputs.iter().fold(Ok(BigNum::zero()), |acc, elem| {
            acc.and_then(|num| num.checked_add(&elem.amount().coin()))
        })?;

        let mut selected_amount = BigNum::zero();
        let mut selected_utxos = vec![];
        let mut remaining_utxos = vec![];

        utxos.sort_by_key(|utxo| Reverse(utxo.value.coin()));
        for utxo in utxos {
            match selected_amount.cmp(&requested_amount) {
                Less => {
                    selected_amount = selected_amount.checked_add(&utxo.value.coin())?;
                    selected_utxos.push(utxo)
                }
                _ => remaining_utxos.push(utxo),
            }
        }

        let single_change = match selected_amount.cmp(&requested_amount) {
            Greater => selected_amount.checked_sub(&requested_amount)?,
            Equal => BigNum::zero(),
            Less => return Err(CoinSelectionFailure::BalanceInsufficient),
        };

        if selected_utxos.len() <= limit as usize {
            Ok(CoinSelectionOutput {
                selected_utxos,
                outputs: outputs,
                change: vec![single_change],
                remaining_utxos,
            })
        } else {
            Err(CoinSelectionFailure::MaximumInputCountExceeded)
        }
    }
}
