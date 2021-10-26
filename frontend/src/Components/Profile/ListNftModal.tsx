import { IonButton, IonContent, IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { useState } from "react";
import { Nft } from "../../types/Nft";

interface Props {
	nft: Nft;
	dismiss: () => void;
}

	const ListNftModal = ({ nft, dismiss }: Props) => {
  const { assetName, metadata } = nft;
  const { image } = metadata;

  const imageHash = image.replace("ipfs://", "");
  const imageUrl = `https://ipfs.io/ipfs/${imageHash}`;
	const [listPrice, setListPrice] = useState<string | undefined>();

		return (
			<IonContent>
				<div className="flex flex-col h-full px-10 pt-5">
					<div className="relative py-2 border-b-2 border-solid border-primary-default">
						<p className="inline-block w-full text-2xl font-bold text-center">List NFT
							<IonIcon onClick={() => dismiss()} icon={closeOutline} className="absolute right-0 hover:cursor-pointer" size="large" />
						</p>
					</div>
					<img
						src={imageUrl}
						alt="NFT image"
						className="object-contain py-5 max-h-96"
					/>
					<div className="flex flex-col text-lg leading-loose text-center">
						<p>You are about to list <span className="font-bold">{assetName}</span>, created by <span className="font-bold">@{metadata.author}</span></p>
						<p>By clicking <b>List</b>, you are agreeing to WottleNFT's Terms and Conditions</p>
						<label className="mt-4 mb-1 font-bold">
							Price: ₳  
							<input 
								type="number"
								placeholder="Enter list price"
								className="p-2 ml-2 border border-gray-200 border-solid rounded-lg shadow-md drop-shadow-md" 
								value={listPrice}
								min="5"
								onChange={e => setListPrice(e.target.value)}
							/>
						</label>
						<p className="text-sm">Minimum list price: ₳5</p>
						<div className="self-center w-56 py-5">
							<IonButton expand="block" size="large">List</IonButton>
						</div>
					</div>
				</div>
			</IonContent>
		);
	}
	export default ListNftModal
