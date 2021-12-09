import { IonCard } from "@ionic/react";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../../styles/nftDrop.module.css";
import CountdownTimer from "../Auctions/CountdownTimer";

type Props = {
  banner: StaticImageData;
  countdownTo: number;
  nameLink: string;
}

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
      <div>
        14 December 2021
        
      </div>
      <CountdownTimer
        countdownTimestamp={countdownTo}
        className="absolute bottom-0 w-full text-lg font-bold leading-snug text-center text-black sm:leading-normal sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl"
      />
    </IonCard>
  );
};
export default DropCountdownCard;
