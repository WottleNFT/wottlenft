import React, { useState } from "react";

import { IonContent, IonList } from "@ionic/react";

import { NFT } from "../../types/NFT";
import SearchBar from "../SearchBar";
import NftCard from "./NftCard";

const NftList = ({ nfts }: { nfts: NFT[] }) => {
  const [displayedNfts, setDisplayedNfts] = useState<NFT[]>([]);

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
