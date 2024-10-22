/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // if your website has no www, drop it
      },
    ],
  },
};

export default nextConfig;
