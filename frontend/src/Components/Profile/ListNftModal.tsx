import { useState } from "react";

import { IonButton, IonContent, IonIcon, IonSpinner } from "@ionic/react";
import { closeOutline } from "ionicons/icons";

import { WottleWalletState } from "../../hooks/useWallet";
import { SellNftRequest, UnGoal, sellNft } from "../../lib/marketplaceApi";
import { signTransaction } from "../../lib/transactionApi";
import { Nft } from "../../types/Nft";
import { NamiWallet } from "../../wallet";
import ListSuccessModal from "./ListSuccessModal";

interface Props {
  nft: Nft;
  dismiss: () => void;
  wallet: WottleWalletState;
}

const ListNftModal = ({ nft, dismiss, wallet }: Props) => {
  const { assetName, metadata } = nft;
  const { image } = metadata;
  const namiWallet = wallet as any;
  const cardano = namiWallet.cardano as NamiWallet;
  const url = namiWallet.state.backendApi;

  const imageHash = image.replace("ipfs://", "");
  const imageUrl = `https://ipfs.io/ipfs/${imageHash}`;
  const [listPrice, setListPrice] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [listTxId, setListTxId] = useState<string | undefined>();

  // Handles listing of nft
  const listNft = async (nftInfo: Nft) => {
    if (listPrice === "") {
      setError("Enter a list price!");
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
      const request: SellNftRequest = {
        sellerAddress: namiWallet.state.address,
        policyId: nftInfo.policyId,
        assetName: nftInfo.assetName,
        unGoal: UnGoal.ZeroHunger,
        price: priceInLovelace,
      };
      const { transaction } = await sellNft(url, request);
      const signature = await cardano.signTx(transaction);
      const signResponse = await signTransaction(url, transaction, signature);
      console.log(signResponse);
      setListTxId(signResponse.tx_id);
    } catch (e) {
      console.error(e);
      setError("Listing failed, something went wrong...");
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
                <span className="font-bold">@{metadata.author}</span>
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
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="self-center w-56 py-5">
                {isSubmitting ? (
                  <IonSpinner name="crescent" />
                ) : (
                  <IonButton
                    onClick={() => listNft(nft)}
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
        {listTxId && <ListSuccessModal transactionId={listTxId} apiUrl={url} />}
      </div>
    </IonContent>
  );
};
export default ListNftModal;
