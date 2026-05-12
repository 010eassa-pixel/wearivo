/** @type {import('next').NextConfig} */
// output: 'export = {
  output: 'export', // دي أهم حتة عشان يشتغل كـ Static Site
  images: {
    unoptimized: true, // عشان الصور اللي حطيناها تظهر من غير مشاكل
  },
}

module.exports = nextConfig
