import ProductClient from './ProductClient';

// السطر ده هو "كلمة السر" لنجاح الـ Build
export const dynamicParams = false;

// إجبار Next.js إنه يعتبر الصفحة دي ثابتة وقت الـ Build
export async function generateStaticParams() {
  // بنرجّع مصفوفة فيها ID وهمي بس عشان الـ Build يعدي
  // الـ ID ده مش هيأثر على الشغل بتاعنا لاحقاً
  return [{ id: '1' }]; 
}

export default function Page({ params }) {
  return <ProductClient id={params.id} />;
}
