import React, { useEffect, useState } from "react";

import { useForm } from 'react-hook-form';

import {
  getBackendWalletAPI,
  retrieveWalletInfo,
  WalletInfo,
} from '../../lib/namiWallet';
import { HexCborString, NamiWallet } from '../../wallet';
import { Meta } from "../../layout/Meta";
import { Main } from "../../templates/Main";
import axios from "axios";

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

type PinataResponse = {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  isDuplicate: boolean;
}

const MintNftPage = () => {
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const watchImage = watch('image');

  return (
    <Main 
      meta={<Meta title="Mint-NFT" description="Page to create an NFT" />}
    >
      <div className="flex flex-col items-center w-screen h-screen bg-primary-default">
        <div className="p-10 bg-gray-200 border shadow-xl w-500 rounded-xl">
          <form
            className="flex flex-col items-center h-full"
            onSubmit={handleSubmit(async (data) => {
              // Store latest wallet info first to reduce API calls to nami wallet
              const tempWalletInfo = await retrieveWalletInfo();
              if (!tempWalletInfo) {
                alert('Error connecting to wallet');
                return;
              }

              //if (data.imageUrl) {
              //  const nftMetadata: Metadata = {
              //    address: await cardano.getChangeAddress(),
              //    name: data.nftName,
              //    description: data.description,
              //    image: data.imageUrl,
              //  };
              //  console.log('Send metadata to backend...');
              //  console.log(JSON.stringify(nftMetadata));

              //  const response = await fetch(
              //    `${getBackendWalletAPI(
              //      tempWalletInfo as WalletInfo
              //    )}/nft/create`,
              //    {
              //      method: 'POST',
              //      body: JSON.stringify(nftMetadata),
              //      headers: {
              //        'Content-Type': 'application/json',
              //      },
              //    }
              //  );

              //  const { transaction }: TransactionResponse =
              //    await response.json();

              //  const signature = await cardano.signTx(transaction, true);
              //  const signResponse = await fetch(
              //    `${getBackendWalletAPI(walletInfo as WalletInfo)}/nft/sign`,
              //    {
              //      method: 'POST',
              //      body: JSON.stringify({ signature, transaction }),
              //      headers: {
              //        'Content-Type': 'application/json',
              //      },
              //    }
              //  );

              //  console.log(await signResponse.json());
              //  return;
              //}

              // Upload to IPFS using Pinata
              const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
              let formData = new FormData();
              formData.append('file', data.image[0]);
              let response;
              try {
                response = await axios.post(url, formData, {
                  maxBodyLength: 'Infinity',
                  headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    pinata_api_key: process.env.pinataApiKey,
                    pinata_secret_api_key: process.env.pinataSecret,
                  }
                });
              } catch (e) {
                console.log("Upload to Pinata failed");
                console.error(e);
                return;
              }

              const pinataData = response.data as unknown as PinataResponse;
              const ipfsNativeUrl = "ipfs://" + pinataData.IpfsHash;

              const nftMetadata: Metadata = {
                address: tempWalletInfo.address,
                name: data.nftName,
                description: data.description,
                image: ipfsNativeUrl,
              };
              console.log('Send metadata to backend...');
              console.log(JSON.stringify(nftMetadata));

              const createNftRes = await fetch('http://localhost:8080/nft/create', {
                method: 'POST',
                body: JSON.stringify(nftMetadata),
              });

              console.log(await createNftRes.json());
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
                  <img id="imgPreview" src={URL.createObjectURL(watchImage[0])} />
                )}
                <input
                  className="w-full p-3 mt-2 border rounded"
                  placeholder="Enter a short description for your NFT"
                  type="file"
                  {...register("image")}
                />
              </label>
            </div>
            <button className="w-2/5 h-16 mt-10 text-white bg-black border rounded-full">
              Mint NFT
            </button>
          </form>
        </div>
      </div>
    </Main>
  );
};
export default MintNftPage;
