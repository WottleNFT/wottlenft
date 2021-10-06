import React from 'react';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="Wottlenft"
          description="Wottlenft is your next NFT auction site."
        />
      }
      contentId="home"
    >
      <h1>Main Page</h1>
    </Main>
  );
};

export default Index;
