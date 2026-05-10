"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Icons = {
  LiveOrders: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  BrandManager: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>,
  Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Logout: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
  Plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
};

export default function WearivoUltimateConsole() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [orderSearch, setOrderSearch] = useState('');
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

  const cardStyle = { backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eef2f6', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", display: 'flex', minHeight: '100vh', backgroundColor: '#fcfdfe' }}>
      
      {/* 1. Sidebar - Left Side */}
      <aside style={{ width: '260px', backgroundColor: '#1e293b', padding: '35px 20px', display: 'flex', flexDirection: 'column', color: '#fff', position: 'fixed', height: '100vh', left: 0 }}>
        <div style={{ fontSize: '24px', fontWeight: '900', color: cafeColor, letterSpacing: '-1px', marginBottom: '45px', textAlign: 'center' }}>WEARIVO</div>
        
        <nav style={{ flex: 1 }}>
          <p style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', marginBottom: '15px', letterSpacing: '1px', paddingLeft: '10px' }}>NAVIGATION</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li onClick={() => setActiveTab('orders')} style={{ padding: '14px 18px', borderRadius: '10px', marginBottom: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', background: activeTab === 'orders' ? '#334155' : 'transparent', color: activeTab === 'orders' ? cafeColor : '#94a3b8', fontWeight: '600', transition: '0.3s' }}>
              <Icons.LiveOrders /> Live Orders
            </li>
            <li onClick={() => setActiveTab('manager')} style={{ padding: '14px 18px', borderRadius: '10px', marginBottom: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', background: activeTab === 'manager' ? '#334155' : 'transparent', color: activeTab === 'manager' ? cafeColor : '#94a3b8', fontWeight: '600', transition: '0.3s' }}>
              <Icons.BrandManager /> Brand Manager
            </li>
          </ul>
        </nav>

        <div onClick={() => setShowLogoutConfirm(true)} style={{ padding: '15px 18px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', color: '#fca5a5', fontWeight: '700', borderTop: '1px solid #334155', marginTop: 'auto' }}>
          <Icons.Logout /> Logout
        </div>
      </aside>

      {/* 2. Main Body */}
      <main style={{ flex: 1, marginLeft: '260px', padding: '0', boxSizing: 'border-box', position: 'relative' }}>
        
        {/* Top Navbar with Search (Fixed like the image) */}
        <div style={{ padding: '20px 40px', backgroundColor: '#fff', borderBottom: '1px solid #f2f4f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ position: 'relative', width: '400px' }}>
            <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }}><Icons.Search /></span>
            <input 
              type="text" 
              placeholder="Search by Order Code (#WRV)..." 
              style={{ width: '100%', padding: '12px 12px 12px 45px', borderRadius: '8px', border: '1px solid #f2f4f7', outline: 'none', fontSize: '13px', background: '#fcfdfe' }}
              onChange={(e) => setOrderSearch(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#10b981' }}>● ONLINE</span>
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: cafeColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e293b', fontWeight: '900', fontSize: '12px' }}>EW</div>
          </div>
        </div>

        <div style={{ padding: '40px' }}>
          <div style={{ marginBottom: '30px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: 0 }}>CBM Dashboard</h1>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Home / Dashboard / CRM</p>
          </div>

          {/* 3. Cards Layout (Exactly as image) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '25px' }}>
            <div style={cardStyle}>
              <p style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '15px' }}>TRANSACTIONS</p>
              <h2 style={{ fontSize: '32px', fontWeight: '800', margin: '0' }}>$208,187</h2>
              <div style={{ marginTop: '15px', height: '40px', width: '100%', background: 'linear-gradient(90deg, rgba(210,180,140,0.1) 0%, rgba(255,255,255,0) 100%)', borderRadius: '4px' }}></div>
            </div>
            <div style={cardStyle}>
              <p style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '15px' }}>PROJECT RATING</p>
              <h2 style={{ fontSize: '32px', fontWeight: '800', margin: '0' }}>4.3 <span style={{ fontSize: '18px', color: '#fbbf24' }}>★★★★☆</span></h2>
              <p style={{ fontSize: '11px', color: '#10b981', marginTop: '10px' }}>↑ +2.5 this month</p>
            </div>
            <div style={cardStyle}>
              <p style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '15px' }}>NEWS STATISTICS</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ height: '8px', width: '80%', background: '#10b981', borderRadius: '10px' }}></div>
                <div style={{ height: '8px', width: '40%', background: cafeColor, borderRadius: '10px' }}></div>
                <div style={{ height: '8px', width: '60%', background: '#1e293b', borderRadius: '10px' }}></div>
              </div>
            </div>
          </div>

          {/* 4. Bottom Grid (Pie Chart & List) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '25px' }}>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '20px' }}>Phone Calls</h3>
              <div style={{ width: '180px', height: '180px', borderRadius: '50%', border: '25px solid #1e293b', borderTopColor: cafeColor, borderRightColor: '#10b981', margin: '0 auto' }}></div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px', fontSize: '10px', fontWeight: '700' }}>
                <span>● Answered</span>
                <span>● Missed</span>
              </div>
            </div>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '20px' }}>Recent Users / Orders</h3>
              <div style={{ border: '1px dashed #e2e8f0', padding: '60px', borderRadius: '10px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                ...Waiting for incoming data stream
              </div>
            </div>
          </div>
        </div>

        {/* Brand Style Section (If selected) */}
        {activeTab === 'manager' && (
          <div style={{ position: 'absolute', top: '80px', left: '0', width: '100%', height: 'calc(100% - 80px)', background: '#fff', padding: '40px', zIndex: 10 }}>
             <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                <h2 style={{ fontWeight: '800' }}>Brand & Style Manager</h2>
                <button onClick={() => setShowAddModal(true)} style={{ background: '#000', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}>ADD PRODUCT</button>
             </header>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={cardStyle}>
                   <h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '15px' }}>Change Theme Color</h4>
                   <input type="color" value={cafeColor} onChange={(e) => setCafeColor(e.target.value)} style={{ width: '60px', height: '60px', border: 'none', borderRadius: '10px' }} />
                </div>
             </div>
          </div>
        )}

      </main>

      {/* Modals */}
      {showLogoutConfirm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', textAlign: 'center', width: '350px' }}>
            <h3 style={{ fontWeight: '800' }}>Logout?</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '15px 0 30px' }}>Are you sure you want to exit the console?</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #eee' }}>No</button>
              <button onClick={() => signOut(auth)} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: '#ef4444', color: '#fff', border: 'none' }}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
