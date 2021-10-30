import React from "react";

import { IonCardTitle } from "@ionic/react";
import { useRouter } from "next/router";

import { Main } from "../templates/Main";

const NftNotFound = () => {
  const router = useRouter();
  return (
    <Main>
      <div className="relative flex w-full h-auto min-h-full bg-primary-default">
        <img
          src={`${router.basePath}/assets/background-seascape.png`}
          alt="background seascape"
          className="absolute inset-0 z-0 object-cover w-full h-full"
        />

        <img
          src={`${router.basePath}/assets/angry-thermometer.png`}
          alt="angry thermometer"
          className="absolute bottom-0 left-0 z-0 object-cover h-1/3 lg:h-3/5 xl:h-2/3 2xl:h-4/5"
        />
        <img
          src={`${router.basePath}/assets/corn.png`}
          alt="corn"
          className="absolute bottom-0 right-0 z-0 object-cover h-1/3 lg:h-3/5 xl:h-2/3 2xl:h-4/5"
        />
        <img
          src={`${router.basePath}/assets/thinker.png`}
          alt="thinker"
          className="absolute bottom-0 right-0 z-0 object-cover h-1/6 lg:h-1/4 xl:h-2/5 2xl:h-1/2"
        />
        <div className="z-10 flex flex-col gap-3 items-center w-full py-20 m-auto text-center text-lg">
          <IonCardTitle className="text-5xl font-bold">
            NFT Not Found
          </IonCardTitle>
          <IonCardTitle className="py-5 text-xl">
            Here are a list of possible reasons:
          </IonCardTitle>
          <p>
            1. Please make sure you have entered
            <br /> correct information in the url
          </p>
          <p>
            2. Transaction takes time, please
            <br /> wait for a while after an operation
          </p>
        </div>
      </div>
    </Main>
  );
};
export default NftNotFound;
