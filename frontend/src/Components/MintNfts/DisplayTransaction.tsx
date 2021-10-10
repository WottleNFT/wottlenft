import { IonIcon } from "@ionic/react";
import { copy } from "ionicons/icons";

type Props = {
  transactionId: string;
  isMainnet: boolean;
};

const DisplayTransaction = ({ transactionId, isMainnet }: Props) => {
  const url = isMainnet
    ? `https://cardanoscan.io/transaction/${transactionId}`
    : `https://testnet.cardanoscan.io/transaction/${transactionId}`;

  return (
    <>
      <h1 className="text-4xl font-bold">Congratulations!</h1>
      <p>Your transaction has successfully been submitted!</p>

      <section className="mt-4">
        Remember, transactions can take a while before they appear on the
        blockchain. You can check your transaction with the transaction hash.
      </section>
      <section className="w-full mt-8 ">
        <p className="font-bold">Transaction Hash</p>
        <div
          className="flex flex-row justify-between w-full p-4 overflow-auto bg-gray-400 rounded-md hover:cursor-pointer"
          onClick={() => navigator.clipboard.writeText(transactionId)}
        >
          {transactionId} <IonIcon icon={copy} />
        </div>
      </section>

      <section className="w-full mt-8 ">
        <p>
          Alternatively, you can check the progress{" "}
          <a target="_blank" href={url} rel="noreferrer">
            here
          </a>
        </p>
      </section>
    </>
  );
};

export default DisplayTransaction;
