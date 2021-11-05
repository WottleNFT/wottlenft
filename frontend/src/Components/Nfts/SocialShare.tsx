import React from "react";

import { IonIcon } from "@ionic/react";
import { shareSocialOutline } from "ionicons/icons";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import ReactTooltip from "react-tooltip";

import { Nft } from "../../types/Nft";

interface Props {
  txHash?: string;
  nft: Nft;
}

const SocialShare = ({ txHash, nft }: Props) => {
  const sharedLink = txHash
    ? `https://wottle.io/marketplace/${txHash}`
    : `https://wottle.io/nfts/${nft.policyId}/${nft.assetName}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(sharedLink);
  };

  return (
    <div className="flex gap-3 my-3">
      <FacebookShareButton url={sharedLink}>
        <FacebookIcon size={36} className="rounded-lg" />
      </FacebookShareButton>
      <TwitterShareButton url={sharedLink}>
        <TwitterIcon size={36} className="rounded-lg" />
      </TwitterShareButton>
      <TelegramShareButton url={sharedLink}>
        <TelegramIcon size={36} className="rounded-lg" />
      </TelegramShareButton>
      <LinkedinShareButton url={sharedLink}>
        <LinkedinIcon size={36} className="rounded-lg" />
      </LinkedinShareButton>
      <div
        data-tip="Link copied!"
        onClick={handleCopyLink}
        style={{ height: "36px", width: "36px" }}
        className="flex items-center justify-center bg-gray-600 rounded-lg hover:cursor-pointer"
      >
        <IonIcon icon={shareSocialOutline} className="text-white" />
      </div>
      <ReactTooltip
        effect="solid"
        place="right"
        backgroundColor="black"
        event="click"
        afterShow={() => {
          handleCopyLink();
          setTimeout(ReactTooltip.hide, 1000);
        }}
      />
    </div>
  );
};
export default SocialShare;
