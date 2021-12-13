import React from "react";

import { IonCard, IonSpinner } from "@ionic/react";
import Image from "next/image";

import useWallet from "../../hooks/useWallet";
import { MarketplaceListing } from "../../lib/marketplaceApi";
import MarketButton from "../Nfts/MarketplaceNfts/MarketButton";
import WalletSwitch from "../WalletSwitch";

type Props = {
  banner: StaticImageData;
  price: number;
  drop: MarketplaceListing;
};

const PurchaseDropCard = ({ banner, price, drop }: Props) => {
  const wallet = useWallet();

  return (
    <IonCard className="w-full rounded-2xl h-smBanner md:w-mdBanner md:h-mdBanner lg:h-lgBanner lg:w-lgBanner xl:h-xlBanner xl:w-xlBanner">
      <div className="relative w-full h-3/5 lg:h-4/6">
        <Image layout="fill" alt="Drop banner" objectFit="cover" src={banner} />
      </div>
      <div className="flex flex-row items-center justify-between grid-cols-2 p-2 md:px-4 md:py-6">
        <div className="flex flex-col">
          <p className="text-xl font-bold text-black md:text-3xl lg:text-4xl xl:text-5xl">
            Cardanorcs
          </p>
          <p className="text-sm leading-tight text-black lg:text-base">
            <b>Supply :</b> 5000 Unique Cardanorcs <br />
            <b>Price :</b> {price} ₳ <br />
            <b>Policy ID:</b>{" "}
            6113dafb03b4eb0d6fbad8eecaf13d12d37d5df9c9bcf9ca05144d20
          </p>
        </div>
        <div className="flex flex-col w-26 md:w-36 justify-items-center xl:w-52">
          <WalletSwitch
            wallet={wallet}
            enabled={(enabled) => (
              <MarketButton
                wallet={enabled}
                listing={drop}
                hideNft={true}
                altNftName="Cardanorc NFT"
                altImage="/assets/nft_drop/wottle_cardanorc_2.png"
              />
            )}
            loading={<IonSpinner />}
            fallback={<div>Please connect a wallet</div>}
          />
          {/*
          <p className="text-center">
            Quantity {quantity}/{totalQuantity}
          </p>
						*/}
        </div>
      </div>
    </IonCard>
  );
};
export default PurchaseDropCard;
