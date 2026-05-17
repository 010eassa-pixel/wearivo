"use client";
import { useEffect, useState } from 'react';
import { db } from '../../../firebase'; 
import { doc, getDoc } from 'firebase/firestore';

export default function ProductDetailsClient({ id }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct(data);
          setActiveImage(data.imageUrl || '');
          // إذا كانت هناك مقاسات ديناميكية قادمة من الداشبورد نحدد أول مقاس تلقائياً
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', color: '#8b7e6a', fontSize: '20px' }}>
      جاري تحميل تفاصيل القطعة...
    </div>
  );

  if (!product) return (
    <div style={{ textDirection: 'rtl', textAlign: 'center', marginTop: '100px', fontSize: '20px', color: '#ef4444' }}>
      عذراً، هذا المنتج غير متوفر حالياً.
    </div>
  );

  // التعديل 1: قراءة مصفوفة الصور الإضافية المتغيرة لكل منتج، أو العودة للصورة الرئيسية
  const imagesList = product.images && product.images.length > 0 
    ? product.images 
    : [product.imageUrl];

  // التعديل 2: قراءة المقاسات المحددة للمنتج ديناميكياً، أو عرض المقاسات القياسية الافتراضية
  const availableSizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['M', 'L', 'XL', '2XL'];

  // التعديل 3: قراءة مصفوفة مميزات الشحن والاسترجاع ديناميكياً لو رغبت في تغييرها لكل منتج، أو عرض نصوصك الافتراضية
  const availableFeatures = product.features && product.features.length > 0 ? product.features : [
    { icon: "🚚", title: "شحن وتوصيل مريح:", text: "سوف يتم توصيل الأوردر في خلال من يومين إلى 5 أيام." },
    { icon: "📏", title: "تأكد من قياسك:", text: "تأكد من مقاسك من جدول المقاسات المرفق." },
    { icon: "🔄", title: "سياسة مرنة:", text: "يمكنك عمل استبدال أو استرجاع خلال 14 يوم من تاريخ استلام الأوردر." }
  ];

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
      
      {/* القسم الأيمن: معرض الصور */}
      <div style={{ display: 'flex', gap: '20px', position: 'sticky', top: '20px', height: 'fit-content' }}>
        {/* الصور المصغرة الجانبية */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {imagesList.map((img, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveImage(img)}
              style={{ 
                width: '75px', 
                height: '100px', 
                borderRadius: '8px', 
                overflow: 'hidden', 
                cursor: 'pointer',
                border: activeImage === img ? '2px solid #0f172a' : '1px solid #e2e8f0',
                transition: '0.2s'
              }}
            >
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>

        {/* Image Display */}
        <div style={{ 
          flex: 1, 
          borderRadius: '16px', 
          overflow: 'hidden', 
          backgroundColor: '#f8f9fa',
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
          height: '600px'
        }}>
          <img 
            src={activeImage || product.imageUrl} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      </div>

      {/* القسم الأيسر: تفاصيل القطعة والشراء */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        
        {/* الاسم والوسم والتقييم */}
        <div>
          <span style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' }}>جديد</span>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '8px', lineHeight: '1.3' }}>
            {product.name}
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fbbf24', fontSize: '14px' }}>
            <span>⭐⭐⭐⭐⭐</span>
            <span style={{ color: '#64748b', marginRight: '5px' }}>(1,754 تقييم)</span>
          </div>
        </div>

        {/* السعر الحقيقي */}
        <div style={{ fontSize: '34px', color: '#0f172a', fontWeight: '900' }}>
          {product.price} EGP
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

        {/* حقل الوصف التفصيلي - يقرأ الآن ديناميكياً من الداشبورد لو أضفته */}
        <div>
          <p style={{ fontWeight: 'bold', color: '#334155', marginBottom: '8px' }}>الخامة والوصف:</p>
          <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.7' }}>
            {product.description || "قطعة مميزة مصممة بعناية فائقة من أجود الخامات المريحة لتناسب إطلالتك اليومية بكل أناقة ورقي."}
          </p>
        </div>

        {/* اختيار المقاسات المتوفرة */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' }}>
            <p style={{ fontWeight: '700', color: '#334155', margin: 0 }}>المقاس:</p>
            <span style={{ fontSize: '13px', color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}>دليل المقاسات</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {availableSizes.map(size => (
              <button 
                key={size}
                onClick={() => setSelectedSize(size)}
                style={{ 
                  padding: '12px 22px', 
                  border: selectedSize === size ? '2px solid #0f172a' : '1px solid #cbd5e1', 
                  background: selectedSize === size ? '#0f172a' : '#fff',
                  color: selectedSize === size ? '#fff' : '#334155',
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: '0.2s'
                }}>
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* كمية الطلب وإضافة للسلة */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            border: '1px solid #cbd5e1', 
            borderRadius: '10px',
            background: '#f8f9fa'
          }}>
            <button onClick={() => setQuantity(q => q + 1)} style={{ padding: '12px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>+</button>
            <span style={{ padding: '0 15px', fontWeight: 'bold', fontSize: '16px' }}>{quantity}</span>
            <button onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)} style={{ padding: '12px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>-</button>
          </div>
          
          <button style={{ 
            flex: 1, 
            backgroundColor: '#0f172a', 
            color: '#fff', 
            padding: '16px', 
            borderRadius: '10px', 
            border: 'none', 
            fontWeight: 'bold', 
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            إضافة إلى السلة
          </button>
        </div>

        {/* زر الشراء الفوري والسريع */}
        <button style={{ 
          backgroundColor: '#dc2626', 
          color: '#fff', 
          padding: '18px', 
          borderRadius: '10px', 
          border: 'none', 
          fontWeight: 'bold', 
          fontSize: '18px',
          cursor: 'pointer',
          width: '100%',
          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)'
        }}>
          اشتري الآن
        </button>

        {/* جدول الثقة والأمان البرمجي - يقرأ المصفوفة بمرونة */}
        <div style={{ 
          marginTop: '10px', 
          padding: '20px', 
          backgroundColor: '#f8fafc', 
          borderRadius: '12px', 
          fontSize: '14px', 
          color: '#475569',
          border: '1px solid #f1f5f9',
          lineHeight: '1.8'
        }}>
          {typeof availableFeatures[0] === 'string' ? (
            // لو تم إدخالها كمصفوفة نصوص بسيطة من الداشبورد
            availableFeatures.map((feat, idx) => (
              <p key={idx} style={{ margin: idx === availableFeatures.length - 1 ? 0 : '0 0 8px 0' }}>• {feat}</p>
            ))
          ) : (
            // لو بتقرأ الهيكل الافتراضي الحالي للتصميم
            availableFeatures.map((feat, idx) => (
              <p key={idx} style={{ margin: idx === availableFeatures.length - 1 ? 0 : '0 0 8px 0' }}>
                {feat.icon} <strong>{feat.title}</strong> {feat.text}
              </p>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
