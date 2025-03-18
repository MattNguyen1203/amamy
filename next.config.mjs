/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 3600,
    remotePatterns: [
      {protocol: 'https', hostname: '**'},
      {protocol: 'http', hostname: '**'},
    ],
  },
  reactStrictMode: false,
  // output: 'standalone',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

export default nextConfig
