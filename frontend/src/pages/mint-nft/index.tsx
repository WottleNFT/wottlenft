import { NFTStorage } from 'nft.storage';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { RootState } from '../../app/store';
import ConnectWalletButton from '../../Components/ConnectWalletButton';

type Inputs = {
  nftName: string;
  description: string;
  image: any;
};

type Metadata = {
  name: string;
  description: string;
  image: string;
};

const MintNftPage = () => {
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const watchImage = watch('image');

  const wallet = useSelector((state: RootState) => state.wallet);
  console.log(wallet);

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-primary-default">
      {false ? 'Connected' : <ConnectWalletButton />}
      <div className="p-10 bg-gray-200 border shadow-xl h-4/5 w-500 rounded-xl">
        <form
          className="flex flex-col items-center h-full"
          onSubmit={handleSubmit((data) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(data.image[0]);
            reader.onload = async () => {
              const apiKey = process.env.nftStorageKey;
              const client = new NFTStorage({ token: apiKey });

              console.log('Storing image on NFTstorage...');

              const metadata = await client.store({
                name: data.nftName,
                description: data.description,
                image: data.image[0],
              });

              console.log('Successfully stored image on NFTstorage');

              const nftMetadata: Metadata = {
                name: data.nftName,
                description: data.description,
                image: metadata.data.image.href,
              };
              console.log('Send metadata to backend...');
              console.log(JSON.stringify(nftMetadata));
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
