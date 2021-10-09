import { WalletState } from "../features/wallet/walletSlice";

const WalletInfoPill: React.FC<WalletState> = (props) => {
  return (
    <div className="flex items-center self-end justify-end px-1 m-5 bg-black rounded-full shadow-md w-36">
      <p className="w-full text-center text-white truncate">{`${
        !props.network ? "t" : ""
      }₳ ${props.balance / 1000000}`}</p>
      <img
        src="https://picsum.photos/200"
        alt="profile pic"
        className="m-2 border-2 border-gray-500 rounded-full h-7 w-7"
      />
    </div>
  );
};
export default WalletInfoPill;
