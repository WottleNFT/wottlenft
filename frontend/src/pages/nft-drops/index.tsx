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
          <div className="flex flex-col items-center w-full px-8 py-5 2xl:px-40">
            <DropCountdownCard
              banner={cardanorcBanner}
              countdownTo={1639454400}
              nameLink="cardanorcs"
            />
          </div>
        </div>
      </div>
    </Main>
  );
};
export default NFTDrops;
