import { useState } from "react";

import { IonSpinner } from "@ionic/react";
import axios, { AxiosResponse } from "axios";

import useInterval from "../../hooks/useInterval";
import { blockchainApi } from "../../lib/blockchainApi";

type TransactionConfirmation = {
  result: boolean;
};

interface Props {
  transactionId: string;
  confirmedCallback?: (status: boolean) => void;
}

const TransactionStatus = ({ transactionId, confirmedCallback }: Props) => {
  const [confirmed, setConfirmed] = useState(false);

  useInterval(
    async () => {
      const response = await axios.get<
        TransactionConfirmation,
        AxiosResponse<TransactionConfirmation>
      >(`${blockchainApi}/nft/exists?hash=${transactionId}`);

      setConfirmed(response.data.result);
      if (confirmedCallback) {
        confirmedCallback(response.data.result);
      }
    },
    confirmed ? null : 2000
  );

  return (
    <section className="flex items-center w-full mt-4">
      <p className="text-2xl font-bold">
        Status:{" "}
        {confirmed ? (
          <span className="text-green-500">Confirmed</span>
        ) : (
          <>
            <span className="text-red-500">{"Not Confirmed"}</span>
            <IonSpinner className="ml-4" color="danger" />
          </>
        )}
      </p>
    </section>
  );
};
export default TransactionStatus;
