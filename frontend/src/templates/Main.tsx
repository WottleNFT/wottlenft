import React, { ReactNode, useEffect, useState } from "react";

import { IonContent, IonHeader, IonPage, IonTitle } from "@ionic/react";
import Image from "next/image";
import { useRouter } from "next/router";

import wottleLogo from "../../public/logo.png";
import ConnectWalletButton from "../Components/ConnectWalletButton";
import Footer from "../Components/Footer";
import NavSearchBar from "../Components/Navbar/NavSearchBar";
import SideMenu, { MenuButton } from "../Components/SideMenu";
import navbarStyles from "../styles/navbar.module.css";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const router = useRouter();
  const [windowWidth, setWidth] = useState(-1);
  const windowBreakpoint = 768;

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
        <IonHeader className="ion-no-border">
          <div className="flex justify-between px-4 md:px-12 2xl:px-52 bg-primary-default">
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
            {windowWidth === -1 && typeof window !== "undefined"
              ? setWidth(window.innerWidth)
              : windowWidth > windowBreakpoint && (
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
                )}

            {windowWidth < windowBreakpoint && <MenuButton className="" />}
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
    name: "Creator",
    route: "/creaters",
    tempRoute: "/coming-soon",
  },
  {
    name: "Mint Now",
    route: "/mint-nft",
    tempRoute: "/mint-nft",
  },
];
