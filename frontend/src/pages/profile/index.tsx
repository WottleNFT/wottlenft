import React from "react";

import { IonIcon, IonSpinner, useIonModal } from "@ionic/react";
import { createOutline, wallet } from "ionicons/icons";
import Link from "next/link";

import StatsBar from "../../Components/Profile/StatsBar";
import Tabs from "../../Components/Profile/Tabs";
import useAuth from "../../hooks/useAuth";
import { Main } from "../../templates/Main";
import useProfile, { ProfileData } from "../../hooks/useProfile";
import EditProfileModal from "../../Components/Profile/EditProfileModal";
import useWallet from "../../hooks/useWallet";

const Profile = () => {
	const wallet = useWallet();
  const { isLoading, isLoggedIn, getAccessToken } = useAuth();
	const { profileDataReady, profileData, updateBio } = useProfile();

	const handleDismiss = () => {
		dismiss();
	}

	const handleUpdateBio = (bio: string) => {
		return updateBio(bio);
	}

	// Edit profile data modal
	const [present, dismiss] = useIonModal(EditProfileModal, {
		dismiss: handleDismiss, 
		profileData: profileData,
		updateBio: handleUpdateBio, 
	})

  return (
    <Main title="Profile">
      <div className="flex flex-col w-full min-h-full px-0 mx-auto max-w-maxBody xl:px-48">
        {isLoading && <IonSpinner name="crescent" className="self-center" />}
        {!isLoading && !isLoggedIn && (
          <p className="self-center text-3xl font-bold mt-52">
            <Link href="/login">
              <a className="hover:text-blue-600 hover:underline">Login</a>
            </Link>{" "}
            to view your profile
          </p>
        )}
        {!isLoading && isLoggedIn && profileDataReady && (
          <>
            <div className="flex flex-col items-center h-4/5">
              <div className="relative w-full rounded-none xl:rounded-b-3xl h-80">
                <img
                  src="https://picsum.photos/1000"
                  className="object-cover w-full h-full rounded-none xl:rounded-b-3xl"
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
                  <div className="flex items-end text-gray-700 hover:cursor-pointer" onClick={() => present()}>
                    <IonIcon icon={createOutline} />
                    <p className="leading-tight underline">Edit profile</p>
                  </div>
                </div>
              </div>
              <StatsBar wallet={wallet} activity={2} contribution={3} />
              <div className="flex flex-col self-start mt-5 ml-11">
                <p className="text-4xl font-bold">@{(profileData as ProfileData).user.username}</p>
                <p className="w-56 ml-10 text-blue-400 underline truncate">
									{(profileData as ProfileData).user.wallet_id}
                </p>
                <div className="flex items-center self-start h-8 px-4 mt-3 rounded-2xl bg-primary-light">
                  <p className="font-semibold text-primary-default">UN Goal</p>
                </div>
                <p className="mt-4 text-3xl font-bold">
									{(profileData as ProfileData).user.bio ? (profileData as ProfileData).user.bio : ""}
                </p>
              </div>
              <Tabs wallet={wallet} />
            </div>
          </>
        )}
      </div>
    </Main>
  );
};
export default Profile;

