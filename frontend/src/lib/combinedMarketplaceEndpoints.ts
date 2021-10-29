import { tokenKey } from "../hooks/useAuth";
import { WottleEnabled } from "../hooks/useWallet";
import { Nft, NftMetadata } from "../types/Nft";
import { sellNft, SellNftRequest, UnGoal } from "./marketplaceApi";
import { profileBaseUrl } from "./profileApi";
import { signTransaction } from "./transactionApi";

interface ListNftBody {
  seller_wallet_id: string;
  nft_id: string;
  nft_asset_name: string;
  price: number;
  nft_metadata: NftMetadata;
  un_goal: UnGoal;
}

export enum ListingStatus {
  completed = "completed",
  listing = "listing",
  cancelled = "cancelled",
}

export interface Listing {
  buyer_wallet_id?: string;
  creation_time: string;
  current_status: ListingStatus;
  listing_id: number;
  price: number;
  nft_id: string;
  seller_wallet_id: string;
  nft_asset_name: string;
  un_goal?: UnGoal;
	nft_metadata: NftMetadata;
}

const marketplaceBaseUrl = `${profileBaseUrl}/marketplace`;

// Prices are in lovelace
// Assumes that user is already logged in
export const listNft = async (
  wallet: WottleEnabled,
  nft: Nft,
  price: number,
  unGoal: UnGoal
) => {
  // List on profilebackend first
  const payload: ListNftBody = {
    seller_wallet_id: wallet.state.bechAddr,
    nft_id: nft.policyId,
    nft_asset_name: nft.assetName,
    price,
    nft_metadata: nft.metadata,
    un_goal: unGoal,
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
    console.log(await res.json());
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

export const getBoughtListings = async (buyerWalletId: string) => {
  const res = await fetch(
    `${marketplaceBaseUrl}/listings/buyer/${buyerWalletId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};

export const getSellListings = async (sellerWalletId: string) => {
  const res = await fetch(
    `${marketplaceBaseUrl}/listings/seller/${sellerWalletId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};
