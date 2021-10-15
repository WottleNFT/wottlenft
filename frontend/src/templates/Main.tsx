import React, { ReactNode, useEffect, useState } from "react";

import { IonContent, IonHeader, IonPage } from "@ionic/react";
import Image from "next/image";
import { useRouter } from "next/router";

import wottleLogo from "../../public/logo.png";
import ConnectWalletButton from "../Components/ConnectWalletButton";
import Footer from "../Components/Footer";
import NavSearchBar from "../Components/Navbar/NavSearchBar";
import { MenuButton } from "../Components/SideMenu";
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
      {props.meta}
      <IonPage id="main">
        <IonHeader className="ion-no-border">
          <div className="flex justify-between pl-4 md:pl-12 2xl:pl-52 bg-primary-default">
            <div className="flex items-center content-center flex-grow">
              <div
                onClick={() => router.push("/landing")}
                className="flex flex-row items-center cursor-pointer"
              >
                <Image
                  height={70}
                  width={70}
                  layout="fixed"
                  alt="Wottle Logo"
                  src={wottleLogo}
                />
                <span className="p-0 font-bold text-xl">WottleNFT</span>
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
            {windowWidth < windowBreakpoint && <MenuButton className="mr-5" />}
          </div>
        </IonHeader>
        <IonContent id="main">
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
