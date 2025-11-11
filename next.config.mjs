/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.clerk.com"], // ✅ allow Clerk profile images
    
  },
};

export default nextConfig;
