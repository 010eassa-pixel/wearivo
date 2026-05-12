/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // ده السر اللي هيخلي /admin/ و /category/kids/ يشتغلوا
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
