import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from ".";
import {
  Enabled,
  initializeWallet,
  Loading,
  NoExtension,
  NotEnabled,
  Status,
} from "../features/wallet/walletSlice";
import { NamiWallet } from "../wallet";

type HasExtension = {
  cardano: NamiWallet;
};

type Present = (HasExtension & Enabled) | (HasExtension & NotEnabled);
type NotPresent = NoExtension | Loading;

const useWallet = (): Present | NotPresent => {
  const wallet = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeWallet());
  }, [dispatch]);

  if (wallet.status === Status.Loading)
    return {
      status: Status.Loading,
    };

  if (wallet.status === Status.NoExtension)
    return {
      status: Status.NoExtension,
    };

  return {
    cardano: window.cardano as NamiWallet,
    ...wallet,
  };
};

export default useWallet;
