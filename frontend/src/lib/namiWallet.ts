/**
 * Helper functions to get interact with Nami wallet
 * Only use in browser context
 */

import cbor from 'cbor';

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

  // Stores wallet info in sessionstorage
  sessionStorage.setItem('isConnected', '1');
  sessionStorage.setItem('balance', cbor.decode(await cardano.getBalance()));
  sessionStorage.setItem('address', (await cardano.getUsedAddresses())[0]);

  console.log('Wallet info updated');
};

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
