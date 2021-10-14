import React from "react";

import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";

import { Nft } from "../../types/Nft";

type Props = {
  nft: Nft;
};

const NftCard = ({ nft }: Props) => {
  const { assetName, policyId, metadata, quantity } = nft;
  const { description, image } = metadata;

  const imageHash = image.replace("ipfs://", "");
  const imageUrl = `https://ipfs.io/ipfs/${imageHash}`;
  return (
    <IonCard className="w-full h-full p-2 rounded-2xl">
      <div className="flex flex-col">
        <div className="w-full h-2/3">
          <img
            className="object-cover w-auto h-full p-2 rounded-2xl"
            alt="Event"
            src={imageUrl}
          />
        </div>
        <IonCardHeader className="px-2 py-0 text-left truncate">
          <IonCardTitle className="text-base truncate">
            {`Policy Id: ${policyId}`}
          </IonCardTitle>
          <IonCardSubtitle>{`Asset name: ${assetName}`}</IonCardSubtitle>
          <IonCardSubtitle>{`Qty: ${quantity}`}</IonCardSubtitle>
          <IonCardSubtitle>{description}</IonCardSubtitle>
        </IonCardHeader>
      </div>
    </IonCard>
  );
};

export default NftCard;
