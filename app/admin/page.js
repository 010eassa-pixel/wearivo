"use client";
import { useEffect, useState } from 'react';
import { auth, db, storage } from '../../firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';

export default function WearivoMasterDashboard() {
  const [activeTab, setActiveTab] = useState('live');
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchCode, setSearchCode] = useState('');
  const router = useRouter();

  // بيانات المنتج الجديد
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [category, setCategory] = useState('men'); 
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    // حماية المسار والربط باللوجن
    const unsubAuth = onAuthStateChanged(auth, (u) => !u && router.push('/login'));
    
    // جلب الأوردرات لايف للاحصائيات والقائمة
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubOrders = onSnapshot(q, (snap) => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => { unsubAuth(); unsubOrders(); };
  }, [router]);

  const handleAddProduct = async () => {
    if (!productName || !productPrice || !imageFile) return alert("اكمل البيانات");
    setLoading(true);
    try {
      const storageRef = ref(storage, `wearivo/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, "products"), {
        name: productName,
        price: Number(productPrice),
        category: category,
        imageUrl: url,
        createdAt: new Date()
      });
      alert("تم الحفظ بنجاح في قسم " + category);
      setIsModalOpen(false);
      setProductName(''); setProductPrice(''); setImageFile(null);
    } catch (e) { alert("خطأ في الرفع"); }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row-reverse', minHeight: '100vh', backgroundColor: '#05070a', color: '#fff', direction: 'rtl' }}>
      
      {/* Sidebar - السايد بار يمين كما في الصورة */}
      <aside style={{ width: '280px', backgroundColor: '#0a0d14', borderLeft: '1px solid #1a1f2b', padding: '40px 20px', position: 'fixed', right: 0, height: '100vh' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#3b82f6', marginBottom: '50px', textAlign: 'center' }}>WEARIVO</h1>
        <nav>
          <div onClick={() => setActiveTab('live')} style={{ padding: '15px', borderRadius: '12px', cursor: 'pointer', backgroundColor: activeTab === 'live' ? '#141b2b' : 'transparent', color: activeTab === 'live' ? '#3b82f6' : '#5b6a82', marginBottom: '10px', fontWeight: 'bold' }}>
            📊 Live Orders
          </div>
          <div onClick={() => setActiveTab('control')} style={{ padding: '15px', borderRadius: '12px', cursor: 'pointer', backgroundColor: activeTab === 'control' ? '#141b2b' : 'transparent', color: activeTab === 'control' ? '#3b82f6' : '#5b6a82', fontWeight: 'bold' }}>
            ⚙️ Control
          </div>
        </nav>
        <div onClick={() => signOut(auth)} style={{ position: 'absolute', bottom: '40px', width: '240px', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold', textAlign: 'center' }}>
          تسجيل الخروج
        </div>
      </aside>

      {/* المحتوى الرئيسي */}
      <main style={{ flex: 1, marginRight: '280px', padding: '40px' }}>
        
        {/* Header - Search */}
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ background: '#0a0d14', padding: '12px', borderRadius: '12px', border: '1px solid #1a1f2b' }}>🔔</div>
          </div>
          <input 
            type="text" placeholder="ابحث برقم الأوردر الكودي..." 
            onChange={(e) => setSearchCode(e.target.value)}
            style={{ width: '400px', padding: '12px 20px', borderRadius: '12px', background: '#0a0d14', border: '1px solid #1a1f2b', color: '#fff' }} 
          />
        </header>

        {activeTab === 'live' ? (
          <div>
            {/* كارت الإحصائيات - image_81abc1.png */}
            <div style={{ backgroundColor: '#0a0d14', padding: '30px', borderRadius: '25px', border: '1px solid #1a1f2b', width: '350px' }}>
              <p style={{ color: '#5b6a82' }}>Live Orders</p>
              <h2 style={{ fontSize: '48px', fontWeight: '900', margin: '15px 0' }}>{orders.length}</h2>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#141b2b', borderRadius: '10px' }}>
                <div style={{ width: '70%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '10px' }}></div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '18px 50px', borderRadius: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
              + إضافة منتج جديد لـ Wearivo
            </button>
          </div>
        )}

        {/* Modal - image_81a07d.png */}
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: '#0a0d14', padding: '40px', borderRadius: '30px', width: '450px', border: '1px solid #1a1f2b' }}>
              <h3 style={{ marginBottom: '25px', textAlign: 'center' }}>تفاصيل المنتج</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" placeholder="اسم المنتج" value={productName} onChange={(e) => setProductName(e.target.value)} style={{ padding: '15px', borderRadius: '12px', background: '#05070a', border: '1px solid #1a1f2b', color: '#fff' }} />
                <input type="number" placeholder="السعر" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} style={{ padding: '15px', borderRadius: '12px', background: '#05070a', border: '1px solid #1a1f2b', color: '#fff' }} />
                
                {/* ربط الأقسام - لم ننساه هذه المرة */}
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '15px', borderRadius: '12px', background: '#05070a', border: '1px solid #1a1f2b', color: '#fff' }}>
                  <option value="men">رجالي</option>
                  <option value="women">حريمي</option>
                  <option value="kids">أطفالي</option>
                </select>

                <div style={{ border: '2px dashed #1a1f2b', padding: '20px', borderRadius: '12px', textAlign: 'center', position: 'relative' }}>
                  <input type="file" onChange={(e) => setImageFile(e.target.files[0])} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                  <p style={{ color: '#5b6a82' }}>{imageFile ? imageFile.name : "ارفع الصورة هنا"}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '15px', borderRadius: '12px', background: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d' }}>إلغاء</button>
                <button onClick={handleAddProduct} disabled={loading} style={{ flex: 1, padding: '15px', borderRadius: '12px', background: '#3b82f6', color: '#fff', fontWeight: 'bold' }}>
                  {loading ? "جاري الحفظ..." : "حفظ المنتج"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
