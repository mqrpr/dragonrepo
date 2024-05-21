/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.guns.lol",
      },
    ],
  },
};

export default nextConfig;
