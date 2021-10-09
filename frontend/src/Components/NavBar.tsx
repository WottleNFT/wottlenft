import wottleLogo from '../../public/assets/Logo.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { retrieveWalletInfo, WalletInfo } from '../lib/namiWallet';
import { IonSpinner } from '@ionic/react';
import WalletInfoPill from './WalletInfoPill';
import ConnectWalletButton from './ConnectWalletButton';

const NavBar: React.FC = () => {
  const [walletStatusReady, setWalletStatusReady] = useState<boolean>(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | void>();

  useEffect(() => {
    const getWalletInfo = async () => {
      const info = await retrieveWalletInfo();
      setWalletInfo(info);
      setWalletStatusReady(true);
    }
    getWalletInfo();
  }, []);

  return (
    <div className="flex justify-between w-full">
      <Image alt="wottlelogo" src={wottleLogo} />
      {(() => {
        if (!walletStatusReady) return <IonSpinner name="crescent" className="h-16 w-48" />
        return walletInfo ? 
          <WalletInfoPill
            network={walletInfo.network}
            balance={walletInfo.balance}
            address={walletInfo.address}
          /> :
          <ConnectWalletButton />
      })()}
    </div>
  );
}
export default NavBar