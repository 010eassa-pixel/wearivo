"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const Icons = {
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Orders: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>,
  Style: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>,
  Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Logout: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
};

export default function WearivoConsole() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [cafeColor, setCafeColor] = useState('#D2B48C');
  const router = useRouter();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    onAuthStateChanged(auth, (u) => u ? setUser(u) : router.push('/login'));
  }, [router]);

  if (!user) return null;

  const cardStyle = { backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #f2f4f7', padding: '24px' };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", display: 'flex', minHeight: '100vh', backgroundColor: '#fcfdfe' }}>
      
      {/* 1. Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '32px', textAlign: 'center', width: '380px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <div style={{ width: '60px', height: '60px', background: '#fff1f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Icons.Logout />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Confirm Logout?</h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>Are you sure you want to end your session, Essa? Unsaved style changes will be lost.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, padding: '14px', borderRadius: '14px', border: '1px solid #e2e8f0', background: 'none', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => signOut(auth)} style={{ flex: 1, padding: '14px', borderRadius: '14px', border: 'none', background: '#ef4444', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Yes, Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Sidebar */}
      <aside style={{ width: '260px', backgroundColor: '#1e293b', padding: '40px 24px', display: 'flex', flexDirection: 'column', color: '#fff', position: 'fixed', height: '100vh' }}>
        <div style={{ fontSize: '24px', fontWeight: '900', color: cafeColor, letterSpacing: '-1px', marginBottom: '60px', textAlign: 'center' }}>WEARIVO</div>
        <nav style={{ flex: 1 }}>
          <ul style={{ list-style: 'none', padding: 0 }}>
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <Icons.Dashboard /> },
              { id: 'orders', label: 'Live Orders', icon: <Icons.Orders /> },
              { id: 'style', label: 'Style Manager', icon: <Icons.Style /> }
            ].map(item => (
              <li key={item.id} onClick={() => setActiveTab(item.id)} style={{ padding: '16px 20px', borderRadius: '12px', marginBottom: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', background: activeTab === item.id ? cafeColor : 'transparent', color: activeTab === item.id ? '#1e293b' : '#94a3b8', fontWeight: activeTab === item.id ? '700' : '500', transition: '0.3s' }}>
                {item.icon} {item.label}
              </li>
            ))}
          </ul>
        </nav>
        <div onClick={() => setShowLogoutConfirm(true)} style={{ padding: '16px 20px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', color: '#fca5a5', fontWeight: '600' }}>
          <Icons.Logout /> Logout
        </div>
      </aside>

      {/* 3. Main Content */}
      <main style={{ flex: 1, marginLeft: '260px', padding: '60px 80px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-1.5px', margin: 0 }}>Wearivo Brand Console</h1>
            <p style={{ fontSize: '12px', color: '#12b76a', fontWeight: '700', marginTop: '4px' }}>● SYSTEM ONLINE</p>
          </div>
          <button onClick={() => setShowAddProduct(true)} style={{ background: '#000', color: '#fff', border: 'none', padding: '14px 24px', borderRadius: '16px', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <Icons.Plus /> ADD PRODUCT
          </button>
        </header>

        {activeTab === 'dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div style={cardStyle}><p style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Total Products</p><p style={{ fontSize: '40px', fontWeight: '800', margin: '12px 0 0' }}>3</p></div>
            <div style={cardStyle}><p style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Live Orders</p><p style={{ fontSize: '40px', fontWeight: '800', margin: '12px 0 0', color: '#f04438' }}>0</p></div>
            <div style={cardStyle}><p style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Gross Sales</p><p style={{ fontSize: '40px', fontWeight: '800', margin: '12px 0 0' }}>0 <span style={{ fontSize: '16px', opacity: 0.3 }}>EGP</span></p></div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div style={cardStyle}>
            <div style={{ borderBottom: '1px solid #f2f4f7', paddingBottom: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontWeight: '800' }}>Recent Orders History</h3>
            </div>
            <div style={{ textAlign: 'center', padding: '100px 0', color: '#94a3b8' }}>
              <p style={{ fontSize: '14px' }}>Your order queue is currently empty.</p>
            </div>
          </div>
        )}

        {activeTab === 'style' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '24px' }}>Color Palette</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <input type="color" value={cafeColor} onChange={(e) => setCafeColor(e.target.value)} style={{ width: '50px', height: '50px', border: 'none', borderRadius: '10px', cursor: 'pointer' }} />
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '700', margin: 0 }}>Cafe Signature</p>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>{cafeColor}</p>
                </div>
              </div>
            </div>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '24px' }}>Background Texture</h3>
              <select style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <option>Soft Beige (Default)</option>
                <option>Minimal White</option>
                <option>Urban Concrete</option>
              </select>
            </div>
          </div>
        )}

        {/* 4. Product Add Modal (The Form) */}
        {showAddProduct && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9998 }}>
            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '32px', width: '450px' }}>
              <h3 style={{ fontWeight: '800', marginBottom: '24px' }}>Add New Product</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" placeholder="Product Name" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <input type="number" placeholder="Price (EGP)" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <select style={{ padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <option>Mens Section</option>
                  <option>Womens Section</option>
                  <option>Kids Section</option>
                </select>
                <textarea placeholder="Description" rows="3" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', resize: 'none' }}></textarea>
                <input type="file" style={{ fontSize: '12px' }} />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
                <button onClick={() => setShowAddProduct(false)} style={{ flex: 1, padding: '14px', borderRadius: '14px', border: '1px solid #e2e8f0', background: 'none', fontWeight: '700' }}>Cancel</button>
                <button style={{ flex: 1, padding: '14px', borderRadius: '14px', border: 'none', background: '#000', color: '#fff', fontWeight: '700' }}>Save Stock</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
