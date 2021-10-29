import React from "react";

import { IonIcon, IonSpinner, useIonModal } from "@ionic/react";
import { createOutline } from "ionicons/icons";
import Link from "next/link";

import EditProfileModal from "../../Components/Profile/EditProfileModal";
import StatsBar from "../../Components/Profile/StatsBar";
import Tabs from "../../Components/Profile/Tabs";
import { Status } from "../../features/wallet/walletSlice";
import useAuth from "../../hooks/useAuth";
import useProfile, { ProfileData } from "../../hooks/useProfile";
import { Main } from "../../templates/Main";

const Profile = () => {
  const { isLoading, isLoggedIn, wallet } = useAuth();
  const {
    profileDataReady,
    profileData,
    updateBio,
    updateProfilePic,
    updatePassword,
		updateUnGoal,
  } = useProfile();

  const handleDismiss = () => {
    dismiss();
  };

  // Edit profile data modal
  const [present, dismiss] = useIonModal(EditProfileModal, {
    dismiss: handleDismiss,
    profileData,
    updateBio,
    updateProfilePic,
    updatePassword,
		updateUnGoal,
  });

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
              <div className="relative w-full rounded-none bg- xl:rounded-b-3xl h-80">
                <img
                  src="/assets/blue-sea.png"
                  className="object-cover w-full h-full rounded-none xl:rounded-b-3xl"
                  alt="profile banner"
                />
                <div className="absolute border border-4 rounded-full border-primary-default -bottom-28 w-60 h-60 left-10">
                  {(profileData as ProfileData).user.profile_picture_hash ? (
                    <img
                      src={profileData?.user.profile_picture_hash}
                      alt="profile picture"
                      className="object-cover w-full h-full bg-gray-400 rounded-full"
                    />
                  ) : (
                    <img
                      src="/logo.png"
                      alt="placeholder"
                      className="object-cover w-full h-full bg-gray-400 rounded-full"
                    />
                  )}
                </div>
                <div className="absolute -bottom-8 left-72">
                  <div
                    className="flex items-end text-gray-700 hover:cursor-pointer"
                    onClick={() => present()}
                  >
                    <IonIcon icon={createOutline} />
                    <p className="leading-tight underline">Edit profile</p>
                  </div>
                </div>
              </div>
              {wallet.status === Status.Loading ? (
                <IonSpinner name="crescent" />
              ) : (
                <StatsBar wallet={wallet} activity={2} contribution={3} />
              )}
              <div className="flex flex-col self-start mt-5 ml-11">
                <p className="text-4xl font-bold">
                  @{(profileData as ProfileData).user.username}
                </p>
                <p className="w-56 ml-10 text-blue-400 underline truncate">
                  {(profileData as ProfileData).user.wallet_id}
                </p>
								{(profileData as ProfileData).user.un_goal && 
									<div className="flex items-center self-start h-8 px-4 mt-3 rounded-2xl bg-primary-light">
										<p className="font-semibold text-primary-default">{(profileData as ProfileData).user.un_goal}</p>
									</div>
								}
                <p className="mt-4 text-3xl font-bold">
                  {(profileData as ProfileData).user.bio
                    ? (profileData as ProfileData).user.bio
                    : ""}
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
