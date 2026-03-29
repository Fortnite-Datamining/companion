import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'fortnite-api.com' },
      { protocol: 'https', hostname: 'media.fortniteapi.io' },
      { protocol: 'https', hostname: 'cdn-live.prm.ol.epicgames.com' },
    ],
  },
};

export default nextConfig;
