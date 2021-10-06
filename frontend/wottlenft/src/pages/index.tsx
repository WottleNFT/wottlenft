import React, { useEffect, useState } from 'react';

import {
  IonButton,
  IonContent,
  IonLabel,
  IonRouterLink,
  IonSlide,
  IonSlides,
} from '@ionic/react';
import Link from 'next/link';

import AuctionCard from '../Components/AuctionCard';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { Auction } from '../types/Auction';
import { Category } from '../types/Category';

const Index = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  useEffect(() => {
    setAuctions(testAuctions);
  }, []);

  return (
    <Main
      meta={
        <Meta
          title="Wottlenft"
          description="Wottlenft is your next NFT auction site."
        />
      }
    >
      <IonContent fullscreen={true} scrollEvents={true}>
        {auctions[0] && (
          <div className="p-3 h-1/2 flex place-items-center text-center truncate">
            <img
              className="p-2 w-1/2 h-full object-cover rounded-2xl"
              alt="Auction"
              src={auctions[0].imgUrl}
            />
            <div className="w-1/2 flex flex-col gap-6">
              <IonLabel className="text-2xl" color="primary">
                {auctions[0].title}
              </IonLabel>
              <IonLabel className="text-lg">Time Left:</IonLabel>
              <div className="flex">
                <div className="w-1/2 flex flex-col gap-3">
                  <IonLabel>Current Bid</IonLabel>
                  <IonLabel>10000 ADA</IonLabel>
                  <IonLabel>$18000.00</IonLabel>
                </div>
                <div className="w-1/2 flex flex-col gap-2 px-10">
                  <IonLabel>Current Holder</IonLabel>
                  <IonLabel>Littleholder97</IonLabel>
                  <IonButton
                    size="small"
                    routerLink={`/auctions/${auctions[0].id}`}
                  >
                    Read Story
                  </IonButton>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="h-80 flex flex-col ">
          <div className="p-3 h-12 flex justify-between">
            <span className="text-xl">Live Auctions</span>
            <IonRouterLink href="/auctions" color="primary">
              View All
            </IonRouterLink>
          </div>
          {auctions.length ? (
            <IonSlides
              className="w-full h-full"
              scrollbar={true}
              options={{ slidesPerView: 'auto' }}
            >
              {auctions.map((auction) => {
                return (
                  <IonSlide key={auction.id} className=" w-56 p-3">
                    <Link href={`/auctions/${auction.id}`} passHref>
                      <a>
                        <AuctionCard auction={auction} />
                      </a>
                    </Link>
                  </IonSlide>
                );
              })}
            </IonSlides>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <IonLabel className="text-lg text-gray-400">
                No Live Auctions Right Now
              </IonLabel>
            </div>
          )}
        </div>
      </IonContent>
    </Main>
  );
};

export default Index;

const testCategories: Category[] = [
  {
    id: 1,
    name: "Art",
  },{
    id: 1,
    name: "Trading Cards",
  },{
    id: 1,
    name: "Collectibles",
  },{
    id: 1,
    name: "Sports",
  },{
    id: 1,
    name: "Utility",
  },
]


const testAuctions: Auction[] = [
  {
    id: 1,
    title: 'Auction 1',
    category: testCategories[1]!,
    imgUrl: 'https://picsum.photos/200',
  },
  {
    id: 2,
    title: 'Auction 2',
    category: testCategories[2]!,
    imgUrl: 'https://picsum.photos/200',
  },
  {
    id: 3,
    title: 'Auction 3',
    category: testCategories[0]!,
    imgUrl: 'https://picsum.photos/200',
  },
  {
    id: 4,
    title: 'Auction 4',
    category: testCategories[1]!,
    imgUrl: 'https://picsum.photos/200',
  },
  {
    id: 5,
    title: 'Auction 5',
    category: testCategories[3]!,
    imgUrl: 'https://picsum.photos/200',
  },
  {
    id: 6,
    title: 'Auction 6',
    category: testCategories[1]!,
    imgUrl: 'https://picsum.photos/200',
  },
];