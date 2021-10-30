import { IonButton } from "@ionic/react";

import { WottleEnabled } from "../../../hooks/useWallet";
import {
  buyNft,
  BuyNftRequest,
  cancelNft,
  CancelNftRequest,
  MarketplaceListing,
} from "../../../lib/marketplaceApi";
import { signTransaction } from "../../../lib/transactionApi";

type MarketButtonProps = {
  listing: MarketplaceListing;
  wallet: WottleEnabled;
};

const MarketButton = ({ listing, wallet }: MarketButtonProps) => {
  const { address } = wallet.state;
  const { cardano } = wallet;
  const isSeller = listing.saleMetadata.namiAddress === address;

  const buy = async (sellDetails: MarketplaceListing) => {
    const request: BuyNftRequest = {
      buyerAddress: address,
      policyId: sellDetails.policyId,
      assetName: sellDetails.assetName,
    };

    const { transaction } = await buyNft(request);
    const signature = await cardano.signTx(transaction, true);
    const signResponse = await signTransaction(transaction, signature);
    console.log(signResponse);
  };

  const cancel = async (sellData: MarketplaceListing) => {
    const request: CancelNftRequest = {
      sellerAddress: sellData.saleMetadata.sellerAddress,
      policyId: sellData.policyId,
      assetName: sellData.assetName,
    };
    const { transaction } = await cancelNft(request);
    const signature = await cardano.signTx(transaction);
    const signResponse = await signTransaction(transaction, signature);
    console.log(signResponse);
  };

  return (
    <IonButton
      shape="round"
      onClick={() => {
        if (isSeller) {
          buy(listing);
        } else {
          cancel(listing);
        }
      }}
    >
      {isSeller ? "Delist" : "Buy"}
    </IonButton>
  );
};

export default MarketButton;
