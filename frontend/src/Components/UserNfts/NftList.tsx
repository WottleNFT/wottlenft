import React, { useState } from "react";

import { IonContent, IonList } from "@ionic/react";

import { Asset } from "../../types/Asset";
import SearchBar from "../SearchBar";
import NftCard from "./NftCard";

const NftList = ({ nfts }: { nfts: Asset[] }) => {
  const [displayedNfts, setDisplayedNfts] = useState<Asset[]>([]);

  function searchEvents(text: string) {
    setDisplayedNfts(
      nfts.filter((nft) => Object.values(nft).join(" ").includes(text))
    );
  }
  return (
    <>
      <IonList className="p-0">
        <SearchBar slot="fixed" onSearch={searchEvents} />
      </IonList>
      <IonContent>
        {displayedNfts.map((nft, idx) => {
          return <NftCard nft={nft} key={idx} />;
        })}
      </IonContent>
    </>
  );
};

export default NftList;
