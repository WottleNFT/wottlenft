import { IonButton, useIonModal } from "@ionic/react";

import { WottleEnabled } from "../../../hooks/useWallet";
import { MarketplaceListing } from "../../../lib/marketplaceApi";
import { Nft } from "../../../types/Nft";
import NftActionModal from "../../Marketplace/NftActionModal";

type MarketButtonProps = {
  listing: MarketplaceListing;
  wallet: WottleEnabled;
  [other: string]: any;
};

const MarketButton = ({ listing, wallet, ...props }: MarketButtonProps) => {
  const { address } = wallet.state;
  const isSeller = listing.saleMetadata.namiAddress === address;
  const hideNft = !!props.hideNft;

  const nft: Nft = {
    policyId: listing.policyId,
    assetName: listing.assetName,
    quantity: 1,
    metadata: listing.assetMetadata[listing.policyId][listing.assetName],
  };

  const dismissModal = () => {
    dismiss();
  };

  const [present, dismiss] = useIonModal(NftActionModal, {
    nft,
    dismiss: dismissModal,
    wallet,
    isSeller,
    listing,
    hideNft,
    altNftName: props.altNftName,
  });

  return (
    <IonButton shape="round" onClick={() => present()} {...props}>
      {isSeller ? "Delist" : "Buy"}
    </IonButton>
  );
};

export default MarketButton;
