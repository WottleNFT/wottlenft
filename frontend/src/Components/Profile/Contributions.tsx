import React from "react";

import { IonButton } from "@ionic/react";

import { Contribution } from "../../types/Contribution";

const contributionList: Contribution[] = [
  {
    date: "12/12/12",
    hasContributed: true,
    unGoal: "zero hunger",
    nftPurchased: "egg man",
    amountContributed: 1234,
    id: "12345678",
  },
  {
    date: "12/12/12",
    hasContributed: false,
    nftPurchased: "egg woman",
    id: "12341241231",
  },
  {
    date: "12/12/12",
    hasContributed: true,
    unGoal: "zero hunger",
    nftPurchased: "egg man",
    amountContributed: 1234,
    id: "12345678",
  },
];

const Contributions = () => {
  return (
    <table className="w-full overflow-x-scroll text-lg">
      <thead>
        <tr className="text-left border-b-2 border-black border-solid h-14">
          <th className="px-2">Date</th>
          <th className="px-2">Message</th>
          <th className="hidden px-2 sm:table-cell">Amount</th>
          <th className="hidden px-2 sm:table-cell">ID</th>
        </tr>
      </thead>
      <tbody>
        {contributionList.map((contributionInfo) => (
          // eslint-disable-next-line react/jsx-key
          <tr className="h-14">
            <td className="px-2">{contributionInfo.date}</td>
            <td className="px-2">
              You have contributed to{" "}
              <span className="text-primary-default">
                {contributionInfo.hasContributed
                  ? contributionInfo.unGoal
                  : "_______"}
              </span>
              , from purchasing{" "}
              <span className="text-primary-default">
                {contributionInfo.nftPurchased}
              </span>
            </td>
            <td className="hidden px-2 sm:table-cell text-primary-default">
              {contributionInfo.hasContributed ? (
                `₳${contributionInfo.amountContributed}`
              ) : (
                <IonButton className="rounded-2xl">Contribute</IonButton>
              )}
            </td>
            <td className="hidden px-2 sm:table-cell">{contributionInfo.id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Contributions;
