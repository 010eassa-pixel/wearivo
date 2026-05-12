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
    <main className="min-h-screen bg-[#f4ece1] p-4 md:p-8" dir="rtl">
      {/* الهيدر العلوي */}
      <header className="flex justify-between items-center mb-10 border-b border-[#3d2b1f]/10 pb-4">
        <div className="text-[10px] tracking-[0.3em] opacity-50 uppercase">COLLECTION</div>
        <h1 className="text-2xl font-black tracking-widest text-[#3d2b1f]">WEARIVO</h1>
      </header>

      {loading ? (
        <div className="text-center py-20 opacity-50 text-[#3d2b1f] animate-pulse">جاري تحميل الأناقة...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-12">
          {products.map(product => {
            const hasDiscount = product.oldPrice && product.oldPrice > product.price;
            const discountPercentage = hasDiscount 
              ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
              : null;

            return (
              <div key={product.id} className="group cursor-pointer flex flex-col">
                {/* حاوية الصورة */}
                <div className="relative aspect-[3/4] bg-[#f2f2f2] mb-3 overflow-hidden">
                  {hasDiscount && (
                    <span className="absolute top-2 left-2 bg-[#e63946] text-white text-[10px] font-bold px-1.5 py-0.5 z-10">
                      -{discountPercentage}%
                    </span>
                  )}
                  <img 
                    src={product.imageUrl || '/placeholder.jpg'} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* تفاصيل المنتج */}
                <div className="text-left space-y-1 px-1">
                  <p className="text-[9px] uppercase tracking-tighter opacity-50 font-bold">WEARIVO PREMIER</p>
                  <h3 className="text-[11px] font-medium leading-tight h-8 overflow-hidden text-[#3d2b1f]">
                    {product.name}
                  </h3>
                  
                  <div className="flex flex-col mt-1">
                    <span className="text-[13px] font-black text-[#3d2b1f]">
                      LE {product.price.toLocaleString()}
                    </span>
                    {hasDiscount && (
                      <span className="text-[10px] line-through opacity-40">
                        LE {product.oldPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  {/* ألوان إضافية (اختياري) */}
                  <p className="text-[9px] opacity-40 mt-1">+{Math.floor(Math.random() * 5) + 1} colors</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {products.length === 0 && !loading && (
        <div className="text-center py-20 opacity-40">لا توجد قطع متاحة في هذا القسم حالياً</div>
      )}

      <footer className="mt-20 text-center opacity-30 text-[9px] tracking-[0.5em] uppercase">
        Wearivo © 2026 - Digital Elegance
      </footer>
    </main>
  );
}
