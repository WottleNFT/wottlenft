import { configureStore } from "@reduxjs/toolkit";

import namiWalletReducer from "../features/wallet/walletSlice";

export const store = configureStore({
  reducer: {
    wallet: namiWalletReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
