import React, { useEffect, useState } from 'react';

import { NFTStorage } from 'nft.storage';
import { useForm } from 'react-hook-form';

import ConnectWalletButton from '../../Components/ConnectWalletButton';
import WalletInfoPill from '../../Components/WalletInfoPill';
import { retrieveWalletInfo, WalletInfo } from '../../lib/namiWallet';
import { HexCborString, NamiWallet } from '../../wallet';

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
  const watchImage = watch('image');
  const [walletStatusReady, setWalletStatusReady] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | void>();

  useEffect(() => {
    const getWalletInfo = async () => {
      const info = await retrieveWalletInfo();
      setWalletInfo(info);
      setWalletStatusReady(true);
    };
    getWalletInfo();
  }, []);

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-primary-default">
      {(() => {
        if (!walletStatusReady) {
          return 'Loading...';
        }
        return walletInfo ? (
          <WalletInfoPill
            balance={walletInfo.balance}
            address={walletInfo.address}
          />
        ) : (
          <ConnectWalletButton />
        );
      })()}
      <div className="p-10 bg-gray-200 border shadow-xl h-4/5 w-500 rounded-xl">
        <form
          className="flex flex-col items-center h-full"
          onSubmit={handleSubmit(async (data) => {
            const cardano = window.cardano as NamiWallet;
            if (data.imageUrl) {
              const nftMetadata: Metadata = {
                address: await cardano.getChangeAddress(),
                name: data.nftName,
                description: data.description,
                image: data.imageUrl,
              };
              console.log('Send metadata to backend...');
              console.log(JSON.stringify(nftMetadata));

              const response = await fetch('http://localhost:8080/nft/create', {
                method: 'POST',
                body: JSON.stringify(nftMetadata),
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              const { transaction }: TransactionResponse =
                await response.json();

              const signature = await cardano.signTx(transaction, true);
              const signResponse = await fetch(
                'http://localhost:8080/nft/sign',
                {
                  method: 'POST',
                  body: JSON.stringify({ signature, transaction }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );

              console.log(await signResponse.json());
              return;
            }
            const reader = new FileReader();
            reader.readAsArrayBuffer(data.image[0]);
            reader.onload = async () => {
              const apiKey = process.env.nftStorageKey as string;
              const client = new NFTStorage({ token: apiKey });

              console.log('Storing image on NFTstorage...');

              const metadata = await client.store({
                name: data.nftName,
                description: data.description,
                image: data.image[0],
              });

              console.log('Successfully stored image on NFTstorage');

              const nftMetadata: Metadata = {
                address: await cardano.getChangeAddress(),
                name: data.nftName,
                description: data.description,
                image: metadata.data.image.href,
              };
              console.log('Send metadata to backend...');
              console.log(JSON.stringify(nftMetadata));

              const response = await fetch('http://localhost:8080/nft/create', {
                method: 'POST',
                body: JSON.stringify(nftMetadata),
              });

              console.log(await response.json());
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
              {...register('nftName')}
            />
          </label>
          <label className="w-full">
            Description
            <input
              className="w-full p-3 my-2 border rounded focus:outline-none focus:ring-2"
              placeholder="Enter a short description for your NFT"
              type="text"
              {...register('description')}
            />
          </label>
          <label className="w-full">
            Image Url
            <input
              className="w-full p-3 my-2 border rounded focus:outline-none focus:ring-2"
              placeholder="Enter a short description for your NFT"
              type="text"
              {...register('imageUrl')}
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
                {...register('image')}
              />
            </label>
          </div>
          <button className="w-2/5 h-16 mt-10 text-white bg-black border rounded-full">
            Mint NFT
          </button>
        </form>
      </div>
    </div>
  );
};
export default MintNftPage;
