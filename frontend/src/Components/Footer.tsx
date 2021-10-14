import React, { useState } from "react";

import { IonInput, IonButton } from "@ionic/react";
import Link from "next/link";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState<string>();
  return (
    <div className="w-full h-auto bg-gray-700 truncate">
      <div className="flex flex-col md:flex-row place-content-around">
        <div className="flex flex-col gap-5 pt-12 text-white px-12 md:pl-4">
          <div className="flex flex-row">
            <span>
              <b>Keeping up with</b>
            </span>
            <span className="text-primary-default ml-1.5">
              <b>WottleNFT</b>
            </span>
            <div className="flex flex-row gap-3 pt-1 ml-4">
              <a
                className="text-primary-default"
                href="https://twitter.com/wottlenft"
              >
                <BsTwitter />
              </a>
              <a
                className="text-primary-default"
                href="https://discord.gg/GcDPbqvcGn"
              >
                <FaDiscord />
              </a>
              <a
                className="text-primary-default"
                href="https://www.instagram.com/wottlenft/"
              >
                <BsInstagram />
              </a>
            </div>
          </div>
          <p>
            Subscribe to our newsletter to receive <br /> the latest updates
          </p>
          <div className="flex felx-row h-8 gap-4 items-center mt-7">
            <div className="bg-white rounded-full px-3">
              <IonInput
                value={email}
                placeholder="Your Email"
                onIonChange={(e) => setEmail(e.detail.value!)}
                clearInput
                className="text-black"
              ></IonInput>
            </div>
            <IonButton shape="round">Join us</IonButton>
          </div>
        </div>

        <div className="grid p-8 pl-12 md:pl-0 gap-5 grid-cols-4 justify-self-center">
          <div className="flex flex-col">
            <span className="text-primary-default">Marketplace</span>
            <Link href={`/marketplace`} passHref>
              <a className="text-white">Browse</a>
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-primary-default">NFT Minter</span>
            <Link href={`/mint-nft`} passHref>
              <a className="text-white">Mint Now</a>
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-primary-default">Creators</span>
            <Link href={`/`} passHref>
              <a className="text-white">Profiles</a>
            </Link>
            <Link href={`/`} passHref>
              <a className="text-white">Artworks</a>
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-primary-default">Company</span>
            <Link href={`/`} passHref>
              <a className="text-white">About Us</a>
            </Link>
            <Link href={`/`} passHref>
              <a className="text-white">Twitter</a>
            </Link>
            <Link href={`/`} passHref>
              <a className="text-white">Discord</a>
            </Link>
            <Link href={`/`} passHref>
              <a className="text-white">Instagram</a>
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-primary-default">Auction</span>
            <Link href={`/`} passHref>
              <a className="text-white">Live</a>
            </Link>
            <Link href={`/`} passHref>
              <a className="text-white">Upcoming</a>
            </Link>
            <Link href={`/`} passHref>
              <a className="text-white">Browse</a>
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-primary-default">Staking Pool</span>
            <Link href={`/`} passHref>
              <a className="text-white">Stake Now</a>
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-primary-default">Impact</span>
            <Link href={`/`} passHref>
              <a className="text-white">UN Goals</a>
            </Link>
            <Link href={`/`} passHref>
              <a className="text-white">Social Enterprises</a>
            </Link>
            <Link href={`/`} passHref>
              <a className="text-white">Projects</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
