import React from "react";

import { IonLabel } from "@ionic/react";

import { initializeWallet, Status } from "../features/wallet/walletSlice";
import { useAppDispatch } from "../hooks";
import useWallet from "../hooks/useWallet";
import WalletInfoPill from "./WalletInfoPill";

const ConnectWalletButton: React.FC = () => {
  const wallet = useWallet();
  const dispatch = useAppDispatch();

  if (wallet.status === Status.Loading)
    return (
      <div className="flex h-20 place-items-center">
        <IonLabel>Loading...</IonLabel>
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
