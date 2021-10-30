import React from "react";

import { IonButton, IonCardSubtitle, IonLabel } from "@ionic/react";
import Image from "next/image";
import Link from "next/link";

import { MarketplaceListing } from "../../../lib/marketplaceApi";
import { formatPrice, getImgUrl } from "../../../utils/NftUtil";

type Props = {
  marketplaceListing: MarketplaceListing;
};

const MarketNftBigCard = ({ marketplaceListing }: Props) => {
  const { saleMetadata, policyId, assetName, assetMetadata } =
    marketplaceListing;
  const { price } = saleMetadata;

  const metadata = (assetMetadata[policyId] || {})[assetName];
  const { description, image } = metadata;

  const imageUrl = getImgUrl(image);

  return (
    <div className="flex flex-col items-center px-4 mb-4 truncate md:px-16 md:flex-row">
      <div className="w-full">
        <Link href={`/marketplace/${marketplaceListing.transactionHash}`}>
          <a>
            <div className="relative my-4 w-full h-70vh md:max-h-70vh min-h-0 md:min-h-320">
              <Image
                className="rounded-2xl"
                alt="NFT Image"
                layout="fill"
                objectFit="contain"
                src={imageUrl}
              />
            </div>
          </a>
        </Link>
      </div>

      <div className="flex flex-col items-stretch justify-between w-full md:w-1/3 h-full gap-4 px-2 md:px-8 text-left lg:gap-8">
        <p className="my-auto text-3xl font-bold">{assetName}</p>
        <p className="text-xl truncate whitespace-normal line-clamp-3">
          {description}
        </p>
        <div className="flex items-end justify-between pr-4">
          <div className="flex flex-col items-start">
            <IonCardSubtitle className="text-base font-light">
              Price:
            </IonCardSubtitle>
            <IonLabel className="text-4xl text-primary-default">
              {`${formatPrice(price / 1000000)} ₳`}
            </IonLabel>
          </div>
          <div className="w-16 mb-2 ml-8">
            <IonButton
              href={`/marketplace/${marketplaceListing.transactionHash}`}
              shape="round"
            >
              BUY
            </IonButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketNftBigCard;
