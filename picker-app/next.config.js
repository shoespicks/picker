process.env.PICKER_ENV === 'local' && require('dotenv').config({ path: path.join(process.cwd(), '../.env.local') });

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: false,
  compiler: {
    emotion: true,
  },
  experimental: {
    externalDir: true,
    scrollRestoration: true,
  },
  images: {
    domains: ['d1hmrym1m561hp.cloudfront.net'],
  },
});

module.exports = nextConfig;
