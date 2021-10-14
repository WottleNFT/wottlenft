import React, { ChangeEvent, useState } from "react";

import {
  IonButton,
  IonContent,
  IonIcon,
  IonSpinner,
  IonText,
} from "@ionic/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { add, hammer, trash } from "ionicons/icons";

import DisplayTransaction from "../../Components/MintNfts/DisplayTransaction";
import { MAINNET, Status } from "../../features/wallet/walletSlice";
import useTextInput from "../../hooks/useTextInput";
import useWallet from "../../hooks/useWallet";
import { Meta } from "../../layout/Meta";
import { Main } from "../../templates/Main";
import { NetworkError } from "../../types/NetworkError";
import { HexCborString } from "../../wallet";

type Metadata = {
  address: HexCborString;
  name: string;
  description: string;
  image: string;
  [key: string]: string;
};

type Policy = {
  id: string;
  json: JSON;
};

type TransactionResponse = {
  transaction: HexCborString;
  policy: Policy;
};

type SignTransaction = {
  transaction: HexCborString;
  signature: HexCborString;
};

type SignTransactionResponse = {
  tx_id: string;
};

type PinataResponse = {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  isDuplicate: boolean;
};

type CustomFields = Record<string, string | number>;

const MintNftPage = () => {
  const [name, setName, resetName] = useTextInput();
  const [creator, setCreator, resetCreator] = useTextInput();
  const [description, setDescription, resetDescription] = useTextInput();
  const [image, setImage] = useState<File | undefined>(undefined);
  const wallet = useWallet();
  const [newField, setNewField] = useState("");
  const [customFields, setCustomFields] = useState<CustomFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [policyId, setPolicyId] = useState("");
  const [policyJson, setPolicyJson] = useState<JSON>(JSON.parse(`{}`));
  const [error, setError] = useState("");

  const addCustomField = () => {
    if (newField === "") {
      setError("Please provide a name for your metadata field");
      return;
    }
    if (
      newField === "name" ||
      newField === "description" ||
      newField === "image" ||
      newField === "creator" ||
      newField === "address"
    ) {
      setError(`Cannot set ${newField} as field name`);
      return;
    }

    setCustomFields({
      ...customFields,
      [newField]: "",
    });
    setNewField("");
  };

  const renderNewFields = () => {
    return Object.keys(customFields).map((key) => (
      <label key={key} className="w-full pt-2">
        Metadata Name: <span className="font-bold">{key}</span>
        <div className="grid items-center w-full grid-cols-5 gap-2">
          <input
            className="col-span-4 p-3 my-2 border rounded focus:outline-none focus:ring-2"
            placeholder={`Value of Metadata (${key})`}
            type="text"
            value={customFields[key]}
            onChange={(e) => {
              setCustomFields({
                ...customFields,
                [key]: e.target.value,
              });
            }}
          />
          <IonButton
            color="danger"
            onClick={() => {
              const newCustomFields = { ...customFields };
              delete newCustomFields[key];
              setCustomFields(newCustomFields);
            }}
            className="h-12 col-span-1 px-2"
          >
            <IonIcon icon={trash} />
          </IonButton>
        </div>
      </label>
    ));
  };

  const restart = () => {
    setTransactionId("");
    setCustomFields({});
    resetName();
    resetCreator();
    resetDescription();
    setImage(undefined);
    setNewField("");
    setIsSubmitting(false);
    setError("");
  };

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files || files.length <= 0) {
      setImage(undefined);
      return;
    }

    setImage(files[0]);
  };

  const validate = () => {
    if (!image) {
      setError("Image must be provided");
      return false;
    }

    if (!name) {
      setError("NFT Name must not be empty");
      return false;
    }

    if (!creator) {
      setError("Creator must not be empty");
    }

    if (!description) {
      setError("NFT description must not be empty");
      return false;
    }

    const toValidate: Record<string, string> = {
      ...customFields,
      name,
      description,
      creator,
    };

    let err: string = "";
    Object.entries(toValidate).forEach(([key, value]) => {
      if (value.length > 64) {
        err = `${key} must not be greater than 64 characters`;
      }
    });

    setError(err);
    return err === "";
  };

  const onSubmit = async () => {
    if (wallet.status !== Status.Enabled) {
      alert("Error connecting to wallet");
      return;
    }

    if (!validate()) return;
    setIsSubmitting(true);
    const { cardano } = wallet;
    const { backendApi } = wallet.state;

    // Upload to IPFS using Pinata
    const url = "/api/ipfs";
    const formData = new FormData();
    formData.append("file", image as File);
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
      const ipfsNativeUrl = `ipfs://${pinataData.IpfsHash}`;

      Object.keys(customFields).forEach((key) => {
        const i = Number.parseInt(customFields[key] as string, 10);
        if (!Number.isNaN(i)) {
          customFields[key] = i;
        }
      });

      const nftMetadata: Metadata = {
        address: wallet.state.address,
        name,
        description,
        image: ipfsNativeUrl,
        ...customFields,
      };
      console.log(JSON.stringify(nftMetadata));

      const createNftRes = await axios.post<
        Metadata,
        AxiosResponse<TransactionResponse>
      >(`${backendApi}/nft/create`, nftMetadata);

      const { transaction, policy } = createNftRes.data;

      const signature = await cardano.signTx(transaction, true);
      const signResponse = await axios.post<
        SignTransaction,
        AxiosResponse<SignTransactionResponse>
      >(`${backendApi}/nft/sign`, {
        signature,
        transaction,
      });
      setPolicyId(policy.id);
      setPolicyJson(policy.json);
      setTransactionId(signResponse.data.tx_id);
      window.scrollTo(0, 0);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        const err = e as AxiosError<NetworkError>;

        if (err.response) setError(err.response?.data.error);
      } else {
        setError("Unexpected error...");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Main meta={<Meta title="Mint-NFT" description="Page to create an NFT" />}>
      <IonContent className="ion-background-primary">
        <div className="mb-3 text-center">
          <p className="text-4xl font-bold">Mint your Cardano NFT here!</p>
          <p className="mb-3 text-xl text-gray-900">
            Mint <b>1 CNFT</b> for just <b>1 ADA</b> under <b>1 MINUTE</b>
          </p>

          <p className="text-sm text-gray-900">
            WottleNFT generates a <b>unique</b> key to mint your NFT to
            guarantee that they are unique! <br />
            We will provide you the script afterwards for verification.
          </p>
        </div>
        <div className="w-full p-10 mx-auto mb-10 bg-gray-200 border rounded-md shadow-xl md:w-10/12 lg:w-9/12 xl:w-7/12 2xl:w-1/2">
          <div className="flex flex-col items-center h-full">
            {!transactionId && (
              <>
                <label className="w-full font-bold">
                  NFT Name
                  <input
                    className="w-full p-3 my-2 border rounded focus:outline-none focus:ring-2"
                    placeholder="Name of masterpiece"
                    type="text"
                    value={name}
                    onChange={setName}
                  />
                </label>
                <label className="w-full font-bold">
                  Creator
                  <input
                    className="w-full p-3 my-2 border rounded focus:outline-none focus:ring-2"
                    placeholder="Name of creator"
                    type="text"
                    value={creator}
                    onChange={setCreator}
                  />
                </label>
                <label className="w-full font-bold">
                  Description
                  <input
                    className="w-full p-3 my-2 border rounded focus:outline-none focus:ring-2"
                    placeholder="Short story of Masterpiece (max 64 chars)"
                    type="text"
                    value={description}
                    onChange={setDescription}
                  />
                </label>
                {image && (
                  <div className="w-full">
                    <p className="pb-2 font-bold">Image</p>
                    <img
                      className="object-cover"
                      src={URL.createObjectURL(image)}
                    />
                    <IonButton
                      onClick={() => setImage(undefined)}
                      expand="block"
                      strong
                    >
                      Remove Image
                    </IonButton>
                  </div>
                )}
                {!image && (
                  <>
                    <label className="w-full pb-2 font-bold">
                      Upload File (Max 15MB)
                    </label>
                    <label className="flex flex-row items-center justify-center w-full h-20 align-middle bg-gray-400 rounded-lg cursor-pointer hover:bg-gray-500">
                      Click here to upload!
                      <input
                        hidden
                        type="file"
                        onChange={onImageChange}
                        placeholder="Click here to upload"
                      />
                    </label>
                  </>
                )}
                {renderNewFields()}
                <div className="h-2" />
                <label className="w-full">
                  Add extra metadata fields [Optional]
                </label>

                <div className="grid items-center w-full grid-cols-5 gap-2">
                  <input
                    className="col-span-4 p-3 my-2 border-gray-800 rounded focus:outline-none focus:ring-2"
                    placeholder="Name of Metadata"
                    type="text"
                    value={newField}
                    onChange={(e) => setNewField(e.target.value)}
                  />
                  <IonButton
                    onClick={addCustomField}
                    className="h-12 col-span-1 px-2"
                  >
                    <IonIcon icon={add} />
                  </IonButton>
                </div>
                {error && <IonText color="danger">{error}</IonText>}
                {!isSubmitting && (
                  <IonButton
                    size="large"
                    className="h-12 col-span-1 px-2 mt-5"
                    onClick={onSubmit}
                  >
                    <IonIcon icon={hammer} slot="end" />
                    <div className="w-full p-6 font-bold">Mint NFT</div>
                  </IonButton>
                )}
                {isSubmitting && <IonSpinner color="primary" />}
              </>
            )}
            {transactionId && wallet.status === Status.Enabled && (
              <>
                <DisplayTransaction
                  isMainnet={wallet.state.network === MAINNET}
                  transactionId={transactionId}
                  policyJson={policyJson}
                  policyId={policyId}
                />
                <IonButton
                  size="large"
                  className="h-12 col-span-1 px-2 mt-5"
                  onClick={restart}
                >
                  <IonIcon icon={hammer} slot="end" />
                  <div className="w-full p-6 font-bold">Mint Another NFT</div>
                </IonButton>
              </>
            )}
          </div>
        </div>
      </IonContent>
    </Main>
  );
};
export default MintNftPage;
