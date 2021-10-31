import React from "react";

import { IonButton, useIonModal } from "@ionic/react";
import { useRouter } from "next/router";

import { WottleEnabled } from "../../../hooks/useWallet";
import { MarketplaceListing } from "../../../lib/marketplaceApi";
import { Nft } from "../../../types/Nft";
import { getImgUrl } from "../../../utils/NftUtil";
import NftActionModal from "../../Marketplace/NftActionModal";
import ListNftModal from "../../Profile/ListNftModal";

type Props = {
  nft: Nft;
  wallet: WottleEnabled;
  listed: boolean;
  price?: number;
  listing?: MarketplaceListing;
};

const UserNftCard = ({ nft, wallet, listed, price, listing }: Props) => {
  const { assetName, metadata, policyId } = nft;
  const { description, image } = metadata;
  const router = useRouter();

  const imageUrl = getImgUrl(image);

  const handleDismiss = () => {
    dismiss();
  };

  const [presentList, dismiss] = useIonModal(ListNftModal, {
    nft,
    dismiss: handleDismiss,
    wallet,
  });

  const handleDismissUnlist = () => {
    dismissUnlist();
  };

  const [presentUnlist, dismissUnlist] = useIonModal(NftActionModal, {
    nft,
    dismiss: handleDismissUnlist,
    wallet,
    isSeller: true,
    listing,
  });

  return (
    <div
      style={{ height: 450, width: 350 }}
      className="flex flex-col m-8 transition-all rounded-2xl bg-gray-50 drop-shadow-md hover:drop-shadow-2xl hover:scale-110"
    >
      <div className="h-4/5">
        <img
          style={{ height: 350, width: 350 }}
          className="object-contain pt-2 hover:cursor-pointer"
          alt="NFT Image"
          src={imageUrl}
          onClick={() => router.push(`nfts/${policyId}/${assetName}`)}
        />
      </div>
      <div className="flex flex-col px-3 py-1">
        <p className="text-lg font-bold text-center">{assetName}</p>
        <p className="text-center text-gray-600 truncate">{description}</p>
        {!listed ? (
          <IonButton className="mx-auto" onClick={() => presentList()}>
            List
          </IonButton>
        ) : (
          <div className="flex justify-between">
            <p className="text-2xl text-primary-default">
              {(price as number) / 1000000} ₳
            </p>
            <IonButton onClick={() => presentUnlist()}>Delist</IonButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNftCard;
