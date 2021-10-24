import axios, { AxiosResponse } from "axios";

import { TransactionResponse } from "../types/Transactions";

export enum UnGoal {
  ClimateAction = "ClimateAction",
  ZeroHunger = "ZeroHunger",
  QualityEducation = "QualityEducation",
}

export type SellNftRequest = {
  sellerAddress: string;
  policyId: string;
  assetName: string;
  unGoal: UnGoal;
  price: number;
};

export const sellNft = async (
  baseUrl: string,
  request: SellNftRequest
): Promise<TransactionResponse> => {
  console.log(request);
  const response = await axios.post<
    SellNftRequest,
    AxiosResponse<TransactionResponse>
  >(`${baseUrl}/marketplace/sell`, request);

  return response.data;
};
