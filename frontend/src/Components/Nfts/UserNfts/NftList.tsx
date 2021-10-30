import React from "react";

import { useGetUserNftsQuery } from "../../../app/nft";
import { WottleEnabled } from "../../../hooks/useWallet";
import { MarketplaceListing } from "../../../lib/marketplaceApi";
import DisplayMessage from "../DisplayMessage";
import NftCard from "./NftCard";

type Props = {
  address: string;
  wallet: WottleEnabled;
  listings: MarketplaceListing[];
};

const NftList = ({ address, wallet, listings }: Props) => {
  const { data, error, isLoading } = useGetUserNftsQuery({
    address,
  });

  if (isLoading) return <DisplayMessage text="Loading your NFTs" />;

  if (error || !data) return <DisplayMessage text="Error fetching your NFTs" />;

  return (
    <div className="flex flex-wrap justify-center">
      {data.map((nft) => {
        return (
          <NftCard
            listed={false}
            wallet={wallet}
            nft={nft}
            key={nft.policyId}
          />
        );
      })}
      {listings.map((listingData) => {
        const metadata =
          listingData.assetMetadata[listingData.policyId][
            listingData.assetName
          ];
        const nftInfo = {
          policyId: listingData.policyId,
          assetName: listingData.assetName,
          quantity: 1,
          metadata,
        };
        return (
          <NftCard
            listed={true}
            wallet={wallet}
            nft={nftInfo}
            key={nftInfo.policyId}
            price={listingData.saleMetadata.price}
          />
        );
      })}
    </div>
  );
};

export default NftList;
