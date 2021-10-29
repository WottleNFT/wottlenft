import { tokenKey } from "../hooks/useAuth";
import { WottleEnabled } from "../hooks/useWallet"
import { Nft } from "../types/Nft";
import { sellNft, SellNftRequest, UnGoal } from "./marketplaceApi";
import { signTransaction } from "./transactionApi";

interface ListNftBody {
	seller_wallet_id: string;
	nft_id: string;
	nft_asset_name: string;
	price: number;
}

const marketplaceBaseUrl = (process.env.profileApi as string) + "/marketplace";

// Prices are in lovelace
// Assumes that user is already logged in 
export const listNft = async (wallet: WottleEnabled, nft: Nft, price: number) => {
	const url = wallet.state.backendApi;
	var transactionId;

	try {
		const request: SellNftRequest = {
			sellerAddress: wallet.state.address,
			policyId: nft.policyId,
			assetName: nft.assetName,
			unGoal: UnGoal.ZeroHunger,
			price: price,
		};
		const { transaction } = await sellNft(url, request);
		const signature = await wallet.cardano.signTx(transaction);
		const signResponse = await signTransaction(url, transaction, signature);
		transactionId = signResponse.tx_id;
	} catch (e) {
		throw e;
	}

	try {
		const payload: ListNftBody = {
			seller_wallet_id: wallet.state.bechAddr,
			nft_id: nft.policyId,
			nft_asset_name: nft.assetName,
			price: price,
		}

		const res = await fetch(marketplaceBaseUrl + "/listing", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
			},
			body: JSON.stringify(payload),
		});
		console.log(res);
	} catch (e) {
		throw e;
	}

	return transactionId;
}