/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
  },
  images: {
    domains: ['d1hmrym1m561hp.cloudfront.net'],
    unoptimized: true, // true入れないとビルドできないけど外したい next/imageのImageタグの設定
  },
};

process.env.PICKER_ENV === 'local' && require('dotenv').config({ path: path.join(process.cwd(), '../.env.local') });

module.exports = nextConfig;
