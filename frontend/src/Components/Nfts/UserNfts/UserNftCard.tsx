import React from "react";

import { IonButton, useIonModal } from "@ionic/react";
import Image from "next/image";
import { useRouter } from "next/router";

import { WottleEnabled } from "../../../hooks/useWallet";
import { cancelNft, CancelNftRequest } from "../../../lib/marketplaceApi";
import { signTransaction } from "../../../lib/transactionApi";
import { Nft } from "../../../types/Nft";
import { getImgUrl } from "../../../utils/NftUtil";
import ListNftModal from "../../Profile/ListNftModal";

type Props = {
  nft: Nft;
  wallet: WottleEnabled;
  listed: boolean;
  price?: number;
};

const UserNftCard = ({ nft, wallet, listed, price }: Props) => {
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

  const handleUnlist = async () => {
    const request: CancelNftRequest = {
      sellerAddress: wallet.state.address,
      policyId: nft.policyId,
      assetName: nft.assetName,
    };

    const { transaction } = await cancelNft(request);
    const signature = await wallet.cardano.signTx(transaction);
    const signResponse = await signTransaction(transaction, signature);
    console.log(signResponse);
  };

  return (
    <div
      style={{ height: 450, width: 350 }}
      className="flex flex-col m-8 transition-all rounded-2xl bg-gray-50 drop-shadow-md hover:drop-shadow-2xl hover:scale-110"
    >
      <div className="h-4/5">
        <Image
          height={350}
          className="object-contain w-full pt-2 hover:cursor-pointer"
          alt="Event"
          src={imageUrl}
          onClick={() => router.push(`nfts/${policyId}/${assetName}`)}
        />
      </div>
      <div className="flex flex-col px-3 py-1">
        <p className="text-lg font-bold text-center">{assetName}</p>
        <p className="text-center text-gray-600">{description}</p>
        {!listed ? (
          <IonButton className="mx-auto" onClick={() => present()}>
            List
          </IonButton>
        ) : (
          <div className="flex justify-between">
            <p className="text-2xl text-primary-default">
              {(price as number) / 1000000} ₳
            </p>
            <IonButton onClick={handleUnlist}>Unlist</IonButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNftCard;
