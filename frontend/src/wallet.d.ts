export declare global {
  interface Window {
    cardano: NamiWallet | undefined;
  }
}

type HexCborString = string;

type Paginate = {
  page: number;
  limit: number;
};

type Subscription = {
  remove: () => void;
};

type Testnet = 0;
type Mainnet = 1;
type Network = Testnet | Mainnet;

interface NamiWallet {
  enable(): Promise<void>;
  isEnabled(): Promise<boolean>;
  getBalance(): Promise<HexCborString>;
  getUtxos(amount?: HexCborString, paginate?: Paginate): Promise<HexCborString>;
  getUsedAddresses(): Promise<[HexCborString]>;
  getChangeAddress(): Promise<HexCborString>;
  signTx(tx: HexCborString, partialSign?: boolean): Promise<HexCborString>;
  submitTx(tx: HexCborString): Promise<string>;
  getNetworkId(): Promise<Network>;
  onAccountChange(): (addresses: [HexCborString]) => void;
  onNetworkChange(): (network: Network) => void;
}
