import React from "react";

import Image from "next/image";

import { Main } from "../../../templates/Main";

const Exhibit = () => {
  const imageUrl = "https://placekitten.com/400/400";
  const title = "Title";
  const author = "[Author name here]";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

  return (
    <Main>
      <div className="flex flex-col items-center px-4 pb-20 md:px-12 2xl:px-52 bg-primary-default">
        <div className="relative w-full m-4 h-70vh min-h-320">
          <Image
            className="rounded-2xl"
            alt="NFT Image"
            layout="fill"
            objectFit="contain"
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col self-stretch gap-6 p-6 md:flex-row">
          <div className="w-full">
            <div className="flex flex-col text-left">
              <p className="w-full text-2xl font-bold truncate whitespace-normal">
                {title}
              </p>
              <span>By {author}</span>
              <p className="mt-4 text-base whitespace-normal">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};
export default Exhibit;
