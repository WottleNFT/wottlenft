import { IonCardTitle, IonButton } from "@ionic/react";
import { useRouter } from "next/router";

import { Meta } from "../layout/Meta";
import { Main } from "../templates/Main";

const ComingSoon = () => {
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
        <div className="z-10 flex flex-col text-center items-center w-full py-20 gap-5">
          <IonCardTitle className="text-6xl font-bold">
            COMING SOON
          </IonCardTitle>
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
export default ComingSoon;
