import React from "react";

import { IonContent } from "@ionic/react";

import HowToMint from "../../Components/MintNfts/HowToMint";
import Minting from "../../Components/MintNfts/Minting";
import WalletSwitch from "../../Components/WalletSwitch";
import useWallet from "../../hooks/useWallet";
import { Meta } from "../../layout/Meta";
import { Main } from "../../templates/Main";

const MintNftPage = () => {
  const wallet = useWallet();

  return (
    <Main meta={<Meta title="Mint-NFT" description="Page to create an NFT" />}>
      <IonContent className="ion-background-primary">
        <WalletSwitch
          wallet={wallet}
          enabled={(enabledWallet) => <Minting wallet={enabledWallet} />}
          fallback={<></>}
        />
        <HowToMint />
        <div className="p-10" />
      </IonContent>
    </Main>
  );
};
export default MintNftPage;
