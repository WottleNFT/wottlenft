import { ChangeEvent, useState } from "react";

import {
  IonButton,
  IonContent,
  IonIcon,
  IonSpinner,
  IonText,
} from "@ionic/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { add, camera, hammer, trash } from "ionicons/icons";

import { Status } from "../../features/wallet/walletSlice";
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

type TransactionResponse = {
  transaction: HexCborString;
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
  // const { register, handleSubmit, watch } = useForm<Inputs>();
  const [name, setName] = useTextInput();
  const [description, setDescription] = useTextInput();
  const [image, setImage] = useState<File | undefined>(undefined);
  const wallet = useWallet();
  const [newField, setNewField] = useState("");
  const [customFields, setCustomFields] = useState<CustomFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const addCustomField = () => {
    if (
      newField === "" ||
      newField === "name" ||
      newField === "description" ||
      newField === "image" ||
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
      <label key={key} className="w-full">
        {key}
        <div className="grid items-center w-full grid-cols-5 gap-2">
          <input
            className="col-span-4 p-3 my-2 border rounded focus:outline-none focus:ring-2"
            placeholder={`Enter the value for ${key}`}
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
      setError("NFT name must not be empty");
      return false;
    }

    if (!description) {
      setError("NFT description must not be empty");
      return false;
    }

    const toValidate: Record<string, string> = {
      ...customFields,
      name,
      description,
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
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
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
          pinata_api_key: process.env.pinataApiKey as string,
          pinata_secret_api_key: process.env.pinataSecret as string,
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
      console.log("Send metadata to backend...");
      console.log(JSON.stringify(nftMetadata));

      const createNftRes = await axios.post<
        Metadata,
        AxiosResponse<TransactionResponse>
      >(`${backendApi}/nft/create`, nftMetadata);

      const { transaction } = createNftRes.data;

      const signature = await cardano.signTx(transaction, true);
      const signResponse = await axios.post<
        SignTransaction,
        AxiosResponse<SignTransactionResponse>
      >(`${backendApi}/nft/sign`, {
        signature,
        transaction,
      });

      console.log(signResponse.data.tx_id);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const err = e as AxiosError<NetworkError>;
        if (err.response) setError(err.response?.data.error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Main meta={<Meta title="Mint-NFT" description="Page to create an NFT" />}>
      <IonContent fullscreen>
        <div className="flex flex-col items-center flex-1 w-screen h-auto min-h-screen pb-20 bg-primary-default">
          <div className="p-10 bg-gray-200 border shadow-xl w-500 rounded-xl">
            <div className="flex flex-col items-center h-full">
              <p className="my-2 text-lg font-semibold text-center">
                Create your NFT here!
              </p>
              <label className="w-full">
                NFT name
                <input
                  className="w-full p-3 my-2 border rounded focus:outline-none focus:ring-2"
                  placeholder="Enter a name for your NFT"
                  type="text"
                  value={name}
                  onChange={setName}
                />
              </label>
              <label className="w-full">
                Description
                <input
                  className="w-full p-3 my-2 border rounded focus:outline-none focus:ring-2"
                  placeholder="Enter a short description for your NFT"
                  type="text"
                  value={description}
                  onChange={setDescription}
                />
              </label>
              {image && (
                <div className="w-full">
                  <p className="pb-2">Image</p>
                  <img
                    className="object-cover"
                    src={URL.createObjectURL(image)}
                  />
                  <IonButton onClick={() => setImage(undefined)} expand="full">
                    Remove Image
                  </IonButton>
                </div>
              )}
              {!image && (
                <>
                  <label className="w-full pb-2">Upload Image</label>
                  <label className="flex flex-row items-center justify-center w-full h-20 align-middle border-4 border-gray-700 border-dashed ">
                    <IonIcon icon={camera} />
                    <input hidden type="file" onChange={onImageChange} />
                  </label>
                </>
              )}
              <div className="h-2" />
              {renderNewFields()}
              <div className="grid items-center w-full grid-cols-5 gap-2 pt-4">
                <input
                  className="col-span-4 p-3 my-2 border-4 border-gray-800 border-dotted rounded focus:outline-none focus:ring-2"
                  placeholder="Add custom field"
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
            </div>
          </div>
        </div>
      </IonContent>
    </Main>
  );
};
export default MintNftPage;
