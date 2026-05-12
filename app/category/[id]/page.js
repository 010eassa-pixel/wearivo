"use client";
import { useState, useEffect } from 'react';
import { db } from '../../../firebase'; 
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useParams } from 'next/navigation';

// ضيف الدالة دي فوق أو تحت الـ Component
export async function generateStaticParams() {
  return [
    { id: 'kids' },
    { id: 'women' },
    { id: 'men' },
  ];
}

export default function CategoryPage() {
  const params = useParams();
  const id = params?.id;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryNames = { kids: 'أطفالي', women: 'حريمي', men: 'رجالي' };

  useEffect(() => {
    if (!id) return;
    const q = query(collection(db, "products"), where("category", "==", id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);

  return (
    <main className="min-h-screen bg-[#f4ece1] p-8" dir="rtl">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-black tracking-widest text-[#3d2b1f]">WEARIVO</h1>
        <div className="text-right">
          <h2 className="text-3xl font-black text-[#3d2b1f]">{categoryNames[id] || id}</h2>
          <p className="text-[10px] tracking-[0.3em] opacity-50 uppercase">{id} COLLECTION</p>
        </div>
      </header>

      {loading ? (
        <div className="text-center py-20 opacity-50">جاري تحميل الأناقة...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map(product => (
            <div key={product.id} className="group cursor-pointer">
              <div className="aspect-[3/4] bg-white overflow-hidden mb-4 relative">
                <img src={product.imageUrl || '/placeholder.jpg'} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="text-right">
                <h3 className="font-bold text-lg text-[#3d2b1f]">{product.name}</h3>
                <p className="text-sm opacity-60 mb-2">{product.description}</p>
                <p className="font-black text-xl text-[#3d2b1f]">{product.price} ج.م</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
