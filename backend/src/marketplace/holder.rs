// Wallet that holds NFTs for sale

use crate::{cardano_db_sync::query_user_address_utxo, config::Config, decode_private_key, Result};
use cardano_serialization_lib::address::{
    Address, EnterpriseAddress, NetworkInfo, StakeCredential,
};
use cardano_serialization_lib::crypto::{PrivateKey, TransactionHash, Vkeywitness};
use cardano_serialization_lib::utils::{make_vkey_witness, TransactionUnspentOutput};
use cardano_serialization_lib::{AssetName, PolicyID};
use sqlx::PgPool;

pub struct MarketplaceHolder {
    pub address: Address,
    private_key: PrivateKey,
}

impl Clone for MarketplaceHolder {
    fn clone(&self) -> Self {
        let bytes = self.private_key.as_bytes();
        Self {
            address: self.address.clone(),
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

        Ok(Self {
            address,
            private_key,
        })
    }

    pub async fn get_utxos(&self, pool: &PgPool) -> Result<Vec<TransactionUnspentOutput>> {
        query_user_address_utxo(pool, &self.address).await
    }

    pub fn sign_transaction_hash(&self, hash: &TransactionHash) -> Vkeywitness {
        make_vkey_witness(hash, &self.private_key)
    }
}
