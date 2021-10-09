import React, { useEffect, useState } from "react";

import ConnectWalletButton from "../../Components/ConnectWalletButton";
import WalletInfoPill from "../../Components/WalletInfoPill";
import {
  getBackendWalletAPI,
  retrieveWalletInfo,
  WalletInfo,
} from "../../lib/namiWallet";
import { NamiWallet } from "../../wallet";

const UserNfts = () => {
  const [walletStatusReady, setWalletStatusReady] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | void>();

  useEffect(() => {
    const getWalletInfo = async () => {
      const info = await retrieveWalletInfo();
      setWalletInfo(info);
      setWalletStatusReady(true);
    };
    getWalletInfo();
  }, []);

  useEffect(() => {
    const fetchUtxos = async () => {
      if (!walletInfo) {
        return;
      }
      const cardano = window.cardano as NamiWallet;
      fetch(
        `${getBackendWalletAPI(
          walletInfo as WalletInfo
        )}/address/${await cardano.getChangeAddress()}/utxo`
      ).then((res) => {
        console.log(res);
      });
    };
    fetchUtxos();
  }, [walletInfo]);

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-primary-default">
      {(() => {
        if (!walletStatusReady) {
          return "Loading...";
        }
        return walletInfo ? (
          <WalletInfoPill
            network={walletInfo.network}
            balance={walletInfo.balance}
            address={walletInfo.address}
          />
        ) : (
          <ConnectWalletButton />
        );
      })()}
      {/* { (!walletInfo) 
      ? <IonLabel>Please Connect Nami Wallet First!</IonLabel>
      : } */}
    </div>
  );
};
export default UserNfts;
