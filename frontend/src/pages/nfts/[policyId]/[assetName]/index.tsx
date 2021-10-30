import { GetServerSideProps } from "next";

import NftDetails from "../../../../Components/Nfts/NftDetails";
import { Main } from "../../../../templates/Main";
import { Nft } from "../../../../types/Nft";
import { getImgUrl, responseToNft } from "../../../../utils/NftUtil";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { policyId, assetName } = context.params!;
  const id = policyId as string;
  const name = assetName as string;

  const res = await fetch(
    `${process.env.BLOCKCHAIN_API}/nft/single/${id}/${name}`
  );

  return {
    props: {
      nft: responseToNft(await res.json()),
    },
  };
};

type Props = {
  nft: Nft;
};

const NftDetailsPage = ({ nft }: Props) => {
  const { metadata, assetName, policyId } = nft;
  const { description, image } = metadata;

  const imageUrl = getImgUrl(image);

  return (
    <Main
      openGraph={{
        type: "website",
        url: `https://wottlenft.io/nfts/${policyId}/${assetName}`,
        title: `WottleNFT | ${assetName}`,
        description,
        images: [
          {
            url: imageUrl,
            width: 600,
            height: 600,
            alt: "NFT Image",
            type: "image/png",
          },
        ],
      }}
    >
      <NftDetails nft={nft} />
    </Main>
  );
};
export default NftDetailsPage;
