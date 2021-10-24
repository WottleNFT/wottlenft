import { IonButton } from "@ionic/react";
import React from "react";

import { Nft } from "../../types/Nft";

type Props = {
  nft: Nft;
};

const NftCard = ({ nft }: Props) => {
  const { assetName, metadata } = nft;
  const { description, image } = metadata;

  const imageHash = image.replace("ipfs://", "");
  const imageUrl = `https://ipfs.io/ipfs/${imageHash}`;

  return (
    <div
      style={{ height: 450, width: 350 }}
      className="flex flex-col m-8 transition-all rounded-2xl bg-gray-50 drop-shadow-md hover:drop-shadow-2xl hover:scale-110"
    >
			<div className="flex items-center my-2 h-14">
				<div className="w-12 h-12 mx-3 bg-gray-300 rounded-full"></div>
				<p className="font-bold">@{metadata.author}</p>
			</div>
      <img
        className="object-contain p-2 h-3/5 rounded-xl"
        alt="Event"
        src={imageUrl}
      />
      <div className="flex flex-col px-3 py-1">
        <p className="text-lg font-bold text-center">{assetName}</p>
        <p className="text-center text-gray-600">{description}</p>
				<IonButton className="mx-auto">List</IonButton>
      </div>
    </div>
  );
};

export default NftCard;
