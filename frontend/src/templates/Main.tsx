import React, { ReactNode } from "react";

import { IonContent, IonHeader, IonPage, IonTitle } from "@ionic/react";
import Image from "next/image";
import { useRouter } from "next/router";

import wottleLogo from "../../public/logo.png";
import ConnectWalletButton from "../Components/ConnectWalletButton";
import Footer from "../Components/Footer";
import NavSearchBar from "../Components/Navbar/NavSearchBar";
import navbarStyles from "../styles/navbar.module.css";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const router = useRouter();

  const navInfo = [
    {
      name: "Marketplace",
      route: "/marketplace",
      tempRoute: "/coming-soon",
    },
    {
      name: "Auction",
      route: "/auction",
      tempRoute: "/coming-soon",
    },
    {
      name: "Mint NFT",
      route: "/mint-nft",
      tempRoute: "/mint-nft",
    },
  ];

  return (
    <div>
      {props.meta}
      <IonPage id="main">
        <IonHeader className="h-20 ion-no-border">
          <div className="flex justify-between px-10 xl:px-40 bg-primary-default">
            <div className="flex items-center content-center flex-grow">
              <div
                onClick={() => router.push("/")}
                className="flex flex-row cursor-pointer"
              >
                <Image
                  height={60}
                  width={60}
                  layout="fixed"
                  alt="Wottle Logo"
                  src={wottleLogo}
                />
                <IonTitle className="p-0 font-bold">WottleNFT</IonTitle>
              </div>
              <NavSearchBar />
            </div>
            <div className="flex">
              <div className={navbarStyles.container}>
                {navInfo.map((nav) => {
                  return (
                    <a
                      key={nav.name}
                      href={nav.tempRoute}
                      className={
                        nav.route === router.pathname
                          ? navbarStyles.selected
                          : ""
                      }
                    >
                      {nav.name}
                    </a>
                  );
                })}
              </div>
              <ConnectWalletButton />
            </div>
          </div>
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
