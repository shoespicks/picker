/** @type {import('next').NextConfig} */
const nextConfig = {
  target: 'serverless',
  reactStrictMode: true,
  swcMinify: false,
  experimental: {
    externalDir: true,
    scrollRestoration: true,
  },
  images: {
    domains: ['d1hmrym1m561hp.cloudfront.net'],
  },
};

process.env.PICKER_ENV === 'local' && require('dotenv').config({ path: path.join(process.cwd(), '../.env.local') });

module.exports = nextConfig;
