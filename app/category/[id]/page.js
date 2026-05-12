import CategoryClient from './CategoryClient';

// دي اللي Cloudflare محتاجها عشان الـ Build ينجح
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
