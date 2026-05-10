"use client";
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

// أيقونات Dashboard احترافية بأسلوب بوسطا وأمازون
const Icons = {
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Orders: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>,
  Style: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>,
  Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Logout: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
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
    
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
      else router.push('/login');
    });
    return () => unsubscribe();
  }, [router]);

  if (!user) return null;

  const cardStyle = { backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #f2f4f7', padding: '30px' };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", display: 'flex', minHeight: '100vh', backgroundColor: '#fcfdfe' }}>
      
      {/* 1. Logout Confirmation */}
      {showLogoutConfirm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '32px', textAlign: 'center', width: '400px' }}>
            <div style={{ width: '64px', height: '64px', background: '#fff1f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <Icons.Logout />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>Confirm Logout?</h3>
            <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '32px' }}>Are you sure you want to end your secure management session? Unsaved style changes will be lost.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#fff', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => signOut(auth)} style={{ flex: 1, padding: '16px', borderRadius: '16px', border: 'none', background: '#ef4444', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Sidebar - Dark Mode Design */}
      <aside style={{ width: '280px', backgroundColor: '#1e293b', padding: '48px 24px', display: 'flex', flexDirection: 'column', color: '#fff', position: 'fixed', height: '100vh' }}>
        <div style={{ fontSize: '26px', fontWeight: '900', color: cafeColor, letterSpacing: '-1px', marginBottom: '64px', textAlign: 'center' }}>WEARIVO</div>
        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[
              { id: 'dashboard', label: 'Dashboard', Icon: Icons.Dashboard },
              { id: 'orders', label: 'Live Orders', Icon: Icons.Orders },
              { id: 'style', label: 'Brand Style', Icon: Icons.Style }
            ].map((item) => (
              <li key={item.id} onClick={() => setActiveTab(item.id)} style={{ 
                padding: '18px 20px', borderRadius: '14px', marginBottom: '10px', cursor: 'pointer', 
                display: 'flex', alignItems: 'center', gap: '16px', 
                background: activeTab === item.id ? cafeColor : 'transparent', 
                color: activeTab === item.id ? '#1e293b' : '#94a3b8', 
                fontWeight: activeTab === item.id ? '800' : '500', transition: '0.3s' 
              }}>
                <item.Icon /> {item.label}
              </li>
            ))}
          </ul>
        </nav>
        <div onClick={() => setShowLogoutConfirm(true)} style={{ padding: '18px 20px', borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px', color: '#fca5a5', fontWeight: '700' }}>
          <Icons.Logout /> Logout
        </div>
      </aside>

      {/* 3. Main Content Area */}
      <main style={{ flex: 1, marginLeft: '280px', padding: '64px 80px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '56px' }}>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-1.5px', margin: 0 }}>Brand Console</h1>
            <p style={{ fontSize: '13px', color: '#10b981', fontWeight: '700', marginTop: '4px' }}>● SYSTEM OPERATIONAL</p>
          </div>
          <button onClick={() => setShowAddProduct(true)} style={{ background: '#000', color: '#fff', border: 'none', padding: '16px 28px', borderRadius: '18px', fontWeight: '800', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
            <Icons.Plus /> ADD PRODUCT
          </button>
        </header>

        {activeTab === 'dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div style={cardStyle}><p style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>Total Items</p><p style={{ fontSize: '48px', fontWeight: '900', margin: '16px 0 0' }}>3</p></div>
            <div style={cardStyle}><p style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>Pending Orders</p><p style={{ fontSize: '48px', fontWeight: '900', margin: '16px 0 0', color: '#ef4444' }}>0</p></div>
            <div style={cardStyle}><p style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>Revenue</p><p style={{ fontSize: '48px', fontWeight: '900', margin: '16px 0 0' }}>0 <span style={{ fontSize: '18px', opacity: 0.3 }}>EGP</span></p></div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div style={cardStyle}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '24px' }}>Recent Orders History</h3>
            <div style={{ textAlign: 'center', padding: '120px 0', color: '#94a3b8', border: '2px dashed #f1f5f9', borderRadius: '20px' }}>
              <p>Waiting for new orders from customers...</p>
            </div>
          </div>
        )}

        {activeTab === 'style' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '24px' }}>Brand Primary Color</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <input type="color" value={cafeColor} onChange={(e) => setCafeColor(e.target.value)} style={{ width: '60px', height: '60px', border: 'none', borderRadius: '15px', cursor: 'pointer' }} />
                <div>
                  <p style={{ fontSize: '15px', fontWeight: '800' }}>Cafe Signature</p>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>{cafeColor.toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Add Product Modal - الوجهة المطلوبة */}
        {showAddProduct && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9998 }}>
            <div style={{ backgroundColor: '#fff', padding: '48px', borderRadius: '40px', width: '500px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '32px' }}>Inventory Management</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <input type="text" placeholder="Product Title" style={{ padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
                <div style={{ display: 'flex', gap: '15px' }}>
                  <input type="number" placeholder="Price" style={{ flex: 1, padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }} />
                  <select style={{ flex: 1, padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <option>Mens Wear</option>
                    <option>Womens Wear</option>
                    <option>Kids Wear</option>
                  </select>
                </div>
                <textarea placeholder="Description..." rows="3" style={{ padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '15px', resize: 'none' }}></textarea>
                <input type="file" style={{ fontSize: '12px' }} />
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
                <button onClick={() => setShowAddProduct(false)} style={{ flex: 1, padding: '18px', borderRadius: '18px', border: '1px solid #e2e8f0', background: '#fff', fontWeight: '800', cursor: 'pointer' }}>Cancel</button>
                <button style={{ flex: 1, padding: '18px', borderRadius: '18px', border: 'none', background: '#000', color: '#fff', fontWeight: '800', cursor: 'pointer' }}>Save Product</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
