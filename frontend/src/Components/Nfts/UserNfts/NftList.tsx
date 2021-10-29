import React from "react";

import { useGetUserNftsQuery } from "../../../app/nft";
import { WottleEnabled } from "../../../hooks/useWallet";
import DisplayMessage from "../DisplayMessage";
import NftCard from "./NftCard";

type Props = {
  address: string;
  wallet: WottleEnabled;
};

const NftList = ({ address, wallet }: Props) => {
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
    </div>
  );
};

export default NftList;
