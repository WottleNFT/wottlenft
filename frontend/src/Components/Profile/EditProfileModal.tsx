import { IonButton, IonContent, IonIcon, IonSpinner } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { ChangeEvent, useState } from "react";
import { ProfileData } from "../../hooks/useProfile";

interface Props {
	dismiss: () => void;
	profileData: ProfileData;
	updateBio: (bio: string) => Promise<Response>;
}

const EditProfileModal = ({ dismiss, profileData, updateBio }: Props) => {
	const [image, setImage] = useState<File | undefined>();
	const [bio, setBio] = useState<string | undefined>();
	const [submittingBio, setSubmittingBio] = useState<boolean>(false);

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
	}

	return (
		<IonContent>
				<div className="flex flex-col h-full px-10 pt-5">
					<div className="relative py-2 border-b-2 border-solid border-primary-default">
						<p className="inline-block w-full text-2xl font-bold text-center">Edit profile 
							<IonIcon onClick={() => dismiss()} icon={closeOutline} className="absolute right-0 hover:cursor-pointer" size="large" />
						</p>
					</div>
					<div className="flex items-center justify-around mt-5">
						{image ? 
							<img className="object-cover w-56 h-56 border-4 border-solid rounded-full border-primary-default"
								alt="uploaded image"
								src={URL.createObjectURL(image)}
							/>
							:
								<label className="flex items-center justify-center w-56 h-56 font-bold text-center rounded-full hover:cursor-pointer bg-primary-default">
									Click to upload
									<input
										hidden
										type="file"
										onChange={onImageChange}
									/>
								</label>
						}
						<div className="flex flex-col">
							{image && 
								<IonButton color="danger" onClick={() => setImage(undefined)}>Remove picture</IonButton>
							}
							<IonButton>Update profile picture</IonButton>
						</div>
					</div>
					<div className="px-5 mt-5">
						<label className="pl-2 text-lg font-bold">
							Bio (max 64 characters)
							<textarea
								maxLength={64}
								className="w-full p-3 border-2 border-gray-400 border-solid rounded-lg resize-none"
								value={bio}
								onChange={e => setBio(e.target.value)}
							/>
						</label>
						{submittingBio && <IonSpinner name="crescent" />}
						{!submittingBio && <IonButton onClick={handleUpdateBio}>Update Bio</IonButton>}
					</div>
				</div>
		</IonContent>
	);
}
export default EditProfileModal