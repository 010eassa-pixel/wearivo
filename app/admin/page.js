"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

// أيقونات Dashboard احترافية
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
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false); // الحالة المسؤولة عن فتح فورم الإضافة
  const [cafeColor, setCafeColor] = useState('#D2B48C');
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    onAuthStateChanged(auth, (u) => u ? setUser(u) : router.push('/login'));
    return () => window.removeEventListener('resize', handleResize);
  }, [router]);

  if (!user) return null;

  const cardStyle = { backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eef2f6', padding: '24px', display: 'flex', flexDirection: 'column' };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      
      {/* 1. Sidebar */}
      <aside style={{ width: isMobile ? '100%' : '280px', backgroundColor: '#1e293b', padding: isMobile ? '10px' : '40px 24px', display: 'flex', flexDirection: isMobile ? 'row' : 'column', color: '#fff', position: 'fixed', height: isMobile ? '70px' : '100vh', bottom: isMobile ? 0 : 'auto', left: 0, zIndex: 1000 }}>
        {!isMobile && (
          <>
            <div style={{ fontSize: '28px', fontWeight: '900', color: cafeColor, letterSpacing: '-1.5px', marginBottom: '10px', textAlign: 'center' }}>WEARIVO</div>
            <button onClick={() => router.push('/')} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '12px', borderRadius: '10px', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '40px', cursor: 'pointer' }}>
              <Icons.ExternalLink /> View Website
            </button>
          </>
        )}
        <nav style={{ flex: 1, width: '100%' }}>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: isMobile ? 'row' : 'column', justifyContent: 'space-around' }}>
            <li onClick={() => setActiveTab('orders')} style={{ padding: '16px 20px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', background: activeTab === 'orders' ? '#334155' : 'transparent', color: activeTab === 'orders' ? cafeColor : '#94a3b8', fontWeight: '700' }}>
              <Icons.LiveOrders /> {!isMobile && "Live Orders"}
            </li>
            <li onClick={() => setActiveTab('manager')} style={{ padding: '16px 20px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', background: activeTab === 'manager' ? '#334155' : 'transparent', color: activeTab === 'manager' ? cafeColor : '#94a3b8', fontWeight: '700' }}>
              <Icons.BrandManager /> {!isMobile && "Brand Manager"}
            </li>
          </ul>
        </nav>
        <div onClick={() => setShowLogoutConfirm(true)} style={{ padding: '20px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', color: '#fca5a5', fontWeight: '700', borderTop: isMobile ? 'none' : '1px solid #334155', marginTop: 'auto' }}>
          <Icons.Logout /> {!isMobile && "Logout Session"}
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main style={{ flex: 1, marginLeft: isMobile ? 0 : '280px', marginBottom: isMobile ? '70px' : 0, padding: isMobile ? '20px' : '40px', boxSizing: 'border-box' }}>
        
        {/* Header with Integrated Search */}
        <header style={{ backgroundColor: '#fff', padding: '15px 25px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #f2f4f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ position: 'relative', width: isMobile ? '100%' : '350px' }}>
            <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }}><Icons.Search /></span>
            <input type="text" placeholder={activeTab === 'orders' ? "Search Order Code (#WRV)..." : "Search Product Catalog..."} style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#10b981' }}>ONLINE</span>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: cafeColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '900' }}>EW</div>
          </div>
        </header>

        {activeTab === 'orders' ? (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '25px' }}>Operational Statistics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px', marginBottom: '24px' }}>
              <div style={cardStyle}><p style={{ fontSize: '11px', fontWeight: '800', color: '#64748b' }}>TRANSACTIONS</p><h2 style={{ fontSize: '32px', fontWeight: '800', margin: '15px 0' }}>$208,187</h2></div>
              <div style={cardStyle}><p style={{ fontSize: '11px', fontWeight: '800', color: '#64748b' }}>PROJECT RATING</p><h2 style={{ fontSize: '32px', fontWeight: '800', margin: '15px 0' }}>4.3 ★</h2></div>
              <div style={cardStyle}><p style={{ fontSize: '11px', fontWeight: '800', color: '#64748b' }}>NEWS STATISTICS</p><div style={{ height: '8px', width: '90%', background: '#10b981', borderRadius: '10px', marginTop: '20px' }}></div></div>
            </div>
            {/* Pie Chart Simulation as per Display */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 2fr', gap: '24px' }}>
                <div style={cardStyle}><h3 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '20px' }}>Phone Calls</h3><div style={{ width: '160px', height: '160px', borderRadius: '50%', border: '20px solid #1e293b', borderTopColor: cafeColor, borderRightColor: '#10b981', margin: '0 auto' }}></div></div>
                <div style={cardStyle}><h3 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '20px' }}>Recent Orders History</h3><div style={{ textAlign: 'center', padding: '60px', border: '1px dashed #e2e8f0', borderRadius: '12px', color: '#94a3b8' }}>Waiting for data stream...</div></div>
            </div>
          </div>
        ) : (
          <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontWeight: '800', margin: 0 }}>Brand Style Manager</h2>
              <button onClick={() => setIsFormOpen(true)} style={{ background: '#000', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '14px', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <Icons.Plus /> ADD PRODUCT
              </button>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
              <div style={cardStyle}><h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '15px' }}>Cafe Theme Color</h4><input type="color" value={cafeColor} onChange={(e) => setCafeColor(e.target.value)} style={{ width: '60px', height: '60px', border: 'none', borderRadius: '10px', cursor: 'pointer' }} /></div>
              <div style={cardStyle}><h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '15px' }}>Store Background</h4><select style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}><option>Soft Beige Texture</option><option>Pure White</option></select></div>
            </div>
          </div>
        )}

        {/* 3. Add Product Modal - الوجهة المطلوبة */}
        {isFormOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '32px', width: '480px', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '32px' }}>New Item Upload</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <input type="text" placeholder="Product Title" style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} />
                <div style={{ display: 'flex', gap: '15px' }}>
                  <input type="number" placeholder="Price (EGP)" style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                  <select style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <option>Mens Wear</option><option>Womens Wear</option><option>Kids Wear</option>
                  </select>
                </div>
                <textarea placeholder="Product description and details..." rows="3" style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', resize: 'none' }}></textarea>
                <div style={{ border: '2px dashed #e2e8f0', padding: '20px', borderRadius: '12px', textAlign: 'center' }}><input type="file" style={{ fontSize: '11px' }} /></div>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                <button onClick={() => setIsFormOpen(false)} style={{ flex: 1, padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#fff', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
                <button style={{ flex: 1, padding: '16px', borderRadius: '16px', border: 'none', background: '#000', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Save Product</button>
              </div>
            </div>
          </div>
        )}

        {/* 4. Logout Confirmation */}
        {showLogoutConfirm && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', textAlign: 'center', width: '350px' }}>
              <h3 style={{ fontWeight: '800' }}>Confirm Logout?</h3>
              <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
                <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', fontWeight: '700' }}>No</button>
                <button onClick={() => signOut(auth)} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', background: '#ef4444', color: '#fff', fontWeight: '700' }}>Yes</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
