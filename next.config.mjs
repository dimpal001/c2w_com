/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'clothes2wear.blr1.cdn.digitaloceanspaces.com',
      },
      {
        protocol: 'https',
        hostname: 'images.cdn.thefashionsalad.com',
      },
      {
        protocol: 'https',
        hostname: 'the-fashion-salad.blr1.cdn.digitaloceanspaces.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.thefashionsalad.com', // Corrected
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:all*(jpg|jpeg|png|gif|svg|webp|bmp|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
