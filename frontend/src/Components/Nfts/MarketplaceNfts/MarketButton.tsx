import { useState } from "react";

import { IonButton, IonSpinner, useIonModal } from "@ionic/react";

import { WottleEnabled } from "../../../hooks/useWallet";
import { buy, delist } from "../../../lib/combinedMarketplaceEndpoints";
import { MarketplaceListing } from "../../../lib/marketplaceApi";
import MarketButtonModal, {
  MarketButtonType,
} from "../../Marketplace/MarketButtonModal";

type MarketButtonProps = {
  listing: MarketplaceListing;
  wallet: WottleEnabled;
  [other: string]: any;
};

const MarketButton = ({ listing, wallet, ...props }: MarketButtonProps) => {
  const { address } = wallet.state;
  const isSeller = listing.saleMetadata.namiAddress === address;

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [txId, setTxId] = useState<string | undefined>();

  const handleResponse = (res: string) => {
    console.log("inside handleResponse: ", res);
    setTxId(res);
    present();
  };

  const [present, dismiss] = useIonModal(MarketButtonModal, {
    transactionId: txId,
    btnType: isSeller ? MarketButtonType.DELIST : MarketButtonType.BUY,
    dismiss: () => dismiss(),
  });

  const onClick = async () => {
    setIsSubmitting(true);
    try {
      if (isSeller) {
        const res = await delist(wallet, listing);
        handleResponse(res);
      } else {
        const res = await buy(wallet, listing);
        handleResponse(res);
      }
    } catch (e) {
      console.error(e);
      setTxId(undefined);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting ? (
        <IonSpinner name="crescent" />
      ) : (
        <IonButton shape="round" onClick={onClick} {...props}>
          {isSeller ? "Delist" : "Buy"}
        </IonButton>
      )}
    </>
  );
};

export default MarketButton;
