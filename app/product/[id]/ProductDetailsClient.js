"use client";
import { useEffect, useState } from 'react';
import { db } from '../../../firebase'; // تأكد إنك راجع 3 خطوات لملف الفايربيز
import { doc, getDoc } from 'firebase/firestore';

export default function ProductDetailsClient({ id }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '20px' }}>جاري تحميل المنتج...</div>;
  if (!product) return <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '20px' }}>المنتج غير موجود</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', direction: 'rtl', fontFamily: 'sans-serif' }}>
      
      {/* القسم الأيمن: صور المنتج */}
      <div style={{ display: 'flex', gap: '15px' }}>
         <div style={{ flex: 1 }}>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
         </div>
         <div style={{ width: '80px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <img src={product.imageUrl} style={{ width: '100%', borderRadius: '8px', border: '2px solid #3b82f6' }} />
         </div>
      </div>

      {/* القسم الأيسر: تفاصيل المنتج */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b' }}>{product.name}</h1>
        <div style={{ fontSize: '28px', color: '#1e3a8a', fontWeight: '900' }}>{product.price} EGP</div>
        
        <hr style={{ border: '0.5px solid #e2e8f0' }} />

        {/* اختيار المقاس */}
        <div>
          <p style={{ marginBottom: '10px', fontWeight: 'bold', color: '#475569' }}>المقاس المتوفر:</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['M', 'L', 'XL', '2XL'].map(size => (
              <button key={size} style={{ padding: '10px 20px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>{size}</button>
            ))}
          </div>
        </div>

        {/* الكمية والتحكم */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '10px', background: '#f8fafc' }}>
            <button onClick={() => setQuantity(q => q + 1)} style={{ padding: '12px 18px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}>+</button>
            <span style={{ padding: '0 25px', fontWeight: 'bold' }}>{quantity}</span>
            <button onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)} style={{ padding: '12px 18px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}>-</button>
          </div>
          <button style={{ flex: 1, backgroundColor: '#1e3a8a', color: '#fff', padding: '18px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}>إضافة إلى السلة</button>
        </div>

        <button style={{ backgroundColor: '#ef4444', color: '#fff', padding: '18px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer', width: '100%', fontSize: '18px' }}>اشتري الآن</button>

        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f1f5f9', borderRadius: '12px', fontSize: '15px', color: '#475569', lineHeight: '1.6' }}>
            <p>• خامة قطن 100% عالية الجودة</p>
            <p>• التوصيل خلال 3-5 أيام عمل</p>
            <p>• إمكانية المعاينة عند الاستلام</p>
        </div>
      </div>

    </div>
  );
}
