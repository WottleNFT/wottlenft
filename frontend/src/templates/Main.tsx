import React, { ReactNode, useEffect, useState } from "react";

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { NextSeo, NextSeoProps } from "next-seo";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import ConnectWalletButton from "../Components/ConnectWalletButton";
import Footer from "../Components/Footer";
import SideMenu, { MenuButton } from "../Components/SideMenu";

type IMainProps = {
  children: ReactNode;
} & NextSeoProps;

const Main = (props: IMainProps) => {
  const router = useRouter();
  const [windowWidth, setWidth] = useState(-1);
  const windowBreakpoint = 640;
  const { children, ...nextSeo } = props;
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div>
      <SideMenu />
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" key="apple" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
          key="icon16"
        />
        <link rel="icon" href="/favicon.ico" key="favicon" />
      </Head>
      <NextSeo
        openGraph={{
          type: "website",
          url: "https://wottlenft.io",
          title: "WottleNFT | A sustainable Cardano NFT Marketplace",
          description:
            "WottleNFT is a sustainable NFT Marketplace built upon the Cardano blockchain.",
          images: [
            {
              url: "/logo.png",
              width: 600,
              height: 600,
              alt: "WottleNFT Logo",
              type: "image/png",
            },
          ],
        }}
        {...nextSeo}
      />
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
          {children}
          <Footer />
        </IonContent>
      </IonPage>
    </div>
  );
};

export { Main };
