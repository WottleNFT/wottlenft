import React, { useState, useEffect } from "react";

import { IonCard, IonChip, IonContent, IonIcon, IonList } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import Link from "next/link";

import CategoryTag from "../../Components/CategoryTag";
import SearchBar from "../../Components/SearchBar";
import { Meta } from "../../layout/Meta";
import { Main } from "../../templates/Main";
import { Auction } from "../../types/Auction";
import { Category } from "../../types/Category";

function ExploreAuctions() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [displayedAuctions, setDisplayedAuctions] = useState<Auction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    setCategories(testCategories);
    setAuctions(testAuctions);
    setDisplayedAuctions(testAuctions);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (!selectedCategories.length) {
      setDisplayedAuctions(auctions);
    } else {
      setDisplayedAuctions(auctionsInSelectedCategories());
    }
  }, [selectedCategories, auctions]);

  function onTapCategory(categoryId: number) {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((value) => value !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  }

  function searchAuctions(text: string) {
    setDisplayedAuctions(
      auctionsInSelectedCategories().filter((auction) =>
        Object.values(auction).join(" ").includes(text)
      )
    );
  }

  function auctionsInSelectedCategories() {
    if (selectedCategories.length > 0) {
      return auctions.filter((auction) =>
        selectedCategories.includes(auction.category.id)
      );
    }
    return auctions;
  }

  return (
    <Main meta={<Meta title="Explore" description="Explore all auctions." />}>
      <IonList>
        <div>
          <SearchBar onSearch={searchAuctions} />
        </div>

        <div className="py-2 mx-2 overflow-x-scroll whitespace-nowrap">
          {categories.map((category, idx) => {
            return (
              <CategoryTag
                key={idx}
                color={
                  selectedCategories.includes(category.id)
                    ? "primary"
                    : undefined
                }
                label={category.name}
                className="whitespace-nowrap"
                onClick={() => onTapCategory(category.id)}
              />
            );
          })}
        </div>
      </IonList>

      <IonContent>
        {displayedAuctions.length ? (
          displayedAuctions.map((auction, idx) => {
            return (
              <Link href={`/auctions/${auction.id}`} key={idx}>
                <IonCard className="mt-3 rounded-2xl">
                  <div className="flex felx-row">
                    <div className="w-1/3 h-32">
                      <img
                        className="object-cover w-full p-2 rounded-2xl"
                        alt="Auction"
                        src={auction.imgUrl}
                      />
                    </div>

                    <div className="w-2/3 h-full p-3">
                      <div className="flex items-center h-1/2">
                        <p className="text-lg font-bold line-clamp-2">
                          {auction.title}
                        </p>
                      </div>
                      <div className="flex items-center p-0 h-1/2">
                        <CategoryTag
                          color="primary"
                          label={auction.category.name}
                          className="m-0"
                        />
                      </div>
                    </div>
                  </div>
                </IonCard>
              </Link>
            );
          })
        ) : (
          <div className="p-2">
            <Link href="/createAuction">
              <IonChip
                color="primary"
                className="w-full h-32 m-auto border-2 border-yellow-500 border-dashed"
              >
                <div className="flex flex-col items-center w-full">
                  <IonIcon size="large" icon={addOutline} className="p-2" />
                  <p className="w-full text-lg text-center">
                    Can{"'"}t find a auction? Create one!
                  </p>
                </div>
              </IonChip>
            </Link>
          </div>
        )}
      </IonContent>
    </Main>
  );
}

export default ExploreAuctions;

const testCategories: Category[] = [
  {
    id: 1,
    name: "Art",
  },
  {
    id: 2,
    name: "Trading Cards",
  },
  {
    id: 3,
    name: "Collectibles",
  },
  {
    id: 4,
    name: "Sports",
  },
  {
    id: 5,
    name: "Utility",
  },
];

const testAuctions: Auction[] = [
  {
    id: 1,
    title: "Auction 1",
    category: testCategories[1]!,
    imgUrl: "https://picsum.photos/200",
  },
  {
    id: 2,
    title: "Auction 2",
    category: testCategories[2]!,
    imgUrl: "https://picsum.photos/200",
  },
  {
    id: 3,
    title: "Auction 3",
    category: testCategories[0]!,
    imgUrl: "https://picsum.photos/200",
  },
  {
    id: 4,
    title: "Auction 4",
    category: testCategories[1]!,
    imgUrl: "https://picsum.photos/200",
  },
  {
    id: 5,
    title: "Auction 5",
    category: testCategories[3]!,
    imgUrl: "https://picsum.photos/200",
  },
  {
    id: 6,
    title: "Auction 6",
    category: testCategories[1]!,
    imgUrl: "https://picsum.photos/200",
  },
];
