import React, { useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import useWallet, { WottleWalletState } from "../../hooks/useWallet";
import DisplayMessage from "../UserNfts/DisplayMessage";
import NftList from "../UserNfts/NftList";
import WalletSwitch from "../WalletSwitch";
import ActivityTab from "./ActivityTab";
import Contributions from "./Contributions";

enum Tab {
  Collection,
  Activity,
  Contribution,
}

interface Props {
	wallet: WottleWalletState;
}

const Tabs = ({ wallet }: Props) => {
  const [activeTab, setActiveTab] = useState<number>(Tab.Collection);

  return (
    <div className="self-start w-full px-6 my-20">
      <div className="flex flex-col my-5 sm:flex-row">
        <button
          onClick={() => setActiveTab(Tab.Collection)}
          className={`px-5 text-2xl font-bold text-center border-b-2 sm:border-b-0 sm:border-r-2 border-black border-solid hover:text-primary-default ${
            activeTab === Tab.Collection && "text-primary-default"
          }`}
        >
          Collection
        </button>
        <button
          onClick={() => setActiveTab(Tab.Activity)}
          className={`px-5 text-2xl font-bold text-center border-b-2 sm:border-b-0 sm:border-r-0 border-black border-solid hover:text-primary-default ${
            activeTab === Tab.Activity && "text-primary-default"
          }`}
        >
          Activity
        </button>
        <button
          onClick={() => setActiveTab(Tab.Contribution)}
          className={`px-5 text-2xl font-bold text-center hover:text-primary-default hidden ${
            activeTab === Tab.Contribution && "text-primary-default"
          }`}
        >
          Contribution
        </button>
      </div>
      <TransitionGroup
      >
        {activeTab === Tab.Collection && (
					<CSSTransition
						timeout={300}
						classNames="tab"
					>
						<WalletSwitch
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
						/>
					</CSSTransition>
        )}
        {activeTab === Tab.Activity && 
					<CSSTransition
						timeout={300}
						classNames="tab"
					>
						<ActivityTab />
					</CSSTransition>
				}
        {activeTab === Tab.Contribution && 
					<CSSTransition
						timeout={300}
						classNames="tab"
					>
						<Contributions />
					</CSSTransition>
				}
      </TransitionGroup>
    </div>
  );
};
export default Tabs;
