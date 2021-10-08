/**
 * Helper functions to get interact with Nami wallet
 * Only use in browser context
 */

import cbor from 'cbor';

import { NamiWallet } from '../wallet';

export type WalletInfo = {
  network: number;
  walletConnected: boolean;
  balance: number;
  address: string;
};

export const checkIfWalletConnected = async (): Promise<boolean> => {
  const { cardano } = window;
  return cardano !== undefined && (await cardano.isEnabled());
};

export const storeWalletInfo = async (): Promise<void> => {
  const { cardano } = window;
  const successfulConnection = await checkNamiWallet(cardano);
  if (!successfulConnection) {
    return;
  }
  const wallet = cardano as NamiWallet;
  const balance = await wallet.getBalance();
  const address = (await wallet.getUsedAddresses())[0];

  // Stores wallet info in sessionstorage
  sessionStorage.setItem('isConnected', '1');
  sessionStorage.setItem('balance', cbor.decode(balance));
  sessionStorage.setItem('address', address);

  console.log('Wallet info updated');
};

export const retrieveWalletInfo = async (): Promise<WalletInfo | undefined> => {
  const { cardano } = window;
  const successfulConnection = await checkNamiWallet(cardano);
  if (!successfulConnection) return undefined;

  const wallet = cardano as NamiWallet;
  const network = await wallet.getNetworkId();
  const balance = cbor.decode(await wallet.getBalance());
  const address = (await wallet.getUsedAddresses())[0];

  return {
    network: network,
    walletConnected: true,
    balance,
    address,
  };
};

// Gets backend API depending on whether network is testnet or mainnet
export const getBackendWalletAPI = (walletInfo: WalletInfo) => {
  if (walletInfo.network) {
    return process.env.mainnetApi;
  } else {
    return process.env.testnetApi;
  }
}

const checkNamiWallet = async (
  cardano: NamiWallet | undefined
): Promise<boolean> => {
  if (!cardano) {
    console.error('No cardano provider found');
    return false;
  }
  const enabled = await cardano.isEnabled();
  if (!enabled) {
    console.error('Wallet not connected');
    return false;
  }
  return true;
};
