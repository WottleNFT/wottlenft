interface Props {
  network: number;
  balance: number;
  address: string;
}

const WalletInfoPill: React.FC<Props> = (props) => {
  return (
    <div className="bg-black w-36 self-end rounded-full m-5 flex items-center justify-end px-1 shadow-md">
      <p className="text-white w-full text-center truncate">{`${
        !props.network ? "t" : ""
      }₳ ${props.balance / 1000000}`}</p>
      <img
        src="https://picsum.photos/200"
        alt="profile pic"
        className="h-7 w-7 m-2 rounded-full border-2 border-gray-500"
      />
    </div>
  );
};
export default WalletInfoPill;
