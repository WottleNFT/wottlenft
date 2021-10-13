import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";

import { Auction } from "../../types/Auction";
import CategoryTag from "../CategoryTag";
import CountdownTimer from "./CountdownTimer";

function AuctionCard({ auction }: { auction: Auction }) {
  return (
    <IonCard className="rounded-2xl w-full h-full m-0 p-4">
      <div className="h-1/5 flex felx-row">
        <div className="m-2 w-1/5 h-full">
          <img
            src="https://picsum.photos/200"
            alt="nft pic"
            className="rounded-full"
          />
        </div>
        <div className="felx flex-col place-content-center w-4/5">
          <div className="text-left">
            <IonCardSubtitle>{`@${auction.creater.username}`}</IonCardSubtitle>
          </div>
          <div className="flex felx-row">
            {auction.categories.map((category, id) => (
              <CategoryTag
                color="primary"
                label={category.name}
                className="m-0"
                key={id}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="h-1/2 flex flex-col place-items-end">
        <div>
          <img
            className="p-2 w-auto h-full object-cover rounded-2xl"
            alt="Event"
            src={auction.nft.imgUrl}
          />
        </div>
        <CountdownTimer countdownTimestamp={auction.endingTime} />
      </div>
      <div>
        <IonCardHeader className="px-2 py-0 truncate">
          <IonCardTitle className="text-center truncate text-base">
            {auction.nft.asset_name}
          </IonCardTitle>
          <p className="h-16 text-left line-clamp-3 whitespace-normal overflow-ellipsis">
            {auction.nft.description}
          </p>
        </IonCardHeader>
        <IonButton size="small">Bid</IonButton>
      </div>
    </IonCard>
  );
}

export default AuctionCard;
