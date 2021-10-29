import { useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";

import climateActionImg from "../../public/assets/unsdg/climate-action.png";
import qualityEducationImg from "../../public/assets/unsdg/quality-education.png";
import zeroHungerImg from "../../public/assets/unsdg/zero-hunger.png";
import { Balance } from "../lib/blockchainApi";
import { Main } from "../templates/Main";

export type UnsdgAddresses = {
  zeroHunger: string;
  qualityEducation: string;
  climateAction: string;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const props: any = {};
  try {
    const unsdgAddresses = (
      await axios.get<never, AxiosResponse<UnsdgAddresses>>(
        `${process.env.BLOCKCHAIN_API}/marketplace/unsdg`
      )
    ).data;
    const balances = Object.entries(unsdgAddresses).map(([goal, address]) => {
      const balance = axios.get<never, AxiosResponse<Balance>>(
        `${process.env.BLOCKCHAIN_API}/address/${address}/balance`
      );
      return balance.then((res) => {
        props[goal] = {
          address,
          balance: res.data.total_value,
        };
      });
    });
    await Promise.all(balances);

    return {
      props,
    };
  } catch (e) {
    return {
      props: defaultProps,
    };
  }
};

type AddressDetail = {
  address: string;
  balance: number;
};

type UnsdgProps = {
  zeroHunger: AddressDetail;
  climateAction: AddressDetail;
  qualityEducation: AddressDetail;
};

const defaultProps: UnsdgProps = {
  zeroHunger: {
    address: "Network Error",
    balance: 0,
  },
  climateAction: {
    address: "Network Error",
    balance: 0,
  },
  qualityEducation: {
    address: "Network Error",
    balance: 0,
  },
};

const Unsdg = ({ zeroHunger, climateAction, qualityEducation }: UnsdgProps) => {
  const ourStory = (
    <p className="text-xl">
      WottleNFT will be focusing on 3 main SDGs : Zero Hunger, Quality Education
      and Climate Action. We are empowering all buyers the ability to support a
      UNSDG Goal of their choice. 33% of our marketplace service fees will be
      channeled to the chosen UNSDG Goal after each transaction. Remember to
      choose your UN Goal that best represents you in your profile!
    </p>
  );

  return (
    <Main
      title="United Nations Sustainable Development Goals"
      description="WottleNFT empowers all buyers with the ability to support a UN SDG"
    >
      <div className="flex justify-between w-full min-h-full overflow-hidden bg-bottom bg-no-repeat bg-cover min-w-1200 bg-primary-default bg-background-seascape">
        <div className="z-10 w-2/5 pl-8 pr-2 md:ml-14 2xl:ml-56 my-44 max-w-maxScreen">
          <p className="mb-16 text-4xl font-bold leading-snug break-words sm:break-normal md:text-5xl lg:text-6xl">
            UN SDG
          </p>
          <p className="mb-10 text-xl font-bold leading-tight lg:text-3xl">
            United Nations Sustainable Development Goals(UNSDG) consists of 17
            Goals which are designed to be a “blueprint to achieve a better and
            more sustainable future for all” <br />
            <br />
            See how the community can deliver an impact!
          </p>
        </div>
        <img
          className="z-0 self-end object-contain h-2/6 lg:h-1/2 xl:h-5/6"
          src="/assets/everyone-together.png"
          alt="all wottles"
        />
      </div>
      <div className="w-full px-8 pt-20 pb-0 text-justify lg:text-left md:px-20 2xl:px-56 2xl:max-w-maxBody 2xl:m-auto">
        <p className="text-5xl font-bold mb-11">Our Goals</p>
        {ourStory}
        <GoalSection
          asset={zeroHungerImg}
          assetAlt="Zero Hunger UNSDG Logo"
          title="Zero Hunger"
          text="End Hunger, Achieve Food Security and Improved Nutrition and Promote
            Sustainable Agriculture"
          address={zeroHunger.address}
          value={zeroHunger.balance}
        />
        <GoalSection
          asset={qualityEducationImg}
          right
          assetAlt="Quality Education UNSDG Logo"
          title="Quality Education"
          text="Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all"
          address={qualityEducation.address}
          value={qualityEducation.balance}
        />
        <GoalSection
          asset={climateActionImg}
          assetAlt="Cliamte Action UNSDG Logo"
          title="Climate Action"
          text="Take urgent action to combat climate change and its impacts"
          address={climateAction.address}
          value={climateAction.balance}
        />
      </div>
    </Main>
  );
};

export default Unsdg;

type GoalSectionProps = {
  address: string;
  value: number;
  asset: StaticImageData;
  assetAlt: string;
  right?: boolean;
  title: string;
  text: string;
};
const GoalSection = ({
  address,
  value,
  asset,
  assetAlt,
  right,
  title,
  text,
}: GoalSectionProps) => {
  const [onTop, setOnTop] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    setOnTop(window.innerWidth <= 1022);
  }, []);

  const updateSize = () => {
    setOnTop(window.innerWidth <= 1022);
  };
  return (
    <div className="flex flex-wrap justify-center py-5 my-20 lg:justify-between lg:flex-nowrap">
      {(!right || onTop) && (
        <Image
          src={asset}
          alt={assetAlt}
          height={400}
          width={400}
          className="object-contain"
        />
      )}
      <div className="flex flex-col justify-center w-full break-words lg:w-1/2">
        <p className="text-5xl font-bold mb-11">{title}</p>
        {text}
        <br />
        <br />
        <b>Address:</b>
        {address}
        <br />
        <br />
        <b className="mb-2">Current Funds:</b>
        <div className="p-4 text-4xl text-center border-2 border-black rounded-md text-primary-default">
          {value / 1000000} ₳
        </div>
      </div>
      {right && !onTop && (
        <Image
          src={asset}
          alt={assetAlt}
          height={400}
          width={400}
          className="object-contain"
        />
      )}
    </div>
  );
};
