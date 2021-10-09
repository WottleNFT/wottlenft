import React, { useEffect, useState } from "react";

import { IonLabel } from "@ionic/react";

import ConnectWalletButton from "../../Components/ConnectWalletButton";
import NftList from "../../Components/UserNfts/NftList";
import WalletInfoPill from "../../Components/WalletInfoPill";
import {
  getBackendWalletAPI,
  retrieveWalletInfo,
  WalletInfo,
} from "../../lib/namiWallet";
import { UTxO } from "../../types/UTxO";
import { NamiWallet } from "../../wallet";

const UserNfts = () => {
  const [walletStatusReady, setWalletStatusReady] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | void>();
  const [utxos, setUtxos] = useState<UTxO[]>([]);

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
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.results) {
            setUtxos(data.results);
            console.log(data.results);
          }
        })
        .catch((err) => {
          console.error(err);
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
      {!walletInfo ? (
        <IonLabel>Please Connect Nami Wallet First!</IonLabel>
      ) : (
        <NftList
          nfts={utxos
            .map((utxo) => utxo.assets)
            .filter((assets) => assets.length > 0)
            .reduce((a, b) => a.concat(b), [])}
        />
      )}
    </div>
  );
};
export default UserNfts;
