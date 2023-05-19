/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  reactStrictMode: false,
  async redirects() {
    return [
      { source: "/", destination: "/blogs", permanent: true },
      { source: "/user", destination: "/blogs", permanent: true },
    ];
  },
};

module.exports = nextConfig;
