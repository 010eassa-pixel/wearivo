"use client";
import { useEffect, useState } from 'react';
import { db } from '../../firebase'; // شيلنا نقطتين وسلاش عشان المسار يتظبط صح
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';

export default function ProductDetailsClient({ id }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeImage, setActiveImage] = useState('');

  // States الجديدة لإدارة المودال وفورم الأوردر اللايف
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [orderSuccessId, setOrderSuccessId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // حقول بيانات العميل طبقاً لتصميم خُطوة (Khotwh)
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [governorate, setGovernorate] = useState('محافظة الجيزة');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  const shippingCost = 65; // مصاريف الشحن الثابتة من الفاتورة

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

  // دالة توليد رقم أوردر عشوائي فريد مكون من 6 أرقام
  const generateOrderNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  // دالة معالجة وإرسال الطلب إلى الفايربيز لايف
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!phone || !firstName || !address) {
      alert("برجاء ملء الحقول الأساسية (الاسم الأول، الجوال، العنوان) لتأكيد طلبك!");
      return;
    }

    setIsSubmitting(true);
    const orderNum = `WR-${generateOrderNumber()}`;

    try {
      const orderData = {
        orderNumber: orderNum,
        customer: {
          emailOrPhone,
          firstName,
          lastName,
          address,
          apartment,
          governorate,
          city,
          phone,
          paymentMethod: "الدفع عند الاستلام"
        },
        productDetails: {
          productId: id,
          name: product.name,
          price: Number(product.price),
          size: selectedSize,
          quantity: quantity,
          shippingCost: shippingCost,
          totalPrice: (Number(product.price) * quantity) + shippingCost
        },
        status: "pending", // معلق بانتظار المراجعة من الداشبورد
        createdAt: new Date()
      };

      // حفظ مستند الأوردر داخل كولكشن جديد باسم orders
      await addDoc(collection(db, "orders"), orderData);
      setOrderSuccessId(orderNum);
      setIsFormOpen(false); // نغلق الفولدر المنبثق
    } catch (error) {
      console.error("Error sending order to Firebase:", error);
      alert("حدث خطأ غير متوقع أثناء معالجة الطلب، يرجى المحاولة لاحقاً.");
    }
    setIsSubmitting(false);
  };

  // التعديل السحري الأول: لو لسه بنحمل والبيانات مجتش، بنرجع null عشان الشاشة تفتح فوراً بالتصميم الثابت من غير رسالة الخطأ
  if (loading) {
    return (
      <div style={{ 
        maxWidth: '1200px', 
        margin: '40px auto', 
        padding: '20px', 
        direction: 'rtl',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: 'center',
        color: '#64748b',
        fontSize: '16px'
      }}>
        جاري عرض القطعة...
      </div>
    );
  }

  // التعديل السحري الثاني: الرسالة دي مش هتبان إلا لو التحميل خلص 100% والمنتج فعلياً ملوش وجود في الفايربيز
  if (!loading && !product) return (
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

  const productPrice = Number(product.price) || 0;

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
          
          <button onClick={() => setIsFormOpen(true)} style={{ 
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

        {/* زر الشراء الفوري والسريع - يفتح المودال المنبثق */}
        <button onClick={() => setIsFormOpen(true)} style={{ 
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

      {/* الـ Checkout Modal المنبثق (نسخة وطبق الأصل كاملة ومحسنة من واجهة خُطوة) */}
      {isFormOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '20px 0' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', width: '95%', maxWidth: '1100px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', maxHeight: '92vh', direction: 'rtl' }}>
            
            {/* النصف الأيمن: الفورم، حقول العميل وطرق السداد */}
            <form onSubmit={handlePlaceOrder} style={{ padding: '30px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px', borderLeft: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>خُطوة - معلومات الشحن</h2>
                <button type="button" onClick={() => setIsFormOpen(false)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#a0aec0' }}>✕</button>
              </div>

              {/* معلومات الاتصال */}
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>معلومات الاتصال</h3>
                <input type="text" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} placeholder="رقم الجوال أو البريد الإلكتروني" style={{ width: '100%', padding: '11px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} />
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#555', marginTop: '6px', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked /> سجل لتصلك عروضنا الحصرية والجديدة
                </label>
              </div>

              {/* مجسم الـ Delivery */}
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Delivery</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <select style={{ width: '100%', padding: '11px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: '14px' }}>
                    <option>مصر</option>
                  </select>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="الاسم الأول" style={{ width: '100%', padding: '11px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} />
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="الاسم العائلي" style={{ width: '100%', padding: '11px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} />
                  </div>

                  <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="الحي، اسم الشارع، رقم العمارة" style={{ width: '100%', padding: '11px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} />
                  <input type="text" value={apartment} onChange={(e) => setApartment(e.target.value)} placeholder="شقة، جناح، إلخ. (اختياري)" style={{ width: '100%', padding: '11px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '10px' }}>
                    <input type="text" placeholder="Postal code" style={{ width: '100%', padding: '11px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} />
                    <select value={governorate} onChange={(e) => { setGovernorate(e.target.value); setCity(e.target.value); }} style={{ width: '100%', padding: '11px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: '14px' }}>
                      <option value="محافظة القاهرة">محافظة القاهرة</option>
                      <option value="محافظة الجيزة">محافظة الجيزة</option>
                      <option value="محافظة الإسكندرية">محافظة الإسكندرية</option>
                      <option value="محافظة القليوبية">محافظة القليوبية</option>
                      <option value="محافظة الغربية">محافظة الغربية</option>
                    </select>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="المدينة" style={{ width: '100%', padding: '11px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} />
                  </div>

                  <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="جوال" style={{ width: '100%', padding: '11px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', textAlign: 'right' }} />
                </div>
              </div>

              {/* طريقة الشحن من صورتك */}
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>طريقة الشحن</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', border: '1px solid #2563eb', borderRadius: '6px', backgroundColor: '#f0f5ff', fontSize: '14px', fontWeight: 'bold' }}>
                  <span>65</span>
                  <span>EGP {shippingCost.toFixed(2)}</span>
                </div>
              </div>

              {/* طريقة الدفع من صورتك */}
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>طريقة الدفع</h3>
                <p style={{ fontSize: '11px', color: '#667085', margin: '0 0 8px 0' }}>جميع المعاملات آمنة ومشفرة.</p>
                <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
                  <label style={{ display: 'flex', justifyContent: 'space-between', padding: '14px', borderBottom: '1px solid #cbd5e1', backgroundColor: '#fafafa', color: '#98a2b3', fontSize: '14px', alignItems: 'center' }}>
                    <span>💳 بطاقة الائتمان / Sympl / valU</span>
                    <input type="radio" disabled />
                  </label>
                  <label style={{ display: 'flex', justifyContent: 'space-between', padding: '14px', backgroundColor: '#f0f5ff', color: '#0f172a', fontSize: '14px', alignItems: 'center', fontWeight: 'bold' }}>
                    <span>💵 الدفع عند الاستلام</span>
                    <input type="radio" defaultChecked />
                  </label>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '15px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>
                {isSubmitting ? "جاري معالجة طلبك السريع..." : "أنقر لإتمام الطلب"}
              </button>
            </form>

            {/* النصف الأيسر: ملخص الفاتورة الرمادي والعمليات المالية */}
            <div style={{ padding: '35px 30px', backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* كارت ملخص القطعة المطلوبة */}
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '65px', height: '80px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
                  <img src={product.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '-5px', left: '-5px', width: '20px', height: '20px', backgroundColor: '#718096', color: '#fff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '11px', fontWeight: 'bold' }}>{quantity}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#2d3748', margin: '0 0 4px 0' }}>{product.name}</h4>
                  <span style={{ fontSize: '12px', color: '#718096' }}>مقاس: {selectedSize}</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#2d3748' }}>{productPrice.toFixed(2)} EGP</span>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

              {/* العمليات الحسابية المباشرة من صورتك */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#4a5568' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>المبلغ الفرعي</span>
                  <strong style={{ color: '#2d3748' }}>{(productPrice * quantity).toFixed(2)} EGP</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>الشحن</span>
                  <strong style={{ color: '#2d3748' }}>{shippingCost.toFixed(2)} EGP</strong>
                </div>
                
                <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '5px 0' }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '900', color: '#0f172a' }}>
                  <span>الإجمالي</span>
                  <span><span style={{ fontSize: '12px', color: '#718096', fontWeight: 'normal', marginLeft: '6px' }}>EGP</span>{((productPrice * quantity) + shippingCost).toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* نافذة منبثقة تفيد بنجاح تسجيل الطلب وبها الرقم العشوائي */}
      {orderSuccessId && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000 }}>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '16px', textAlign: 'center', maxWidth: '440px', width: '90%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <span style={{ fontSize: '50px' }}>🎉</span>
            <h2 style={{ color: '#10b981', marginTop: '10px', fontWeight: 'bold' }}>تم استلام طلبك بنجاح!</h2>
            <p style={{ color: '#475569', margin: '12px 0', fontSize: '15px' }}>رقم الأوردر العشوائي الخاص بك هو:</p>
            <div style={{ fontSize: '25px', fontWeight: '900', color: '#0f172a', backgroundColor: '#f1f5f9', padding: '12px', borderRadius: '8px', letterSpacing: '2px', fontFamily: 'monospace' }}>{orderSuccessId}</div>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '12px' }}>سيقوم فريق خدمة عملاء خُطوة بالتواصل معك هاتفياً لتأكيد الشحن.</p>
            <button onClick={() => setOrderSuccessId(null)} style={{ marginTop: '25px', backgroundColor: '#2563eb', color: '#fff', padding: '12px 35px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>إغلاق</button>
          </div>
        </div>
      )}

    </div>
  );
}
