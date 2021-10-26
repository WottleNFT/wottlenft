import { ChangeEvent, useState } from "react";

import { IonButton, IonContent, IonIcon, IonSpinner } from "@ionic/react";
import axios, { AxiosResponse } from "axios";
import { closeOutline } from "ionicons/icons";

import { ProfileData } from "../../hooks/useProfile";
import { PinataResponse } from "../../types/PinataResponse";

interface Props {
  dismiss: () => void;
  profileData: ProfileData;
  updateBio: (bio: string) => Promise<Response>;
  updateProfilePic: (imageUrl: string) => Promise<Response>;
}

const EditProfileModal = ({ dismiss, updateBio, updateProfilePic }: Props) => {
  const [image, setImage] = useState<File | undefined>();
  const [bio, setBio] = useState<string | undefined>();
  const [submittingBio, setSubmittingBio] = useState<boolean>(false);
  const [submittingProfilePic, setSubmittingProfilePic] =
    useState<boolean>(false);

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files || files.length <= 0) {
      setImage(undefined);
      return;
    }

    setImage(files[0]);
  };

  const handleUpdateBio = async () => {
    setSubmittingBio(true);
    try {
      const res = await updateBio(!bio ? "" : bio);
      if (res.status === 202) {
        alert("Bio successfully changed");
      }
    } catch (e) {
      console.error(e);
    }
    setSubmittingBio(false);
  };

  const handleUpdateProfilePicture = async () => {
    if (!image) {
      alert("Cannot leave image blank");
      return;
    }
    setSubmittingProfilePic(true);
    // Upload to Pinata
    const url = "/api/ipfs";
    const formData = new FormData();
    formData.append("file", image as File);
    let imageUrl;
    try {
      const response = await axios.post<
        FormData,
        AxiosResponse<PinataResponse>
      >(url, formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${
            (formData as any).boundary
          }`,
        },
      });
      const pinataData = response.data;
      imageUrl = `https://ipfs.io/ipfs/${pinataData.IpfsHash}`;
    } catch (e) {
      console.error(e);
      console.log("Error uploading to pinata");
      setSubmittingProfilePic(false);
      return;
    }

    try {
      const res = await updateProfilePic(imageUrl as string);
      if (res.status === 202) {
        alert("Profile picture successfully changed!");
      }
    } catch (e) {
      console.error(e);
      console.log("Error updating profile data");
    } finally {
      setSubmittingProfilePic(false);
    }
  };

  return (
    <IonContent>
      <div className="flex flex-col h-full px-10 pt-5">
        <div className="relative py-2 border-b-2 border-solid border-primary-default">
          <p className="inline-block w-full text-2xl font-bold text-center">
            Edit profile
            <IonIcon
              onClick={() => dismiss()}
              icon={closeOutline}
              className="absolute right-0 hover:cursor-pointer"
              size="large"
            />
          </p>
        </div>
        <div className="flex items-center justify-between px-8 mt-5">
          {image ? (
            <img
              className="object-cover w-56 h-56 border-4 border-solid rounded-full border-primary-default"
              alt="uploaded image"
              src={URL.createObjectURL(image)}
            />
          ) : (
            <label className="flex items-center justify-center w-56 h-56 font-bold text-center bg-gray-400 border-4 border-solid rounded-full hover:cursor-pointer border-primary-default">
              Click to upload
              <input hidden type="file" onChange={onImageChange} />
            </label>
          )}
          <div className="flex flex-col justify-center">
            {image && !submittingProfilePic && (
              <IonButton color="danger" onClick={() => setImage(undefined)}>
                Remove picture
              </IonButton>
            )}
            {submittingProfilePic && (
              <IonSpinner className="mr-20" name="crescent" />
            )}
            {!submittingProfilePic && (
              <IonButton onClick={handleUpdateProfilePicture}>
                Update profile picture
              </IonButton>
            )}
          </div>
        </div>
        <div className="px-5 mt-5">
          <label className="pl-2 text-lg font-bold">
            Bio (max 64 characters)
            <textarea
              maxLength={64}
              className="w-full p-3 border-2 border-gray-400 border-solid rounded-lg resize-none"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
          {submittingBio && <IonSpinner name="crescent" />}
          {!submittingBio && (
            <IonButton onClick={handleUpdateBio}>Update Bio</IonButton>
          )}
        </div>
      </div>
    </IonContent>
  );
};
export default EditProfileModal;
