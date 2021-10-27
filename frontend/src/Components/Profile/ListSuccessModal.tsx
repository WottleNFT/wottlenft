import { useState } from "react";

import CopySection from "../MintNfts/CopySection";
import TransactionStatus from "../Transactions/TransactionStatus";

interface Props {
  transactionId: string;
  apiUrl: string;
}

const ListSuccessModal = ({ transactionId, apiUrl }: Props) => {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <div className="flex flex-col px-10 pt-5">
      <p>You have successfully listed your NFT on the marketplace.</p>
      <p>
        Remember, transactions can take a while before they appear on the
        blockchain. You can check your transaction with the transaction hash.
      </p>
      <CopySection label="Transaction hash" text={transactionId} />
      <p>Meanwhile, we are helping you the transaction status as well...</p>
      <TransactionStatus
        transactionId={transactionId}
        apiUrl={apiUrl}
        confirmedCallback={setConfirmed}
      />
      {confirmed && (
        <p>
          Your transaction is now confirmed on the blockchain. You can now head
          over to the marketplace to view your listing!
        </p>
      )}
    </div>
  );
};
export default ListSuccessModal;
