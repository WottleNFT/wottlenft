import { IonButton, IonCard } from "@ionic/react";
import Image from "next/image";

import cardnorcBanner from "../../../public/assets/nft_drop/cardanorc_banner.png";
import styles from "../../styles/nftDrop.module.css";

const PurchaseDropCard = () => {
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
      <div className="absolute bottom-0 w-full">
        <div className="flex justify-between px-10">
          <p className="text-lg font-bold sm:text-2xl md:text-4xl lg:text-5xl text-primary-default">
            35 ADA
          </p>
          <div className="flex-col hidden md:justify-end md:flex xl:pb-2">
            <IonButton size="default">Purchase</IonButton>
            <p className="hidden lg:block">QUANTITY 300/500</p>
          </div>
        </div>
      </div>
    </IonCard>
  );
};
export default PurchaseDropCard;
