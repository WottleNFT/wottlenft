import { MarketplaceListing } from "../lib/marketplaceApi";
import { Nft } from "../types/Nft";

export const responseToNft = (nftResponse: any): Nft => {
  const policyId = Object.keys(nftResponse)[0]!;
  const assetName = Object.keys(nftResponse[policyId])[0]!;
  const metadata = nftResponse[policyId][assetName];

  return {
    policyId,
    assetName,
    quantity: 1,
    metadata,
  };
};

export const listingToNft = (listing: MarketplaceListing): Nft => {
  const { policyId, assetName, assetMetadata } = listing;
  const metadata = (assetMetadata[policyId] || {})[assetName];
  const nft: Nft = {
    policyId,
    assetName,
    quantity: 1,
    metadata,
  };
  return nft;
};

export const getImgUrl = (image: string): string => {
  if (image.startsWith("ipfs://")) {
    const imageHash = image.replace("ipfs://", "");
    return `https://ipfs.io/ipfs/${imageHash}`;
  }
  return image;
};

export const formatPrice = (price: number): string | number => {
  return price % 1 !== 0 ? price.toFixed(2) : price;
};
