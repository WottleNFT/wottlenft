import { useEffect, useState } from "react";
import { editBioApi, profileInfoApi } from "../lib/profileApi";
import useAuth from "./useAuth"

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
	const { isLoading, isLoggedIn, getAccessToken } = useAuth();
	const [profileData, setProfileData] = useState<ProfileData | undefined>();
	const [profileDataReady, setProfileDataReady] = useState<boolean>(false);

	useEffect(() => {
		if (!isLoading && isLoggedIn) {
			try {
				const fetchProfileInfo = async () => {
					const res = await fetch(profileInfoApi, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${getAccessToken()}`
						},
					});
					const data = await res.json();
					setProfileData(data);
					setProfileDataReady(true);
				}
				fetchProfileInfo();
			} catch (e) {
				console.error(e);
			}
		}
	}, [isLoading]);

	const updateBio = async (bio: string) => {
		const payload = {
			newBio: bio,
		}
		console.log(getAccessToken())
		console.log(payload);
		const res = await fetch(editBioApi, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${getAccessToken()}`
			},
			body: JSON.stringify(payload),
		});
		return res;
	}

	return {
		profileDataReady,
		profileData,
		updateBio,
	}
}
export default useProfile