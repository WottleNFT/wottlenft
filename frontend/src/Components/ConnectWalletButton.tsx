import { useDispatch } from "react-redux";
import { setWalletInfo } from "../features/wallet/walletSlice";
import { storeWalletInfo } from "../lib/namiWallet";

const ConnectWalletButton: React.FC = () => {
    const dispatch = useDispatch();

    const handleConnectWallet = () => {
        var cardano = window.cardano;
        // Check if there is a cardano provider
        if (!cardano) {
            alert("Cardano provider not detected! Get the Nami Wallet extension first.")
            return;
        }

        cardano.enable().then(() => {
            storeWalletInfo();
            dispatch(setWalletInfo({
                balance: 123,
                address: "laskdjklsjd",
            }))
        }).catch((err: Error) => {
            console.log(err);
        });
    }

    return (
        <button 
            className="h-16 bg-black text-white w-48 self-end rounded-full m-5"
            onClick={handleConnectWallet}
        >
            Connect to wallet
        </button>
    )
}
export default ConnectWalletButton