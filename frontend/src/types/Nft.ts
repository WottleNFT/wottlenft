export type Nft = {
  policyId: string;
  assetName: string;
  quantity: number;
  metadata: NftMetadata;
};

export type NftMetadata = {
  description: string;
  image: string;
  creator: string;
  name: string;
  [key: string]: string;
};
