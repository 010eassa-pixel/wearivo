import CategoryClient from './CategoryClient'; // السطر ده لازم يكون موجود ومكتوب صح

export async function generateStaticParams() {
  return [
    { id: 'kids' },
    { id: 'women' },
    { id: 'men' },
  ];
}

export default function Page({ params }) {
  // بنبعت الـ id للملف التاني عشان يربط الداتا
  return <CategoryClient categoryId={params.id} />;
}
