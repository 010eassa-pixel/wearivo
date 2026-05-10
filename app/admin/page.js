"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

// أيقونات Dashboard احترافية مطابقة للعرض
const Icons = {
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Orders: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>,
  Style: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>,
  Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Logout: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
};

export default function WearivoUltimateConsole() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [cafeColor, setCafeColor] = useState('#D2B48C');
  const router = useRouter();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
      else router.push('/login');
    });
    return () => unsubscribe();
  }, [router]);

  if (!user) return null;

  const cardStyle = { backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eef2f6', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      
      {/* 1. Logout Alert Modal */}
      {showLogoutConfirm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', textAlign: 'center', width: '380px' }}>
            <div style={{ width: '60px', height: '60px', background: '#fff1f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><Icons.Logout /></div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Confirm Logout?</h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>Are you sure you want to end your session, Essa?</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => signOut(auth)} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', background: '#ef4444', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Yes, Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Sidebar (Left Side as per the high-end dashboard) */}
      <aside style={{ width: '280px', backgroundColor: '#1e293b', padding: '40px 24px', display: 'flex', flexDirection: 'column', color: '#fff', position: 'fixed', height: '100vh' }}>
        <div style={{ fontSize: '28px', fontWeight: '900', color: cafeColor, letterSpacing: '-1.5px', marginBottom: '50px', textAlign: 'center' }}>WEARIVO</div>
        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[
              { id: 'dashboard', label: 'Dashboard', Icon: Icons.Dashboard },
              { id: 'orders', label: 'Live Orders', Icon: Icons.Orders },
              { id: 'style', label: 'Brand Style', Icon: Icons.Style }
            ].map((item) => (
              <li key={item.id} onClick={() => setActiveTab(item.id)} style={{ 
                padding: '16px 20px', borderRadius: '12px', marginBottom: '8px', cursor: 'pointer', 
                display: 'flex', alignItems: 'center', gap: '16px', 
                background: activeTab === item.id ? cafeColor : 'transparent', 
                color: activeTab === item.id ? '#1e293b' : '#94a3b8', 
                fontWeight: activeTab === item.id ? '700' : '500', transition: '0.3s' 
              }}>
                <item.Icon /> {item.label}
              </li>
            ))}
          </ul>
        </nav>
        <div onClick={() => setShowLogoutConfirm(true)} style={{ padding: '16px 20px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px', color: '#fca5a5', fontWeight: '700', borderTop: '1px solid #334155', paddingTop: '30px' }}>
          <Icons.Logout /> Logout
        </div>
      </aside>

      {/* 3. Main Content Area */}
      <main style={{ flex: 1, marginLeft: '280px', padding: '50px 60px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Console Overview</h1>
            <nav style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Home / Dashboard / <span style={{ color: cafeColor }}>Wearivo</span></nav>
          </div>
          <button onClick={() => setShowAddProduct(true)} style={{ background: '#000', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '14px', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}>
            <Icons.Plus /> ADD PRODUCT
          </button>
        </header>

        {activeTab === 'dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {/* Stats Cards like the provided image */}
            <div style={cardStyle}>
              <p style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Transactions</p>
              <h2 style={{ fontSize: '36px', fontWeight: '800', margin: '15px 0' }}>$208,187</h2>
              <p style={{ fontSize: '12px', color: '#10b981' }}>↑ 12% this period</p>
            </div>
            <div style={cardStyle}>
              <p style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Project Rating</p>
              <h2 style={{ fontSize: '36px', fontWeight: '800', margin: '15px 0' }}>4.3 <span style={{ fontSize: '18px', color: '#fbbf24' }}>★★★★☆</span></h2>
              <p style={{ fontSize: '12px', color: '#64748b' }}>+2.5 this month</p>
            </div>
            <div style={cardStyle}>
              <p style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Live Inventory</p>
              <h2 style={{ fontSize: '36px', fontWeight: '800', margin: '15px 0' }}>3 <span style={{ fontSize: '16px', color: '#94a3b8', fontWeight: '400' }}>Active Items</span></h2>
              <p style={{ fontSize: '12px', color: '#12b76a' }}>● System Operational</p>
            </div>

            {/* Simulation of the Chart/Table area from the reference image */}
            <div style={{ ...cardStyle, gridColumn: 'span 2' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px' }}>Recent Users / Orders</h3>
              <div style={{ textAlign: 'center', padding: '60px 0', border: '1px dashed #e2e8f0', borderRadius: '12px', color: '#94a3b8' }}>
                Waiting for incoming data stream...
              </div>
            </div>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px' }}>Sales Analytics</h3>
              <div style={{ height: '150px', background: 'linear-gradient(to top, #f8fafc, #fff)', display: 'flex', alignItems: 'flex-end', gap: '10px', padding: '10px' }}>
                <div style={{ flex: 1, height: '40%', background: cafeColor, borderRadius: '4px' }}></div>
                <div style={{ flex: 1, height: '70%', background: '#1e293b', borderRadius: '4px' }}></div>
                <div style={{ flex: 1, height: '55%', background: cafeColor, borderRadius: '4px' }}></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'style' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '24px' }}>Brand Identity</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <input type="color" value={cafeColor} onChange={(e) => setCafeColor(e.target.value)} style={{ width: '60px', height: '60px', border: 'none', borderRadius: '12px', cursor: 'pointer' }} />
                <div>
                  <p style={{ fontSize: '15px', fontWeight: '700' }}>Primary Cafe Theme</p>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>{cafeColor.toUpperCase()}</p>
                </div>
              </div>
            </div>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '24px' }}>Global Background</h3>
              <select style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}>
                <option>Soft Minimalist Beige</option>
                <option>Pure Gallery White</option>
                <option>Urban Concrete Gray</option>
              </select>
            </div>
          </div>
        )}

        {/* 4. The Unified Add Product Modal */}
        {showAddProduct && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9998 }}>
            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '32px', width: '480px', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '24px' }}>Inventory Management</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="text" placeholder="Product Title" style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} />
                <div style={{ display: 'flex', gap: '15px' }}>
                  <input type="number" placeholder="Price (EGP)" style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                  <select style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <option>Mens Section</option>
                    <option>Womens Section</option>
                    <option>Kids Section</option>
                  </select>
                </div>
                <textarea placeholder="Product description and details..." rows="3" style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', resize: 'none' }}></textarea>
                <div style={{ border: '2px dashed #e2e8f0', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                   <input type="file" style={{ fontSize: '11px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                <button onClick={() => setShowAddProduct(false)} style={{ flex: 1, padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#fff', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
                <button style={{ flex: 1, padding: '16px', borderRadius: '16px', border: 'none', background: '#000', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Save Product</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
