import React, { useEffect } from "react";

import { IonLabel, IonSpinner } from "@ionic/react";

import { initializeWallet, Status } from "../features/wallet/walletSlice";
import { useAppDispatch } from "../hooks";
import useWallet from "../hooks/useWallet";
import { Subscription } from "../wallet";
import WalletInfoPill from "./WalletInfoPill";

const ConnectWalletButton: React.FC = () => {
  const wallet = useWallet();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeWallet());
  }, [dispatch]);

  useEffect(() => {
    let sub1: Subscription;
    let sub2: Subscription;
    if (wallet.status === Status.Enabled) {
      sub1 = wallet.cardano.onAccountChange((_) =>
        dispatch(initializeWallet())
      );

      sub2 = wallet.cardano.onNetworkChange((_) => {
        dispatch(initializeWallet());
      });
    }
    return () => {
      if (sub1) sub1.remove();
      if (sub2) sub2.remove();
    };
  }, [wallet.status, dispatch]);

  if (wallet.status === Status.Loading)
    return (
      <div className="flex h-20 place-items-center">
        <IonSpinner name="crescent" />;
      </div>
    );

  if (wallet.status === Status.NoExtension)
    return (
      <div className="flex h-20 place-items-center">
        <IonLabel>Install the Nami Wallet Extension</IonLabel>
      </div>
    );

  if (wallet.status === Status.Enabled) {
    return <WalletInfoPill {...wallet.state} />;
  }

  return (
    <button
      className="self-end w-48 h-12 m-5 text-white bg-black rounded-full"
      onClick={() =>
        wallet.cardano.enable().then(() => dispatch(initializeWallet()))
      }
    >
      Connect to wallet
    </button>
  );
};
export default ConnectWalletButton;
