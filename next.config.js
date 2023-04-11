/** @type {import('next').NextConfig} */
const path = require("path");
const nextTranslate = require("next-translate-plugin");

module.exports = nextTranslate({
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ["components", "lib", "pages"],
  },
  images: {
    domains: ["images.ctfassets.net"],
  },
  optimizeFonts: true,
  i18n: {
    localeDetection: false,
  },
  experimental: {
    largePageDataBytes: 128 * 100000,
  },
});
