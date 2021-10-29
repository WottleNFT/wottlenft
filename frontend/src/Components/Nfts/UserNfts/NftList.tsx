import React from "react";

import { useGetUserNftsQuery } from "../../../app/nft";
import { WottleEnabled } from "../../../hooks/useWallet";
import { Listing } from "../../../lib/combinedMarketplaceEndpoints";
import { Nft } from "../../../types/Nft";
import DisplayMessage from "../DisplayMessage";
import NftCard from "./NftCard";

type Props = {
  address: string;
  wallet: WottleEnabled;
  sellListings: Listing[];
};

const NftList = ({ address, wallet, sellListings }: Props) => {
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
			{sellListings.map((listing) => {
				const nft: Nft = {
					policyId: listing.nft_id,
					assetName: listing.nft_asset_name,
					quantity: 1,
					metadata: JSON.parse(listing.nft_metadata as unknown as string),
				}

				return (
					<NftCard
						listed={true}
						wallet={wallet}
						nft={nft}
						key={nft.policyId}
						price={listing.price}
					/>
				);
			})}
    </div>
  );
};

export default NftList;
