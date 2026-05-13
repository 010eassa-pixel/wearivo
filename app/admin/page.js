"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function WearivoFinalDashboard() {
  const [activeTab, setActiveTab] = useState('live');
  const [controlTab, setControlTab] = useState('men');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [category, setCategory] = useState('men'); 
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => !u && router.push('/login'));
    
    const qOrders = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubOrders = onSnapshot(qOrders, (snap) => setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    const qProducts = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubProducts = onSnapshot(qProducts, (snap) => setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    return () => { unsubOrders(); unsubProducts(); };
  }, [router]);

  const openModal = () => {
    setCategory(controlTab); 
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if(confirm("هل تريد حذف هذا المنتج نهائياً؟")) {
      await deleteDoc(doc(db, "products", id));
    }
  };

  const handleUploadAndSave = async () => {
    if (!productName || !productPrice || !imageFile) return alert("اكمل البيانات");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', "wearivo_preset");
      
      // التعديل الجوهري: إزالة أي Headers يدوية وترك المتصفح يتعامل مع FormData
      const res = await fetch(`https://api.cloudinary.com/v1_1/dmgja8ma7/image/upload`, { 
        method: 'POST', 
        body: formData
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || "فشل الرفع");
      }

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
    } catch (e) { 
      console.error(e);
      alert("مشكلة: " + e.message); 
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', height: '100vh', backgroundColor: '#05070a', color: '#fff', direction: 'rtl', overflow: 'hidden' }}>
      
      <aside style={{ backgroundColor: '#0a0d14', borderLeft: '1px solid #1a1f2b', padding: '40px 20px', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#3b82f6', marginBottom: '60px', textAlign: 'center' }}>WEARIVO</h1>
        <nav style={{ flex: 1 }}>
          <div onClick={() => setActiveTab('live')} style={{ padding: '15px', borderRadius: '12px', cursor: 'pointer', backgroundColor: activeTab === 'live' ? '#141b2b' : 'transparent', color: activeTab === 'live' ? '#3b82f6' : '#5b6a82', marginBottom: '10px', fontWeight: 'bold' }}>📊 Live Orders</div>
          <div onClick={() => setActiveTab('control')} style={{ padding: '15px', borderRadius: '12px', cursor: 'pointer', backgroundColor: activeTab === 'control' ? '#141b2b' : 'transparent', color: activeTab === 'control' ? '#3b82f6' : '#5b6a82', fontWeight: 'bold' }}>⚙️ Control</div>
        </nav>
        <button onClick={() => signOut(auth)} style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>تسجيل الخروج</button>
      </aside>

      <main style={{ padding: '40px', overflowY: 'auto' }}>
        
        {activeTab === 'live' ? (
          <section>
             <h2 style={{ marginBottom: '30px' }}>الطلبات المباشرة ({orders.length})</h2>
          </section>
        ) : (
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontWeight: '900' }}>إدارة أقسام المتجر</h2>
              <button onClick={openModal} style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '12px 30px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ إضافة منتج</button>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid #1a1f2b', paddingBottom: '15px' }}>
              <button onClick={() => setControlTab('men')} style={{ background: 'none', border: 'none', color: controlTab === 'men' ? '#3b82f6' : '#5b6a82', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', borderBottom: controlTab === 'men' ? '2px solid #3b82f6' : 'none' }}>رجالي</button>
              <button onClick={() => setControlTab('women')} style={{ background: 'none', border: 'none', color: controlTab === 'women' ? '#3b82f6' : '#5b6a82', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', borderBottom: controlTab === 'women' ? '2px solid #3b82f6' : 'none' }}>حريمي</button>
              <button onClick={() => setControlTab('kids')} style={{ background: 'none', border: 'none', color: controlTab === 'kids' ? '#3b82f6' : '#5b6a82', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', borderBottom: controlTab === 'kids' ? '2px solid #3b82f6' : 'none' }}>أطفالي</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
              {products.filter(p => p.category === controlTab).map(product => (
                <div key={product.id} style={{ backgroundColor: '#0a0d14', borderRadius: '20px', border: '1px solid #1a1f2b', overflow: 'hidden', textAlign: 'center', padding: '15px' }}>
                  <img src={product.imageUrl} alt="" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '15px', marginBottom: '10px' }} />
                  <h4 style={{ fontSize: '14px', marginBottom: '5px' }}>{product.name}</h4>
                  <p style={{ color: '#3b82f6', fontWeight: 'bold', marginBottom: '15px' }}>{product.price} EGP</p>
                  <button onClick={() => handleDelete(product.id)} style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px' }}>حذف القطعة</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: '#0a0d14', padding: '40px', borderRadius: '30px', width: '450px', border: '1px solid #1a1f2b' }}>
              <h3 style={{ marginBottom: '25px', textAlign: 'center' }}>إضافة منتج لـ {category}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" placeholder="اسم المنتج" value={productName} onChange={(e) => setProductName(e.target.value)} style={{ padding: '15px', borderRadius: '12px', background: '#05070a', border: '1px solid #1a1f2b', color: '#fff' }} />
                <input type="number" placeholder="السعر" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} style={{ padding: '15px', borderRadius: '12px', background: '#05070a', border: '1px solid #1a1f2b', color: '#fff' }} />
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
                <button onClick={handleUploadAndSave} disabled={loading} style={{ flex: 1, padding: '15px', borderRadius: '12px', background: '#3b82f6', color: '#fff', fontWeight: 'bold' }}>{loading ? "جاري الرفع..." : "حفظ"}</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
