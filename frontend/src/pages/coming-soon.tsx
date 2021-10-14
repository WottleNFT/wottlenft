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
      <div className="relative flex w-full h-auto min-h-full bg-primary-default">
        <img
          src={`${router.basePath}/assets/background-seascape.png`}
          alt="background seascape"
          className="z-0 object-cover absolute inset-0 h-full w-full"
        />
        <img
          src={`${router.basePath}/assets/angry-thermometer.png`}
          alt="angry thermometer"
          className="z-0 object-cover absolute bottom-0 left-0 h-1/3 lg:h-3/5 xl:h-4/5"
        />
        <img
          src={`${router.basePath}/assets/corn.png`}
          alt="corn"
          className="z-0 object-cover absolute bottom-0 right-0 h-1/3 lg:h-3/5 xl:h-4/5"
        />
        <img
          src={`${router.basePath}/assets/thinker.png`}
          alt="thinker"
          className="z-0 object-cover absolute bottom-0 right-0 h-1/6 lg:h-1/3 xl:h-1/2"
        />
        <div className="z-10 flex flex-col m-auto text-center items-center w-full py-20">
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
