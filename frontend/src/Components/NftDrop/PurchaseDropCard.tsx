import { IonButton, IonCard } from "@ionic/react";
import Image from "next/image";

import styles from "../../styles/nftDrop.module.css";

type Props = {
  banner: StaticImageData;
  price: number;
  quantity: number;
  totalQuantity: number;
}

const PurchaseDropCard = ({
  banner,
  price,
  quantity,
  totalQuantity,
}: Props) => {
  return (
    <IonCard className={styles.nftPurchaseBanner}>
      <div className={styles.innerBanner}>
        <Image
          layout="fill"
          alt="Cardanorc banner"
          objectFit="cover"
          src={banner}
        />
      </div>
      <div className="absolute bottom-0 w-full">
        <div className="flex justify-between px-10">
          <p className="text-lg font-bold sm:text-2xl md:text-4xl lg:text-5xl text-primary-default">
            {price} ADA
          </p>
          <div className="flex-col hidden pb-1 md:justify-end md:flex lg:pb-0 xl:pb-2">
            <IonButton size="default">Purchase</IonButton>
            <p className="hidden lg:block">
              QUANTITY {quantity}/{totalQuantity}
            </p>
          </div>
        </div>
      </div>
    </IonCard>
  );
};
export default PurchaseDropCard;
