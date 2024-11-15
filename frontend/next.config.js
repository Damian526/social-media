const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true, // Enable styled-components support
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
  experimental: {
    middlewarePrefetch: true,
  },
};

module.exports = nextConfig;