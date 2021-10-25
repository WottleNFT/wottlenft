import React from "react";

import { useGetUserNftsQuery } from "../../app/nft";
import DisplayMessage from "./DisplayMessage";
import NftCard from "./NftCard";

type Props = {
  baseUrl: string;
  address: string;
};

const NftList = ({ baseUrl, address }: Props) => {
  const { data, error, isLoading } = useGetUserNftsQuery({
    url: baseUrl,
    address,
  });

  if (isLoading) return <DisplayMessage text="Loading your NFTs" />;

  if (error || !data) return <DisplayMessage text="Error fetching your NFTs" />;

  return (
    <div className="flex flex-wrap justify-center">
      {data.map((nft) => {
        return <NftCard nft={nft} key={nft.policyId} />;
      })}
    </div>
  );
};

export default NftList;
