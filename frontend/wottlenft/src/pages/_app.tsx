import '../styles/main.css';
import '@ionic/react/css/core.css';
import React from 'react';

import { IonApp } from '@ionic/react';
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <IonApp>
    <Component {...pageProps} />
  </IonApp>
);

export default MyApp;
