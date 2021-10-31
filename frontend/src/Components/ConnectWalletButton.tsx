import React, { useEffect } from "react";

import { IonSpinner } from "@ionic/react";

import {
  initializeWallet,
  setLoading,
  Status,
} from "../features/wallet/walletSlice";
import { useAppDispatch } from "../hooks";
import useWallet from "../hooks/useWallet";
import { Subscription } from "../wallet";
import NamiWalletPill from "./NamiWalletPill";
import WalletInfoPill from "./WalletInfoPill";
import WalletSwitch from "./WalletSwitch";

const ConnectWalletButton: React.FC = () => {
  const wallet = useWallet();
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.onload = () => {
      dispatch(setLoading());
      dispatch(initializeWallet());
    };
    dispatch(initializeWallet());
  }, [dispatch]);

  useEffect(() => {
    let sub1: Subscription;
    let sub2: Subscription;
    if (wallet.status === Status.Enabled) {
      sub1 = wallet.cardano.onAccountChange((_) =>
        dispatch(initializeWallet())
      );

      sub2 = wallet.cardano.onNetworkChange((_) => {
        dispatch(initializeWallet());
      });
    }
    return () => {
      if (sub1) sub1.remove();
      if (sub2) sub2.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.status, dispatch]);

  return (
    <WalletSwitch
      wallet={wallet}
      loading={
        <div className="flex h-20 place-items-center">
          <IonSpinner name="crescent" />
        </div>
      }
      noExtension={<NamiWalletPill />}
      notEnabled={(notEnabledWallet) => (
        <button
          className="self-end w-48 h-12 m-5 text-white bg-black rounded-full"
          onClick={() =>
            notEnabledWallet.cardano
              .enable()
              .then(() => dispatch(initializeWallet()))
          }
        >
          Connect to wallet
        </button>
      )}
      enabled={(enabledWallet) => <WalletInfoPill {...enabledWallet.state} />}
      wrongNetwork={({ message }) => (
        <div className="flex h-20 pr-3 place-items-center">{message}</div>
      )}
      fallback={<></>}
    />
  );
};
export default ConnectWalletButton;
