import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Partner } from "../../types/Partner";

type Props = {
  partner: Partner;
};

const PartnerCard = ({ partner }: Props) => {
  const { name, imgUrl, websiteUrl } = partner;

  return (
    <Link href={websiteUrl}>
      <a target="_blank" className="flex flex-col items-center m-2">
        <div
          className="w-full h-4/5 p-4 rounded-full border-black"
          style={{ borderWidth: 1 }}
        >
          <div className="relative w-full h-full">
            <Image layout="fill" objectFit="contain" alt={name} src={imgUrl} />
          </div>
        </div>
        <span className="text-2xl truncate mt-3">{name}</span>
      </a>
    </Link>
  );
};

export default PartnerCard;
