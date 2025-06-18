/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // experimental: {
    //     ppr: "incremental",
    //   },
      eslint: {
        ignoreDuringBuilds: true,
      },
      typescript: {
        ignoreBuildErrors: true,
      },
      images: {
        unoptimized: true,
      },
};

module.exports = nextConfig;
