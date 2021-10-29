import { tokenKey } from "../hooks/useAuth";
import { WottleEnabled } from "../hooks/useWallet";
import { Nft } from "../types/Nft";
import { sellNft, SellNftRequest, UnGoal } from "./marketplaceApi";
import { profileBaseUrl } from "./profileApi";
import { signTransaction } from "./transactionApi";

interface ListNftBody {
  seller_wallet_id: string;
  nft_id: string;
  nft_asset_name: string;
  price: number;
}

const marketplaceBaseUrl = `${profileBaseUrl}/marketplace`;

// Prices are in lovelace
// Assumes that user is already logged in
export const listNft = async (
  wallet: WottleEnabled,
  nft: Nft,
  price: number
) => {
  // List on profilebackend first
  const payload: ListNftBody = {
    seller_wallet_id: wallet.state.bechAddr,
    nft_id: nft.policyId,
    nft_asset_name: nft.assetName,
    price,
  };

  const res = await fetch(`${marketplaceBaseUrl}/listing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
    body: JSON.stringify(payload),
  });
  if (res.status !== 200) {
    throw new Error(await res.json());
  }

  // List on blockchain
  const request: SellNftRequest = {
    sellerAddress: wallet.state.address,
    policyId: nft.policyId,
    assetName: nft.assetName,
    unGoal: UnGoal.ZeroHunger,
    price,
  };
  const { transaction } = await sellNft(request);
  const signature = await wallet.cardano.signTx(transaction);
  const signResponse = await signTransaction(transaction, signature);
  const transactionId = signResponse.tx_id;

  return transactionId;
};
