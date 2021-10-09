import React from "react";

import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";

import { NFT } from "../../types/NFT";

const NftCard = ({ nft }: { nft: NFT }) => {
  return (
    <IonCard className="rounded-2xl w-full h-full m-0">
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
            {nft.policyId}
          </IonCardTitle>
        </IonCardHeader>
      </div>
    </IonCard>
  );
};

export default NftCard;
