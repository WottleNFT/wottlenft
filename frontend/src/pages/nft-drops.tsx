import { GetServerSideProps } from "next";

import { Main } from "../templates/Main";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

const NFTDrops = () => {
  return (
    <Main title="NFT Drops">
      <div className="flex justify-between w-full min-h-full overflow-hidden bg-bottom bg-no-repeat bg-cover min-w-1200 bg-primary-default bg-background-seascape"></div>
    </Main>
  );
};
export default NFTDrops;
