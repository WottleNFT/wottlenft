import { useState } from "react";

import Link from "next/link";

import CopySection from "../MintNfts/CopySection";
import TransactionStatus from "../Transactions/TransactionStatus";

interface Props {
  transactionId: string;
}

const ListSuccessModal = ({ transactionId }: Props) => {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <div className="flex flex-col px-10 pt-5">
      <p>You have successfully listed your NFT on the marketplace.</p>
      <p>
        Remember, transactions can take a while before they appear on the
        blockchain. You can check your transaction with the transaction hash.
      </p>
      <CopySection label="Transaction hash" text={transactionId} />
      <p>
        Meanwhile, we are helping you confirm the transaction status as well.
        Please be patient, this may take awhile...
      </p>
      <TransactionStatus
        transactionId={transactionId}
        confirmedCallback={setConfirmed}
      />
      {confirmed && (
        <p>
          Your transaction is now confirmed on the blockchain. Click{" "}
          <Link href={`/marketplace/${transactionId}`}>
            <a className="text-primary-default hover:underline">here</a>{" "}
          </Link>
          to view your transaction.
        </p>
      )}
    </div>
  );
};
export default ListSuccessModal;
