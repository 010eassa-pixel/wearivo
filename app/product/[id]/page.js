import ProductDetailsClient from './ProductDetailsClient';

// الإعدادات دي لازم تكون في Server Component (بدون use client)
export const runtime = 'edge';

export async function generateStaticParams() {
  return [];
}

export default function Page({ params }) {
  return <ProductDetailsClient id={params.id} />;
}
