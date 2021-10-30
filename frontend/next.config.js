/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  images: {
    domains: [
      'ipfs.io',
      'user-images.githubusercontent.com',
      'placekitten.com',
    ],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  env: {
    network: process.env.NETWORK,
    ssrBackendApi: process.env.SSR_BACKEND_API,
  },
  experiments: {
    asyncWebAssembly: true,
    importAsync: true,
  },
  // TODO: delete this after marketplace is done
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing',
        permanent: true,
      },
      {
        source: '/auctions',
        destination: '/coming-soon',
        permanent: true,
      },
      {
        source: '/nfts/:slug',
        destination: '/nft-not-found',
        permanent: true,
      },
      {
        source: '/api/blockchain/:slug*',
        destination: `${process.env.BLOCKCHAIN_API}/:slug*`,
        permanent: true,
      },
      {
        source: '/api/profile/:slug*',
        destination: `${process.env.PROFILE_API}/:slug*`,
        permanent: true,
      },
    ];
  },
});
