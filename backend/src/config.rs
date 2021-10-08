use envconfig::Envconfig;

#[derive(Envconfig, Debug, Clone)]
pub struct Config {
    #[envconfig(from = "IS_TESTNET")]
    pub is_testnet: bool,

    #[envconfig(from = "TESTNET_MAGIC", default = "1097911063")]
    pub testnet_magic: String,

    #[envconfig(from = "CARDANO_CLI_PATH")]
    pub cli_path: String,

    #[envconfig(from = "CARDANO_NODE_SOCKET_PATH")]
    pub node_socket_path: String,

    #[envconfig(from = "SUBMIT_API_BASE_URL")]
    pub submit_api_base_url: String,

    #[envconfig(from = "NFT_POLICY_VERIFICATION_KEY_PATH")]
    pub nft_verification_key_path: String,

    #[envconfig(from = "NFT_POLICY_SIGNING_KEY_PATH")]
    pub nft_signing_key_path: String,

    #[envconfig(from = "PORT")]
    pub port: u32,
}
