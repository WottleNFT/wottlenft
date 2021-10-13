import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";

import { Auction } from "../../types/Auction";

function AuctionCard({ auction }: { auction: Auction }) {
  return (
    <IonCard className="rounded-2xl w-full h-full m-0 p-2">
      <div className="flex flex-col">
        <div className="h-2/3 w-full">
          <img
            className="p-2 w-auto h-full object-cover rounded-2xl"
            alt="Event"
            src={auction.imgUrl}
          />
        </div>
        <IonCardHeader className="text-left px-2 py-0 truncate">
          <IonCardTitle className="truncate text-base">
            {auction.title}
          </IonCardTitle>
        </IonCardHeader>
      </div>
    </IonCard>
  );
}

export default AuctionCard;
