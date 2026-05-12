"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const Icons = {
  LiveOrders: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  BrandManager: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>,
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Logout: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>,
  ExternalLink: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
};

export default function WearivoUltimateConsole() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Mens Wear');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null); 
  const [loading, setLoading] = useState(false);

  // Cloudinary Settings
  const CLOUD_NAME = "dmgja8ma7";
  const UPLOAD_PRESET = "wearivo_preset";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    onAuthStateChanged(auth, (u) => u ? setUser(u) : router.push('/login'));
    return () => window.removeEventListener('resize', handleResize);
  }, [router]);

  const handleSaveProduct = async () => {
    if (!name || !price || !imageFile) {
      alert("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', UPLOAD_PRESET);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      
      const categoryMap = { "Mens Wear": "men", "Womens Wear": "women", "Kids Wear": "kids" };

      await addDoc(collection(db, "products"), {
        name,
        price: Number(price),
        category: categoryMap[category],
        description,
        imageUrl: data.secure_url,
        createdAt: new Date()
      });

      alert("Success!");
      setIsFormOpen(false);
      setName(''); setPrice(''); setDescription(''); setImageFile(null);
    } catch (e) {
      alert("Error uploading");
    }
    setLoading(false);
  };

  if (!user) return null;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      
      {/* Sidebar - كما في الصورة image_828cfb.png */}
      <aside style={{ width: '280px', backgroundColor: '#1e293b', padding: '40px 24px', display: 'flex', flexDirection: 'column', color: '#fff', position: 'fixed', height: '100vh', left: 0 }}>
        <div style={{ fontSize: '28px', fontWeight: '900', color: '#D2B48C', letterSpacing: '-1.5px', marginBottom: '10px', textAlign: 'center' }}>WEARIVO</div>
        <button onClick={() => router.push('/')} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '12px', borderRadius: '10px', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '40px', cursor: 'pointer' }}>
          <Icons.ExternalLink /> View Website
        </button>
        
        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li onClick={() => setActiveTab('orders')} style={{ padding: '16px 20px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', background: activeTab === 'orders' ? 'rgba(210, 180, 140, 0.15)' : 'transparent', color: activeTab === 'orders' ? '#D2B48C' : '#94a3b8', fontWeight: '700', marginBottom: '8px' }}>
              <Icons.LiveOrders /> Live Orders
            </li>
            <li onClick={() => setActiveTab('manager')} style={{ padding: '16px 20px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', background: activeTab === 'manager' ? 'rgba(210, 180, 140, 0.15)' : 'transparent', color: activeTab === 'manager' ? '#D2B48C' : '#94a3b8', fontWeight: '700' }}>
              <Icons.BrandManager /> Brand Manager
            </li>
          </ul>
        </nav>

        <div onClick={() => signOut(auth)} style={{ padding: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', color: '#fca5a5', fontWeight: '700', borderTop: '1px solid #334155' }}>
          <Icons.Logout /> Logout
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: '280px', padding: '40px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b' }}>
            {activeTab === 'orders' ? "Operational Statistics" : "Brand Style Manager"}
          </h2>
          <button onClick={() => setIsFormOpen(true)} style={{ background: '#000', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '14px', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <Icons.Plus /> ADD PRODUCT
          </button>
        </header>

        {/* Modal - مطابق للصورة image_82895a.png */}
        {isFormOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ backgroundColor: '#fff', padding: '48px', borderRadius: '32px', width: '500px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '26px', fontWeight: '900', marginBottom: '30px', color: '#000' }}>New Item Upload</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Title" style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'right' }} />
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'right' }} />
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'right', appearance: 'none' }}>
                  <option>Mens Wear</option>
                  <option>Womens Wear</option>
                  <option>Kids Wear</option>
                </select>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="...Description" rows="4" style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'right', resize: 'none' }}></textarea>
                
                <div style={{ border: '1px dashed #cbd5e1', padding: '20px', borderRadius: '12px', background: '#f8fafc' }}>
                   <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button onClick={handleSaveProduct} disabled={loading} style={{ flex: 1, padding: '18px', borderRadius: '16px', border: 'none', background: '#000', color: '#fff', fontWeight: '800', cursor: 'pointer' }}>
                  {loading ? "Saving..." : "Save Product"}
                </button>
                <button onClick={() => setIsFormOpen(false)} style={{ flex: 1, padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#fff', color: '#000', fontWeight: '800', cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
