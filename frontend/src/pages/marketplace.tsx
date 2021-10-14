import { IonCardTitle, IonButton } from "@ionic/react";
import { useRouter } from "next/router";

import CountdownTimer from "../Components/Auctions/CountdownTimer";
import { Meta } from "../layout/Meta";
import { Main } from "../templates/Main";

const Marketplace = () => {
  const router = useRouter();
  return (
    <Main
      meta={<Meta title="Marketplace | WottleNFT" description="marketplace" />}
    >
      <div className="relative w-full h-auto bg-background-seascape bg-primary-default">
        <img
          src={`${router.basePath}/assets/angry-thermometer.png`}
          alt="angry thermometer"
          className="z-0 object-cover absolute bottom-0 left-0 h-1/3 md:h-4/5"
        />
        <img
          src={`${router.basePath}/assets/corn.png`}
          alt="corn"
          className="z-0 object-cover absolute bottom-0 right-0 h-1/3 md:h-4/5"
        />
        <img
          src={`${router.basePath}/assets/thinker.png`}
          alt="thinker"
          className="z-0 object-cover absolute bottom-0 right-0 h-1/6 md:h-1/2"
        />
        <div className="z-10 flex flex-col text-center items-center w-full py-20">
          <IonCardTitle className="text-5xl font-bold">
            Cardano NFT
          </IonCardTitle>
          <IonCardTitle className="text-5xl font-bold">
            Marketplace
          </IonCardTitle>
          <IonCardTitle className="text-xl py-5">
            with a sustainable mission
          </IonCardTitle>
          <IonCardTitle className="text-3xl font-bold">Live on</IonCardTitle>
          <IonCardTitle className="text-2xl font-serif font-light">
            1.11.2021 - 11 a.m. UTC
          </IonCardTitle>
          <CountdownTimer
            countdownTimestamp={1635764400}
            className="text-5xl text-black"
          />
          <IonButton
            shape="round"
            color="dark"
            className="bg-black w-32 rounded-full"
            routerLink="/about"
          >
            About us
          </IonButton>
        </div>
      </div>
    </Main>
  );
};
export default Marketplace;
