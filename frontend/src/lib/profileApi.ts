export const profileBaseUrl = process.env.profileApi as string;

export const loginApi = `${profileBaseUrl}/login`;
export const registerApi = `${profileBaseUrl}/register`;

export const accountsBaseApi = `${profileBaseUrl}/accounts`;
export const profileInfoApi = `${accountsBaseApi}/info`;
export const editBioApi = `${accountsBaseApi}/editBio`;
export const editProfilePictureApi = `${accountsBaseApi}/editProfilePicture`;