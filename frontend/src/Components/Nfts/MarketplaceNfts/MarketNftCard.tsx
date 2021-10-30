import React from "react";

import { IonButton, IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import Image from "next/image";
import Link from "next/link";

import { MarketplaceListing } from "../../../lib/marketplaceApi";
import { formatPrice, getImgUrl } from "../../../utils/NftUtil";
import CategoryTag from "../../CategoryTag";

type Props = {
  marketplaceListing: MarketplaceListing;
};

const MarketNftCard = ({ marketplaceListing }: Props) => {
  const { saleMetadata, policyId, assetName, assetMetadata } =
    marketplaceListing;
  const { price, unGoal } = saleMetadata;

  const metadata = (assetMetadata[policyId] || {})[assetName];
  const { description, image } = metadata;

  const imageUrl = getImgUrl(image);

  return (
    <IonCard className="px-2 pt-3 m-0 rounded-3xl md:px-4">
      <div className="felx felx-col">
        {/* <div className="flex items-center h-1/6 felx-row">
          <div className="h-full m-2 w-14">
            <Image
              src="https://picsum.photos/200"
              alt="nft pic"
              className="rounded-full"
            />
          </div>
          <div className="w-3/5 text-left">
            <IonCardTitle className="text-base truncate">{`@${
              "owner" in metadata ? metadata.owner : "Unknown"
            }`}</IonCardTitle>
          </div>
        </div> */}

        <Link
          href={`/marketplace/${marketplaceListing.transactionHash}`}
          passHref
        >
          <a>
            <Image
              className="object-contain w-full h-48 p-2 rounded-3xl"
              alt="NFT Image"
              src={imageUrl}
            />
          </a>
        </Link>

        <div className="flex flex-col justify-center w-full h-1/3">
          <IonCardHeader className="px-2 truncate">
            <IonCardTitle className="text-base text-center truncate">
              {assetName}
            </IonCardTitle>
            <p className="h-16 mt-2 text-left whitespace-normal line-clamp-3 overflow-ellipsis">
              {description}
            </p>
            <div className="flex flex-col items-start">
              <CategoryTag label={unGoal} color="primary" className="-ml-2" />
              <div className="self-stretch flex flex-row items-end justify-between pt-2">
                <span className="text-2xl text-primary-default">{`${formatPrice(
                  price / 1000000
                )} ₳`}</span>

                <IonButton
                  href={`/marketplace/${marketplaceListing.transactionHash}`}
                  size="small"
                  shape="round"
                >
                  BUY
                </IonButton>
              </div>
            </div>
          </IonCardHeader>
        </div>
      </div>
    </IonCard>
  );
};

export default MarketNftCard;
