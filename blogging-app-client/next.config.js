/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/blogs", permanent: true }];
  },
};

module.exports = nextConfig;
