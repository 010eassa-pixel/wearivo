/** @type {import('next').NextConfig} */
const nextConfig = {
  // تم تعطيل output: 'export' مؤقتاً عشان تشغيل الأقسام الديناميكية [id] 
  images: {
    unoptimized: true, 
  },
}

module.exports = nextConfig
