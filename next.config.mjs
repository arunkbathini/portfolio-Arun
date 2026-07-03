/** @type {import('next').NextConfig} */
const nextConfig = {
  // Case studies are compiled from MDX strings at request/build time via
  // next-mdx-remote, so no @next/mdx page-extension wiring is needed here.
  reactStrictMode: true,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
