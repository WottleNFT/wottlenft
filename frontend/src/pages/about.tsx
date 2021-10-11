import { IonContent } from "@ionic/react";
import Image from "next/image";

import coolWottle from "../../public/assets/cool-wottle.png";
import dogWottle from "../../public/assets/dog-wottle.png";

const About = () => {
  // Long paragraph contents
  const ourStory = `Here at WottleNFT, we aim to bring out the true value behind each Cardano NFT by providing a space for the Creators to share their stories. 
    It is also important to give back, especially with the outbreak of the Covid-19 Pandemic. 
    That is why, WottleNFT will be aligning its business model with the United Nation Sustainable Development Goals (SDGs) to support Social Enterprises worldwide.`;

  const ourFocus = `WottleNFT’s auctions-only focus works together with our focus on storytelling to allow more transparent pricing. 
    Interested bidders collectively decide where and how far prices should go. 
    No more unilateral pricing decisions conducted by creators in obscure blackboxes. 
    Everyone has a say in what price best reflects an NFT’s value. Cardano NFT auctions, done right.`;

  const howItWorks = (
    <p className="text-xl">
      WottleNFT adopts an English Auction format. Creators are charged a gas fee
      for listing an auction. At the end of an auction, WottleNFT’s smart
      contract facilitates the transaction between creators and successful
      bidders, with a fee of 15%. This 15% fee comprises:{" "}
      <b>Service Fees (11%)</b>, <b>Royalty Fees (2.5%)</b> and{" "}
      <b>Social Donations (1.5%)</b>. Successful bidders are given an option to
      dedicate their Social Donations to a social enterprise of their choosing,
      based on an underlying United Nations Sustainable Development Goal. We
      chose to support social enterprises, as we recognise their struggle for
      good.
    </p>
  );

  const stakingPool = (
    <p className="text-xl">
      <p className="mb-5">
        WottleNFT is running a sustainable staking pool <b>[WOT]</b> built on
        multi-Raspberry Pi system. By supporting WottleNFT, you are supporting
        Social Enterprises as 10% of [WOT]’s rewards will be channeled towards
        Social Enterprises.
      </p>
      <p>
        Furthermore, we are offering 0% fees! As a reward, delegators who stake
        a minimum of 1000 ADA will receive our very first,{" "}
        <b>exclusive utility NFT drop</b> by the end of the year! More
        information will be released soon.
      </p>
    </p>
  );

  const nftMinter = (
    <p className="text-xl">
      WottleNFT wants to make Cardano NFT accessible to everyone. As such, we
      have implemented our smart contracts that enable us to offer the community
      the lowest minting service fee in the market.
      <b> Mint 1 Cardano NFT for 1 ADA in just under 1 Minute</b> with our very
      own smart contract enabled nft-minter.
    </p>
  );

  return (
    <IonContent>
      <div className="h-screen bg-primary-default bg-about-background bg-no-repeat bg-contain bg-bottom flex justify-between">
        <div className="w-2/5 ml-56 mt-44">
          <p className="text-6xl font-bold leading-snug mb-6">
            TO CREATE <br />
            A GLOBAL <br />
            INTERCONNECTED <br />
            ECOSYSTEM
          </p>
          <p className="text-3xl font-bold leading-tight mb-10">
            BETWEEN CARDANO NFTS <br />
            AND SOCIAL ENTERPRISES
          </p>
          <p className="text-2xl font-bold  leading-tight">
            WHILE SHARING THE STORIES BEHIND EACH <br />
            CARDANO NFT.
          </p>
        </div>
      </div>
      <div className="mx-56 my-48">
        <p className="text-6xl font-bold mb-11">OUR STORY</p>
        <p className="text-xl">{ourStory}</p>
        <div className="flex justify-between py-5">
          <Image
            src={dogWottle}
            alt="dog wottle"
            height={400}
            width={400}
            className="object-contain"
          />
          <div className="w-1/2 flex flex-col justify-center">
            <p className="text-4xl font-bold mb-11">Our Focus</p>
            <p className="text-xl">{ourFocus}</p>
          </div>
        </div>
        <p className="text-6xl font-bold mb-11">How it works</p>
        {howItWorks}
        <div className="flex justify-between py-5">
          <div className="w-1/2 flex flex-col justify-center">
            <p className="text-4xl font-bold mb-11">Staking Pool</p>
            {stakingPool}
          </div>
          <Image
            src={coolWottle}
            alt="cool wottle"
            height={400}
            width={400}
            className="object-contain"
          />
        </div>
        <p className="text-6xl font-bold mb-11">NFT Minter</p>
        {nftMinter}
        <div className="py-5">
          <p className="text-6xl font-bold mb-11">RoadMap</p>
        </div>
        <div className="py-5">
          <p className="text-6xl font-bold mb-11">Meet the Founders</p>
        </div>
      </div>
    </IonContent>
  );
};
export default About;
