import axios, { AxiosResponse } from "axios";

import { TransactionResponse } from "../types/Transactions";
import { blockchainApi } from "./blockchainApi";

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
  request: SellNftRequest
): Promise<TransactionResponse> => {
  const response = await axios.post<
    SellNftRequest,
    AxiosResponse<TransactionResponse>
  >(`${blockchainApi}/marketplace/sell`, request);

  return response.data;
};

export type NftForSale = {
  policyId: string;
  assetName: string;
  metadata: SaleMetadata;
};

export type SaleMetadata = {
  sellerAddress: string;
  price: number;
  unGoal: UnGoal;
  namiAddress: string;
};

export const getAllNftsForSale = async (): Promise<NftForSale[]> => {
  const response = await axios.get<never, AxiosResponse<NftForSale[]>>(
    `${blockchainApi}/marketplace`
  );
  return response.data;
};

export type BuyNftRequest = {
  buyerAddress: string;
  policyId: string;
  assetName: string;
};

export const buyNft = async (
  request: BuyNftRequest
): Promise<TransactionResponse> => {
  const response = await axios.post<
    BuyNftRequest,
    AxiosResponse<TransactionResponse>
  >(`${blockchainApi}/marketplace/buy`, request);

  return response.data;
};

export type CancelNftRequest = {
  sellerAddress: string;
  policyId: string;
  assetName: string;
};

export const cancelNft = async (
  request: CancelNftRequest
): Promise<TransactionResponse> => {
  const response = await axios.post<
    CancelNftRequest,
    AxiosResponse<TransactionResponse>
  >(`${blockchainApi}/marketplace/cancel`, request);

  return response.data;
};
