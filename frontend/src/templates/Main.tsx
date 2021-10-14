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
import NavSearchBar from "../Components/Navbar/NavSearchBar";
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
      <IonPage id="main">
        <IonHeader className="h-20 ion-no-border">
          <IonToolbar color="primary" className="px-48">
            <div className="flex items-center content-center">
              <div
                onClick={() => router.push("/")}
                className="flex content-center cursor-pointer"
              >
                <img
                  className="h-14"
                  alt="Logo"
                  src={`${router.basePath}/logo.png`}
                />
                <IonTitle className="p-0 font-bold">WottleNFT</IonTitle>
              </div>
              <NavSearchBar />
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
