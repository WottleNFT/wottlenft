import "../styles/main.css";
import "@ionic/react/css/core.css";
import React from "react";

import { IonApp } from "@ionic/react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "../app/store";
import SideMenu from "../Components/SideMenu";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <IonApp>
      <SideMenu />
      <Component {...pageProps} />
    </IonApp>
  </Provider>
);

export default MyApp;
