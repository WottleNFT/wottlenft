import React from "react";

import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";

import { Asset } from "../../types/Asset";

const NftCard = ({ nft }: { nft: Asset }) => {
  return (
    <IonCard className="rounded-2xl w-full h-full p-2">
      <div className="flex flex-col">
        <div className="h-2/3 w-full">
          {/* <img
            className="p-2 w-auto h-full object-cover rounded-2xl"
            alt="Event"
            src={nftPlaceholder}
          /> */}
        </div>
        <IonCardHeader className="text-left px-2 py-0 truncate">
          <IonCardTitle className="truncate text-base">
            {`Policy Id: ${nft.policy_id}`}
          </IonCardTitle>
          <IonCardSubtitle>{`Asset name: ${nft.asset_name}`}</IonCardSubtitle>
          <IonCardSubtitle>{`Qty: ${nft.qty}`}</IonCardSubtitle>
        </IonCardHeader>
      </div>
    </IonCard>
  );
};

export default NftCard;
