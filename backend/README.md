# Backend

## Requirements

1. cardano-cli
2. cardano-node
3. cardano-submit-api
4. Rust
5. Cargo

Make sure cardano-node is running along with cardano-submit-api.

## Environment Variables

Refer to `config.rs`

```rs
pub struct Config {
    #[envconfig(from = "TESTNET")]
    pub is_testnet: bool,

    #[envconfig(from = "TESTNET_MAGIC", default = "1097911063")]
    pub testnet_magic: String,

    #[envconfig(from = "CARDANO_CLI_PATH")]
    pub cli_path: String,

    #[envconfig(from = "CARDANO_NODE_SOCKET_PATH")]
    pub node_socket_path: String,

    #[envconfig(from = "SUBMIT_API_BASE_URL")]
    pub submit_api_base_url: String,

    #[envconfig(from = "NFT_POLICY_VERIFICATION_KEY")]
    pub nft_verification_key: String,

    #[envconfig(from = "NFT_POLICY_SIGNING_KEY")]
    pub nft_signing_key: String,
}

```

## Running

```bash
cargo run
```