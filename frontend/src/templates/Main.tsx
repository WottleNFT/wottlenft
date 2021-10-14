import React, { ReactNode, useEffect, useState } from "react";

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Link from "next/link";
import { useRouter } from "next/router";

import ConnectWalletButton from "../Components/ConnectWalletButton";
import Footer from "../Components/Footer";
import SideMenu, { MenuButton } from "../Components/SideMenu";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const router = useRouter();
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
            {/* TODO: change to href="/" */}
            <Link href="/landing" passHref>
              <a>
                <div className="flex flex-row align-middle">
                  {windowWidth === -1 && typeof window !== "undefined"
                    ? setWidth(window.innerWidth)
                    : windowWidth < windowBreakpoint && <MenuButton />}
                  <img
                    className="h-14 md:ml-3"
                    alt="Logo"
                    src={`${router.basePath}/logo.png`}
                  />
                  <IonTitle className="p-0 text-black">WottleNFT</IonTitle>
                </div>
              </a>
            </Link>

            <IonButtons slot="end" className="flex items-center">
              {windowWidth > windowBreakpoint && (
                <div className="flex flex-row gap-4">
                  <Link href="/coming-soon">
                    <a>Marketplace</a>
                  </Link>
                  <Link href="/auctions">
                    <a>Auction</a>
                  </Link>
                  <Link href="/coming-soon">
                    <a>Creator</a>
                  </Link>
                  <Link href="/coming-soon">
                    <a>Impact</a>
                  </Link>
                </div>
              )}

              <ConnectWalletButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {props.children}
          <Footer />
        </IonContent>
      </IonPage>
    </div>
  );
};

export { Main };
