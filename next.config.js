/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.cosmicjs.com', 'imgix.cosmicjs.com'],
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  experimental: {
    typedRoutes: false,
  },
}

module.exports = nextConfig