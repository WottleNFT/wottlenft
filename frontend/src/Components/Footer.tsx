import React from "react";

import { IonLabel } from "@ionic/react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full h-1/3 bg-gray-600">
      <div className="w-1/2">
        <div className="flex flex-row">
          <span>Keeping up with</span>{" "}
          <IonLabel color="primary" className="text-base">
            WottleNFT
          </IonLabel>
          <Link href="/" passHref>
            <a></a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
