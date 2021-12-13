import React, { useState } from "react";

import { IonButton, IonContent, IonIcon, IonSpinner } from "@ionic/react";
import { closeOutline } from "ionicons/icons";

import { WottleEnabled } from "../../hooks/useWallet";
import { buy, buyDrop, delist } from "../../lib/combinedMarketplaceEndpoints";
import { MarketplaceListing } from "../../lib/marketplaceApi";
import { Nft } from "../../types/Nft";
import MarketButtonModal, { MarketButtonType } from "./MarketButtonModal";

interface Props {
  nft: Nft;
  dismiss: () => void;
  wallet: WottleEnabled;
  isSeller: boolean;
  listing: MarketplaceListing;
  hideNft: boolean;
  altNftName?: string;
}

const NftActionModal = ({
  nft,
  dismiss,
  wallet,
  isSeller,
  listing,
  hideNft,
  altNftName,
}: Props) => {
  const { assetName, metadata } = nft;
  const { image } = metadata;

  const imageHash = image.replace("ipfs://", "");
  const imageUrl = `https://ipfs.io/ipfs/${imageHash}`;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [txId, setTxId] = useState<string | undefined>();

  const handleResponse = (res: string) => {
    console.log("inside handleResponse: ", res);
    setTxId(res);
  };

  // Handles listing of nft
  const onClick = async () => {
    setIsSubmitting(true);
    try {
      if (isSeller) {
        const res = await delist(wallet, listing);
        handleResponse(res);
      } else if (hideNft) {
        const res = await buyDrop(wallet, listing);
        console.log(res);
        handleResponse(res);
      } else {
        const res = await buy(wallet, listing);
        handleResponse(res);
      }
    } catch (e) {
      console.error(e);
      setError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!txId) {
    return (
      <IonContent>
        <div className="flex flex-col h-full px-10 pt-5">
          <div className="relative py-2 border-b-2 border-solid border-primary-default">
            <p className={`inline-block w-full text-2xl font-bold text-center`}>
              {isSeller ? "Delist NFT" : "Buy NFT"}
            </p>
            <IonIcon
              onClick={() => dismiss()}
              icon={closeOutline}
              className="absolute right-0 text-black hover:cursor-pointer"
              size="large"
            />
          </div>
          {!hideNft && (
            <img
              src={imageUrl}
              alt="NFT image"
              className="object-contain py-5 max-h-96"
            />
          )}
          <div
            className={`flex flex-col text-lg leading-loose text-center ${
              hideNft && "h-full justify-center"
            }`}
          >
            {!hideNft ? (
              <p>
                You are about to {isSeller ? "delist" : "buy"}{" "}
                <span className="font-bold">{assetName}</span>, created by{" "}
                <span className="font-bold">
                  @{metadata.creator ? metadata.creator : "Unknown"}
                </span>
                {!isSeller && (
                  <span>
                    {" "}
                    for <b>{listing.saleMetadata.price / 1000000}₳</b>
                  </span>
                )}
              </p>
            ) : (
              <p>
                You are about to buy a <b>{altNftName}</b> for{" "}
                <b>{listing.saleMetadata.price / 1000000}₳</b>
              </p>
            )}
            <p>
              By clicking <b>{isSeller ? "Delist" : "Buy"}</b>, you are agreeing
              to WottleNFT&apos;s
              <b> Terms of Service </b> and <b> Privacy Policy </b>
            </p>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="self-center w-56 py-5">
              {isSubmitting ? (
                <IonSpinner name="crescent" />
              ) : (
                <IonButton onClick={onClick} expand="block" size="large">
                  {isSeller ? "Delist" : "Buy"}
                </IonButton>
              )}
            </div>
          </div>
        </div>
      </IonContent>
    );
  }
  return (
    <MarketButtonModal
      transactionId={txId as string}
      btnType={isSeller ? MarketButtonType.DELIST : MarketButtonType.BUY}
      dismiss={dismiss}
    />
  );
};
export default NftActionModal;
