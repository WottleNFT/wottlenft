import { Status } from "../features/wallet/walletSlice";
import {
  WottleEnabled,
  WottleNotEnabled,
  WottleWalletState,
  WottleWrongNetwork,
} from "../hooks/useWallet";

type Props = {
  wallet: WottleWalletState;
  loading?: JSX.Element;
  notEnabled?: (wallet: WottleNotEnabled) => JSX.Element;
  noExtension?: JSX.Element;
  wrongNetwork?: (wallet: WottleWrongNetwork) => JSX.Element;
  enabled?: (wallet: WottleEnabled) => JSX.Element;
  fallback: JSX.Element;
};

const WalletSwitch = ({
  wallet,
  loading,
  noExtension,
  notEnabled,
  enabled,
  fallback,
  wrongNetwork,
}: Props) => {
  if (wallet.status === Status.Enabled && enabled) return enabled(wallet);
  if (wallet.status === Status.Loading && loading) return loading;
  if (wallet.status === Status.NotEnabled && notEnabled)
    return notEnabled(wallet);
  if (wallet.status === Status.NoExtension && noExtension) return noExtension;
  if (wallet.status === Status.WrongNetwork && wrongNetwork)
    return wrongNetwork(wallet);

  return fallback;
};

export default WalletSwitch;
