import React from "react";

import Image from "next/image";

import { Nft } from "../../types/Nft";
import { getImgUrl } from "../../utils/NftUtil";
import NftInfoCard from "../Nfts/NftInfoCard";
import SocialShare from "../Nfts/SocialShare";

type Props = {
  nft: Nft;
  price?: number;
  button?: JSX.Element;
  txHash?: string;
};

const NftDetails = ({ nft, price, button, txHash }: Props) => {
  const { metadata, assetName } = nft;
  const { description, image, name } = metadata;

  const imageUrl = getImgUrl(image || "");

  return (
    <div className="flex flex-col items-center px-4 md:px-12 2xl:px-52">
      <div className="relative w-full m-4 h-70vh min-h-320">
        <Image
          className="rounded-2xl"
          alt="NFT Image"
          layout="fill"
          objectFit="contain"
          src={imageUrl}
        />
      </div>
      <div className="flex flex-col self-stretch gap-6 p-6 md:flex-row">
        <div className="w-full">
          <div className="flex flex-col text-left">
            <p className="w-full text-2xl font-bold truncate whitespace-normal">
              {name || assetName}
            </p>
            {(metadata.creator || metadata.author) && (
              <span>
                Created By{" "}
                <span className="text-primary-default">
                  @{metadata.creator || metadata.author}
                </span>
              </span>
            )}
            <p className="mt-4 text-base whitespace-normal">{description}</p>
          </div>
          <SocialShare nft={nft} txHash={txHash} />
        </div>
        <div className="w-full">
          <NftInfoCard nft={nft} price={price} button={button} />
        </div>
      </div>
    </div>
  );
};
export default NftDetails;
