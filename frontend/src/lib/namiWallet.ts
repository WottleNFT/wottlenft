/**
 * Helper functions to get interact with Nami wallet
 * Only use in browser context
 */

import cbor from 'cbor';

import { NamiWallet } from '../wallet';

export type WalletInfo = {
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
  const balance = cbor.decode(await wallet.getBalance());
  const address = (await wallet.getUsedAddresses())[0];

  return {
    walletConnected: true,
    balance,
    address,
  };
};

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
