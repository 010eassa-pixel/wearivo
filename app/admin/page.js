"use client";
import { useEffect, useState } from 'react';
// التعديل 1: تأكد من مسار firebase (استخدم @/firebase أفضل)
import { auth, db } from '@/firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function WearivoFinalDashboard() {
  const [activeTab, setActiveTab] = useState('live');
  const [controlTab, setControlTab] = useState('men');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // الـ States الأساسية بتاعتك للمنتج
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [category, setCategory] = useState('men'); 
  const [imageFile, setImageFile] = useState(null);

  // الـ States الجديدة اللي ضفناها للربط الجذري مع صفحة المنتج من غير تغيير تصميمك
  const [description, setDescription] = useState('');
  const [sizes, setSizes] = useState(['M', 'L', 'XL', '2XL']);
  const [selectedOrder, setSelectedOrder] = useState(null); // لعرض تفاصيل الأوردر لايف

  useEffect(() => {
    // مراقبة تسجيل الدخول
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (!u) router.push('/login');
    });

    const qOrders = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubOrders = onSnapshot(qOrders, (snap) => setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    
    const qProducts = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubProducts = onSnapshot(qProducts, (snap) => setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    
    return () => { unsubAuth(); unsubOrders(); unsubProducts(); };
  }, [router]);

  const openModal = () => {
    setCategory(controlTab); 
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setLoading(false);
    setProductName('');
    setProductPrice('');
    setDescription('');
    setSizes(['M', 'L', 'XL', '2XL']);
    setImageFile(null);
    setIsModalOpen(false);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      }
      alert("تم تحديث حالة الأوردر الحية بنجاح!");
    } catch (e) {
      alert("خطأ أثناء تحديث الحالة: " + e.message);
    }
  };

  const handleUploadAndSave = async () => {
    if (!productName || !productPrice || !imageFile) return alert("اكمل البيانات");
    
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', "wearivo_preset");
      
      const res = await fetch(`https://api.cloudinary.com/v1_1/dmgja8ma7/image/upload`, { 
        method: 'POST', 
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error("Cloudinary Failed");

      // الحفظ في Firestore مع الحقول الإضافية المتوافقة تماماً مع صفحة المنتج الفخمة
      await addDoc(collection(db, "products"), {
        name: productName, 
        price: Number(productPrice),
        category: category,
        imageUrl: data.secure_url,
        description: description,
        sizes: sizes,
        createdAt: new Date()
      });

      console.log("✅ Firestore Updated");
      resetForm();

    } catch (e) {
      alert("Error: " + e.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', height: '100vh', backgroundColor: '#05070a', color: '#fff', direction: 'rtl', overflow: 'hidden' }}>
      
      {/* Sidebar - محتفظين بيه وبتصميمه بالمللي */}
      <aside style={{ backgroundColor: '#0a0d14', borderLeft: '1px solid #1a1f2b', padding: '40px 20px', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#3b82f6', marginBottom: '60px', textAlign: 'center' }}>WEARIVO</h1>
        <nav style={{ flex: 1 }}>
          <div onClick={() => setActiveTab('live')} style={{ padding: '15px', borderRadius: '12px', cursor: 'pointer', backgroundColor: activeTab === 'live' ? '#141b2b' : 'transparent', color: activeTab === 'live' ? '#3b82f6' : '#5b6a82', marginBottom: '10px', fontWeight: 'bold', transition: '0.3s' }}>📊 Live Orders</div>
          <div onClick={() => setActiveTab('control')} style={{ padding: '15px', borderRadius: '12px', cursor: 'pointer', backgroundColor: activeTab === 'control' ? '#141b2b' : 'transparent', color: activeTab === 'control' ? '#3b82f6' : '#5b6a82', fontWeight: 'bold', transition: '0.3s' }}>⚙️ Control</div>
        </nav>
        <button onClick={() => signOut(auth)} style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>تسجيل الخروج</button>
      </aside>

      {/* Main Content */}
      <main style={{ padding: '40px', overflowY: 'auto' }}>
        {activeTab === 'live' ? (
          /* تفصيل وتفعيل قسم الطلبات المباشرة من غير ما نبوظ الهوية البصرية للداشبورد */
          <section>
             <h2 style={{ marginBottom: '30px', fontWeight: '900' }}>الطلبات المباشرة ({orders.length})</h2>
             
             {orders.length === 0 ? (
               <p style={{ color: '#5b6a82', textAlign: 'center', marginTop: '50px' }}>لا توجد طلبات حية في الوقت الحالي.</p>
             ) : (
               <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                 {orders.map((order) => (
                   <div 
                     key={order.id} 
                     onClick={() => setSelectedOrder(order)}
                     style={{ backgroundColor: '#0a0d14', borderRadius: '16px', border: '1px solid #1a1f2b', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: '0.3s' }}
                     onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                     onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1a1f2b'}
                   >
                     <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                       <div style={{ fontFamily: 'monospace', fontSize: '18px', fontWeight: 'bold', color: '#3b82f6', backgroundColor: '#141b2b', padding: '8px 15px', borderRadius: '10px' }}>
                         {order.orderNumber}
                       </div>
                       <div>
                         <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>{order.customer?.firstName} {order.customer?.lastName}</h4>
                         <p style={{ margin: 0, fontSize: '13px', color: '#5b6a82' }}>📱 {order.customer?.phone} | 📍 {order.customer?.governorate}</p>
                       </div>
                     </div>

                     <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                       <div style={{ textAlign: 'left' }}>
                         <div style={{ fontWeight: 'bold', color: '#10b981', fontSize: '16px' }}>{order.productDetails?.totalPrice} EGP</div>
                         <div style={{ fontSize: '12px', color: '#5b6a82', marginTop: '4px' }}>قيمة القطعة شاملة الشحن</div>
                       </div>
                       <span style={{ 
                         padding: '6px 14px', 
                         borderRadius: '50px', 
                         fontSize: '12px', 
                         fontWeight: 'bold',
                         backgroundColor: order.status === 'pending' ? 'rgba(217, 119, 6, 0.15)' : order.status === 'confirmed' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                         color: order.status === 'pending' ? '#d97706' : order.status === 'confirmed' ? '#10b981' : '#ff4d4d'
                       }}>
                         {order.status === 'pending' ? '⏳ معلق' : order.status === 'confirmed' ? '✅ تم التأكيد' : '❌ ملغي'}
                       </span>
                     </div>
                   </div>
                 ))}
               </div>
             )}
          </section>
        ) : (
          /* قسم الـ Control - محتفظين بكودك وتصميم الكروت بتاعك بالظبط */
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontWeight: '900' }}>إدارة أقسام المتجر</h2>
              <button onClick={openModal} style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '12px 30px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ إضافة منتج</button>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid #1a1f2b', paddingBottom: '15px' }}>
              {['men', 'women', 'kids'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setControlTab(tab)} 
                  style={{ 
                    background: 'none', border: 'none', 
                    color: controlTab === tab ? '#3b82f6' : '#5b6a82', 
                    fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', 
                    borderBottom: controlTab === tab ? '2px solid #3b82f6' : 'none',
                    paddingBottom: '10px'
                  }}
                >
                  {tab === 'men' ? 'رجالي' : tab === 'women' ? 'حريمي' : 'أطفالي'}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
              {products.filter(p => p.category === controlTab).map(product => (
                <div key={product.id} style={{ backgroundColor: '#0a0d14', borderRadius: '20px', border: '1px solid #1a1f2b', overflow: 'hidden', textAlign: 'center', padding: '15px' }}>
                  <img src={product.imageUrl} alt="" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '15px', marginBottom: '10px' }} />
                  <h4 style={{ fontSize: '14px', marginBottom: '5px' }}>{product.name}</h4>
                  <p style={{ color: '#3b82f6', fontWeight: 'bold', marginBottom: '15px' }}>{product.price} EGP</p>
                  <button onClick={() => { if(confirm("حذف؟")) deleteDoc(doc(db, "products", product.id)) }} style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px' }}>حذف القطعة</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* الـ Modal المنبثق لاستعراض تفاصيل الأوردر بالكامل وببياناته الحقيقية */}
        {selectedOrder && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }} onClick={() => setSelectedOrder(null)}>
            <div style={{ backgroundColor: '#0a0d14', padding: '30px', borderRadius: '24px', width: '90%', maxWidth: '650px', border: '1px solid #1a1f2b', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1a1f2b', paddingBottom: '15px' }}>
                <h3 style={{ margin: 0, fontWeight: 'bold' }}>تفاصيل طلب رقم: <span style={{ color: '#3b82f6', fontFamily: 'monospace' }}>{selectedOrder.orderNumber}</span></h3>
                <button onClick={() => setSelectedOrder(null)} style={{ background: 'none', border: 'none', color: '#5b6a82', fontSize: '20px', cursor: 'pointer' }}>✕</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ backgroundColor: '#05070a', padding: '15px', borderRadius: '12px', border: '1px solid #1a1f2b' }}>
                  <h4 style={{ color: '#3b82f6', margin: '0 0 10px 0', fontSize: '14px' }}>👤 بيانات العميل والشحن</h4>
                  <p style={{ fontSize: '13px', margin: '6px 0' }}><strong>الاسم:</strong> {selectedOrder.customer?.firstName} {selectedOrder.customer?.lastName}</p>
                  <p style={{ fontSize: '13px', margin: '6px 0' }}><strong>الجوال:</strong> {selectedOrder.customer?.phone}</p>
                  <p style={{ fontSize: '13px', margin: '6px 0' }}><strong>المحافظة:</strong> {selectedOrder.customer?.governorate}</p>
                  <p style={{ fontSize: '13px', margin: '6px 0' }}><strong>المدينة:</strong> {selectedOrder.customer?.city || 'غير محدد'}</p>
                  <p style={{ fontSize: '13px', margin: '6px 0', lineHeight: '1.4' }}><strong>العنوان:</strong> {selectedOrder.customer?.address}</p>
                  {selectedOrder.customer?.apartment && <p style={{ fontSize: '13px', margin: '6px 0' }}><strong>معلم:</strong> {selectedOrder.customer?.apartment}</p>}
                </div>

                <div style={{ backgroundColor: '#05070a', padding: '15px', borderRadius: '12px', border: '1px solid #1a1f2b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ color: '#3b82f6', margin: '0 0 10px 0', fontSize: '14px' }}>🛍️ المنتج المطلوب</h4>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                      <img src={selectedOrder.productDetails?.imageUrl} style={{ width: '45px', height: '55px', objectFit: 'cover', borderRadius: '6px' }} />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{selectedOrder.productDetails?.name}</div>
                        <div style={{ fontSize: '12px', color: '#5b6a82', marginTop: '2px' }}>المقاس: {selectedOrder.productDetails?.size}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: '13px', margin: '4px 0' }}><strong>الكمية:</strong> {selectedOrder.productDetails?.quantity} قطعة</p>
                    <p style={{ fontSize: '13px', margin: '4px 0' }}><strong>الشحن:</strong> {selectedOrder.productDetails?.shippingCost} EGP</p>
                  </div>
                  <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px', color: '#10b981' }}>
                    <span>الحساب الكلي:</span>
                    <span>{selectedOrder.productDetails?.totalPrice} EGP</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px', borderTop: '1px solid #1a1f2b', paddingTop: '15px' }}>
                <button onClick={() => handleUpdateStatus(selectedOrder.id, 'confirmed')} disabled={selectedOrder.status === 'confirmed'} style={{ flex: 1, padding: '12px', borderRadius: '10px', backgroundColor: '#10b981', color: '#fff', border: 'none', fontWeight: 'bold', cursor: selectedOrder.status === 'confirmed' ? 'not-allowed' : 'pointer', opacity: selectedOrder.status === 'confirmed' ? 0.5 : 1 }}>تأكيد وشحن</button>
                <button onClick={() => handleUpdateStatus(selectedOrder.id, 'cancelled')} disabled={selectedOrder.status === 'cancelled'} style={{ flex: 1, padding: '12px', borderRadius: '10px', backgroundColor: '#ff4d4d', color: '#fff', border: 'none', fontWeight: 'bold', cursor: selectedOrder.status === 'cancelled' ? 'not-allowed' : 'pointer', opacity: selectedOrder.status === 'cancelled' ? 0.5 : 1 }}>إلغاء الطلب</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal الإضافة المعدل بإضافة حقول الوصف والمقاسات للحفاظ على الـ Dark UI المتناسق بتاعك */}
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: '#0a0d14', padding: '40px', borderRadius: '30px', width: '450px', border: '1px solid #1a1f2b', maxHeight: '90vh', overflowY: 'auto' }}>
              <h3 style={{ marginBottom: '25px', textAlign: 'center' }}>إضافة منتج لـ {category === 'men' ? 'رجالي' : category === 'women' ? 'حريمي' : 'أطفالي'}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" placeholder="اسم المنتج" value={productName} onChange={(e) => setProductName(e.target.value)} style={{ padding: '15px', borderRadius: '12px', background: '#05070a', border: '1px solid #1a1f2b', color: '#fff' }} />
                <input type="number" placeholder="السعر" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} style={{ padding: '15px', borderRadius: '12px', background: '#05070a', border: '1px solid #1a1f2b', color: '#fff' }} />
                
                {/* الحقل الجديد للوصف والخامة متناسق مع تصميمك الـ Dark */}
                <textarea placeholder="وصف المنتج والخامة بالتفصيل" value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '15px', borderRadius: '12px', background: '#05070a', border: '1px solid #1a1f2b', color: '#fff', minHeight: '80px', fontFamily: 'inherit' }} />

                {/* الحقل الجديد للمقاسات */}
                <div style={{ background: '#05070a', padding: '12px', borderRadius: '12px', border: '1px solid #1a1f2b' }}>
                  <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#5b6a82' }}>المقاسات المتاحة للقطعة:</p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {['M', 'L', 'XL', '2XL', '3XL'].map(size => (
                      <label key={size} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={sizes.includes(size)} onChange={(e) => e.target.checked ? setSizes([...sizes, size]) : setSizes(sizes.filter(s => s !== size))} />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>

                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '15px', borderRadius: '12px', background: '#05070a', border: '1px solid #1a1f2b', color: '#fff' }}>
                  <option value="men">رجالي</option>
                  <option value="women">حريمي</option>
                  <option value="kids">أطفالي</option>
                </select>
                <div style={{ border: '2px dashed #1a1f2b', padding: '20px', borderRadius: '12px', textAlign: 'center', position: 'relative' }}>
                  <input type="file" onChange={(e) => setImageFile(e.target.files[0])} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                  <p style={{ color: '#5b6a82' }}>{imageFile ? `✅ ${imageFile.name}` : "ارفع الصورة هنا"}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button type="button" onClick={resetForm} style={{ flex: 1, padding: '15px', borderRadius: '12px', background: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d', cursor: 'pointer' }}>إلغاء</button>
                <button 
                  type="button" 
                  onClick={handleUploadAndSave} 
                  disabled={loading} 
                  style={{ flex: 1, padding: '15px', borderRadius: '12px', background: loading ? '#1a1f2b' : '#3b82f6', color: '#fff', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
                >
                  {loading ? "جاري الرفع..." : "حفظ المنتج"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
