import { IonButton, IonCard } from "@ionic/react";
import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from '../../styles/nftDrop.module.css';
import CountdownTimer from '../Auctions/CountdownTimer';

type Props = {
  banner: StaticImageData;
  countdownTo: number;
  nameLink: string;
};

const DropCountdownCard = ({ banner, countdownTo, nameLink }: Props) => {
  const router = useRouter();

  return (
    <IonCard
      className={styles.nftDropBanner}
      onClick={() => router.push(`/nft-drops/${nameLink}`)}
    >
      <div className={styles.innerBanner}>
        <Image
          layout="fill"
          alt="Cardanorc banner"
          objectFit="cover"
          src={banner}
        />
      </div>
      <div className="flex flex-row grid-cols-2">
        <div className="flex flex-col">
          <div className="flex">Cardanorcs</div>
          <div className="flex">Launch Date : 14 December 2021</div>
          <div className="flex"> Supply : 5000 Unique Cardanorcs</div>
          <div className="flex"> Price : 35 ₳</div>
        </div>
        <div className="flex flex-col justify-end justify-items-end">
        <CountdownTimer
          countdownTimestamp={countdownTo}
          className="flex justify-end w-full text-lg font-bold leading-snug text-black sm:leading-normal sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl"
        />
        <IonButton size="default" className="flex justify-end">View</IonButton>
        </div>
      </div>
    </IonCard>
  );
};
export default DropCountdownCard;
