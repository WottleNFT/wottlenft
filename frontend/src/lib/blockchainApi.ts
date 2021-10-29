import axios from "axios";

export const blockchainApi = "/api/blockchain";

export type Balance = {
  total_value: number;
};

export const getBalance = async (address: string): Promise<Balance> => {
  return (await axios.get(`${blockchainApi}/address/${address}/balance`)).data;
};
