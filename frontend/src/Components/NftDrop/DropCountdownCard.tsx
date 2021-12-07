import { IonCard } from "@ionic/react";
import Image from "next/image";

import cardnorcBanner from "../../../public/assets/nft_drop/cardanorc_banner.png";
import styles from "../../styles/nftDrop.module.css";
import CountdownTimer from "../Auctions/CountdownTimer";

const DropCountdownCard = () => {
  return (
    <IonCard className={styles.nftDropBanner}>
      <div className={styles.innerBanner}>
        <Image
          layout="fill"
          alt="Cardanorc banner"
          objectFit="cover"
          src={cardnorcBanner}
        />
      </div>
      <CountdownTimer
        countdownTimestamp={1639435078}
        className="absolute bottom-0 w-full text-base font-bold text-center text-black sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl"
      />
    </IonCard>
  );
};
export default DropCountdownCard;
