import React, { useState } from "react";

import { IonButton, IonCard, IonSegment } from "@ionic/react";

import { Asset } from "../../types/Asset";
import CategoryTag from "../CategoryTag";
import NftInfoSegmentBtn from "./NftInfoSegmentBtn";
import styles from "./userNft.module.css";

type Props = {
  nft: Asset;
};

const NftInfoCard = ({ nft }: Props) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { policy_id, qty } = nft;

  const [selectedSegment, setSelectedSegment] = useState("details");
  return (
    <IonCard className="rounded-2xl w-full h-full m-0 pt-3">
      <IonSegment
        mode="ios"
        className="w-1/2 mx-auto my-2 px-2"
        value={selectedSegment}
        onIonChange={(e) => setSelectedSegment(e.detail.value as string)}
      >
        <NftInfoSegmentBtn value="details" selected={selectedSegment}>
          Details
        </NftInfoSegmentBtn>
        <NftInfoSegmentBtn value="properties" selected={selectedSegment}>
          Properties
        </NftInfoSegmentBtn>
      </IonSegment>

      <div className="p-4 text-black">
        {selectedSegment === "details" && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="font-bold truncate">Policy ID</span>
              <p>{policy_id}</p>
            </div>
            <div className="flex flex-row space">
              <div className="w-1/2 flex flex-col">
                <span className="font-bold truncate">Quantity</span>
                <p>{`1/${qty}`}</p>
              </div>
              <div className="w-1/2 flex flex-col">
                <span className="font-bold truncate">Minted</span>
                <p>26 May 2021</p>
              </div>
            </div>
          </div>
        )}
        {selectedSegment === "properties" && (
          <div className="grid grid-cols-3">
            <CategoryTag color="primary" label="Key1 : Value1" />
            <CategoryTag color="primary" label="Key2 : Value2" />
            <CategoryTag color="primary" label="Key3 : Value3" />
            <CategoryTag color="primary" label="Key4 : Value4" />
          </div>
        )}
      </div>

      <div className="p-4 w-full flex flex-row justify-between items-end bg-black">
        <div className="flex flex-col">
          <span className="text-sm font-light text-white">Price:</span>
          <span className="text-3xl text-primary-default">30 ₳</span>
        </div>
        <IonButton size="small" shape="round" className={styles.infoCardBtn}>
          Buy
        </IonButton>
      </div>
    </IonCard>
  );
};

export default NftInfoCard;
