import React from "react";

import { IonButton, IonIcon, IonSpinner } from "@ionic/react";
import Link from "next/link";

import DisplayMessage from "../../Components/UserNfts/DisplayMessage";
import NftList from "../../Components/UserNfts/NftList";
import WalletSwitch from "../../Components/WalletSwitch";
import StatsBar from "../../Components/Profile/StatsBar";
import useAuth from "../../hooks/useAuth";
import useWallet from "../../hooks/useWallet";
import { Main } from "../../templates/Main";
import Tabs from "../../Components/Profile/Tabs";
import { createOutline } from "ionicons/icons";

const Profile = () => {
  const wallet = useWallet();
  const { isLoading, isLoggedIn, setLogout } = useAuth();

  return (
    <Main title="Profile">
      <div className="flex flex-col w-full min-h-full px-0 mx-auto max-w-maxBody xl:px-56">
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
							<div className="relative w-full rounded-none xl:rounded-3xl h-80">
								<img
									src="https://picsum.photos/1000"
									className="object-cover w-full h-full rounded-none xl:rounded-3xl"
									alt="profile banner"
								/>
								<div className="absolute bg-pink-400 border border-4 rounded-full border-primary-default -bottom-28 w-60 h-60 left-10">
									<img
										src="https://picsum.photos/300"
										alt="profile picture"
										className="object-cover w-full h-full rounded-full"
									/>
								</div>
								<div className="absolute -bottom-8 left-72">
									<div className="flex items-end text-gray-700">
										<IonIcon icon={createOutline} />
										<p className="leading-tight underline">Edit profile</p>
									</div>
								</div>
							</div>
							<StatsBar collection={1} activity={2} contribution={3} />
							<div className="flex flex-col self-start mt-5 ml-11">
								<p className="text-4xl font-bold">@USERNAME</p>
								<p className="ml-10 text-blue-400 underline">addr1vosiadjasdi023...</p>
								<div className="flex items-center self-start h-8 px-4 mt-3 rounded-2xl bg-primary-light">
									<p className="font-semibold text-primary-default">UN Goal</p>
								</div>
								<p className="mt-4 text-3xl font-bold">I like fruits especially applies that are red and juicy.</p>
							</div>
							<Tabs />
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