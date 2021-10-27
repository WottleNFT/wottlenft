import Image from "next/image";

import poolParty from "../../public/assets/about/pool_party.png";
import { Main } from "../templates/Main";

const ComingSoon = () => {
  return (
    <Main>
      <div>
        <div className="flex justify-between w-full min-h-full overflow-hidden bg-bottom bg-no-repeat bg-cover min-w-1200 bg-primary-default bg-background-seascape">
          <div className="z-10 w-2/5 pl-8 pr-2 md:ml-14 2xl:ml-56 my-44 max-w-maxScreen">
            <p className="mb-16 text-4xl font-bold leading-snug break-words sm:break-normal md:text-5xl lg:text-6xl">
              Staking Pool [WOT]
            </p>
            <p className="mb-10 text-xl leading-tight lg:text-3xl">
              WottleNFT is running a sustainable staking pool [WOT] built on
              multi-Raspberry Pi system. By supporting WottleNFT, you are
              supporting Social Enterprises as 10% of [WOT]’s rewards will be
              channeled towards Social Enterprises.
              <br />
              <br />
              Furthermore, we are offering <b>0%</b> fees! As a reward,
              delegators who stake a minimum of <b>1000 ₳</b> will receive our
              very first, exclusive utility NFT drop by the end of the year!
              More information will be released soon.
            </p>
          </div>
          <Image
            src={poolParty}
            alt="Pool party"
            height={600}
            width={600}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col items-center p-16">
          <div className="flex justify-center">
            <iframe
              src="https://stakada.io/embed/stats?pool_id=e00dac4566812442174bcfb4c12225f7a305606eed12f62e62085253&credits=0"
              width="100%"
              height="400"
              scrolling="no"
            ></iframe>
          </div>
        </div>
        <iframe
          src="https://stakada.io/embed/howto?pool_id=e00dac4566812442174bcfb4c12225f7a305606eed12f62e62085253&binance_ref=20353988"
          width="100%"
          height="600"
          scrolling="no"
        ></iframe>
        <div className="flex flex-col items-center p-16">
          <div className="flex justify-center">
            <iframe
              src="https://stakada.io/embed/epoch"
              width="100%"
              height="100"
              className="max-width:400px;"
            ></iframe>
          </div>
        </div>
      </div>
    </Main>
  );
};
export default ComingSoon;
