import CopySection from "./CopySection";

type Props = {
  transactionId: string;
  policyId: string;
  policyJson: JSON;
  isMainnet: boolean;
};

const DisplayTransaction = ({
  transactionId,
  isMainnet,
  policyJson,
  policyId,
}: Props) => {
  const url = isMainnet
    ? `https://cardanoscan.io/transaction/${transactionId}`
    : `https://testnet.cardanoscan.io/transaction/${transactionId}`;

  const poolPmUrl = `https://pool.pm/policy/${policyId}`;

  const policyScript = JSON.stringify(policyJson, null, 2);
  return (
    <>
      <h1 className="text-4xl font-bold">Congratulations!</h1>
      <p>You have minted a Cardano Masterpiece.</p>

      <section className="mt-4">
        Remember, transactions can take a while before they appear on the
        blockchain. You can check your transaction with the transaction hash.
      </section>
      <CopySection label="Transaction Hash" text={transactionId} />
      <CopySection label="Policy ID" text={policyId} />
      <CopySection label="Policy Script" text={policyScript} />

      <section className="w-full mt-8 ">
        <p>
          Alternatively, you can check the progress{" "}
          <a target="_blank" href={url} rel="noreferrer">
            here
          </a>
        </p>
      </section>
      <section className="w-full mt-8 ">
        <p>
          Remember to also register your policy on{" "}
          <a target="_blank" href={poolPmUrl} rel="noreferrer">
            pool.pm
          </a>{" "}
          (Only on mainnet)
        </p>
      </section>
    </>
  );
};

export default DisplayTransaction;
