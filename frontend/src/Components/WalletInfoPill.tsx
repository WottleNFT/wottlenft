interface Props {
  network: number;
  balance: number;
  address: string;
}

const WalletInfoPill: React.FC<Props> = (props) => {
  return (
    <div className="h-16 bg-gray-200 w-48 self-end rounded-full m-5 flex items-center justify-end px-1 shadow-md">
      <p className="w-full text-center">{`${!props.network ? 't' : ''}₳ ${props.balance / 1000000}`}</p>
      <img
        src="https://picsum.photos/200"
        alt="profile pic"
        className="h-14 w-14 rounded-full border-2 border-gray-500"
      />
    </div>
  );
};
export default WalletInfoPill;
