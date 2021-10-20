import React from "react";

import { IonSpinner } from "@ionic/react";
import Link from "next/link";

import DisplayMessage from "../../Components/UserNfts/DisplayMessage";
import NftList from "../../Components/UserNfts/NftList";
import WalletSwitch from "../../Components/WalletSwitch";
import useAuth from "../../hooks/useAuth";
import useWallet from "../../hooks/useWallet";
import { Main } from "../../templates/Main";

const UserNfts = () => {
  const wallet = useWallet();
  const { isLoading, isLoggedIn } = useAuth();

  return (
    <Main title="Profile">
      <div className="flex justify-center w-full min-h-full bg-primary-default">
        {isLoading && <IonSpinner name="crescent" className="self-center" />}
        {!isLoading && !isLoggedIn && (
          <p className="self-center text-3xl font-bold">
            <Link href="/login">
              <a className="hover:text-blue-600 hover:underline">Login</a>
            </Link>{" "}
            to view your profile
          </p>
        )}
        {!isLoading && isLoggedIn && (
          <WalletSwitch
            wallet={wallet}
            loading={<DisplayMessage text="Loading your wallet..." />}
            notEnabled={<DisplayMessage text="Please enable Nami Wallet" />}
            enabled={(enabledWallet) => (
              <NftList
                address={enabledWallet.state.address}
                baseUrl={enabledWallet.state.backendApi}
              />
            )}
            fallback={<DisplayMessage text="Please get Nami Wallet" />}
          />
        )}
      </div>
    </Main>
  );
};
export default UserNfts;
