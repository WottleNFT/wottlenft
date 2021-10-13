import React, { ReactNode, useEffect, useState } from "react";

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
  const [windowWidth, setWidth] = useState(-1);
  const windowBreakpoint = 640;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div>
      {props.meta}
      <SideMenu />
      <IonPage id="main">
        <IonHeader className="h-20 ion-no-border">
          <IonToolbar color="primary" className="h-full align-middle">
            <div className="flex flex-row align-middle">
              {windowWidth === -1 && typeof window !== "undefined"
                ? setWidth(window.innerWidth)
                : windowWidth < windowBreakpoint && <MenuButton />}
              <img
                className="h-14 md:ml-3"
                alt="Logo"
                src={`${router.basePath}/logo.png`}
              />
              <IonTitle className="p-0">WottleNFT</IonTitle>
            </div>

            <IonButtons slot="end" className="flex items-center">
              {windowWidth > windowBreakpoint && (
                <>
                  <IonButton routerLink="/about">About</IonButton>
                  <IonButton routerLink="/mint-nft">Mint NFT</IonButton>
                  {wallet.status === Status.Enabled && (
                    <IonButton routerLink="/user-nfts">My NFTs</IonButton>
                  )}
                </>
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
