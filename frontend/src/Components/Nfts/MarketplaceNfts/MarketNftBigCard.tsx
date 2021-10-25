import React from "react";

import { IonButton, IonCardSubtitle, IonLabel } from "@ionic/react";
import Link from "next/link";

import useNftFromSaleNft from "../../../hooks/useNftFromSaleNft";
import { NftForSale } from "../../../lib/marketplaceApi";
import { getImgUrl } from "../../../utils/NftUtil";

type Props = {
  nftForSale: NftForSale;
  btnOnClick: React.MouseEventHandler<HTMLIonButtonElement> | undefined;
  btnText: string;
};

const MarketNftCard = ({ nftForSale, btnOnClick, btnText }: Props) => {
  const nft = useNftFromSaleNft(nftForSale);

  const { assetName, metadata } = nft;
  const { description, image, price } = metadata;

  const imageUrl = getImgUrl(image);

  return (
    <div className="flex px-4 md:px-16 py-4 truncate items-center flex-col md:flex-row">
      <Link href={`/marketplace/listingId`} passHref>
        <a>
          <img
            className="rounded-3xl object-cover w-full md:w-1/2 p-2 mb-3"
            alt="NFT Image"
            src={imageUrl}
          />
        </a>
      </Link>
      <div className="flex flex-col h-full gap-4 lg:gap-8 px-4 md:px-12 justify-between text-left">
        <p className="w-full text-3xl whitespace-normal truncate font-bold my-auto">
          {assetName}
        </p>
        <p className="w-full text-xl whitespace-normal truncate line-clamp-3">
          {description}
        </p>
        <div className="flex items-end justify-between pr-4">
          <div className="flex flex-col items-start">
            <IonCardSubtitle className="text-base font-light">
              Price:
            </IonCardSubtitle>
            <IonLabel className="text-4xl text-primary-default">
              {`${price} ₳`}
            </IonLabel>
          </div>
          <div className="w-16 mb-2">
            <IonButton shape="round" onClick={btnOnClick}>
              {btnText}
            </IonButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketNftCard;
