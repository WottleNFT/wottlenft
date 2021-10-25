import { GetServerSideProps } from "next";

import NftInfoCard from "../../../../Components/UserNfts/NftInfoCard";
import { Status } from "../../../../features/wallet/walletSlice";
import useWallet from "../../../../hooks/useWallet";
import { Main } from "../../../../templates/Main";
import { Nft } from "../../../../types/Nft";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { policyId, assetName } = context.params!;
  const id = policyId as string;
  const name = assetName as string;

  const res = await fetch(
    `https://test-net.wottlenft.io/nft/single/${id}/${name}`
  );

  const nft = await res.json();
  const metadata = await nft[id][name];

  // console.log(nft);
  return {
    props: {
      nft: {
        policyId,
        assetName,
        quantity: 1,
        metadata,
      },
    },
  };
};
type Props = {
  nft: Nft;
};
const NftDetails = (props: Props) => {
  const wallet = useWallet();
  if (wallet.status !== Status.Enabled) {
    return (
      <Main>
        <h1>Loading</h1>
      </Main>
    );
  }

  const { metadata, assetName } = props.nft;
  const { description } = metadata;
  return (
    <Main>
      <div className="flex flex-col items-center px-2 md:px-10">
        <img
          className="object-contain h-3/4 min-h-320 p-4 rounded-2xl"
          alt="Auction"
          src="https://picsum.photos/400"
        />
        <div className="flex flex-col md:flex-row p-6 gap-6 self-stretch">
          <div className="w-full">
            <div className="flex flex-col text-left">
              <p className="w-full text-2xl whitespace-normal truncate font-bold">
                {assetName}
              </p>
              <span>
                Owned By{" "}
                <span className="text-primary-default">
                  @{"author" in metadata ? metadata.author : "Unknown"}
                </span>
              </span>
              <p className="mt-4 text-base whitespace-normal">{description}</p>
            </div>
          </div>
          <div className="w-full">
            <NftInfoCard nft={props.nft} />
          </div>
        </div>
      </div>
    </Main>
  );
};
export default NftDetails;
