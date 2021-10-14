import React from "react";

import { IonContent } from "@ionic/react";

import DisplayMessage from "../../Components/UserNfts/DisplayMessage";
import NftList from "../../Components/UserNfts/NftList";
import WalletSwitch from "../../Components/WalletSwitch";
import useWallet from "../../hooks/useWallet";
import { Meta } from "../../layout/Meta";
import { Main } from "../../templates/Main";

const UserNfts = () => {
  const wallet = useWallet();

  return (
    <Main
      meta={
        <Meta
          title="Wottlenft"
          description="Wottlenft is your next NFT auction site."
        />
      }
    >
      <IonContent>
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
          noExtension={<DisplayMessage text="Please get Nami Wallet" />}
        />
      </IonContent>
    </Main>
  );
};
export default UserNfts;
