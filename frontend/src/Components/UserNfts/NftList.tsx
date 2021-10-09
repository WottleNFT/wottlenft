import React, { useEffect, useState } from "react";

import { IonList } from "@ionic/react";

import { Asset } from "../../types/Asset";
import SearchBar from "../SearchBar";
import NftCard from "./NftCard";

const NftList = ({ nfts }: { nfts: Asset[] }) => {
  const [displayedNfts, setDisplayedNfts] = useState<Asset[]>([]);
  useEffect(() => {
    setDisplayedNfts(nfts);
  }, [nfts]);

  function searchEvents(text: string) {
    setDisplayedNfts(
      nfts.filter((nft) => Object.values(nft).join(" ").includes(text))
    );
  }
  return (
    <>
      <IonList>
        <SearchBar slot="fixed" onSearch={searchEvents} />
      </IonList>
      <div>
        {displayedNfts.map((nft, idx) => {
          return <NftCard nft={nft} key={idx} />;
        })}
      </div>
    </>
  );
};

export default NftList;
