/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  webpack5: true,
  eslint: {
    dirs: ['components', 'context', 'methods', 'pages', 'utils'],
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
  optimizeFonts: true,
};
