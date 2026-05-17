import ProductDetailsClient from './ProductDetailsClient';

export const dynamicParams = false;

// الدالة دي هي اللي الـ Build مستنيها عشان يعدي وميطلعش الـ Error اللي في صورتك
export async function generateStaticParams() {
  // بنرجع مصفوفة فيها ID وهمي واحد بس عشان نرضي الـ Build الاستاتيك
  return [{ id: '1' }];
}

export default function Page({ params }) {
  return <ProductDetailsClient id={params.id} />;
}
