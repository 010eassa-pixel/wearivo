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
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>,
  ExternalLink: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
};

export default function WearivoUltimateConsole() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [cafeColor, setCafeColor] = useState('#D2B48C');
  const [searchTerm, setSearchTerm] = useState('');
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
    <div style={{ fontFamily: "'Inter', sans-serif", display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      
      {/* 1. Sidebar - Fixed Left */}
      <aside style={{ width: '280px', backgroundColor: '#1e293b', padding: '40px 24px', display: 'flex', flexDirection: 'column', color: '#fff', position: 'fixed', height: '100vh', left: 0, zIndex: 1000 }}>
        <div style={{ fontSize: '28px', fontWeight: '900', color: cafeColor, letterSpacing: '-1.5px', marginBottom: '10px', textAlign: 'center' }}>WEARIVO</div>
        
        {/* زرار العودة للموقع - Back to Site Button */}
        <button 
          onClick={() => router.push('/')} 
          style={{ 
            background: 'rgba(255,255,255,0.05)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            color: '#fff', 
            padding: '10px', 
            borderRadius: '10px', 
            fontSize: '11px', 
            fontWeight: '700', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '8px', 
            marginBottom: '40px', 
            cursor: 'pointer',
            transition: '0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          <Icons.ExternalLink /> View Website
        </button>

        <nav style={{ flex: 1 }}>
          <p style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', marginBottom: '15px', letterSpacing: '1px', paddingLeft: '10px' }}>NAVIGATION</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li onClick={() => setActiveTab('orders')} style={{ padding: '16px 20px', borderRadius: '12px', marginBottom: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', background: activeTab === 'orders' ? '#334155' : 'transparent', color: activeTab === 'orders' ? cafeColor : '#94a3b8', fontWeight: '700', transition: '0.3s' }}>
              <Icons.LiveOrders /> Live Orders
            </li>
            <li onClick={() => setActiveTab('manager')} style={{ padding: '16px 20px', borderRadius: '12px', marginBottom: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', background: activeTab === 'manager' ? '#334155' : 'transparent', color: activeTab === 'manager' ? cafeColor : '#94a3b8', fontWeight: '700', transition: '0.3s' }}>
              <Icons.BrandManager /> Brand Manager
            </li>
          </ul>
        </nav>

        <div 
          onClick={() => setShowLogoutConfirm(true)} 
          style={{ padding: '20px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', color: '#fca5a5', fontWeight: '700', borderTop: '1px solid #334155', marginTop: 'auto', marginBottom: '20px' }}
        >
          <Icons.Logout /> Logout Session
        </div>
      </aside>

      {/* 2. Main Content */}
      <main style={{ flex: 1, marginLeft: '280px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* Header with Search */}
        <header style={{ backgroundColor: '#fff', padding: '20px 40px', borderBottom: '1px solid #f2f4f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ position: 'relative', width: '450px' }}>
            <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }}><Icons.Search /></span>
            <input 
              type="text" 
              placeholder={activeTab === 'orders' ? "Search by Order Code (#WRV)..." : "Search products inventory..."} 
              style={{ width: '100%', padding: '12px 12px 12px 45px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '13px', background: '#fcfdfe' }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#10b981' }}>● ONLINE</span>
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: cafeColor, color: '#1e293b', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>EW</div>
          </div>
        </header>

        <div style={{ padding: '40px' }}>
          {activeTab === 'orders' ? (
            <div>
              <div style={{ marginBottom: '35px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: 0 }}>CBM Dashboard</h1>
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Home / Dashboard / CRM</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '24px' }}>
                <div style={cardStyle}>
                  <p style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '15px' }}>TRANSACTIONS</p>
                  <h2 style={{ fontSize: '32px', fontWeight: '800', margin: '0' }}>$208,187</h2>
                </div>
                <div style={cardStyle}>
                  <p style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '15px' }}>PROJECT RATING</p>
                  <h2 style={{ fontSize: '32px', fontWeight: '800', margin: '0' }}>4.3 <span style={{ fontSize: '18px', color: '#fbbf24' }}>★★★★☆</span></h2>
                </div>
                <div style={cardStyle}>
                  <p style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '15px' }}>NEWS STATISTICS</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                    <div style={{ height: '10px', width: '90%', background: '#10b981', borderRadius: '10px' }}></div>
                    <div style={{ height: '10px', width: '40%', background: cafeColor, borderRadius: '10px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontWeight: '800', margin: 0 }}>Brand Style & Inventory</h2>
                <button onClick={() => setShowAddModal(true)} style={{ background: '#000', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}>ADD PRODUCT</button>
              </header>
              <div style={cardStyle}>
                <h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '20px' }}>Theme Color</h4>
                <input type="color" value={cafeColor} onChange={(e) => setCafeColor(e.target.value)} style={{ width: '60px', height: '60px', border: 'none', borderRadius: '10px' }} />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', textAlign: 'center', width: '380px' }}>
            <h3 style={{ fontWeight: '800' }}>Confirm Logout?</h3>
            <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
              <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', fontWeight: '700' }}>No</button>
              <button onClick={() => signOut(auth)} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', background: '#ef4444', color: '#fff', fontWeight: '700' }}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
