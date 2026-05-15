import ProductClient from './ProductClient';

export const dynamicParams = false;

// ده السطر اللي هيخلي الـ Build يعدي Success 100%
export async function generateStaticParams() {
  return []; 
}

export default function Page({ params }) {
  return <ProductClient id={params.id} />;
}
