"use client";
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>جاري تحميل المنتج...</div>;
  if (!product) return <div style={{ textAlign: 'center', marginTop: '50px' }}>المنتج غير موجود</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', direction: 'rtl', fontFamily: 'sans-serif' }}>
      
      {/* القسم الأيمن: صور المنتج */}
      <div style={{ display: 'flex', gap: '15px' }}>
         <div style={{ flex: 1 }}>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }} />
         </div>
         {/* الصور الصغيرة الجانبية (ممكن نضيفها مستقبلاً لو رفعنا أكتر من صورة) */}
         <div style={{ width: '80px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <img src={product.imageUrl} style={{ width: '100%', borderRadius: '8px', border: '2px solid #3b82f6' }} />
         </div>
      </div>

      {/* القسم الأيسر: تفاصيل المنتج */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>{product.name}</h1>
        <div style={{ fontSize: '24px', color: '#1e293b', fontWeight: '900' }}>{product.price} EGP</div>
        
        <hr style={{ border: '0.5px solid #e2e8f0' }} />

        {/* اختيار المقاس (Static حالياً) */}
        <div>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>المقاس:</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['M', 'L', 'XL', '2XL'].map(size => (
              <button key={size} style={{ padding: '8px 15px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '5px', cursor: 'pointer' }}>{size}</button>
            ))}
          </div>
        </div>

        {/* الكمية والتحكم */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
            <button onClick={() => setQuantity(q => q + 1)} style={{ padding: '10px 15px', border: 'none', background: 'none', cursor: 'pointer' }}>+</button>
            <span style={{ padding: '0 20px' }}>{quantity}</span>
            <button onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)} style={{ padding: '10px 15px', border: 'none', background: 'none', cursor: 'pointer' }}>-</button>
          </div>
          <button style={{ flex: 1, backgroundColor: '#1e3a8a', color: '#fff', padding: '15px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>إضافة إلى السلة</button>
        </div>

        <button style={{ backgroundColor: '#ef4444', color: '#fff', padding: '15px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>اشتري الآن</button>

        <div style={{ marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
            <p>• خامة قطن 100% عالية الجودة</p>
            <p>• التوصيل خلال 3-5 أيام عمل</p>
        </div>
      </div>

    </div>
  );
}
