import React from "react";

import { NFTStorage } from "nft.storage";
import { useForm } from "react-hook-form";

import ConnectWalletButton from "../../Components/ConnectWalletButton";
import { Status } from "../../features/wallet/walletSlice";
import useWallet from "../../hooks/useWallet";
import { HexCborString } from "../../wallet";

type Inputs = {
  nftName: string;
  description: string;
  image: any;
  imageUrl: string;
};

type Metadata = {
  address: HexCborString;
  name: string;
  description: string;
  image: string;
};

type TransactionResponse = {
  transaction: HexCborString;
};

const MintNftPage = () => {
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const watchImage = watch("image");
  const wallet = useWallet();

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-primary-default">
      <ConnectWalletButton />
      <div className="p-10 bg-gray-200 border shadow-xl h-4/5 w-500 rounded-xl">
        <form
          className="flex flex-col items-center h-full"
          onSubmit={handleSubmit(async (data) => {
            if (wallet.status !== Status.Enabled) return;

            const { cardano, state } = wallet;
            const { backendApi } = state;
            if (data.imageUrl) {
              const nftMetadata: Metadata = {
                address: await cardano.getChangeAddress(),
                name: data.nftName,
                description: data.description,
                image: data.imageUrl,
              };
              // console.log("Send metadata to backend...");
              // console.log(JSON.stringify(nftMetadata));

              const response = await fetch(`${backendApi}/nft/create`, {
                method: "POST",
                body: JSON.stringify(nftMetadata),
                headers: {
                  "Content-Type": "application/json",
                },
              });

              const { transaction }: TransactionResponse =
                await response.json();

              const signature = await cardano.signTx(transaction, true);
              await fetch(`${backendApi}/nft/sign`, {
                method: "POST",
                body: JSON.stringify({ signature, transaction }),
                headers: {
                  "Content-Type": "application/json",
                },
              });

              // console.log(await signResponse.json());
              return;
            }
            const reader = new FileReader();
            reader.readAsArrayBuffer(data.image[0]);
            reader.onload = async () => {
              const apiKey = process.env.nftStorageKey as string;
              const client = new NFTStorage({ token: apiKey });

              // console.log("Storing image on NFTstorage...");

              const metadata = await client.store({
                name: data.nftName,
                description: data.description,
                image: data.image[0],
              });

              // console.log("Successfully stored image on NFTstorage");

              const nftMetadata: Metadata = {
                address: await cardano.getChangeAddress(),
                name: data.nftName,
                description: data.description,
                image: metadata.data.image.href,
              };
              // console.log("Send metadata to backend...");
              // console.log(JSON.stringify(nftMetadata));

              await fetch(`${backendApi}/nft/create`, {
                method: "POST",
                body: JSON.stringify(nftMetadata),
              });

              // console.log(await response.json());
            };
          })}
        >
          <p className="my-2 text-lg font-semibold text-center">
            Create your NFT here!
          </p>
          <label className="w-full">
            NFT name
            <input
              className="w-full p-3 my-2 border rounded focus:outline-none focus:ring-2"
              placeholder="Enter a name for your NFT"
              type="text"
              {...register("nftName")}
            />
          </label>
          <label className="w-full">
            Description
            <input
              className="w-full p-3 my-2 border rounded focus:outline-none focus:ring-2"
              placeholder="Enter a short description for your NFT"
              type="text"
              {...register("description")}
            />
          </label>
          <label className="w-full">
            Image Url
            <input
              className="w-full p-3 my-2 border rounded focus:outline-none focus:ring-2"
              placeholder="Enter a short description for your NFT"
              type="text"
              {...register("imageUrl")}
            />
          </label>
          <div className="w-full h-3/5">
            <label>
              Upload image
              {watchImage && watchImage.length === 1 && (
                <img
                  id="imgPreview"
                  alt="img"
                  src={URL.createObjectURL(watchImage[0])}
                />
              )}
              <input
                className="w-full p-3 mt-2 border rounded"
                placeholder="Enter a short description for your NFT"
                type="file"
                {...register("image")}
              />
            </label>
          </div>
          {wallet.status === Status.Enabled && (
            <button className="w-2/5 h-20 mt-10 text-white bg-black border rounded-full hover:bg-gray-800">
              Mint NFT
            </button>
          )}
          {wallet.status !== Status.Enabled && (
            <div>Connect with Nami Wallet to mint NFTs</div>
          )}
        </form>
      </div>
    </div>
  );
};
export default MintNftPage;
