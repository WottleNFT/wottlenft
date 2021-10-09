import React, { useEffect, useState } from "react";

import { IonContent } from "@ionic/react";

import NftList from "../../Components/UserNfts/NftList";
import { Meta } from "../../layout/Meta";
import {
  getBackendWalletAPI,
  retrieveWalletInfo,
  WalletInfo,
} from "../../lib/namiWallet";
import { Main } from "../../templates/Main";
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
          setUtxos(data);
        })
        .catch((_) => {
          // console.error(err);
        });
    };
    fetchUtxos();
  }, [walletInfo]);

  function getNfts() {
    const nfts = utxos
      .map((utxo) => utxo.assets)
      .filter((assets) => assets.length > 0)
      .reduce((assets1, assets2) => assets1.concat(assets2), []);
    return nfts;
  }
  return (
    <Main
      meta={
        <Meta
          title="Wottlenft"
          description="Wottlenft is your next NFT auction site."
        />
      }
    >
      <IonContent>
        {!walletInfo ? (
          <p className="w-full text-center text-2xl font-mono p-4">
            {walletStatusReady
              ? "Please Connect Nami Wallet First!"
              : "Loading Your Wallet..."}
          </p>
        ) : (
          <NftList nfts={getNfts()} />
        )}
      </IonContent>
    </Main>
  );
};
export default UserNfts;
