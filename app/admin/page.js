"use client";
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Icons = {
  Home: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>,
  Products: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18M9 21V9"></path></svg>,
  Orders: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path></svg>,
  Logout: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"></path></svg>,
  Camera: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
};

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
      else router.push('/login');
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  }, [router]);

  if (!user) return null;

  const cardStyle = { backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #f2f4f7', padding: '32px' };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh', backgroundColor: '#fcfdfe' }}>
      
      {showLogoutConfirm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '32px', textAlign: 'center', width: '320px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-1px', marginBottom: '10px' }}>Logout?</h3>
            <p style={{ fontSize: '13px', color: '#667085', marginBottom: '30px' }}>You will need to re-authenticate.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, padding: '14px', borderRadius: '16px', border: '1px solid #eee', background: 'none', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => signOut(auth).then(() => router.push('/login'))} style={{ flex: 1, padding: '14px', borderRadius: '16px', border: 'none', background: '#000', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      <aside style={{ width: isMobile ? '100%' : '100px', height: isMobile ? 'auto' : '100vh', backgroundColor: '#fff', borderRight: '1px solid #f2f4f7', position: isMobile ? 'relative' : 'fixed', display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: 'center', justifyContent: 'space-between', padding: '30px 20px', zIndex: 1000, boxSizing: 'border-box' }}>
        <div style={{ width: '42px', height: '42px', background: '#000', borderRadius: '12px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '18px' }}>W</div>
        <nav style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '30px' }}>
          <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', color: activeTab === 'home' ? '#000' : '#d0d5dd', cursor: 'pointer' }}><Icons.Home /></button>
          <button onClick={() => setActiveTab('products')} style={{ background: 'none', border: 'none', color: activeTab === 'products' ? '#000' : '#d0d5dd', cursor: 'pointer' }}><Icons.Products /></button>
          <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', color: activeTab === 'orders' ? '#000' : '#d0d5dd', cursor: 'pointer' }}><Icons.Orders /></button>
        </nav>
        <button onClick={() => setShowLogoutConfirm(true)} style={{ background: '#f9fafb', border: '1px solid #f2f4f7', width: '42px', height: '42px', borderRadius: '12px', color: '#98a2b3', cursor: 'pointer' }}><Icons.Logout /></button>
      </aside>

      <main style={{ flex: 1, marginLeft: isMobile ? '0' : '100px', padding: isMobile ? '40px 20px' : '80px 100px', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: isMobile ? '36px' : '56px', fontWeight: '900', letterSpacing: '-4px', margin: 0, color: '#101828' }}>WEARIVO ADMIN</h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#12b76a', letterSpacing: '1px' }}>● SYSTEM LIVE</span>
            <span style={{ width: '3px', height: '3px', backgroundColor: '#d0d5dd', borderRadius: '50%' }}></span>
            <span style={{ fontSize: '11px', fontWeight: '500', color: '#667085' }}>v1.1.0</span>
          </div>
        </div>

        {activeTab === 'home' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
              <div style={cardStyle}><p style={{ fontSize: '11px', fontWeight: '600', color: '#667085', letterSpacing: '1px', marginBottom: '12px' }}>TOTAL ITEMS</p><p style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-2px', margin: 0 }}>3</p></div>
              <div style={cardStyle}><p style={{ fontSize: '11px', fontWeight: '600', color: '#667085', letterSpacing: '1px', marginBottom: '12px' }}>PENDING ORDERS</p><p style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-2px', margin: 0, color: '#f04438' }}>0</p></div>
              <div style={cardStyle}><p style={{ fontSize: '11px', fontWeight: '600', color: '#667085', letterSpacing: '1px', marginBottom: '12px' }}>GROSS SALES</p><p style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-2px', margin: 0 }}>0 EGP</p></div>
            </div>
            <div style={cardStyle}>
              <h4 style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '32px' }}>Recent Activity</h4>
              <div style={{ padding: '100px 20px', textAlign: 'center', background: '#f9fafb', borderRadius: '24px', border: '1px dashed #eaecf0' }}>
                <p style={{ color: '#667085', fontSize: '13px', fontWeight: '500' }}>STANDBY: NO RECENT LOGS FOUND</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-1px', marginBottom: '40px' }}>Inventory Management</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
              {['KIDS', 'WOMENS', 'MENS'].map((l) => (
                <div key={l} style={cardStyle}>
                  <div style={{ width: '100%', height: '240px', background: '#f9fafb', borderRadius: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icons.Camera /></div>
                  <button style={{ width: '100%', padding: '18px', background: '#000', color: '#fff', border: 'none', borderRadius: '16px', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px', cursor: 'pointer' }}>UPLOAD {l}</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
