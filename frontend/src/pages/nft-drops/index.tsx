import cardanorcBanner from "../../../public/assets/nft_drop/cardanorcsBanner.png";
import DropCountdownCard from "../../Components/NftDrop/DropCountdownCard";
import { Main } from "../../templates/Main";

const NFTDrops = () => {
  return (
    <Main title="NFT Drops">
      <div className="w-full min-h-full bg-primary-default">
        <div className="flex flex-col w-full min-h-full py-10 px:2 lg:px-12 max-w-maxBody">
          <div className="flex font-bold break-words lg:w-lgBanner xl:w-xlBanner md:w-mdBanner ">
            <p className="w-full px-4 text-3xl md:text-4xl lg:text-5xl sm:px-8 2xl:px-40">
              NFT DROPS
            </p>
          </div>
          <div className="flex flex-col items-center w-full px-4 py-5 sm:px-8 2xl:px-40">
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
