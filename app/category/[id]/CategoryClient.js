"use client";
import { useEffect, useState } from 'react';
// التعديل هنا: استخدام @ للوصول لملف الـ firebase بشكل صحيح ومختصر
import { db } from '@/firebase'; 
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function CategoryClient({ categoryId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // الربط مع Firebase بفلتر القسم
    const q = query(
      collection(db, "products"), 
      where("category", "==", categoryId.toLowerCase())
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [categoryId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', color: '#8b7e6a' }}>
        جاري تحميل الأناقة...
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', textTransform: 'uppercase', letterSpacing: '4px', color: '#2c2c2c' }}>
          {categoryId} Collection
        </h1>
      </header>

      {products.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999' }}>لا توجد قطع متوفرة في هذا القسم حالياً.</p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '30px' 
        }}>
          {products.map((product) => (
            /* التعديل الجوهري: استخدام <a> لضمان التوافق الكامل مع مسارات Cloudflare بدون تغيير config */
            <a key={product.id} href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="product-card" style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                border: '1px solid #f0f0f0'
              }}>
                {/* حاوية الصورة */}
                <div style={{ width: '100%', height: '350px', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* تفاصيل المنتج */}
                <div style={{ padding: '15px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px', color: '#333' }}>
                    {product.name}
                  </h3>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#8b7e6a' }}>
                    {product.price} EGP
                  </p>
                  
                  <div style={{
                    marginTop: '15px',
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#000',
                    color: '#fff',
                    textAlign: 'center',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}>
                    عرض التفاصيل
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
