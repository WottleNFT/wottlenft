import React, { useState } from "react";
import useWallet from "../../hooks/useWallet";
import DisplayMessage from "../UserNfts/DisplayMessage";
import NftList from "../UserNfts/NftList";
import WalletSwitch from "../WalletSwitch";
import Contributions from "./Contributions";
import { CSSTransitionGroup } from 'react-transition-group';
import ActivityTab from "./ActivityTab";

enum Tab {
	Collection,
	Activity,
	Contribution
}

const Tabs = () => {
	const wallet = useWallet();
	const [activeTab, setActiveTab] = useState<number>(Tab.Contribution)

	return(
		<div className="self-start w-full px-6 my-20">
			<div className="flex my-5">
					<button onClick={() => setActiveTab(Tab.Collection)} className={`px-5 text-2xl font-bold text-center border-r-2 border-black border-solid hover:text-primary-default ${activeTab === Tab.Collection && "text-primary-default"}`}>Collection</button>
					<button onClick={() => setActiveTab(Tab.Activity)} className={`px-5 text-2xl font-bold text-center border-r-2 border-black border-solid hover:text-primary-default ${activeTab === Tab.Activity && "text-primary-default"}`}>Activity</button>
					<button onClick={() => setActiveTab(Tab.Contribution)} className={`px-5 text-2xl font-bold text-center hover:text-primary-default ${activeTab === Tab.Contribution && "text-primary-default"}`}>Contribution</button>
			</div>
			<CSSTransitionGroup
				transitionName="tab"
				transitionEnterTimeout={300}
				transitionLeaveTimeout={1}
			>
				{activeTab === Tab.Collection &&<WalletSwitch
						wallet={wallet}
						loading={<DisplayMessage text="Loading your wallet..." />}
						notEnabled={<DisplayMessage text="Please enable Nami Wallet" />}
						enabled={(enabledWallet) => (
							<NftList
								address={enabledWallet.state.address}
								baseUrl={enabledWallet.state.backendApi}
							/>
						)}
						fallback={<DisplayMessage text="Please get Nami Wallet" />}
					/>}
				{activeTab === Tab.Activity && <ActivityTab />}
				{activeTab === Tab.Contribution && <Contributions />}
			</CSSTransitionGroup>
		</div>
	);
}
export default Tabs