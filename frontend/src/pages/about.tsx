import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import coolWottle from "../../public/assets/cool-wottle.png";
import dogWottle from "../../public/assets/dog-wottle-green.png";
import heartWottle from "../../public/assets/heart-wottle.png";
import roadmap from "../../public/assets/roadmap.png";
import studiousWottle from "../../public/assets/studious-wottle.png";
import ButtonPill from "../Components/About/ButtonPill";
import FounderProfile from "../Components/About/FounderProfile";
import { Main } from "../templates/Main";

const About = () => {
  const router = useRouter();

  // Long paragraph contents
  const ourStory = (
    <p className="text-xl">
      Here at WottleNFT, we aim to bring out the <b>true value</b> behind each
      Cardano NFT by providing a space for the Creators to share their stories.
      It is also important to give back, especially with the outbreak of the{" "}
      <b>Covid-19 Pandemic</b>. That is why, WottleNFT will be aligning its
      business model with the United Nation Sustainable Development Goals (
      <b>SDGs</b>) to support Social Enterprises worldwide.
    </p>
  );

  const ourFocus = (
    <p className="text-xl">
      WottleNFT aims to focus on storytelling to allow more transparent pricing.
      Interested collectors collectively decide where and how far prices should
      go. No more unilateral pricing decisions conducted by creators in obscure
      blackboxes. Everyone has a say in what price best reflects an NFT’s value.
    </p>
  );

  const marketPlace = (
    <p className="text-xl">
      WottleNFT will be utilising Cardano Smart Contracts to build the
      marketplace. We will be charging a fee of <b>2.5%</b>, with a minimum of{" "}
      <b>5 Ada</b> for each transaction. This fee comprises: Service Fees{" "}
      <b>(2%)</b> and Social Donations <b>(0.5%)</b>.
    </p>
  );

  const auction = (
    <p className="text-xl">
      WottleNFT will be adopting an English Auction format. Creators are charged
      a gas fee for listing an auction. At the end of an auction, WottleNFT’s
      smart contract facilitates the transaction between creators and successful
      bidders, with a fee of 15%. This 15% fee comprises:{" "}
      <b>Service Fees (11%)</b>, <b>Royalty Fees (2.5%)</b> and{" "}
      <b>Social Donations (1.5%)</b>. Successful bidders are given an option to
      dedicate their Social Donations to a social enterprise of their choosing,
      based on an underlying United Nations Sustainable Development Goal. We
      chose to support social enterprises, as we recognise their struggle for
      good.
    </p>
  );

  const nftMinter = (
    <p className="text-xl">
      WottleNFT wants to make Cardano NFT as easy and as accessible to everyone.
      As such, we have implemented a whole new in-browser experience that offers
      the lowest minting service fee in the market.{" "}
      <b>Mint 1 Cardano NFT for 1 ADA in just under 1 Minute</b> with our very
      own Nami Wallet enabled NFT-minter.
    </p>
  );

  const stakingPool = (
    <p className="text-xl">
      <p className="mb-5">
        WottleNFT is running a sustainable staking pool <b>[WOT]</b> built on
        multi-Raspberry Pi system. By supporting WottleNFT, you are supporting
        Social Enterprises as <b>10%</b> of <b>[WOT]</b>’s rewards will be
        channeled towards Social Enterprises.
      </p>
      <p>
        Furthermore, we are offering <b>0% fees</b>! As a reward, delegators who
        stake a minimum of <b>1000 ADA</b> will receive our very first,{" "}
        <b>exclusive utility NFT drop</b> by the end of the year! More
        information will be released soon.
      </p>
    </p>
  );

  return (
    <Main title="About Us">
      <div className="flex justify-between w-full min-h-full overflow-hidden bg-bottom bg-no-repeat bg-cover min-w-1200 bg-primary-default bg-background-seascape">
        <div className="z-10 w-2/5 pl-8 pr-2 md:ml-14 2xl:ml-56 my-44 max-w-maxScreen">
          <p className="mb-16 text-4xl font-bold leading-snug break-words sm:break-normal md:text-5xl lg:text-6xl">
            CREATING A GLOBAL <br />
            INTERCONNECTED <br />
            ECOSYSTEM
          </p>
          <p className="mb-10 text-xl font-bold leading-tight lg:text-3xl">
            BETWEEN CARDANO NFTS <br />
            AND SOCIAL ENTERPRISES WHILE SHARING THE STORIES BEHIND EACH CARDANO
            NFT.
          </p>
        </div>
        <img
          className="z-0 self-end object-contain h-2/6 lg:h-1/2 xl:h-5/6"
          src={`${router.basePath}/assets/everyone-together.png`}
          alt="all wottles"
        />
      </div>
      <div className="w-full px-8 pt-20 pb-0 text-justify lg:text-left md:px-20 2xl:px-56 2xl:max-w-maxBody 2xl:m-auto">
        <p className="text-5xl font-bold mb-11">OUR STORY</p>
        {ourStory}
        <div className="flex flex-wrap justify-center py-5 lg:justify-between lg:flex-nowrap">
          <Image
            src={heartWottle}
            alt="heart wottle"
            height={400}
            width={400}
            className="object-contain"
          />
          <div className="flex flex-col justify-center w-full lg:w-1/2">
            <p className="text-5xl font-bold mb-11">Our Focus</p>
            {ourFocus}
          </div>
        </div>
        <div className="flex flex-wrap-reverse justify-center py-5 lg:justify-between lg:flex-nowrap">
          <div className="flex flex-col justify-center w-full lg:w-1/2">
            <p className="text-5xl font-bold mb-11">Marketplace</p>
            {marketPlace}
            <Link href="/coming-soon" passHref>
              <ButtonPill
                text="View Marketplace"
                onClick={() => {}}
                className="self-center my-8 hover:scale-105"
              />
            </Link>
          </div>
          <Image
            src={coolWottle}
            alt="cool wottle"
            height={400}
            width={400}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-5xl font-bold mb-11">Auction</p>
          {auction}
          <Link href="/coming-soon" passHref>
            <ButtonPill
              text="View Auctions"
              onClick={() => {}}
              className="self-center my-8 hover:scale-105"
            />
          </Link>
        </div>
        <div className="flex flex-wrap justify-center py-5 lg:flex-nowrap lg:justify-between">
          <Image
            src={studiousWottle}
            alt="studious wottle"
            height={400}
            width={400}
            className="object-contain"
          />
          <div className="flex flex-col justify-center w-full lg:w-1/2">
            <p className="text-5xl font-bold mb-11">NFT Minter</p>
            {nftMinter}
            <Link href="/mint-nft" passHref>
              <ButtonPill
                text="Mint Now"
                onClick={() => {}}
                className="self-center my-8 hover:scale-105"
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap-reverse justify-center py-5 lg:flex-nowrap lg:justify-between">
          <div className="flex flex-col justify-center w-full lg:w-1/2">
            <p className="text-5xl font-bold mb-11">Staking Pool</p>
            {stakingPool}
            <Link href="/coming-soon" passHref>
              <ButtonPill
                text="Stake Now"
                onClick={() => {}}
                className="self-center my-8 hover:scale-105"
              />
            </Link>
          </div>
          <Image
            src={dogWottle}
            alt="dog wottle"
            height={400}
            width={400}
            className="object-contain"
          />
        </div>
        <p className="text-5xl font-bold text-left mb-11">Meet the Founders</p>
        <div className="flex flex-col pt-5 pb-8">
          <div className="flex flex-wrap justify-around">
            <FounderProfile
              name="Elton Tay"
              title="CEO"
              imgSrc="/assets/founders/tay.jpg"
              imgAlt="Elton"
              wottleImgSrc="/assets/founders/wottle_ig_tay_2.png"
              wottleImgAlt="Elton Wottle"
            />
            <FounderProfile
              name="KANG LIANG"
              title="CTO"
              imgSrc="/assets/founders/kang.jpg"
              imgAlt="Kang"
              wottleImgSrc="/assets/founders/wottle_ig_kang.png"
              wottleImgAlt="Kang Wottle"
            />
          </div>
          <div className="flex flex-wrap justify-around">
            <FounderProfile
              name="SEAN CHUA"
              title="CDO"
              imgSrc="/assets/founders/sean.jpg"
              imgAlt="Sean"
              wottleImgSrc="/assets/founders/wottle_ig_wota.png"
              wottleImgAlt="Sean Wottle"
            />
            <FounderProfile
              name="LUNDY PANG"
              title="CMO"
              imgSrc="/assets/founders/lundy.jpg"
              imgAlt="Lundy"
              wottleImgSrc="/assets/founders/wottle_ig_lundy.png"
              wottleImgAlt="Lundy Wottle"
            />
          </div>
        </div>
        <div className="flex flex-col items-center pb-5 mb-5">
          <div className="flex justify-center w-full md:w-3/4">
            <Image
              src={roadmap}
              className="object-contain bg-primary-default"
            />
          </div>
        </div>
      </div>
    </Main>
  );
};
export default About;
