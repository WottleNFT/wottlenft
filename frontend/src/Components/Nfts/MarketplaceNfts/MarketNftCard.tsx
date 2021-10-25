import React from "react";

import { IonButton, IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";

import { Nft } from "../../../types/Nft";

type Props = {
  nft: Nft;
};

const MarketNftCard = ({ nft }: Props) => {
  const { assetName, metadata } = nft;
  const { description, image } = metadata;

  const imageHash = image.replace("ipfs://", "");
  const imageUrl = `https://ipfs.io/ipfs/${imageHash}`;

  return (
    <IonCard className="rounded-3xl m-0 px-2 md:px-4 pt-3">
      <div className="felx felx-col">
        <div className="h-1/6 flex felx-row items-center">
          <div className="m-2 w-14 h-full">
            <img
              src="https://picsum.photos/200"
              alt="nft pic"
              className="rounded-full"
            />
          </div>
          <div className="text-left w-3/5">
            <IonCardTitle className="text-base truncate">{`@${
              "owner" in metadata ? metadata.owner : "Unknown"
            }`}</IonCardTitle>
          </div>
        </div>

        <img
          className="p-2 w-auto h-1/2 object-cover rounded-3xl"
          alt="nft image"
          src={imageUrl}
        />

        <div className="w-full h-1/3 flex flex-col justify-center">
          <IonCardHeader className="px-2 truncate">
            <IonCardTitle className="text-center truncate text-base">
              {assetName}
            </IonCardTitle>
            <p className="mt-2 h-16 text-left line-clamp-3 whitespace-normal overflow-ellipsis">
              {description}
            </p>
            <div className="flex flex-row justify-between items-end pt-2">
              <span className="text-2xl text-primary-default">30 ₳</span>
              <IonButton size="small" shape="round">
                Buy
              </IonButton>
            </div>
          </IonCardHeader>
        </div>
      </div>
    </IonCard>
  );
};

export default MarketNftCard;
