use crate::{config::Config, Result};
use cardano_serialization_lib::address::{Address, BaseAddress, NetworkInfo};
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Clone)]
pub struct MarketplaceAddresses {
    revenue: Address,
}

impl MarketplaceAddresses {
    pub fn from_config(config: &Config) -> Result<Self> {
        let mut revenue = Address::from_bech32(&config.marketplace_revenue_address)?;

        if config.is_testnet {
            revenue = Self::convert_to_testnet(revenue);
        }

        Ok(Self { revenue })
    }

    pub fn get_revenue_address(&self) -> &Address {
        &self.revenue
    }

    fn convert_to_testnet(address: Address) -> Address {
        let base_addr = BaseAddress::from_address(&address).unwrap();
        return BaseAddress::new(
            NetworkInfo::testnet().network_id(),
            &base_addr.payment_cred(),
            &base_addr.stake_cred(),
        )
        .to_address();
    }
}
