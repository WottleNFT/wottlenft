import { AppProps } from 'next/app';

import '../styles/main.css';
import '@ionic/react/css/core.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;
