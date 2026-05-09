/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // دي أهم حتة عشان يشتغل كـ Static Site
  images: {
    unoptimized: true, // عشان الصور اللي حطيناها تظهر من غير مشاكل
  },
}

module.exports = nextConfig
