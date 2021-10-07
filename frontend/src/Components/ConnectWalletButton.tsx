import { storeWalletInfo } from '../lib/namiWallet';

const ConnectWalletButton: React.FC = () => {
  const handleConnectWallet = () => {
    const { cardano } = window;
    // Check if there is a cardano provider
    if (!cardano) {
      alert(
        'Cardano provider not detected! Get the Nami Wallet extension first.'
      );
      return;
    }

    cardano
      .enable()
      .then(() => {
        storeWalletInfo();
      }).then(() => {
        // Convenient way to just update the page with the wallet info for now
        location.reload();
      }).catch((err: Error) => {
        console.log(err);
      });
  };

  return (
    <button
      className="h-16 bg-black text-white w-48 self-end rounded-full m-5"
      onClick={handleConnectWallet}
    >
      Connect to wallet
    </button>
  );
};
export default ConnectWalletButton;
