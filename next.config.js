/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(pdf|mp4)$/,
      type: "asset/resource",
    });
    return config;
  },
  swcMinify: true,
};

module.exports = nextConfig;
