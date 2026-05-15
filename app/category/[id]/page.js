import { db } from '../../../firebase';
// دي اللي Cloudflare محتاجها عشان الـ Build ينجح
export async function generateStaticParams() {
  return [
    { id: 'kids' },
    { id: 'women' },
    { id: 'men' },
  ];
}

export default function Page({ params }) {
  // التعديل هنا: بعتنا params.id تحت المسمى اللي الكلاينت مستنيه CategoryId
  return <CategoryClient categoryId={params.id} />;
}
