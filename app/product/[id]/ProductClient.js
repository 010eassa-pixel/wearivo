"use client";
import { useEffect, useState } from 'react';
import { db } from '../../../firebase'; 
import { doc, getDoc } from 'firebase/firestore';

export default function ProductClient({ id }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        }
      } catch (e) {
        console.error("Error fetching product:", e);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '18px', color: '#666' }}>
      جاري تحميل تفاصيل القطعة...
    </div>
  );

  if (!product) return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '18px', color: '#ef4444' }}>
      عذراً، هذا المنتج غير متوفر حالياً.
    </div>
  );

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '40px auto', 
      padding: '20px', 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr', 
      gap: '50px', 
      direction: 'rtl',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      
      {/* القسم الأيمن: عرض الصور */}
      <div style={{ position: 'sticky', top: '20px' }}>
        <div style={{ 
          width: '100%', 
          borderRadius: '16px', 
          overflow: 'hidden', 
          backgroundColor: '#f8f9fa',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} 
          />
        </div>
      </div>

      {/* القسم الأيسر: معلومات المنتج والدفع */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>
            {product.name}
          </h1>
          <div style={{ fontSize: '30px', color: '#1e40af', fontWeight: '900' }}>
            {product.price} EGP
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

        {/* اختيار المقاس */}
        <div>
          <p style={{ marginBottom: '15px', fontWeight: '700', color: '#475569' }}>المقاس المتوفر:</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['M', 'L', 'XL', '2XL'].map(size => (
              <button 
                key={size}
                onClick={() => setSelectedSize(size)}
                style={{ 
                  padding: '12px 24px', 
                  border: selectedSize === size ? '2px solid #1e40af' : '1px solid #cbd5e1', 
                  background: selectedSize === size ? '#eff6ff' : '#fff',
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: selectedSize === size ? '#1e40af' : '#475569',
                  transition: '0.2s'
                }}>
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* الكمية وإضافة للسلة */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            border: '1px solid #cbd5e1', 
            borderRadius: '12px',
            background: '#f8f9fa'
          }}>
            <button onClick={() => setQuantity(q => q + 1)} style={{ padding: '15px 20px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px' }}>+</button>
            <span style={{ padding: '0 20px', fontWeight: 'bold', fontSize: '18px' }}>{quantity}</span>
            <button onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)} style={{ padding: '15px 20px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px' }}>-</button>
          </div>
          
          <button style={{ 
            flex: 1, 
            backgroundColor: '#0f172a', 
            color: '#fff', 
            padding: '20px', 
            borderRadius: '12px', 
            border: 'none', 
            fontWeight: 'bold', 
            fontSize: '18px',
            cursor: 'pointer',
            transition: '0.3s'
          }}>
            إضافة إلى السلة
          </button>
        </div>

        {/* زر الشراء المباشر */}
        <button style={{ 
          backgroundColor: '#dc2626', 
          color: '#fff', 
          padding: '22px', 
          borderRadius: '12px', 
          border: 'none', 
          fontWeight: '800', 
          fontSize: '20px',
          cursor: 'pointer',
          width: '100%',
          boxShadow: '0 4px 14px rgba(220, 38, 38, 0.3)'
        }}>
          اشتري الآن
        </button>

        {/* مميزات إضافية */}
        <div style={{ 
          marginTop: '20px', 
          padding: '25px', 
          backgroundColor: '#f1f5f9', 
          borderRadius: '15px', 
          fontSize: '16px', 
          color: '#334155',
          lineHeight: '1.8'
        }}>
            <p>✅ <strong>خامة أصلية:</strong> قطن 100% ناعم على البشرة ومعالج ضد الانكماش.</p>
            <p>🚚 <strong>شحن سريع:</strong> التوصيل لباب البيت خلال 48 ساعة في القاهرة والجيزة.</p>
            <p>🔄 <strong>سياسة مرنة:</strong> إمكانية المعاينة والتبديل عند الاستلام لضمان رضاك.</p>
        </div>
      </div>
    </div>
  );
}
