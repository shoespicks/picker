/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
  },
};

process.env.PICKER_ENVIROMENT === 'local' &&
  require('dotenv').config({ path: path.join(process.cwd(), '../.env.local') });

module.exports = nextConfig;
