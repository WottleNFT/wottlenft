use crate::coin::TransactionWitnessSetParams;
use crate::marketplace::holder::MarketplaceHolder;
use crate::marketplace::un_goals::UnGoal;
use crate::{
    cardano_db_sync::{get_protocol_params, get_slot_number, query_user_address_utxo},
    coin::build_transaction_body,
    Error, Result,
};
use cardano_serialization_lib::address::Address;
use cardano_serialization_lib::metadata::{
    AuxiliaryData, GeneralTransactionMetadata, MetadataList, MetadataMap, TransactionMetadatum,
};
use cardano_serialization_lib::utils::{to_bignum, Int, TransactionUnspentOutput, Value};
use cardano_serialization_lib::{
    AssetName, Assets, MultiAsset, PolicyID, Transaction, TransactionOutput, TransactionWitnessSet,
};
use sqlx::PgPool;

pub mod holder;
pub mod un_goals;

const ONE_HOUR: u32 = 3600;
const MARKETPLACE_METADATA_LABEL_KEY: u64 = 888;

#[derive(Clone)]
pub struct Marketplace {
    pub(crate) holder: MarketplaceHolder,
}

pub struct SellMetadata {
    pub seller_address: Address,
    pub price: u64,
    pub un_goal: UnGoal,
}

impl Marketplace {
    pub async fn sell(
        &self,
        seller_address: &Address,
        policy_id: PolicyID,
        asset_name: AssetName,
        un_goal: UnGoal,
        price: u64,
        pool: &PgPool,
    ) -> Result<Transaction> {
        let seller_utxos = query_user_address_utxo(pool, seller_address).await?;
        let (nft_utxo, seller_utxos) = find_nft(seller_utxos, &policy_id, &asset_name);
        if nft_utxo.is_none() {
            return Err(Error::Message("NFT not found in user's UTxOs".to_string()));
        }

        let nft_utxo = nft_utxo.unwrap();

        let slot = get_slot_number(pool).await?;
        let protocol_params = get_protocol_params(pool).await?;
        let tx_witness_params = TransactionWitnessSetParams {
            vkey_count: 1,
            ..Default::default()
        };
        let mut nft_value = create_value_with_single_nft(&policy_id, &asset_name);
        nft_value.set_coin(&to_bignum(2_000_000));
        let mut outputs = vec![TransactionOutput::new(&self.holder.address, &nft_value)];
        if nft_utxo.output().amount().multiasset().unwrap().len() > 1 {
            // More assets attached to the NFT UTxO, need to create an output to return these assets
            let mut value = nft_utxo.output().amount();
            let ma = value
                .multiasset()
                .unwrap()
                .sub(&nft_value.multiasset().unwrap());
            value.set_multiasset(&ma);
            outputs.push(TransactionOutput::new(&seller_address, &value));
        }
        let seller_metadata = SellMetadata {
            seller_address: seller_address.clone(),
            price,
            un_goal,
        };
        let auxiliary_data = Some(create_sell_nft_metadata(seller_metadata)?);
        let tx_body = build_transaction_body(
            seller_utxos,
            vec![nft_utxo.clone()],
            outputs,
            slot + ONE_HOUR,
            &protocol_params,
            None,
            None,
            &tx_witness_params,
            auxiliary_data.clone(),
        )?;

        Ok(Transaction::new(
            &tx_body,
            &TransactionWitnessSet::new(),
            auxiliary_data,
        ))
    }
}

fn create_sell_nft_metadata(sell_metadata: SellMetadata) -> Result<AuxiliaryData> {
    let SellMetadata {
        seller_address,
        un_goal,
        price,
    } = sell_metadata;
    let un_goal_serialized = serde_json::to_value(&un_goal)?
        .as_str()
        .unwrap()
        .to_string();
    let mut auxiliary_data = AuxiliaryData::new();
    let mut general_tx_data = GeneralTransactionMetadata::new();

    let tx_metadata = TransactionMetadatum::new_map(&{
        let mut map = MetadataMap::new();
        map.insert_str(
            "price",
            &TransactionMetadatum::new_int(&Int::new(&to_bignum(price))),
        )?;
        map.insert_str(
            "un_goal",
            &TransactionMetadatum::new_text(un_goal_serialized)?,
        )?;

        let addr_string = seller_address.to_bech32(None)?;
        let addr_string_list: Vec<String> = addr_string
            .chars()
            .collect::<Vec<char>>()
            .chunks(64)
            .map(|c| c.iter().collect::<String>())
            .collect();
        let mut addr_list = MetadataList::new();

        for s in addr_string_list {
            addr_list.add(&TransactionMetadatum::new_text(s)?);
        }

        map.insert_str(
            "seller_address",
            &TransactionMetadatum::new_list(&addr_list),
        )?;
        map
    });

    general_tx_data.insert(&to_bignum(MARKETPLACE_METADATA_LABEL_KEY), &tx_metadata);
    auxiliary_data.set_metadata(&general_tx_data);
    Ok(auxiliary_data)
}

fn create_value_with_single_nft(policy_id: &PolicyID, asset_name: &AssetName) -> Value {
    let mut value = Value::new(&to_bignum(0));
    value.set_multiasset(&{
        let mut ma = MultiAsset::new();
        ma.insert(policy_id, &{
            let mut assets = Assets::new();
            assets.insert(asset_name, &to_bignum(1));
            assets
        });
        ma
    });
    value
}

pub fn find_nft(
    utxos: Vec<TransactionUnspentOutput>,
    policy_id: &PolicyID,
    asset_name: &AssetName,
) -> (
    Option<TransactionUnspentOutput>,
    Vec<TransactionUnspentOutput>,
) {
    let mut remaining_utxos = Vec::with_capacity(utxos.len());
    let mut nft_utxo = None;

    for utxo in utxos {
        if utxo
            .output()
            .amount()
            .multiasset()
            .and_then(|ma| ma.get(policy_id))
            .and_then(|assets| assets.get(asset_name))
            .is_some()
        {
            nft_utxo = Some(utxo);
        } else {
            remaining_utxos.push(utxo);
        }
    }

    (nft_utxo, remaining_utxos)
}
