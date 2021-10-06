import { useForm } from "react-hook-form";
import { NFTStorage, File } from 'nft.storage';

type Inputs = {
    nftName: string,
    description: string,
    image: any,
}

type Metadata = {
    name: string,
    description: string,
    image: string,
}

const MintNftPage = () => {
    const { register, handleSubmit, watch } = useForm<Inputs>();
    const watchImage = watch("image");

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <div className="border h-4/5 w-500 rounded-md p-10 bg-gray-100">
                <form className="h-full flex flex-col items-center" onSubmit={handleSubmit((data) => {
                    var reader = new FileReader();
                    reader.readAsArrayBuffer(data.image[0]);
                    reader.onload = async () => {
                        const apiKey = process.env.nftStorageKey;
                        const client = new NFTStorage({ token: apiKey });

                        console.log("Storing image on NFTstorage...")

                        const metadata = await client.store({
                            name: data.nftName,
                            description: data.description,
                            image: data.image[0],
                        })

                        console.log("Successfully stored image on NFTstorage")

                        const nftMetadata: Metadata = {
                            name: data.nftName,
                            description: data.description,
                            image: metadata.data.image.href,
                        }
                        console.log("Send metadata to backend...");
                        console.log(JSON.stringify(nftMetadata));
                    }
                })}>
                    <label className="w-full">
                        NFT name
                        <input 
                            className="border rounded p-3 w-full my-2" 
                            placeholder="Enter your NFT's name"
                            type="text"
                            {...register("nftName")} 
                        />
                    </label>
                    <label className="w-full">
                        Description
                        <input 
                            className="border rounded p-3 w-full my-2" 
                            placeholder="Enter a short description for your NFT"
                            type="text"
                            {...register("description")} 
                        />
                    </label>
                    <div className="h-3/5 w-full">
                        <label>
                            Upload image
                            {(watchImage && watchImage.length == 1) && 
                                <img id="imgPreview" src={URL.createObjectURL(watchImage[0])} />
                            }
                            <input 
                                className="border rounded p-3 w-full mt-2" 
                                placeholder="Enter a short description for your NFT"
                                type="file"
                                {...register("image")} 
                            />
                        </label>
                    </div>
                    <button className="border mt-10 w-3/5 h-1/5 rounded-md bg-gray-400">
                        Mint NFT
                    </button>
                </form>
            </div>
        </div>
    );
}
export default MintNftPage