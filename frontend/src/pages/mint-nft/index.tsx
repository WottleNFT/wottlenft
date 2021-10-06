import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { create } from 'ipfs-http-client';

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
    const { register, handleSubmit } = useForm<Inputs>();
    const [ipfs, setIpfs] = useState<any|null>(null);


    useEffect(() => {
        const init = async () => {
            if (ipfs) return;
            try {
                const client = create('/ip4/127.0.0.1/tcp/5001');
                setIpfs(client);
                console.log('IPFS connected')
            } catch (err) {
                console.error(err);
                console.log("Unsuccessful connection to IPFS")
            }
        }
        init();
    }, []);

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <div className="border h-3/5 w-4/12 rounded-md p-10">
                <form className="h-full flex flex-col items-center" onSubmit={handleSubmit((data) => {
                    var reader = new FileReader();
                    reader.readAsArrayBuffer(data.image[0]);
                    reader.onload = async () => {
                        const buffer = Buffer.from(reader.result)
                        const { cid } = await ipfs.add(buffer);
                        const imageAddr = "https://ipfs.io/ipfs/" + cid.toString();

                        console.log("IPFS upload successful");
                        console.log("View image at " + imageAddr);

                        const metadata: Metadata = {
                            name: data.nftName,
                            description: data.description,
                            image: imageAddr,
                        }
                        console.log("Send metadata to backend...");
                        console.log(JSON.stringify(metadata));
                    }
                })}>
                    <label>
                        NFT name
                        <input 
                            className="border rounded p-3 w-full my-2" 
                            placeholder="Enter your NFT's name"
                            type="text"
                            {...register("nftName")} 
                        />
                    </label>
                    <label>
                        Description
                        <input 
                            className="border rounded p-3 w-full my-2" 
                            placeholder="Enter a short description for your NFT"
                            type="text"
                            {...register("description")} 
                        />
                    </label>
                    <label>
                        File
                        <input 
                            className="border rounded p-3 w-full mt-2" 
                            placeholder="Enter a short description for your NFT"
                            type="file"
                            {...register("image")} 
                        />
                    </label>
                    <button className="border mt-10 w-3/5 h-1/5 rounded-md bg-gray-400">
                        Mint NFT
                    </button>
                </form>
            </div>
        </div>
    );
}
export default MintNftPage