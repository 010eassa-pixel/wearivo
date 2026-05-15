import ProductDetailsClient from './ProductDetailsClient';

// التعديل الجوهري: هنخلي الـ runtime فقط ونمسح التانية
export const runtime = 'edge';

export default function Page({ params }) {
  return <ProductDetailsClient id={params.id} />;
}
