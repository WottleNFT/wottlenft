import { GetServerSideProps } from "next";

import NftInfoCard from "../../Components/UserNfts/NftInfoCard";
import { Main } from "../../templates/Main";
import { Asset } from "../../types/Asset";
import { testNfts } from "../../types/testData";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      nft: testNfts[0]!,
    },
  };
};
type Props = {
  nft: Asset;
};
const Sample = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { description, asset_name } = props.nft;
  return (
    <Main>
      <div className="flex flex-col items-center">
        <img
          className="object-contain h-3/4 min-h-320 p-4 rounded-2xl"
          alt="Auction"
          src="https://picsum.photos/400"
        />
        <div className="flex flex-col md:flex-row p-6 gap-6">
          <div className="w-full md:w-3/5">
            <div className="flex flex-col text-left">
              <p className="w-full text-2xl whitespace-normal truncate font-bold">
                {asset_name}
              </p>
              <span className="text-right">
                Owned By{" "}
                <span className="text-primary-default">@CollectorUsername</span>
              </span>
              <p className="mt-4 w-full text-base whitespace-normal truncate">
                {description}
              </p>
            </div>
          </div>
          <div className="w-full md:w-2/5">
            <NftInfoCard nft={props.nft} />
          </div>
        </div>
      </div>
    </Main>
  );
};
export default Sample;
