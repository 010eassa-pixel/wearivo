import ProductClient from './ProductClient';

// السطر ده هو اللي هيخلي الـ Build ينجح غصب عن Next.js
export const dynamicParams = false; 

export async function generateStaticParams() {
  // بنقول له متعملش أي صفحات وقت الـ Build، سيبها فاضية
  return [];
}

export default function Page({ params }) {
  return <ProductClient id={params.id} />;
}
