import React, { ReactNode } from "react";

import {
  IonButton,
  IonButtons,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRouter } from "next/router";

import ConnectWalletButton from "../Components/ConnectWalletButton";
import SideMenu, { MenuButton } from "../Components/SideMenu";
import { Status } from "../features/wallet/walletSlice";
import useWallet from "../hooks/useWallet";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const router = useRouter();
  const wallet = useWallet();
  return (
    <div>
      {props.meta}
      <SideMenu />
      <IonPage id="main">
        <IonHeader className="h-20 ion-no-border">
          <IonToolbar color="primary" className="h-full">
            <div className="flex flex-row">
              <MenuButton />
              <img
                className="h-14"
                alt="Logo"
                src={`${router.basePath}/logo.png`}
              />
              <IonTitle className="p-0">WottleNFT</IonTitle>
            </div>

            <IonButtons slot="end" className="flex items-center">
              <IonButton routerLink="/about">About</IonButton>
              <IonButton routerLink="/mint-nft">Mint NFT</IonButton>
              {wallet.status === Status.Enabled && (
                <IonButton routerLink="/user-nfts">My NFTs</IonButton>
              )}

              <ConnectWalletButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        {props.children}
      </IonPage>
    </div>
  );
};

export { Main };
