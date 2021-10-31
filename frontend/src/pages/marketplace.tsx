import React from "react";

import { GetServerSideProps } from "next";

import DisplayMessage from "../Components/Nfts/DisplayMessage";
import MarketNftBigCard from "../Components/Nfts/MarketplaceNfts/MarketNftBigCard";
import MarketNftCard from "../Components/Nfts/MarketplaceNfts/MarketNftCard";
import { MarketplaceListing } from "../lib/marketplaceApi";
import { Main } from "../templates/Main";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.BLOCKCHAIN_API}/marketplace`);

  return {
    props: {
      listings: await res.json(),
    },
  };
};

type Props = {
  listings: MarketplaceListing[];
};

const Marketplace = ({ listings }: Props) => {
  return (
    <Main title="WottleNFT Marketplace">
      <div className="px-4 2xl:px-36">
        {listings[0] && <MarketNftBigCard marketplaceListing={listings[0]} />}

        <div className="flex flex-col gap-3 px-4 pb-10 md:px-10">
          <div className="flex justify-between h-12 p-3">
            <span className="text-xl">Marketplace</span>
          </div>

          {listings.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
              {listings.map((listing, idx) => {
                return (
                  <div key={idx}>
                    <MarketNftCard marketplaceListing={listing} />
                  </div>
                );
              })}
            </div>
          ) : (
            <DisplayMessage text="No Listed NFTs Right Now" />
          )}
        </div>
      </div>
    </Main>
  );
};

export default Marketplace;
