import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { Nft } from "../../types/Nft";

interface Props {
	nft: Nft;
}

	const ListNftModal = ({ nft }: Props) => {
  const { assetName, metadata } = nft;
  const { image } = metadata;

  const imageHash = image.replace("ipfs://", "");
  const imageUrl = `https://ipfs.io/ipfs/${imageHash}`;

		return (
			<div className="flex flex-col h-full px-10 py-5">
				<div className="relative py-2 border-b-2 border-solid border-primary-default">
					<p className="inline-block w-full text-2xl font-bold text-center">List NFT
						<IonIcon icon={closeOutline} className="absolute right-0" size="large" />
					</p>
				</div>
				<img
					src={imageUrl}
					alt="NFT image"
					className="object-contain py-5 max-h-96"
				/>
				<div className="flex flex-col text-lg leading-loose text-center">
					<p>You are about to list <span className="font-bold">{assetName}</span>, created by <span className="font-bold">@{metadata.author}</span></p>
					<label className="font-bold">
						Price: ₳  
						<input 
							type="number"
							placeholder="Enter list price"
							className="p-2 ml-2 border border-gray-200 border-solid rounded-lg shadow-md drop-shadow-md" 
						/>
					</label>
					<p>By clicking <b>List</b>, you are agreeing to WottleNFT's Terms and Conditions</p>
				</div>
			</div>
		);
	}
	export default ListNftModal
