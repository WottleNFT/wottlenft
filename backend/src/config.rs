use envconfig::Envconfig;

#[derive(Envconfig, Debug, Clone)]
pub struct Config {
    #[envconfig(from = "IS_TESTNET")]
    pub is_testnet: bool,

    #[envconfig(from = "SUBMIT_API_BASE_URL")]
    pub submit_api_base_url: String,

    #[envconfig(from = "NFT_POLICY_VERIFICATION_KEY_PATH")]
    pub nft_verification_key_path: String,

    #[envconfig(from = "NFT_POLICY_SIGNING_KEY_PATH")]
    pub nft_signing_key_path: String,

    #[envconfig(from = "PORT")]
    pub port: u32,

    #[envconfig(from = "NFT_BECH32_TAXATION_ADDRESS")]
    pub nft_bech32_tax_address: String,

    #[envconfig(from = "DATABASE_URL")]
    pub database_url: String,
}
