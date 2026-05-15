import ProductDetailsClient from './ProductDetailsClient';

// 1. دي أهم دالة عشان الـ Build بتاع Cloudflare يعدي
export async function generateStaticParams() {
  // بنرجع مصفوفة فاضية عشان Next.js ميسألش عن الـ IDs وقت الـ Build
  return [];
}

// 2. بنعرفه إن البيانات ديناميكية وهتيجي من الـ Client
export const dynamicParams = true;

export default function Page({ params }) {
  // بنبعت الـ id للملف التاني اللي فيه التصميم والـ use client
  return <ProductDetailsClient id={params.id} />;
}
