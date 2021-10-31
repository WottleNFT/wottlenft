import React from "react";

import { IonSpinner } from "@ionic/react";
import { GetServerSideProps } from "next";

import NftDetails from "../../Components/Marketplace/NftDetails";
import MarketButton from "../../Components/Nfts/MarketplaceNfts/MarketButton";
import WalletSwitch from "../../Components/WalletSwitch";
import useWallet from "../../hooks/useWallet";
import { MarketplaceListing } from "../../lib/marketplaceApi";
import styles from "../../styles/marketNft.module.css";
import { Main } from "../../templates/Main";
import { listingToNft, getImgUrl } from "../../utils/NftUtil";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const hash = context.params!.transactionHash;
  const res = await fetch(
    `${process.env.BLOCKCHAIN_API}/marketplace/single/${hash}`
  );

  const listing = await res.json();
  if (listing === null) {
    return {
      redirect: {
        destination: "/nft-not-found",
        permanent: false,
      },
    };
  }

  return {
    props: {
      listing,
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

  const infoCardButton = (
    <WalletSwitch
      wallet={wallet}
      enabled={(enabled) => (
        <MarketButton
          wallet={enabled}
          listing={listing}
          className={styles.infoCardBtn}
        />
      )}
      loading={<IonSpinner />}
      fallback={<div>Please connect a wallet</div>}
    />
  );

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
      <NftDetails
        nft={listingToNft(listing)}
        price={price}
        button={infoCardButton}
      />
    </Main>
  );
};

export default SingleMarketItem;
