import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  serverExternalPackages: ['@react-pdf/renderer', '@react-pdf/font', 'fontkit'],
};

export default nextConfig;
