import DropCountdownCard from "../../Components/NftDrop/DropCountdownCard";
import { Main } from "../../templates/Main";

const NFTDrops = () => {
  return (
    <Main title="NFT Drops">
      <div className="bg-primary-default">
        <div className="flex flex-col items-center w-full min-h-full px-2 py-10 m-auto md:px-10 max-w-maxBody">
          <p className="w-full ml-4 text-5xl font-bold leading-snug break-words sm:break-normal md:text-6xl lg:text-7xl lg:ml-32">
            NFT DROPS
          </p>
          <div className="flex flex-col items-center w-full py-5">
            <DropCountdownCard />
          </div>
        </div>
      </div>
    </Main>
  );
};
export default NFTDrops;
