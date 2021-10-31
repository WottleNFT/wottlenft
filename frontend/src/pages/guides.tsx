import React from "react";

import ButtonPill from "../Components/About/ButtonPill";
import { Main } from "../templates/Main";

const Guide = () => {
  return (
    <Main
      title="WottleNFT Guides"
      description="Get acquainted with the various features available on WottleNFT. From minting new NFTs to listing them for sale and buying them."
    >
      <div className="flex justify-between w-full min-h-full overflow-hidden bg-bottom bg-no-repeat bg-cover min-w-1200 bg-primary-default bg-background-seascape">
        <div className="z-10 w-3/5 pl-8 pr-2 md:ml-14 2xl:ml-56 my-44 max-w-maxScreen">
          <p className="mb-16 text-4xl font-bold leading-snug break-words sm:break-normal md:text-5xl lg:text-6xl">
            WottleNFT Guides <br />
          </p>
          <p className="mb-10 text-xl font-bold leading-tight lg:text-3xl">
            Learn how to use the various features on our platform.
            <br />
            From connecting your wallet and getting your first ADA
            <br />
            To minting your first NFT and selling it and buying more.
          </p>
        </div>
        <img
          className="z-0 self-end object-contain h-2/6 lg:h-1/2 xl:h-5/6"
          src="/assets/everyone-together.png"
          alt="all wottles"
        />
      </div>
      <div className="w-full px-8 pt-20 pb-0 text-justify lg:text-left md:px-20 2xl:px-56 2xl:max-w-maxBody 2xl:m-auto">
        <section id="contents">
          <p className="text-5xl font-bold mb-11">Guides</p>
          <ul className="text-2xl list-disc list-inside">
            <li>
              <a className="text-primary-default" href="#get-nami-wallet">
                Getting Nami Wallet
              </a>
            </li>
            <li>
              <a className="text-primary-default" href="#get-first-ada">
                Buy/Sell ADA
              </a>
            </li>
            <li>
              <a className="text-primary-default" href="#mint-nft">
                Minting an NFT
              </a>
            </li>
          </ul>
        </section>

        <GuideVideoSection
          sectionId="get-nami-wallet"
          title="Getting Nami Wallet"
          videoSrc="https://www.youtube.com/embed/bs5NdLKuTYg"
        />

        <GuideVideoSection
          sectionId="get-first-ada"
          title="Buy / Sell ADA"
          videoSrc="https://www.youtube.com/embed/s8yz3r2-XEk"
        />

        <GuideVideoSection
          sectionId="mint-nft"
          title="Minting your first NFT"
          videoSrc="https://www.youtube.com/embed/W4zh3fdpVNI"
        />
        <div className="flex flex-col items-center pb-5 mb-5">
          <div className="flex justify-center w-full md:w-3/4">
            <a href="https://github.com/WottleNFT/filedump/raw/main/WottleNFTLitepaper_ver1.0.pdf">
              <ButtonPill
                text="Download Litepaper"
                onClick={() => {}}
                className="self-center my-8 hover:scale-105"
              />
            </a>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Guide;

type GuideVideoSectionProps = {
  sectionId: string;
  title: string;
  videoSrc: string;
};

const GuideVideoSection = ({
  sectionId,
  title,
  videoSrc,
}: GuideVideoSectionProps) => {
  return (
    <section className="flex flex-wrap justify-center py-5 mt-5 lg:justify-between lg:flex-nowrap">
      <div className="flex flex-col justify-center w-full ">
        <div className="flex flex-row items-baseline mb-11">
          <p id={sectionId} className="text-xl md:text-3xl font-bold">
            {title}
          </p>
          <div className="flex flex-1" />
          <a href="#contents" className="mb-11 text-primary-default">
            Back to top
          </a>
        </div>

        <div className="flex flex-row items-center justify-center w-full ">
          <iframe
            width="1120"
            height="630"
            src={videoSrc}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};
