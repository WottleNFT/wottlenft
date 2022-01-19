import React from "react";

import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { BsTwitter } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";

import cardanorcBanner from "../../../../public/assets/nft_drop/cardanorcsBanner.png";
import wottleCardanorc from "../../../../public/assets/nft_drop/wottle_cardanorc_2.png";
import DropCountdownCard from "../../../Components/NftDrop/DropCountdownCard";
import PurchaseDropCard from "../../../Components/NftDrop/PurchaseDropCard";
import { MarketplaceListing } from "../../../lib/marketplaceApi";
import { Main } from "../../../templates/Main";

export const getServerSideProps: GetServerSideProps = async () => {
  const blockchainApi = process.env.BLOCKCHAIN_API;
  let policyId;
  // Check if testnet or mainnet
  if (blockchainApi === "https://test-net.wottlenft.io") {
    policyId = "62264a920c007b90d6b950f34245d42c66f6fd23c1547f1662bfa547";
  } else {
    policyId = "6113dafb03b4eb0d6fbad8eecaf13d12d37d5df9c9bcf9ca05144d20";
  }
  const res = await fetch(
    `${blockchainApi}/projects?policy=${policyId}&page=1`
  );

  const drops = await res.json();
  const drop = drops[
    Math.floor(Math.random() * drops.length)
  ] as MarketplaceListing;

  return {
    props: {
      drop,
    },
  };
};

interface Props {
  drop: MarketplaceListing;
}

const Cardanorcs = ({ drop }: Props) => {
  const time = Math.round(new Date().getTime() / 1000);

  return (
    <Main title="NFT Drops | Cardanorcs">
      <div className="bg-primary-default">
        <div className="flex flex-col items-center w-full min-h-full px-12 py-10 2xl:px-40 max-w-maxBody">
          <div className="flex flex-row justify-between lg:w-lgBanner xl:w-xlBanner md:w-mdBanner">
            <div className="flex flex-col md:max-w-maxHalf">
              <p className="text-5xl font-bold leading-snug break-words sm:break-normal md:text-6xl lg:text-7xl">
                NFT DROPS
              </p>
              <p className="text-4xl font-bold md:text-5xl">CARDANORCS</p>
              <p className="text-lg">
                WELCOME TO THE HORDE <br />
                Cardanorcs are a fantasy civilisation of unique non-fungible
                Orcs inspired by mythology, legacy and lore. In the context of
                the metaverse, Cardanorcs are NFTs that live on the Cardano
                Blockchain. We will soon release The Orctagon (Orc Metaverse) as
                a play-to-earn game! Live virtually as an Orc, farm resources,
                breed, battle, build kingdoms and interact with each other.
              </p>
            </div>
            <div
              className="relative hidden md:block"
              style={{ height: "500px", width: "300px" }}
            >
              <Image
                src={wottleCardanorc}
                alt="Wottle Cardanorc"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="flex flex-row w-full pt-4 lg:text-4xl lg:w-lgBanner xl:w-xlBanner md:w-mdBanner">
            <div className="flex justify-start w-1/2 text-2xl lg:text-4xl ">
              <Link href="https://cardanorcs.com/">
                <a className="w-32 text-2xl text-blue-700 hover:underline">
                  cardanorcs.com
                </a>
              </Link>
            </div>
            <div className="flex justify-end w-1/2 gap-4 text-2xl lg:text-4xl">
              <a
                target="_blank"
                href="https://twitter.com/cardanorcs"
                rel="noreferrer"
              >
                <BsTwitter />
              </a>
              <a
                target="_blank"
                href="https://discord.gg/xs32ewMWBf"
                rel="noreferrer"
              >
                <FaDiscord />
              </a>
            </div>
          </div>
          {time < 1 ? (
            <DropCountdownCard
              banner={cardanorcBanner}
              countdownTo={1639454400}
              nameLink="cardanorcs"
              showViewButton={false}
              launch="14 December 2021, 4 A.M. UTC"
              supply="5000 Unique Cardanorcs"
              price={35}
            />
          ) : (
            <PurchaseDropCard drop={drop} banner={cardanorcBanner} price={35} />
          )}
        </div>
      </div>
    </Main>
  );
};
export default Cardanorcs;
