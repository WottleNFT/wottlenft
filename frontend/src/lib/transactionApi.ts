import axios, { AxiosResponse } from "axios";

import {
  SignTransaction,
  SignTransactionResponse,
} from "../types/Transactions";
import { HexCborString } from "../wallet";
import { blockchainApi } from "./blockchainApi";

export const signTransaction = async (
  transaction: HexCborString,
  signature: HexCborString
): Promise<SignTransactionResponse> => {
  const signResponse = await axios.post<
    SignTransaction,
    AxiosResponse<SignTransactionResponse>
  >(`${blockchainApi}/sign`, {
    signature,
    transaction,
  });
  return signResponse.data;
};
