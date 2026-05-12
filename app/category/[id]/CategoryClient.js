"use client";
import { useState, useEffect } from 'react';
import { db } from '../../../firebase'; 
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function CategoryClient({ id }) {
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
        <h1 className="text-2xl font-black text-[#3d2b1f]">WEARIVO</h1>
        <div className="text-right">
          <h2 className="text-3xl font-black text-[#3d2b1f]">{categoryNames[id] || id}</h2>
        </div>
      </header>
      {loading ? (
        <div className="text-center py-20 opacity-50 text-[#3d2b1f]">جاري التحميل...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map(product => (
            <div key={product.id} className="text-right text-[#3d2b1f]">
              <div className="aspect-[3/4] bg-white mb-4"><img src={product.imageUrl} className="w-full h-full object-cover" /></div>
              <h3 className="font-bold">{product.name}</h3>
              <p className="font-black">{product.price} ج.م</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
