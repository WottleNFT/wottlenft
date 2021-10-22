import React, { useEffect, useState } from "react";

import {
  IonButton,
  IonCardSubtitle,
  IonLabel,
  IonRouterLink,
} from "@ionic/react";
import Link from "next/link";

import AuctionCard from "../Components/Auctions/AuctionCard";
import { Main } from "../templates/Main";
import { Auction } from "../types/Auction";
import { testAuctions } from "../types/testData";

const Marketplace = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  useEffect(() => {
    setAuctions(testAuctions);
  }, []);

  return (
    <Main>
      {auctions[0] && (
        <div className="flex px-16 py-4 truncate h-1/2 min-h-320 items-center">
          <img
            className="object-cover w-2/3 h-full p-2 rounded-2xl"
            alt="Auction"
            src={auctions[0].nft.imgUrl}
          />
          <div className="flex flex-col h-full w-1/3 gap-4 px-12 justify-around text-left">
            <p className="w-full text-2xl whitespace-normal truncate line-clamp-2 font-bold">
              {auctions[0].nft.asset_name}
            </p>
            <p className="w-full text-base whitespace-normal truncate line-clamp-5">
              {auctions[0].nft.description}
            </p>
            <div className="flex items-end justify-between">
              <div className="flex flex-col w-1/2 items-start">
                <IonCardSubtitle className="text-sm font-light">
                  Price:
                </IonCardSubtitle>
                <IonLabel className="text-2xl text-primary-default">
                  30 ₳
                </IonLabel>
              </div>
              <div className="w-16">
                <IonButton
                  size="small"
                  shape="round"
                  routerLink={`/auctions/${auctions[0].id}`}
                >
                  Buy
                </IonButton>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-10">
        <div className="flex flex-col">
          <div className="flex justify-between h-12 p-3">
            <span className="text-xl">Marketplace</span>
            <IonRouterLink href="/auctions" color="primary">
              View All
            </IonRouterLink>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {auctions.length ? (
              auctions.map((auction, idx) => {
                return (
                  <div key={idx} className="h-full">
                    <Link href={`/auctions/${auction.id}`} passHref>
                      <a>
                        <AuctionCard auction={auction} />
                      </a>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <IonLabel className="text-lg text-gray-400">
                  No Live Auctions Right Now
                </IonLabel>
              </div>
            )}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Marketplace;
