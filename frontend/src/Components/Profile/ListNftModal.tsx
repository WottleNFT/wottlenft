import { useState } from "react";

import { IonButton, IonContent, IonIcon, IonSpinner } from "@ionic/react";
import { closeOutline } from "ionicons/icons";

import { WottleEnabled } from "../../hooks/useWallet";
import { listNft } from "../../lib/combinedMarketplaceEndpoints";
import { UnGoal } from "../../lib/marketplaceApi";
import { Nft } from "../../types/Nft";
import ListSuccessModal from "./ListSuccessModal";

interface Props {
  nft: Nft;
  dismiss: () => void;
  wallet: WottleEnabled;
}

const ListNftModal = ({ nft, dismiss, wallet }: Props) => {
  const { assetName, metadata } = nft;
  const { image } = metadata;

  const imageHash = image.replace("ipfs://", "");
  const imageUrl = `https://ipfs.io/ipfs/${imageHash}`;
  const [listPrice, setListPrice] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [listTxId, setListTxId] = useState<string | undefined>();
  const [sdgGoal, setSdgGoal] = useState<UnGoal | undefined>();

  // Handles listing of nft
  const handleListNft = async () => {
    if (listPrice === "") {
      setError("Enter a list price!");
      return;
    }
    if (!sdgGoal) {
      setError("Please select a UN Goal");
      return;
    }

    // Convert to lovelace
    const priceInAda = Number.parseFloat(listPrice);
    const priceInLovelace = priceInAda * 1000000;

    // Price validation: Above 5 ada and within 6 DP
    if (priceInAda < 5) {
      setError("Please enter a list price that is at least ₳5.");
      return;
    }
    if (priceInLovelace !== Math.floor(priceInLovelace)) {
      setError("Please limit your price to 6 decimal places.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await listNft(wallet, nft, priceInLovelace, sdgGoal);
      setListTxId(res);
    } catch (e) {
      console.error(e);
      setError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <IonContent>
      <div className="flex flex-col h-full px-10 pt-5">
        <div className="relative py-2 border-b-2 border-solid border-primary-default">
          <p className={`inline-block w-full text-2xl font-bold text-center`}>
            {listTxId ? "Congratulations!" : "List NFT"}
            <IonIcon
              onClick={() => dismiss()}
              icon={closeOutline}
              className="absolute right-0 text-black hover:cursor-pointer"
              size="large"
            />
          </p>
        </div>
        {!listTxId && (
          <>
            <img
              src={imageUrl}
              alt="NFT image"
              className="object-contain py-5 max-h-96"
            />
            <div className="flex flex-col text-lg leading-loose text-center">
              <p>
                You are about to list{" "}
                <span className="font-bold">{assetName}</span>, created by{" "}
                <span className="font-bold">
                  @{metadata.creator ? metadata.creator : "Unknown"}
                </span>
              </p>
              <p>
                By clicking <b>List</b>, you are agreeing to WottleNFT&apos;s
                Terms and Conditions
              </p>
              <label className="mt-4 mb-1 font-bold">
                Price: ₳
                <input
                  type="number"
                  placeholder="Enter list price"
                  className="p-2 ml-2 border border-gray-200 border-solid rounded-lg shadow-md drop-shadow-md"
                  value={listPrice}
                  min="5"
                  step="0.000001"
                  onChange={(e) => setListPrice(e.target.value)}
                />
              </label>
              <p className="text-sm">Minimum list price: ₳5</p>
              <div className="px-5 mt-5">
                <p className="pl-2 text-lg font-bold text-left">
                  Select sustainable Development Goal
                </p>
                <div className="flex justify-between w-full py-3">
                  <img
                    src="/assets/un_goals/zero_hunger.png"
                    alt="Zero hunger"
                    className={`hover:ring-4 ring-blue-400 hover:cursor-pointer ${
                      sdgGoal === UnGoal.ZeroHunger && "ring-4"
                    }`}
                    onClick={() => setSdgGoal(UnGoal.ZeroHunger)}
                  />
                  <img
                    src="/assets/un_goals/quality_education.png"
                    alt="Quality education"
                    className={`hover:ring-4 ring-blue-400 hover:cursor-pointer ${
                      sdgGoal === UnGoal.QualityEducation && "ring-4"
                    }`}
                    onClick={() => setSdgGoal(UnGoal.QualityEducation)}
                  />
                  <img
                    src="/assets/un_goals/climate_action.png"
                    alt="Climate action"
                    className={`hover:ring-4 ring-blue-400 hover:cursor-pointer ${
                      sdgGoal === UnGoal.ClimateAction && "ring-4"
                    }`}
                    onClick={() => setSdgGoal(UnGoal.ClimateAction)}
                  />
                </div>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="self-center w-56 py-5">
                {isSubmitting ? (
                  <IonSpinner name="crescent" />
                ) : (
                  <IonButton
                    onClick={handleListNft}
                    expand="block"
                    size="large"
                  >
                    List
                  </IonButton>
                )}
              </div>
            </div>
          </>
        )}
        {listTxId && <ListSuccessModal transactionId={listTxId} />}
      </div>
    </IonContent>
  );
};
export default ListNftModal;
