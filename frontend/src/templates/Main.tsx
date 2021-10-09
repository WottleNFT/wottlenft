import React, { ReactNode, useEffect, useState } from "react";

import {
  IonButton,
  IonButtons,
  IonHeader,
  IonLabel,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRouter } from "next/router";

import ConnectWalletButton from "../Components/ConnectWalletButton";
import SideMenu, { MenuButton } from "../Components/SideMenu";
import WalletInfoPill from "../Components/WalletInfoPill";
import { retrieveWalletInfo, WalletInfo } from "../lib/namiWallet";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const router = useRouter();

  const [walletStatusReady, setWalletStatusReady] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | void>();

  useEffect(() => {
    const getWalletInfo = async () => {
      const info = await retrieveWalletInfo();
      setWalletInfo(info);
      setWalletStatusReady(true);
    };
    getWalletInfo();
  }, []);

  return (
    <div>
      {props.meta}
      <SideMenu />
      <IonPage id="main">
        <IonHeader className="ion-no-border h-20">
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
              {walletInfo && (
                <IonButton routerLink="/user-nfts">My NFTs</IonButton>
              )}
              {(() => {
                if (!walletStatusReady) return <IonSpinner name="crescent" />
                return walletInfo ? 
                  <WalletInfoPill
                    network={walletInfo.network}
                    balance={walletInfo.balance}
                    address={walletInfo.address}
                  /> : 
                  <ConnectWalletButton />
              })()}
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        {props.children}
      </IonPage>
    </div>
  );
};

export { Main };
