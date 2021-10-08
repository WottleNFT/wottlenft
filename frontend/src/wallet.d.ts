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

interface NamiWallet {
  enable(): Promise<void>;
  isEnabled(): Promise<boolean>;
  getBalance(): Promise<HexCborString>;
  getUtxos(amount?: HexCborString, paginate?: Paginate): Promise<HexCborString>;
  getUsedAddresses(): Promise<[HexCborString]>;
  getChangeAddress(): Promise<HexCborString>;
  signTx(tx: HexCborString, partialSign?: boolean): Promise<HexCborString>;
  submitTx(tx: HexCborString): Promise<string>;
  getNetworkId(): Promise<number>;
}
