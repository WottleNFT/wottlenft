import Image from "next/image";
import Link from "next/link";

import wottleCardanorc from "../../../../public/assets/nft_drop/wottle_cardanorc.png";
import PurchaseDropCard from "../../../Components/NftDrop/PurchaseDropCard";
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
              <p className="text-5xl font-bold">CARDANORCS</p>
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
              style={{ height: "500px", width: "500px" }}
            >
              <Image
                src={wottleCardanorc}
                alt="Wottle Cardanorc"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <PurchaseDropCard />
        </div>
      </div>
    </Main>
  );
};
export default Cardanorcs;
