import "../styles/main.css";
import "@ionic/react/css/core.css";
import React from "react";

import { IonApp } from "@ionic/react";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "../app/store";
import SideMenu from "../Components/SideMenu";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <IonApp>
      <SideMenu />
      <DefaultSeo
        titleTemplate="WottleNFT | %s"
        defaultTitle="A sustainable Cardano NFT Marketplace"
        description="WottleNFT is a sustainable NFT Marketplace built upon the Cardano blockchain."
        canonical="https://wottlenft.io"
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "cardano, nft, marketplace, sustainable, auction, nft minter, lowest minting fee, singapore",
          },
        ]}
        twitter={{
          cardType: "summary_large_image",
          site: "@wottlenft",
          handle: "@wottlenft",
        }}
      />
      <Component {...pageProps} />
    </IonApp>
  </Provider>
);

export default MyApp;
