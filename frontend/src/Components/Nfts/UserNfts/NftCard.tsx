import React from "react";

import { IonButton, useIonModal } from "@ionic/react";
import { useRouter } from "next/router";

import { WottleWalletState } from "../../../hooks/useWallet";
import { Nft } from "../../../types/Nft";
import { getImgUrl } from "../../../utils/NftUtil";
import ListNftModal from "../../Profile/ListNftModal";

type Props = {
  nft: Nft;
  wallet: WottleWalletState;
};

const NftCard = ({ nft, wallet }: Props) => {
  const { assetName, metadata, policyId } = nft;
  const { description, image } = metadata;
  const router = useRouter();

  const imageUrl = getImgUrl(image);

  const handleDismiss = () => {
    dismiss();
  };

  const [present, dismiss] = useIonModal(ListNftModal, {
    nft,
    dismiss: handleDismiss,
    wallet,
  });

  console.log(`nfts/${policyId}/${assetName}`);

  return (
    <div
      style={{ height: 450, width: 350 }}
      className="flex flex-col m-8 transition-all rounded-2xl bg-gray-50 drop-shadow-md hover:drop-shadow-2xl hover:scale-110"
    >
      <div className="flex items-center my-2 h-14">
        <div className="w-12 h-12 mx-3 bg-gray-300 rounded-full"></div>
        <p className="font-bold">
          @{metadata.owner ? metadata.owner : "Unknown"}
        </p>
      </div>
      <img
        className="object-contain p-2 hover:cursor-pointer h-3/5 rounded-xl"
        alt="Event"
        src={imageUrl}
        onClick={() => router.push(`nfts/${policyId}/${assetName}`)}
      />
      <div className="flex flex-col px-3 py-1">
        <p className="text-lg font-bold text-center">{assetName}</p>
        <p className="text-center text-gray-600">{description}</p>
        <IonButton className="mx-auto" onClick={() => present()}>
          List
        </IonButton>
      </div>
    </div>
  );
};

export default NftCard;
