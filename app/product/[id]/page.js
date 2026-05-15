import ProductDetailsClient from './ProductDetailsClient';

export async function generateStaticParams() {
  return []; 
}

export const dynamicParams = true;

export default function Page({ params }) {
  return <ProductDetailsClient id={params.id} />;
}
