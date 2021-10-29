// Wallet that holds NFTs for sale

use crate::marketplace::un_goals::UnGoal;
use crate::{config::Config, decode_private_key, Error, Result};
use cardano_serialization_lib::address::{
    Address, EnterpriseAddress, NetworkInfo, StakeCredential,
};
use cardano_serialization_lib::crypto::{PrivateKey, TransactionHash, Vkeywitness};
use cardano_serialization_lib::metadata::{
    AuxiliaryData, GeneralTransactionMetadata, MetadataList, MetadataMap, TransactionMetadatum,
};
use cardano_serialization_lib::utils::{make_vkey_witness, to_bignum, Int};
use cardano_serialization_lib::{AssetName, PolicyID};
use serde::ser::SerializeStruct;
use serde::{Serialize, Serializer};
use serde_json::Value;
use sqlx::PgPool;
use tokio_stream::StreamExt;

const MARKETPLACE_METADATA_LABEL_KEY: u64 = 888;

pub struct MarketplaceHolder {
    pub address: Address,
    address_bech32: String,
    private_key: PrivateKey,
}

pub struct SellData {
    pub hash: String,
    pub policy_id: PolicyID,
    pub asset_name: AssetName,
    pub sale_metadata: SellMetadata,
    pub asset_metadata: Value,
}

pub struct SellMetadata {
    pub seller_address: Address,
    pub price: u64,
    pub un_goal: UnGoal,
}

impl SellMetadata {
    pub fn try_from_value(value: Value) -> Option<SellMetadata> {
        let seller_address = value
            .get("seller_address")
            .and_then(|v| v.as_array())
            .and_then(|arr| {
                arr.into_iter()
                    .map(|v| v.as_str().map(|s| s.to_string()))
                    .collect::<Option<Vec<String>>>()
            })
            .map(|v| v.join(""))
            .ok_or(Error::Unknown)
            .and_then(|s| Address::from_bech32(&s).map_err(|e| Error::Js(e)));
        let price = value.get("price").and_then(|v| v.as_u64());

        let un_goal = value.get("un_goal").ok_or(Error::Unknown).and_then(|v| {
            serde_json::from_value::<UnGoal>(v.clone()).map_err(|e| Error::JsonDecode(e))
        });

        if let (Ok(seller_address), Some(price), Ok(un_goal)) = (seller_address, price, un_goal) {
            Some(SellMetadata {
                seller_address,
                price,
                un_goal,
            })
        } else {
            None
        }
    }
}

#[derive(sqlx::FromRow)]
struct PgSellData {
    hash: String,
    policy: Vec<u8>,
    name: Vec<u8>,
    sale_json: Value,
    asset_json: Value,
}

#[derive(sqlx::FromRow)]
struct PgSellMetadata {
    sale_json: Value,
}

impl PgSellData {
    fn to_sell_data(self) -> Option<SellData> {
        let policy_id = PolicyID::from_bytes(self.policy);
        let asset_name = String::from_utf8(self.name)
            .map_err(|_| Error::Message("Failed to convert asset name to string".to_string()))
            .and_then(|s| AssetName::new(s.into_bytes()).map_err(|e| Error::Js(e)));
        let sale_metadata = SellMetadata::try_from_value(self.sale_json);

        if let (Ok(policy_id), Ok(asset_name), Some(sale_metadata)) =
            (policy_id, asset_name, sale_metadata)
        {
            Some(SellData {
                hash: self.hash,
                policy_id,
                asset_name,
                sale_metadata,
                asset_metadata: self.asset_json,
            })
        } else {
            None
        }
    }
}

impl Clone for MarketplaceHolder {
    fn clone(&self) -> Self {
        let bytes = self.private_key.as_bytes();
        Self {
            address: self.address.clone(),
            address_bech32: self.address_bech32.clone(),
            private_key: PrivateKey::from_normal_bytes(&bytes).unwrap(),
        }
    }
}

impl MarketplaceHolder {
    pub fn from_config(config: &Config) -> Result<Self> {
        let private_key = decode_private_key(&config.marketplace_private_key_file)?;
        let pub_key_hash = private_key.to_public().hash();
        let network = if config.is_testnet {
            NetworkInfo::testnet().network_id()
        } else {
            NetworkInfo::mainnet().network_id()
        };
        let address =
            EnterpriseAddress::new(network, &StakeCredential::from_keyhash(&pub_key_hash))
                .to_address();
        let address_bech32 = address.to_bech32(None)?;
        Ok(Self {
            address,
            address_bech32,
            private_key,
        })
    }

    pub async fn get_nft_details(
        &self,
        pool: &PgPool,
        policy_id: &PolicyID,
        asset_name: &AssetName,
    ) -> Result<Option<SellMetadata>> {
        let hex_policy = hex::encode(policy_id.to_bytes());
        let asset_name_str = String::from_utf8(asset_name.name())
            .map_err(|_| Error::Message("Cannot convert asset name to string".to_string()))?;
        let pg_sell_metadata: Option<PgSellMetadata> = sqlx::query_as::<_, PgSellMetadata>(
            r#"
                SELECT
                    sale_metadata.json AS sale_json
                FROM tx_out 
                LEFT JOIN tx_in ON tx_out.tx_id = tx_in.tx_out_id AND tx_out.index = tx_in.tx_out_index
                INNER JOIN tx_metadata AS sale_metadata
                ON tx_out.tx_id = sale_metadata.tx_id AND sale_metadata.key = 888
                INNER JOIN ma_tx_out
                ON tx_out.id = ma_tx_out.tx_out_id
                AND tx_in.id IS NULL
                WHERE address = $1
                AND encode(policy, 'hex') = $2
                AND convert_from(name, 'utf-8') = $3
            "#,
        )
        .bind(&self.address_bech32)
        .bind(&hex_policy)
        .bind(&asset_name_str)
        .fetch_optional(pool)
        .await?;

        Ok(pg_sell_metadata
            .and_then(|sell_metadata| SellMetadata::try_from_value(sell_metadata.sale_json)))
    }

