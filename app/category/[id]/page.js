import CategoryClient from './CategoryClient';

// دي لازم تكون هنا في ملف Server Component عشان الـ Build ينجح
export async function generateStaticParams() {
  return [
    { id: 'kids' },
    { id: 'women' },
    { id: 'men' },
  ];
}

export default function Page({ params }) {
  return <CategoryClient id={params.id} />;
}
