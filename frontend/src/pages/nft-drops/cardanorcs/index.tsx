import React from "react";

import Image from "next/image";
import Link from "next/link";
import { BsTwitter } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";

import cardanorcBanner from "../../../../public/assets/nft_drop/cardanorcsBanner.png";
import wottleCardanorc from "../../../../public/assets/nft_drop/wottle_cardanorc_2.png";
import DropCountdownCard from "../../../Components/Nftdrop/DropCountdownCard";
import { Main } from "../../../templates/Main";

const Cardanorcs = () => {
  return (
    <Main title="NFT Drops | Cardanorcs">
      <div className="bg-primary-default">
        <div className="flex flex-col items-center w-full min-h-full px-2 py-10 m-auto md:px-10 max-w-maxBody">
          <div className="flex flex-row self-start justify-between 2xl:ml-32">
            <div className="flex flex-col md:max-w-maxHalf">
              <p className="text-5xl font-bold leading-snug break-words sm:break-normal md:text-6xl lg:text-7xl">
                NFT DROPS
              </p>
              <p className="text-4xl font-bold md:text-5xl">CARDANORCS</p>
              <p className="text-lg">
                LEGEND OF THE CARDANORC <br />
                In the ever expanding universe of Cardano, is a world where
                berries, friendly astronauts floating skulls, clay creatures,
                and other beings coexist. While each of them get to live
                peacefully, a notorious existence find themselves in a seemingly
                endless struggle for survival. Who are these creatures and will
                their emergence from the void disrupt Cardano?
              </p>
              <Link href="https://cardanorcs.com/">
                <a className="w-32 mt-5 text-2xl text-blue-700 hover:underline">
                  cardanorcs.com
                </a>
              </Link>
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
          <div className="flex justify-end w-full gap-4 text-2xl lg:text-4xl max-w-1300">
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
          <DropCountdownCard
            banner={cardanorcBanner}
            countdownTo={1639411200}
            nameLink="cardanorcs"
          />
          {/* Purchase component to be used after drop
						<PurchaseDropCard banner={cardanorcBanner} price={35} quantity={300} totalQuantity={500} />
					*/}
        </div>
      </div>
    </Main>
  );
};
export default Cardanorcs;
