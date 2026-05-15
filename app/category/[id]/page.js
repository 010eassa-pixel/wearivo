import CategoryClient from './CategoryClient';

export async function generateStaticParams() {
  return [
    { id: 'kids' },
    { id: 'women' },
    { id: 'men' },
  ];
}

// التعديل الجذري لضمان عدم حدوث Crash
export default async function Page({ params }) {
  // لازم ننتظر params عشان نضمن إن الـ ID وصل صح قبل ما نبعته
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return <CategoryClient categoryId={id} />;
}
