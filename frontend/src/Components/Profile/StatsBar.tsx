import { IonSpinner } from "@ionic/react";
import { wallet } from "ionicons/icons";
import { useGetUserNftsQuery } from "../../app/nft";
import { Status } from "../../features/wallet/walletSlice";
import useWallet, { WottleWalletState } from "../../hooks/useWallet";

interface Props {
	activity: number;
	contribution: number;
	wallet: WottleWalletState;
}

const StatsBar = (props: Props) => {
	const wallet = props.wallet as any;

	if (wallet.status === Status.Loading) {
		return (
			<div className="self-end h-20 my-5">
				<IonSpinner name="crescent" />
			</div>
		);
	}
	
  const { data, error, isLoading } = useGetUserNftsQuery({
    url: wallet.state.backendApi,
    address: wallet.state.address,
  });

	return (
		<div className="self-end h-20 my-5">
			{isLoading ? <IonSpinner name="crescent" /> :
				<div className="hidden md:flex">
					<div className="font-bold">
						<p className="px-5 text-xl text-center border-r-2 border-black border-solid">Collection</p>
						<p className="text-3xl text-center">{data?.length}</p>
					</div>
					<div className="font-bold">
						<p className="px-5 text-xl text-center border-r-0 border-black border-solid">Activity</p>
						<p className="text-3xl text-center">{props.activity}</p>
					</div>
					<div className="hidden font-bold">
						<p className="px-5 text-xl text-center">Contribution</p>
						<p className="text-3xl text-center">{props.contribution}</p>
					</div>
				</div>
			}
		</div>
	);
}
export default StatsBar