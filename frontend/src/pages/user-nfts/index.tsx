import React, { useEffect, useState } from "react";

import { IonContent } from "@ionic/react";

import NftList from "../../Components/UserNfts/NftList";
import { Status } from "../../features/wallet/walletSlice";
import useWallet from "../../hooks/useWallet";
import { Meta } from "../../layout/Meta";
import { Main } from "../../templates/Main";
import { UTxO } from "../../types/UTxO";

const UserNfts = () => {
  const wallet = useWallet();
  const [utxos, setUtxos] = useState<UTxO[]>([]);

  useEffect(() => {
    const fetchUtxos = async () => {
      if (wallet.status !== Status.Enabled) {
        return;
      }
      const { state } = wallet;
      const { backendApi, address } = state;
      fetch(`${backendApi}/address/${address}/utxo`)
        .then((res) => res.json())
        .then((data) => {
          setUtxos(data);
        })
        .catch((_) => {
          // console.error(err);
        });
    };
    fetchUtxos();
  }, [wallet]);

  function getNfts() {
    const nfts = utxos
      .map((utxo) => utxo.assets)
      .filter((assets) => assets.length > 0)
      .reduce((assets1, assets2) => assets1.concat(assets2), []);
    return nfts;
  }
  return (
    <Main meta={<Meta title="Wottlenft" description="Cardano NFT Minter" />}>
      <IonContent>
        {wallet.status !== Status.Enabled ? (
          <p className="w-full p-4 font-mono text-2xl text-center">
            {wallet.status !== Status.Loading
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
