import React from "react";

import { IonCardSubtitle, IonLabel, IonSpinner } from "@ionic/react";
import { GetServerSideProps } from "next";

import MarketButton from "../../Components/Nfts/MarketplaceNfts/MarketButton";
import WalletSwitch from "../../Components/WalletSwitch";
import useWallet from "../../hooks/useWallet";
import { MarketplaceListing } from "../../lib/marketplaceApi";
import { Main } from "../../templates/Main";
import { formatPrice, getImgUrl } from "../../utils/NftUtil";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const hash = context.params!.transactionHash;
  const res = await fetch(
    `${process.env.BLOCKCHAIN_API}/marketplace/single/${hash}`
  );

  return {
    props: {
      listing: await res.json(),
    },
  };
};

type Props = {
  listing: MarketplaceListing;
};

const SingleMarketItem = ({ listing }: Props) => {
  const wallet = useWallet();
  const { saleMetadata, policyId, assetName, assetMetadata } = listing;
  const { price } = saleMetadata;

  const metadata = (assetMetadata[policyId] || {})[assetName];
  const { description, image } = metadata;

  const imageUrl = getImgUrl(image);

  return (
    <Main
      openGraph={{
        type: "website",
        url: `https://wottlenft.io/marketplace/${listing.transactionHash}`,
        title: `WottleNFT | ${assetName} For Sale`,
        description,
        images: [
          {
            url: imageUrl,
            width: 600,
            height: 600,
            alt: "NFT Image",
            type: "image/png",
          },
        ],
      }}
    >
      <div className="flex flex-col items-center px-4 py-4 mb-3 truncate md:px-16 md:flex-row">
        <img
          className="object-cover w-full p-2 rounded-3xl"
          alt="NFT Image"
          src={imageUrl}
        />

        <div className="flex flex-col justify-between w-full h-full gap-4 px-4 text-left lg:gap-8 md:px-12">
          <p className="my-auto text-3xl font-bold truncate whitespace-normal">
            {assetName}
          </p>
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
            <div className="w-16 mb-1">
              <WalletSwitch
                wallet={wallet}
                enabled={(enabled) => (
                  <MarketButton wallet={enabled} listing={listing} />
                )}
                loading={<IonSpinner />}
                fallback={<div>Please connect a wallet</div>}
              />
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default SingleMarketItem;
