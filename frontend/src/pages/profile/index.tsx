import React from "react";

import { IonButton, IonSpinner } from "@ionic/react";
import Link from "next/link";

import DisplayMessage from "../../Components/UserNfts/DisplayMessage";
import NftList from "../../Components/UserNfts/NftList";
import WalletSwitch from "../../Components/WalletSwitch";
import useAuth from "../../hooks/useAuth";
import useWallet from "../../hooks/useWallet";
import { Main } from "../../templates/Main";

const Profile = () => {
  const wallet = useWallet();
  const { isLoading, isLoggedIn, setLogout } = useAuth();

  return (
    <Main title="Profile">
      <div className="flex flex-col w-full min-h-full px-20">
        {isLoading && <IonSpinner name="crescent" className="self-center" />}
        {!isLoading && !isLoggedIn && (
          <p className="self-center text-3xl font-bold mt-52">
            <Link href="/login">
              <a className="hover:text-blue-600 hover:underline">Login</a>
            </Link>{" "}
            to view your profile
          </p>
        )}
        {!isLoading && isLoggedIn && (
          <>
            <IonButton
              onClick={() => setLogout()}
              color="secondary"
              size="default"
              className="self-end w-20"
            >
              Logout
            </IonButton>
						<div className="flex flex-col items-center h-4/5">
							<div className="relative w-full mb-40 bg-purple-400 rounded-3xl h-80">
								<img
									src="https://picsum.photos/1000"
									className="object-cover w-full h-full rounded-3xl"
									alt="profile banner"
								/>
								<div className="absolute bg-pink-400 border border-4 rounded-full border-primary-default -bottom-28 w-60 h-60 left-10">
									<img
										src="https://picsum.photos/300"
										alt="profile picture"
										className="object-cover w-full h-full rounded-full"
									/>
								</div>
							</div>
							<p className="self-start text-3xl font-bold ml-14">@USERNAME</p>
							<p className="self-start ml-24 text-blue-400 underline">addr1vosiadjasdi023...</p>
						</div>
          </>
        )}
      </div>
    </Main>
  );
};
export default Profile;

            //<WalletSwitch
            //  wallet={wallet}
            //  loading={<DisplayMessage text="Loading your wallet..." />}
            //  notEnabled={<DisplayMessage text="Please enable Nami Wallet" />}
            //  enabled={(enabledWallet) => (
            //    <NftList
            //      address={enabledWallet.state.address}
            //      baseUrl={enabledWallet.state.backendApi}
            //    />
            //  )}
            //  fallback={<DisplayMessage text="Please get Nami Wallet" />}
            ///>