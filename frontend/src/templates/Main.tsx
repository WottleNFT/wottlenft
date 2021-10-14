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
      <SideMenu />
      {props.meta}
      <IonPage id="main">
        <IonHeader className="h-20 ion-no-border">
          <IonToolbar
            color="primary"
            className="flex flex-row h-full align-middle"
          >
            {/* TODO: change to href="/" */}

            <div className="flex flex-row align-middle">
              <Link href="/landing" passHref>
                <div className="flex flex-row cursor-pointer">
                  <img
                    className="h-14 md:ml-3"
                    alt="Logo"
                    src={`${router.basePath}/logo.png`}
                  />
                  <IonTitle className="p-0 text-black">WottleNFT</IonTitle>
                </div>
              </Link>
            </div>

            <IonButtons slot="end" className="flex items-center">
              {windowWidth === -1 && typeof window !== "undefined"
                ? setWidth(window.innerWidth)
                : windowWidth > windowBreakpoint && (
                    <div className="flex flex-row items-center gap-4">
                      <Link href="/coming-soon">
                        <a>Marketplace</a>
                      </Link>
                      <Link href="/coming-soon">
                        <a>Auction</a>
                      </Link>
                      <Link href="/coming-soon">
                        <a>Creator</a>
                      </Link>
                      <Link href="/mint-nft">
                        <a>Mint Now</a>
                      </Link>
                      <ConnectWalletButton />
                    </div>
                  )}

              {windowWidth < windowBreakpoint && <MenuButton />}
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
