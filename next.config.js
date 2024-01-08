/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.bluebirdgroup.com",
        port: "",
        pathname: "/img/**/*",
      },
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
