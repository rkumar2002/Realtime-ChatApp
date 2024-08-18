/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: 1351563473,
    NEXT_PUBLIC_ZEGO_SERVER_ID: "a9fced7e857ecf24879513b2240830b4",
  },
  reactStrictMode: false,
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