    pub async fn get_nfts_for_sale(&self, pool: &PgPool) -> Result<Vec<SellData>> {
        let mut rows = sqlx::query_as::<_, PgSellData>(
            r#"
                SELECT 
				 	encode(tx.hash, 'hex') as hash,
                    ma_tx_out.policy,
                    ma_tx_out.name,
                    sale_metadata.json AS sale_json,
                    asset_metadata.json AS asset_json
                FROM tx_out 
                LEFT JOIN tx_in ON tx_out.tx_id = tx_in.tx_out_id AND tx_out.index = tx_in.tx_out_index
                INNER JOIN tx_metadata AS sale_metadata
                ON tx_out.tx_id = sale_metadata.tx_id AND sale_metadata.key = 888
				INNER JOIN tx
				ON tx_out.tx_id = tx.id
                INNER JOIN ma_tx_out
                ON tx_out.id = ma_tx_out.tx_out_id
				INNER JOIN ma_tx_mint
				ON ma_tx_mint.policy = ma_tx_out.policy AND ma_tx_mint.name = ma_tx_out.name
				INNER JOIN tx_metadata AS asset_metadata
				ON ma_tx_mint.tx_id = asset_metadata.tx_id AND asset_metadata.key = 721
                AND tx_in.id IS NULL
                WHERE address = $1
				ORDER BY tx.id DESC
                "#,
        )
        .bind(&self.address_bech32)
        .fetch(pool);

        let mut sell_datas = vec![];

        while let Some(pg_data) = rows.try_next::<PgSellData, _>().await? {
            let pg_data: PgSellData = pg_data;
            if let Some(sell_data) = pg_data.to_sell_data() {
                sell_datas.push(sell_data);
            }
        }
        Ok(sell_datas)
    }

    pub async fn get_single_nft_for_sale(
        &self,
        pool: &PgPool,
        hash: &str,
    ) -> Result<Option<SellData>> {
        let mut op_pg_sell_data: Option<PgSellData> = sqlx::query_as::<_, PgSellData>(
            r#"
                SELECT 
				 	encode(tx.hash, 'hex') as hash,
                    ma_tx_out.policy,
                    ma_tx_out.name,
                    sale_metadata.json AS sale_json,
                    asset_metadata.json AS asset_json
                FROM tx_out 
                LEFT JOIN tx_in ON tx_out.tx_id = tx_in.tx_out_id AND tx_out.index = tx_in.tx_out_index
                INNER JOIN tx_metadata AS sale_metadata
                ON tx_out.tx_id = sale_metadata.tx_id AND sale_metadata.key = 888
				INNER JOIN tx
				ON tx_out.tx_id = tx.id
                INNER JOIN ma_tx_out
                ON tx_out.id = ma_tx_out.tx_out_id
				INNER JOIN ma_tx_mint
				ON ma_tx_mint.policy = ma_tx_out.policy AND ma_tx_mint.name = ma_tx_out.name
				INNER JOIN tx_metadata AS asset_metadata
				ON ma_tx_mint.tx_id = asset_metadata.tx_id AND asset_metadata.key = 721
                AND tx_in.id IS NULL
                WHERE address = $1
                AND encode(tx.hash, 'hex') = $2
				ORDER BY tx.id DESC
                "#,
        )
            .bind(&self.address_bech32)
            .bind(hash)
            .fetch_optional(pool)
            .await?;

        Ok(op_pg_sell_data.and_then(|sell_data| sell_data.to_sell_data()))
    }

    pub fn sign_transaction_hash(&self, hash: &TransactionHash) -> Vkeywitness {
        make_vkey_witness(hash, &self.private_key)
    }
}

impl Serialize for SellData {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut serialize_struct = serializer.serialize_struct("SellData", 5)?;

        serialize_struct.serialize_field("transactionHash", &self.hash)?;
        serialize_struct.serialize_field("policyId", &hex::encode(self.policy_id.to_bytes()))?;
        serialize_struct.serialize_field(
            "assetName",
            &String::from_utf8(self.asset_name.name())
                .map_err(|_| serde::ser::Error::custom("Failed to serialize asset name"))?,
        )?;
        serialize_struct.serialize_field("saleMetadata", &self.sale_metadata)?;
        serialize_struct.serialize_field("assetMetadata", &self.asset_metadata)?;
        serialize_struct.end()
    }
}

impl Serialize for SellMetadata {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut serialize_struct = serializer.serialize_struct("SellMetadata", 4)?;
        serialize_struct.serialize_field(
            "sellerAddress",
            &self
                .seller_address
                .to_bech32(None)
                .map_err(|_| serde::ser::Error::custom("Failed to serialize seller address"))?,
        )?;
        serialize_struct.serialize_field("price", &self.price)?;
        serialize_struct.serialize_field("unGoal", &self.un_goal)?;
        serialize_struct
            .serialize_field("namiAddress", &hex::encode(&self.seller_address.to_bytes()))?;
        serialize_struct.end()
    }
}

impl SellMetadata {
    pub fn create_sell_nft_metadata(&self) -> Result<AuxiliaryData> {
        let SellMetadata {
            seller_address,
            un_goal,
            price,
        } = self;
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
                &TransactionMetadatum::new_int(&Int::new(&to_bignum(*price))),
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
}
