import React from "react";

import Link from "next/link";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";

const Footer = () => {
  // const [email, setEmail] = useState<string>();
  return (
    <div className="w-full h-auto truncate bg-gray-700">
      <div className="flex flex-col md:flex-row justify-start px-8 2xl:px-40">
        <div className="w-1/2 flex flex-col gap-5 mx-4 pt-12 text-white">
          <div className="flex flex-row">
            <span>
              <b>Keeping up with</b>
            </span>
            <span className="text-primary-default ml-1.5">
              <b>WottleNFT</b>
            </span>
            <div className="flex flex-row gap-3 pt-1 ml-4">
              <a
                target="_blank"
                className="text-primary-default"
                href="https://twitter.com/wottlenft"
                rel="noreferrer"
              >
                <BsTwitter />
              </a>
              <a
                target="_blank"
                className="text-primary-default"
                href="https://discord.gg/rnEE2Unm8K"
                rel="noreferrer"
              >
                <FaDiscord />
              </a>
              <a
                className="text-primary-default"
                target="_blank"
                href="https://www.instagram.com/wottlenft/"
                rel="noreferrer"
              >
                <BsInstagram />
              </a>
            </div>
          </div>
          <p>
            Follow us on our social media to receive <br /> the latest updates
          </p>
          {/* <div className="flex flex-row flex-wrap items-center gap-4 mt-7">
            <div className="px-3 bg-white rounded-full">
              <input
                type="text"
                value={email}
                placeholder="Your Email"
                onChange={(e) => setEmail(e.target.value)}
                className="text-black rounded-lg h-9"
              ></input>
            </div>
            <IonButton shape="round" className="pr-3">
              Join us
            </IonButton>
          </div> */}
        </div>

        <div className="grid grid-cols-2 gap-5 my-8 mx-4 md:pl-0 lg:grid-cols-3 xl:grid-cols-4 justify-self-center">
          <div className="flex flex-col">
            <span className="text-primary-default">Marketplace</span>
            <Link href="/marketplace">
              <a className="text-white">Browse</a>
            </Link>
            <Link href="/nft-drops">
              <a className="text-white">NFT Drops</a>
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-primary-default">NFT Minter</span>
            <Link href="/mint-nft">
              <a className="text-white">Mint Now</a>
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-primary-default">Guides</span>
            <Link href="/guides#get-nami-wallet">
              <a className="text-white">Get Nami Wallet</a>
            </Link>
            <Link href="/guides#get-first-ada">
              <a className="text-white">Get ADA</a>
            </Link>
            <Link href="/guides#mint-nft">
              <a className="text-white">How To Mint NFTs</a>
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-primary-default">Company</span>
            <Link href="/about">
              <a className="text-white">About Us</a>
            </Link>
            <Link href="/partners">
              <a className="text-white">Partners</a>
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-primary-default">Initiatives</span>
            <Link href="/TRCL-13-19-art-prize">
              <a className="text-white">TRCL 13-19 Art Prize</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row px-8 2xl:px-40 pb-4">
        <div className="w-1/2 flex flex-col mb-2 md:mb-0 gap-5 mx-4  text-white ">
          <div>©2021 WottleNFT</div>
        </div>
        <div className="w-1/2 flex flex-col mx-4 text-white ">
          <div className="flex flex-row md:justify-end gap-x-4">
            <a href="https://github.com/WottleNFT/filedump/raw/main/Terms%20of%20Service%2031%20Oct%202021.pdf">
              <div className="flex">Terms of Service</div>
            </a>
            <a href="https://github.com/WottleNFT/filedump/raw/main/Privacy%20Policy%2031%20Oct%202021.pdf">
              <div className="flex">Privacy Policy</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
