import React from "react";

import { IonList } from "@ionic/react";

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
    <>
      <IonList className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((nft) => {
          return <NftCard key={nft.policyId} nft={nft} />;
        })}
      </IonList>
    </>
  );
};

export default NftList;
