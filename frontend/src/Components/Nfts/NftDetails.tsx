import { Nft } from "../../types/Nft";
import { getImgUrl } from "../../utils/NftUtil";
import NftInfoCard from "./NftInfoCard";

type Props = {
  nft: Nft;
  price?: number;
  button?: JSX.Element;
};

const NftDetails = ({ nft, price, button }: Props) => {
  const { metadata, assetName } = nft;
  const { description, image } = metadata;

  const imageUrl = getImgUrl(image || "");

  return (
    <div className="flex flex-col items-center px-4 md:px-12 2xl:px-52">
      <img
        className="object-contain p-4 h-3/4 min-h-320 rounded-2xl"
        alt="NFT Image"
        src={imageUrl}
      />
      <div className="flex flex-col self-stretch gap-6 p-6 md:flex-row">
        <div className="w-full">
          <div className="flex flex-col text-left">
            <p className="w-full text-2xl font-bold truncate whitespace-normal">
              {assetName}
            </p>
            <span>
              Created By{" "}
              <span className="text-primary-default">
                @{"author" in metadata ? metadata.author : "Unknown"}
              </span>
            </span>
            <p className="mt-4 text-base whitespace-normal">{description}</p>
          </div>
        </div>
        <div className="w-full">
          <NftInfoCard nft={nft} price={price} button={button} />
        </div>
      </div>
    </div>
  );
};
export default NftDetails;
