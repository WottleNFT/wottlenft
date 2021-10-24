import React from "react";

import { IonButton } from "@ionic/react";

import { useGetUserNftsQuery } from "../app/nft";
import { Status } from "../features/wallet/walletSlice";
import useWallet from "../hooks/useWallet";
import { sellNft, SellNftRequest, UnGoal } from "../lib/marketplaceApi";
import { signTransaction } from "../lib/transactionApi";
import { Nft } from "../types/Nft";
import { NamiWallet } from "../wallet";

const Example = () => {
  const wallet = useWallet();

  if (wallet.status !== Status.Enabled) {
    return <div></div>;
  }

  return (
    <Helper
      address={wallet.state.address}
      url={wallet.state.backendApi}
      cardano={wallet.cardano}
    />
  );
};

export default Example;

const Helper = ({
  url,
  address,
  cardano,
}: {
  url: string;
  address: string;
  cardano: NamiWallet;
}) => {
  const { data, error, isLoading } = useGetUserNftsQuery({
    url,
    address,
  });
  const sell = async (nft: Nft) => {
    const request: SellNftRequest = {
      sellerAddress: address,
      policyId: nft.policyId,
      assetName: nft.assetName,
      unGoal: UnGoal.ZeroHunger,
      price: 5000000,
    };
    const { transaction } = await sellNft(url, request);
    const signature = await cardano.signTx(transaction);
    const signResponse = await signTransaction(url, transaction, signature);
    console.log(signResponse);
  };
  console.log(address);
  if (error || isLoading || !data) return <div>Loading</div>;
  return (
    <>
      {data.map((nft) => (
        <div key={nft.policyId} className="m-2">
          {nft.policyId}
          <br />
          {nft.assetName}
          <IonButton onClick={() => sell(nft)}>Sell</IonButton>
        </div>
      ))}
    </>
  );
};
