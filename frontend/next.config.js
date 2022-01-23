/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  images: {
    domains: [
      "ipfs.io",
      "user-images.githubusercontent.com",
      "placekitten.com",
    ],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: "",
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
    let routes = [
      {
        source: "/",
        destination: "/marketplace",
        permanent: false,
      },
      {
        source: "/landing",
        destination: "/marketplace",
        permanent: false,
      },
      {
        source: "/auctions",
        destination: "/coming-soon",
        permanent: false,
      },
      {
        source: "/nfts/:slug",
        destination: "/nft-not-found",
        permanent: false,
      },
      {
        source: "/api/blockchain/:slug*",
        destination: `${process.env.BLOCKCHAIN_API}/:slug*`,
        permanent: false,
      },
      {
        source: "/api/profile/:slug*",
        destination: `${process.env.PROFILE_API}/:slug*`,
        permanent: false,
      }
    ];
    
    // Maintenance page redirect
    if (process.env.MAINTENANCE_MODE === "1") {
      routes.push({
        source: "/:slug((?!maintenance).*)/:more*",
        destination: "/maintenance/",
        permanent: false,
      })
    }

    return routes
  },
});
