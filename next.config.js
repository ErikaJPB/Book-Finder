/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["books.google.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
