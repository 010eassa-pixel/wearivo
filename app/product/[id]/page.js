import ProductDetailsClient from './ProductDetailsClient';

// بنقول لـ Next.js متقفلش الـ Build واعتبر الصفحة Static
export const dynamicParams = false;

export async function generateStaticParams() {
  // بنرجع مصفوفة وهمية بـ ID واحد بس عشان نعدي بوابات الـ Build
  return [{ id: '1' }];
}

export default function Page({ params }) {
  return <ProductDetailsClient id={params.id} />;
}
