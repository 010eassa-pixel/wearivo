import ProductClient from './ProductClient';

// دي الدالة اللي Next.js بيطلبها في الـ Static Export
export async function generateStaticParams() {
  return []; 
}

// السطر ده بيعرفه إننا هنجيب الداتا لايف
export const dynamicParams = true;

export default function Page({ params }) {
  return <ProductClient id={params.id} />;
}
