import { useEffect } from "react"


const ConnectWalletButton: React.FC = () => {
    useEffect(() => {
        const f = async () => {
            console.log(await window.cardano.isEnabled())
        }
        f();
    }, []);
    const handleConnectWallet = () => {
        var cardano = window.cardano;
        // Check if there is a cardano provider
        if (!cardano) {
            alert("Cardano provider not detected! Get the Nami Wallet extension first.")
            return;
        }

        const enableNamiWallet = async () => {
            let enabled = await cardano.enable();
            if (!enabled) {
                alert ("Connection refused");
            }
        }
        cardano.enable().then(() => {
            console.log("Conencted to Nami wallet");
        }).catch((err: Error) => {
            console.log(err);
        })
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