/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export'
  trailingSlash: true, // مهم جداً عشان روابط الأقسام والداش بورد
  images: {
    unoptimized: true, // عشان صور Wearivo تظهر بوضوح
  },
}

module.exports = nextConfig
