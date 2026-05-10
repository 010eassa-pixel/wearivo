"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Icons = {
  LiveOrders: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  BrandManager: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>,
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Logout: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
};

export default function WearivoUltimateConsole() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('orders'); // التبويب الافتراضي هو اللايف أوردر
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [orderSearch, setOrderSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [cafeColor, setCafeColor] = useState('#D2B48C');
  const router = useRouter();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    onAuthStateChanged(auth, (u) => u ? setUser(u) : router.push('/login'));
  }, [router]);

  if (!user) return null;

  const cardStyle = { backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eef2f6', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", display: 'flex', minHeight: '100vh', backgroundColor: '#fcfdfe' }}>
      
      {/* 1. Logout Confirmation */}
      {showLogoutConfirm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', textAlign: 'center', width: '380px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Sign Out?</h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>Are you sure you want to exit the Wearivo Console?</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => signOut(auth)} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', background: '#ef4444', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Sidebar - الترتيب الجديد */}
      <aside style={{ width: '280px', backgroundColor: '#1e293b', padding: '40px 24px', display: 'flex', flexDirection: 'column', color: '#fff', position: 'fixed', height: '100vh', left: 0 }}>
        <div style={{ fontSize: '28px', fontWeight: '900', color: cafeColor, letterSpacing: '-1.5px', marginBottom: '50px', textAlign: 'center' }}>WEARIVO</div>
        
        <nav style={{ flex: 1 }}>
          <p style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', marginBottom: '15px', letterSpacing: '1px' }}>NAVIGATION</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li onClick={() => setActiveTab('orders')} style={{ padding: '16px 20px', borderRadius: '12px', marginBottom: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', background: activeTab === 'orders' ? cafeColor : 'transparent', color: activeTab === 'orders' ? '#1e293b' : '#94a3b8', fontWeight: activeTab === 'orders' ? '700' : '500', transition: '0.3s' }}>
              <Icons.LiveOrders /> Live Orders
            </li>
            <li onClick={() => setActiveTab('manager')} style={{ padding: '16px 20px', borderRadius: '12px', marginBottom: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', background: activeTab === 'manager' ? cafeColor : 'transparent', color: activeTab === 'manager' ? '#1e293b' : '#94a3b8', fontWeight: activeTab === 'manager' ? '700' : '500', transition: '0.3s' }}>
              <Icons.BrandManager /> Brand Manager
            </li>
          </ul>
        </nav>

        <div onClick={() => setShowLogoutConfirm(true)} style={{ padding: '18px 20px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', color: '#fca5a5', fontWeight: '700', borderTop: '1px solid #334155', marginTop: 'auto' }}>
          <Icons.Logout /> Logout
        </div>
      </aside>

      {/* 3. Main Body */}
      <main style={{ flex: 1, marginLeft: '280px', padding: '60px 80px', boxSizing: 'border-box' }}>
        
        {/* واجهة اللايف أوردر - Live Orders */}
        {activeTab === 'orders' && (
          <div>
            <header style={{ marginBottom: '40px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Live Order Tracking</h1>
              <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>Track real-time purchases and shipping status</p>
            </header>

            <div style={{ position: 'relative', marginBottom: '32px' }}>
              <span style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}><Icons.Search /></span>
              <input 
                type="text" 
                placeholder="Search by Order Code (e.g., #WRV-123)..." 
                style={{ width: '100%', padding: '18px 18px 18px 55px', borderRadius: '14px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px' }}
                onChange={(e) => setOrderSearch(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
              <div style={cardStyle}><p style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>TOTAL ORDERS</p><h2 style={{ fontSize: '36px', fontWeight: '800', margin: '10px 0' }}>0</h2></div>
              <div style={cardStyle}><p style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>PENDING</p><h2 style={{ fontSize: '36px', fontWeight: '800', margin: '10px 0', color: '#ef4444' }}>0</h2></div>
              <div style={cardStyle}><p style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>DELIVERED</p><h2 style={{ fontSize: '36px', fontWeight: '800', margin: '10px 0', color: '#10b981' }}>0</h2></div>
            </div>

            <div style={cardStyle}>
              <div style={{ textAlign: 'center', padding: '100px 0', color: '#94a3b8', border: '1px dashed #e2e8f0', borderRadius: '12px' }}>
                Waiting for incoming orders from the cart...
              </div>
            </div>
          </div>
        )}

        {/* واجهة مدير البراند - Brand Manager */}
        {activeTab === 'manager' && (
          <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Brand Style & Inventory</h1>
                <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>Control your store visual identity and stock</p>
              </div>
              <button onClick={() => setShowAddModal(true)} style={{ background: '#000', color: '#fff', border: 'none', padding: '14px 24px', borderRadius: '14px', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <Icons.Plus /> ADD PRODUCT
              </button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
              <div style={cardStyle}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '20px' }}>Theme Color</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <input type="color" value={cafeColor} onChange={(e) => setCafeColor(e.target.value)} style={{ width: '50px', height: '50px', border: 'none', borderRadius: '10px', cursor: 'pointer' }} />
                  <p style={{ fontSize: '14px', fontWeight: '700' }}>Signature Cafe: {cafeColor.toUpperCase()}</p>
                </div>
              </div>
              <div style={cardStyle}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '20px' }}>Global Background</h3>
                <select style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <option>Soft Beige Texture</option>
                  <option>Minimalist White</option>
                  <option>Dark Mode Slate</option>
                </select>
              </div>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px' }}>Manage Inventory</h3>
            <div style={{ position: 'relative', marginBottom: '24px' }}>
              <span style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}><Icons.Search /></span>
              <input 
                type="text" 
                placeholder="Search products to edit description or price..." 
                style={{ width: '100%', padding: '16px 16px 16px 50px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                onChange={(e) => setProductSearch(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* مودال إضافة منتج - Add Product Modal */}
        {showAddModal && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9998 }}>
            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '32px', width: '480px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '24px' }}>New Item Upload</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="text" placeholder="Product Title" style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <div style={{ display: 'flex', gap: '15px' }}>
                  <input type="number" placeholder="Price (EGP)" style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                  <select style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <option>Mens Wear</option>
                    <option>Womens Wear</option>
                    <option>Kids Wear</option>
                  </select>
                </div>
                <textarea placeholder="Product description..." rows="3" style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', resize: 'none' }}></textarea>
                <div style={{ border: '2px dashed #e2e8f0', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                  <input type="file" style={{ fontSize: '11px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
                <button onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#fff', fontWeight: '700' }}>Cancel</button>
                <button style={{ flex: 1, padding: '16px', borderRadius: '16px', border: 'none', background: '#000', color: '#fff', fontWeight: '700' }}>Save Stock</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
