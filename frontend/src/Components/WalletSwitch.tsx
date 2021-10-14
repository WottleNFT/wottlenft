import { Enabled, Status, WalletStatus } from "../features/wallet/walletSlice";

type Props = {
  wallet: WalletStatus;
  loading: JSX.Element;
  notEnabled: JSX.Element;
  noExtension: JSX.Element;
  enabled: (wallet: Enabled) => JSX.Element;
};

const WalletSwitch = ({
  wallet,
  loading,
  noExtension,
  notEnabled,
  enabled,
}: Props) => {
  switch (wallet.status) {
    case Status.Enabled:
      return enabled(wallet);
    case Status.Loading:
      return loading;
    case Status.NoExtension:
      return noExtension;
    default:
      return notEnabled;
  }
};

export default WalletSwitch;
