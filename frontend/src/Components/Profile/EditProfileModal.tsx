import { ChangeEvent, useState } from "react";

import { IonButton, IonContent, IonIcon, IonSpinner } from "@ionic/react";
import axios, { AxiosResponse } from "axios";
import { closeOutline } from "ionicons/icons";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { ProfileData } from "../../hooks/useProfile";
import { UnGoal } from "../../lib/marketplaceApi";
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
  updateUnGoal: (unGoal: UnGoal) => Promise<Response>;
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
  updateUnGoal,
}: Props) => {
  const [image, setImage] = useState<File | undefined>();
  const [bio, setBio] = useState<string | undefined>();
  const [sdgGoal, setSdgGoal] = useState<UnGoal | undefined>();

  // Submitting status
  const [submittingBio, setSubmittingBio] = useState<boolean>(false);
  const [submittingProfilePic, setSubmittingProfilePic] =
    useState<boolean>(false);
  const [submittingPassword, setSubmittingPassword] = useState<boolean>(false);
  const [submittingSdg, setSubmittingSdg] = useState<boolean>(false);

  // Errors
  const [changePwError, setChangePwError] = useState<string | undefined>();
  const [profilePicError, setProfilePicError] = useState<string | undefined>();
  const [sdgError, setSdgError] = useState<string | undefined>();

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
        window.location.reload();
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
      // console.error(e);
      setProfilePicError("Error uploading image");
      setSubmittingProfilePic(false);
      return;
    }

    try {
      const res = await updateProfilePic(imageUrl as string);
      if (res.status === 202) {
        alert("Profile picture successfully changed!");
        window.location.reload();
      }
    } catch (e) {
      // console.error(e);
      setProfilePicError("Error updating profile picture");
    } finally {
      setSubmittingProfilePic(false);
    }
  };

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

  const handleUpdateSdg = async () => {
    if (!sdgGoal) {
      setSdgError("Select an SDG Goal");
      return;
    }
    setSubmittingSdg(true);
    try {
      const res = await updateUnGoal(sdgGoal);
      if (res.status === 202) {
        alert("SDG successfully updated!");
        window.location.reload();
      } else {
        setSdgError("An error occurred");
      }
    } catch (e) {
      console.error(e);
      setSdgError("An error occurred");
    } finally {
      setSubmittingSdg(false);
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
            <Image
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
            {profilePicError && (
              <span className="text-sm text-center text-red-500">
                {profilePicError}
              </span>
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
          <p className="pl-2 text-lg font-bold">Sustainable Development Goal</p>
          <div className="flex justify-between w-full py-3">
            <Image
              src="/assets/un_goals/zero_hunger.png"
              alt="Zero hunger"
              className={`hover:ring-4 ring-blue-400 hover:cursor-pointer ${
                sdgGoal === UnGoal.ZeroHunger && "ring-4"
              }`}
              onClick={() => setSdgGoal(UnGoal.ZeroHunger)}
            />
            <Image
              src="/assets/un_goals/quality_education.png"
              alt="Quality education"
              className={`hover:ring-4 ring-blue-400 hover:cursor-pointer ${
                sdgGoal === UnGoal.QualityEducation && "ring-4"
              }`}
              onClick={() => setSdgGoal(UnGoal.QualityEducation)}
            />
            <Image
              src="/assets/un_goals/climate_action.png"
              alt="Climate action"
              className={`hover:ring-4 ring-blue-400 hover:cursor-pointer ${
                sdgGoal === UnGoal.ClimateAction && "ring-4"
              }`}
              onClick={() => setSdgGoal(UnGoal.ClimateAction)}
            />
          </div>
          {!submittingSdg && (
            <IonButton onClick={handleUpdateSdg}>Update SDG</IonButton>
          )}
          {submittingSdg && <IonSpinner name="crescent" />}
          {sdgError && (
            <span className="block text-sm text-red-500">{sdgError}</span>
          )}
        </div>
        <div className="px-5 py-5">
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
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,}$/,
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
              <IonButton type="submit">Update password</IonButton>
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
