import React from "react";

import { useGetUserNftsQuery } from "../../../app/nft";
import { WottleEnabled } from "../../../hooks/useWallet";
import { MarketplaceListing } from "../../../lib/marketplaceApi";
import DisplayMessage from "../DisplayMessage";
import UserNftCard from "./UserNftCard";

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
          <UserNftCard
            listed={true}
            wallet={wallet}
            nft={nftInfo}
            key={nftInfo.policyId}
            price={listingData.saleMetadata.price}
            listing={listingData}
          />
        );
      })}
      {data.map((nft) => {
        return (
          <UserNftCard
            listed={false}
            wallet={wallet}
            nft={nft}
            key={nft.policyId}
          />
        );
      })}
    </div>
  );
};

export default NftList;
