// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ["localhost"],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**",
//       },
//     ],
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "nexlinserver.nexlinbd.com"], // Add your image server domain here
    remotePatterns: [
      {
        protocol: "http",
        hostname: "nexlinserver.nexlinbd.com",
      },
      {
        protocol: "https",
        hostname: "nexlinserver.nexlinbd.com",
      },
    ],
  },
};

export default nextConfig;
