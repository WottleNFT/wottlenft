use std::process::{Command, Output};

use cardano_serialization_lib::address::Address;

use crate::cli::utxo::transform_utxo_output;
use crate::config::Config;
use crate::error::Error;
use crate::Result;

use super::protocol::{BlockInformation, ProtocolParams};
use cardano_serialization_lib::utils::TransactionUnspentOutput;

struct CliArgumentBuilder {
    testnet_magic: Option<String>,
    command: Command,
}

impl CliArgumentBuilder {
    fn new(
        binary_path: &str,
        is_testnet: bool,
        testnet_magic: &str,
        node_socket_path: &str,
    ) -> Self {
        let testnet_magic = if is_testnet {
            Some(testnet_magic.to_string())
        } else {
            None
        };

        let mut command = Command::new(binary_path);
        command.env("CARDANO_NODE_SOCKET_PATH", node_socket_path);

        Self {
            testnet_magic,
            command,
        }
    }

    fn query(mut self) -> Self {
        self.command.arg("query");
        self
    }

    fn utxo(mut self) -> Self {
        self.command.arg("utxo");
        self
    }

    fn protocol_parameters(mut self) -> Self {
        self.command.arg("protocol-parameters");
        self
    }

    fn tip(mut self) -> Self {
        self.command.arg("tip");
        self
    }

    fn address(mut self, address: &str) -> Self {
        self.command.args(["--address", address]);
        self
    }

    fn build(mut self) -> Command {
        match self.testnet_magic {
            Some(magic) => self.command.args(["--testnet-magic", &magic]),
            None => self.command.arg("--mainnet"),
        };

        self.command
    }
}

#[derive(Clone)]
pub struct CardanoCli {
    config: Config,
}

impl CardanoCli {
    pub fn from_config(config: &Config) -> CardanoCli {
        CardanoCli {
            config: config.clone(),
        }
    }

    fn builder(&self) -> CliArgumentBuilder {
        let Config {
            cli_path,
            is_testnet,
            testnet_magic,
            node_socket_path,
            ..
        } = &self.config;
        CliArgumentBuilder::new(cli_path, *is_testnet, testnet_magic, node_socket_path)
    }

    fn wrap_cmd_output(output: Output) -> Result<String> {
        if output.status.success() {
            Ok(String::from_utf8(output.stdout).map_err(|err| Error::Message(err.to_string()))?)
        } else {
            Err(Error::Message(
                String::from_utf8_lossy(&output.stderr).into_owned(),
            ))
        }
    }

    pub fn query_utxo(&self, addr: &Address) -> Result<Vec<TransactionUnspentOutput>> {
        let mut cmd = self
            .builder()
            .query()
            .utxo()
            .address(&addr.to_bech32(None)?)
            .build();
        let query_output = Self::wrap_cmd_output(cmd.output()?)?;

        query_output
            .lines()
            .skip(2)
            .map(|line| line.split_whitespace())
            .map(|s| transform_utxo_output(s, addr))
            .collect()
    }

    pub fn query_parameters(&self) -> Result<ProtocolParams> {
        let mut cmd = self.builder().query().protocol_parameters().build();
        let query_output = Self::wrap_cmd_output(cmd.output()?)?;

        Ok(serde_json::from_str(&query_output)?)
    }

    pub fn query_block_information(&self) -> Result<BlockInformation> {
        let mut cmd = self.builder().query().tip().build();
        let query_output = Self::wrap_cmd_output(cmd.output()?)?;

        Ok(serde_json::from_str(&query_output)?)
    }
}
