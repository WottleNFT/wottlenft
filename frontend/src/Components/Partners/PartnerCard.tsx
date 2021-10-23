import React from "react";

import Link from "next/link";

import { Partner } from "../../types/Partner";

type Props = {
  partner: Partner;
};

const PartnerCard = ({ partner }: Props) => {
  const { name, imgUrl, websiteUrl } = partner;

  return (
    <Link href={websiteUrl}>
      <a className="flex flex-col items-center w-full h-full">
        <img
          className="object-contain p-2 h-4/5 rounded-full"
          alt={name}
          src={imgUrl}
        />
        <span className="text-2xl truncate">{name}</span>
      </a>
    </Link>
  );
};

export default PartnerCard;
