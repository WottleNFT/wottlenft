import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { blockchainApi } from "../lib/blockchainApi";
import { Nft } from "../types/Nft";

export const nftApi = createApi({
  reducerPath: "nftApi",
  baseQuery: fetchBaseQuery({}),
  endpoints: (builder) => ({
    getUserNfts: builder.query<Nft[], { address: string }>({
      query: ({ address }) => `${blockchainApi}/address/${address}/nft`,
    }),
  }),
});

export const { useGetUserNftsQuery } = nftApi;
