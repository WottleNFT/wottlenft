const HowToMint = () => {
  return (
    <div className="flex flex-col items-center justify-center px-1">
      <h1 className="mb-20 text-3xl font-bold">
        Steps to mint your own Cardano NFT
      </h1>
      <div className="grid w-auto h-auto grid-cols-1 gap-10 lg:grid-cols-5">
        <div />
        <Card
          text="Connect your wallet"
          imageSrc="/assets/mint/connect.svg"
          alt="connect wallet graphic"
        />
        <Card
          text="Fill up NFT Metadata"
          imageSrc="/assets/mint/upload.svg"
          alt="form graphic"
        />
        <Card
          text="NFT goes straight to your account!"
          imageSrc="/assets/mint/deposit.svg"
          alt="deposit graphic"
        />
        <div />
      </div>
    </div>
  );
};

type CardProps = {
  text: string;
  imageSrc: string;
  alt: string;
};

const Card = ({ text, imageSrc, alt }: CardProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full rounded-md">
      <img className="flex flex-grow object-cover" alt={alt} src={imageSrc} />

      <h2 className="pt-4 text-xl font-semibold">{text}</h2>
    </div>
  );
};

export default HowToMint;
