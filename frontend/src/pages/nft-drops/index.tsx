import cardanorcBanner from "../../../public/assets/nft_drop/cardanorcsBanner.png";
import DropCountdownCard from "../../Components/Nftdrop/DropCountdownCard";
import { Main } from "../../templates/Main";

const NFTDrops = () => {
  return (
    <Main title="NFT Drops">
  <div className="w-full min-h-full  bg-primary-default">
        <div className="flex flex-col items-center w-full min-h-full py-10 m-auto md:px-10 max-w-maxBody">
          <p className="w-full px-8 2xl:px-40 text-3xl font-bold leading-snug break-words sm:break-normal md:text-4xl lg:text-5xl ">
            NFT DROPS
          </p>
          <div className="flex flex-col px-8 2xl:px-40 items-center w-full py-5">
            <DropCountdownCard
              banner={cardanorcBanner}
              countdownTo={1639411200}
              nameLink="cardanorcs"
            />
          </div>
        </div>
      </div>
    </Main>
  );
};
export default NFTDrops;
