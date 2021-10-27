import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import {
  editBioApi,
  editPasswordApi,
  editProfilePictureApi,
  profileInfoApi,
} from "../lib/profileApi";
import useAuth from "./useAuth";

export interface ProfileData {
  user: User;
}

export interface User {
  email: string;
  username: string;
  wallet_id: string;
  bio?: string;
  profile_picture_hash?: string;
}

const useProfile = () => {
  // WARNING! This hook will redirect user back to login if access token has expired

  const { isLoading, isLoggedIn, getAccessToken, setLogout } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | undefined>();
  const [profileDataReady, setProfileDataReady] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      try {
        const fetchProfileInfo = async () => {
          const res = await fetch(profileInfoApi, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getAccessToken()}`,
            },
          });
          if (res.status === 401) {
            setLogout();
            router.push("/login");
            return;
          }
          const data = await res.json();
          setProfileData(data);
          setProfileDataReady(true);
        };
        fetchProfileInfo();
      } catch (e) {
        console.error(e);
      }
    }
  }, [isLoading]);

  const updateBio = async (bio: string) => {
    const payload = {
      newBio: bio,
    };
    const res = await fetch(editBioApi, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify(payload),
    });
    if (res.status === 401) {
      setLogout();
      router.push("/login");
    }

    return res;
  };

  const updateProfilePic = async (imageUrl: string) => {
    const payload = {
      newProfilePictureHash: imageUrl,
    };

    const res = await fetch(editProfilePictureApi, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify(payload),
    });
    if (res.status === 401) {
      setLogout();
      router.push("/login");
    }
    return res;
  };

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    const payload = {
      oldPassword,
      newPassword,
    };

    const res = await fetch(editPasswordApi, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify(payload),
    });
    return res;
  };

  return {
    profileDataReady,
    profileData,
    updateBio,
    updateProfilePic,
    updatePassword,
  };
};
export default useProfile;
