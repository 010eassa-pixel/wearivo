"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function WearivoUltimateAdmin() {
  const [activeTab, setActiveTab] = useState('live');
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchCode, setSearchCode] = useState('');
  const router = useRouter();

  // بيانات المنتج
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [category, setCategory] = useState('men'); 
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => !u && router.push('/login'));
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, [router]);

  const handleUploadAndSave = async () => {
    if (!productName || !productPrice || !imageFile) return alert("اكمل البيانات");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', "wearivo_preset");
      const res = await fetch(`https://api.cloudinary.com/v1_1/dmgja8ma7/image/upload`, { method: 'POST', body: formData });
      const data = await res.json();

      await addDoc(collection(db, "products"), {
        name: productName,
        price: Number(productPrice),
        category: category,
        imageUrl: data.secure_url,
        createdAt: new Date()
      });

      alert("تم الحفظ بنجاح!");
      setIsModalOpen(false);
      setProductName(''); setProductPrice(''); setImageFile(null);
    } catch (e) { alert("عطل في الرفع"); }
    setLoading(false);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', height: '100vh', backgroundColor: '#05070a', color: '#fff', direction: 'rtl', overflow: 'hidden' }}>
      
      {/* السايد بار - ثابت ومنظم (يمين) */}
      <aside style={{ backgroundColor: '#0a0d14', borderLeft: '1px solid #1a1f2b', padding: '40px 20px', display: 'flex', flexDirection: 'column', zIndex: 100 }}>
        <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#3b82f6', marginBottom: '60px', textAlign: 'center', letterSpacing: '1px' }}>WEARIVO</h1>
        <nav style={{ flex: 1 }}>
          <div onClick={() => setActiveTab('live')} style={{ padding: '15px 20px', borderRadius: '15px', cursor: 'pointer', backgroundColor: activeTab === 'live' ? '#141b2b' : 'transparent', color: activeTab === 'live' ? '#3b82f6' : '#5b6a82', marginBottom: '12px', fontWeight: 'bold', transition: '0.3s' }}>📊 Live Orders</div>
          <div onClick={() => setActiveTab('control')} style={{ padding: '15px 20px', borderRadius: '15px', cursor: 'pointer', backgroundColor: activeTab === 'control' ? '#141b2b' : 'transparent', color: activeTab === 'control' ? '#3b82f6' : '#5b6a82', fontWeight: 'bold', transition: '0.3s' }}>⚙️ Control</div>
        </nav>
        <button onClick={() => signOut(auth)} style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', padding: '20px', borderTop: '1px solid #1a1f2b' }}>تسجيل الخروج</button>
      </aside>

      {/* المحتوى الرئيسي - Scrollable */}
      <main style={{ padding: '40px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
          <div style={{ background: '#0a0d14', padding: '12px', borderRadius: '15px', border: '1px solid #1a1f2b' }}>🔔</div>
          <input 
            type="text" placeholder="بحث برقم الأوردر الكودي..." 
            onChange={(e) => setSearchCode(e.target.value)}
            style={{ width: '450px', padding: '15px 25px', borderRadius: '18px', background: '#0a0d14', border: '1px solid #1a1f2b', color: '#fff', outline: 'none' }} 
          />
        </header>

        {activeTab === 'live' ? (
          <section>
            <div style={{ backgroundColor: '#0a0d14', padding: '35px', borderRadius: '30px', border: '1px solid #1a1f2b', width: '400px', marginBottom: '40px' }}>
              <p style={{ color: '#5b6a82', fontSize: '14px' }}>إجمالي الطلبات الحالية</p>
              <h2 style={{ fontSize: '56px', fontWeight: '900', margin: '15px 0' }}>{orders.length}</h2>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#141b2b', borderRadius: '20px' }}>
                <div style={{ width: '75%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '20px', boxShadow: '0 0 15px #3b82f6' }}></div>
              </div>
            </div>
            {/* هنا تُعرض قائمة الأوردرات */}
          </section>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2 style={{ marginBottom: '30px', fontWeight: '900' }}>لوحة التحكم بالمتجر</h2>
            <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '20px 60px', borderRadius: '20px', fontWeight: '900', fontSize: '18px', border: 'none', cursor: 'pointer', boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)' }}>+ إضافة منتج جديد لـ Wearivo</button>
          </div>
        )}

        {/* Modal - بناءً على image_813b03.png (التصميم الدقيق) */}
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: '#0a0d14', padding: '45px', borderRadius: '40px', width: '500px', border: '1px solid #1a1f2b' }}>
              <h3 style={{ marginBottom: '35px', textAlign: 'center', fontSize: '24px', fontWeight: '900' }}>تفاصيل المنتج</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input type="text" placeholder="اسم المنتج" value={productName} onChange={(e) => setProductName(e.target.value)} style={{ padding: '18px', borderRadius: '15px', background: '#05070a', border: '1px solid #1a1f2b', color: '#fff', outline: 'none' }} />
                <input type="number" placeholder="السعر (EGP)" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} style={{ padding: '18px', borderRadius: '15px', background: '#05070a', border: '1px solid #1a1f2b', color: '#fff', outline: 'none' }} />
                
                {/* الأقسام - الربط الديناميكي */}
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '18px', borderRadius: '15px', background: '#05070a', border: '1px solid #1a1f2b', color: '#fff', cursor: 'pointer', appearance: 'none' }}>
                  <option value="men">قسم الرجالي</option>
                  <option value="women">قسم الحريمي</option>
                  <option value="kids">قسم الأطفالي</option>
                </select>

                <div style={{ border: '2px dashed #1a1f2b', padding: '30px', borderRadius: '20px', textAlign: 'center', position: 'relative', cursor: 'pointer' }}>
                  <input type="file" onChange={(e) => setImageFile(e.target.files[0])} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                  <p style={{ color: '#5b6a82' }}>{imageFile ? imageFile.name : "ارفع الصورة هنا"}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                <button onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '18px', borderRadius: '15px', background: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d', fontWeight: 'bold' }}>إلغاء</button>
                <button onClick={handleUploadAndSave} disabled={loading} style={{ flex: 1, padding: '18px', borderRadius: '15px', background: '#3b82f6', color: '#fff', fontWeight: '900' }}>{loading ? "جاري الرفع..." : "حفظ المنتج"}</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
