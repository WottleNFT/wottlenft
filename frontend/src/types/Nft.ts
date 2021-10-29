export type Nft = {
  policyId: string;
  assetName: string;
  quantity: number;
  metadata: {
    description: string;
    image: string;
    creator: string;
    name: string;
    [key: string]: string;
  };
};
