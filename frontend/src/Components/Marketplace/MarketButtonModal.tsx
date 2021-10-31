import { useState } from "react";

import { IonContent, IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import Link from "next/link";

import CopySection from "../MintNfts/CopySection";
import TransactionStatus from "../Transactions/TransactionStatus";

interface Props {
  transactionId: string;
  btnType: MarketButtonType;
  dismiss: () => void;
}

export enum MarketButtonType {
  BUY = "bought",
  DELIST = "delisted",
}

const MarketButtonModal = ({ transactionId, btnType, dismiss }: Props) => {
  const [confirmed, setConfirmed] = useState(false);

  const getRedirectionMsg = (): string => {
    switch (btnType) {
      case MarketButtonType.BUY:
        return "to view your newly bought NFT!";
      case MarketButtonType.DELIST:
        return "to view this NFT, which is no longer listed on the marketplace!";
      default:
        return "";
    }
  };

  return (
    <IonContent>
      <div className="flex flex-col h-full px-0 sm:px-10 pt-5">
        <div className="relative py-2 border-b-2 border-solid border-primary-default">
          <p className={`inline-block w-full text-2xl font-bold text-center`}>
            Congratulations!
            <IonIcon
              onClick={() => dismiss()}
              icon={closeOutline}
              className="mr-4 sm:mr-0 absolute right-0 text-black hover:cursor-pointer"
              size="large"
            />
          </p>
        </div>
        <div className="flex flex-col px-10 pt-5">
          <p>You have successfully {btnType} this NFT.</p>
          <p>
            Remember, transactions can take a while before they appear on the
            blockchain. You can check your transaction with the transaction
            hash.
          </p>
          <CopySection label="Transaction hash" text={transactionId} />
          <p>
            Meanwhile, we are helping you confirm the transaction status as
            well. Please be patient, this may take awhile...
          </p>
          <TransactionStatus
            transactionId={transactionId}
            confirmedCallback={setConfirmed}
          />
          {confirmed && (
            <p>
              Your transaction is now confirmed on the blockchain. You can now
              head over to your{" "}
              <Link href="/profile">
                <a className="text-primary-default" target="_blank">
                  profile
                </a>
              </Link>{" "}
              page {getRedirectionMsg()}
            </p>
          )}
        </div>
      </div>
    </IonContent>
  );
};
export default MarketButtonModal;
