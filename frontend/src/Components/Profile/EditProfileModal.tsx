import { ChangeEvent, useState } from "react";

import { IonButton, IonContent, IonIcon, IonSpinner } from "@ionic/react";
import axios, { AxiosResponse } from "axios";
import { closeOutline } from "ionicons/icons";
import { useForm } from "react-hook-form";

import { ProfileData } from "../../hooks/useProfile";
import { PinataResponse } from "../../types/PinataResponse";

interface Props {
  dismiss: () => void;
  profileData: ProfileData;
  updateBio: (bio: string) => Promise<Response>;
  updateProfilePic: (imageUrl: string) => Promise<Response>;
  updatePassword: (
    oldPassword: string,
    newPassword: string
  ) => Promise<Response>;
}

interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const EditProfileModal = ({
  dismiss,
  updateBio,
  updateProfilePic,
  updatePassword,
}: Props) => {
  const [image, setImage] = useState<File | undefined>();
  const [bio, setBio] = useState<string | undefined>();
  const [submittingBio, setSubmittingBio] = useState<boolean>(false);
  const [submittingProfilePic, setSubmittingProfilePic] =
    useState<boolean>(false);
  const [changePwError, setChangePwError] = useState<string | undefined>();
  const [submittingPassword, setSubmittingPassword] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ChangePassword>();
  const newPassword = watch("newPassword", "");

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
      alert("No image selected");
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

  // Handles changing password
  const handleChangePassword = async (data: ChangePassword) => {
    setSubmittingPassword(true);
    try {
      const res = await updatePassword(data.oldPassword, data.newPassword);
      if (res.status === 202) {
        alert("Password successfully changed!");
      } else {
        const resMsg = await res.text();
        setChangePwError(JSON.parse(resMsg).errorMessage);
      }
    } catch (e) {
      console.error(e);
      setChangePwError("Something went wrong...");
    } finally {
      setSubmittingPassword(false);
    }
  };

  const getErrorMessages = () => {
    if (errors.newPassword?.type === "pattern") {
      return "Password does not conform to required pattern";
    }
    if (errors.confirmPassword?.type === "validate") {
      return "Passwords do not match";
    }
    if (changePwError) {
      return changePwError;
    }
    return "";
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
              className="w-full p-3 border border-gray-400 border-solid rounded-lg resize-none"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="A one-liner that best describes you!"
            />
          </label>
          {submittingBio && <IonSpinner name="crescent" />}
          {!submittingBio && (
            <IonButton onClick={handleUpdateBio}>Update Bio</IonButton>
          )}
        </div>
        <div className="px-5 mt-5">
          <p className="pl-2 text-lg font-bold">Change password</p>
          <form
            className="table my-3"
            onSubmit={handleSubmit(handleChangePassword)}
          >
            <div className="table-row h-10">
              <label className="table-cell mt-5">Old password</label>
              <input
                type="password"
                className={`table-cell px-2 py-1 ml-3 border border-gray-400 rounded-md ${
                  errors.oldPassword ? "ring-2 ring-red-500" : ""
                }`}
                {...register("oldPassword", {
                  required: true,
                })}
              />
            </div>
            <div className="table-row h-10">
              <label className="table-cell mt-5">New password</label>
              <input
                type="password"
                className={`table-cell px-2 py-1 ml-3 border border-gray-400 rounded-md ${
                  errors.newPassword ? "ring-2 ring-red-500" : ""
                }`}
                {...register("newPassword", {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                })}
              />
            </div>
            <div className="table-row h-10">
              <label className="table-cell mt-5">Confirm new password</label>
              <input
                type="password"
                className={`table-cell px-2 py-1 ml-3 border border-gray-400 rounded-md ${
                  errors.confirmPassword ? "ring-2 ring-red-500" : ""
                }`}
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === newPassword,
                })}
              />
            </div>
            {submittingPassword ? (
              <IonSpinner name="crescent" />
            ) : (
              <IonButton type="submit">Change password</IonButton>
            )}
          </form>
          <span className="block text-sm text-red-500">
            {getErrorMessages()}
          </span>
        </div>
      </div>
    </IonContent>
  );
};
export default EditProfileModal;
