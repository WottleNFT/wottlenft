export type Nft = {
  policyId: string;
  assetName: string;
  quantity: number;
  metadata: {
    author: string;
    description: string;
    image: string;
    name: string;
    [key: string]: string;
  };
};
