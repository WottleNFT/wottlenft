import { IonSpinner } from "@ionic/react";

import { useGetUserNftsQuery } from "../../app/nft";
import { WottleWalletState } from "../../hooks/useWallet";
import { Nft } from "../../types/Nft";

interface Props {
  activity: number;
  contribution: number;
  listed: number;
  wallet: WottleWalletState;
}

const StatsBar = (props: Props) => {
  const wallet = props.wallet as any;
  const { data, isLoading } = useGetUserNftsQuery({
    address: wallet.state.address,
  });

  return (
    <div className="self-end h-20 my-5">
      {isLoading ? (
        <IonSpinner name="crescent" />
      ) : (
        <div className="hidden md:flex">
          <div className="font-bold">
            <p className="px-5 text-xl text-center border-r-2 border-black border-solid">
              Collection
            </p>
            <p className="text-3xl text-center">
              {(data as Nft[]).length + props.listed}
            </p>
          </div>
          <div className="font-bold">
            <p className="px-5 text-xl text-center border-r-0 border-black border-solid">
              Listed NFTs
            </p>
            <p className="text-3xl text-center">{props.listed}</p>
          </div>
          <div className="hidden font-bold">
            <p className="px-5 text-xl text-center border-r-0 border-black border-solid">
              Activity
            </p>
            <p className="text-3xl text-center">{props.activity}</p>
          </div>
          <div className="hidden font-bold">
            <p className="px-5 text-xl text-center">Contribution</p>
            <p className="text-3xl text-center">{props.contribution}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default StatsBar;
