/**
 * Helper functions to get interact with Nami wallet
 * Only use in browser context
 */

import cbor from 'cbor';
import { useDispatch } from 'react-redux';
import { setWalletInfo } from '../features/wallet/walletSlice';

export type WalletInfo = {
    walletConnected: boolean,
    balance: number,
    address: string, 
}

export const checkIfWalletConnected = async (): Promise<boolean> => {
  const { cardano } = window;
  return cardano && (await cardano.isEnabled());
};

export const storeWalletInfo = async (): Promise<void> => {
  const { cardano } = window;
  const successfulConnection = await checkNamiWallet(cardano);
  if (!successfulConnection) {
    return;
  }

  const balance = await cardano.getBalance();
  const address = (await cardano.getUsedAddresses())[0];

  // Stores wallet info in sessionstorage
  sessionStorage.setItem('isConnected', '1');
  sessionStorage.setItem('balance', cbor.decode(balance));
  sessionStorage.setItem('address', address);

  console.log('Wallet info updated');
};

export const retrieveWalletInfo = async (): Promise<WalletInfo|void> => {
    const { cardano } = window;
    const successfulConnection = await checkNamiWallet(cardano);
    if (!successfulConnection) return;

    const balance = cbor.decode(await cardano.getBalance());
    const address = (await cardano.getUsedAddresses())[0];

    return ({
        walletConnected: true,
        balance: balance,
        address: address,
    });
}

const checkNamiWallet = async (cardano): Promise<boolean> => {
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
