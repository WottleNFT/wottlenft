import cardanorcBanner from "../../../public/assets/nft_drop/cardanorcsBanner.png";
import DropCountdownCard from "../../Components/NftDrop/DropCountdownCard";
import { Main } from "../../templates/Main";

const NFTDrops = () => {
  return (
    <Main title="NFT Drops">
      <div className="w-full min-h-full bg-primary-default">
        <div className="flex flex-col items-center w-full min-h-full py-10 m-auto md:px-10 max-w-maxBody">
          <p className="w-full px-8 text-3xl font-bold leading-snug break-words 2xl:px-40 sm:break-normal md:text-4xl lg:text-5xl ">
            NFT DROPS
          </p>
          <div className="flex flex-col items-center w-full px-1 py-5 sm:px-8 2xl:px-40">
            <DropCountdownCard
              banner={cardanorcBanner}
              countdownTo={1639454400}
              nameLink="cardanorcs"
              showViewButton={true}
              launch="14 December 2021, 4 A.M. UTC"
              supply="5000 Unique Cardanorcs"
              price={35}
            />
          </div>
        </div>
      </div>
    </Main>
  );
};
export default NFTDrops;
