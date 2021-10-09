import React from "react";

import { IonLabel, IonSpinner } from "@ionic/react";
import Image from "next/image";

import wottleLogo from "../../public/assets/Logo.png";
import { Status } from "../features/wallet/walletSlice";
import useWallet from "../hooks/useWallet";
import ConnectWalletButton from "./ConnectWalletButton";
import WalletInfoPill from "./WalletInfoPill";

const NavBar: React.FC = () => {
  return (
    <div className="flex justify-between w-full">
      <Image alt="wottlelogo" src={wottleLogo} />
      <WalletInformation />
    </div>
  );
};

const WalletInformation = () => {
  const wallet = useWallet();

  if (wallet.status === Status.Loading)
    return (
      <div className="flex h-20 place-items-center">
        <IonSpinner name="crescent" className="w-48 h-16" />
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

  return <ConnectWalletButton />;
};

export default NavBar;
