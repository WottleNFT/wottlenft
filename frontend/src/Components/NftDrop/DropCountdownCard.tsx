import { IonButton, IonCard } from "@ionic/react";
import Image from "next/image";
import { useRouter } from "next/router";

import CountdownTimer from "../Auctions/CountdownTimer";

type Props = {
  banner: StaticImageData;
  countdownTo: number;
  nameLink: string;
  showViewButton: boolean;
  launch: string;
  supply: string;
  price: number;
};

const DropCountdownCard = ({
  banner,
  countdownTo,
  nameLink,
  showViewButton,
  launch,
  supply,
  price,
}: Props) => {
  const router = useRouter();

  return (
    <IonCard className="w-full rounded-2xl h-smBanner md:w-mdBanner md:h-mdBanner lg:h-lgBanner lg:w-lgBanner xl:h-xlBanner xl:w-xlBanner">
      <div className="relative w-full h-3/5 lg:h-4/6">
        <Image layout="fill" alt="Drop banner" objectFit="cover" src={banner} />
      </div>
      <div className="flex flex-row items-center justify-between grid-cols-2 px-6 md:px-8 py-2 md:py-4 xl:py-6">
        <div className="flex flex-col">
          <p className="text-xl font-bold text-black md:text-3xl lg:text-4xl xl:text-5xl">
            Cardanorcs
          </p>
          <p className="text-xs leading-tight text-black md:text-sm lg:text-base">
            <b>Launch Date :</b> {launch}
          </p>
          <p className="text-xs leading-tight text-black md:text-sm lg:text-base">
            <b>Supply :</b> {supply} <br />
            <b>Price :</b> {price} ₳
          </p>
        </div>
        <div className="flex flex-col justify-items-center">
          <CountdownTimer
            countdownTimestamp={countdownTo}
            className="flex w-full font-bold leading-snug text-center text-black text-lg sm:leading-normal sm:text-2xl md:text-4xl lg:text-5xl"
          />
          {showViewButton && (
            <IonButton
              size="default"
              onClick={() => router.push(`/nft-drops/${nameLink}`)}
            >
              View
            </IonButton>
          )}
        </div>
      </div>
    </IonCard>
  );
};
export default DropCountdownCard;
