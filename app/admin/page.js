"use client";
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

// أيقونات SVG بسيطة وحادة
const Icons = {
  Home: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>,
  Products: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18M9 21V9"></path></svg>,
  Orders: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path></svg>,
  Logout: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"></path></svg>
};

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // استدعاء خط Inter الأساسي لبوسطا وأمازون
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap';
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

  // تنسيقات ثابتة لضمان النظافة
  const theme = {
    font: "'Inter', sans-serif",
    card: { backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #f2f4f7', padding: '24px' }
  };

  return (
    <div style={{ fontFamily: theme.font, display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh', backgroundColor: '#fcfdfe' }}>
      
      {/* Logout Warning */}
      {showLogoutConfirm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '24px', textAlign: 'center', width: '300px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Sign Out?</h3>
            <p style={{ fontSize: '12px', color: '#667085', marginBottom: '24px' }}>Are you sure you want to exit?</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #eee', background: 'none', fontWeight: '600', cursor: 'pointer' }}>No</button>
              <button onClick={() => signOut(auth)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#000', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>Yes</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside style={{ width: isMobile ? '100%' : '80px', height: isMobile ? 'auto' : '100vh', backgroundColor: '#fff', borderRight: '1px solid #f2f4f7', position: isMobile ? 'relative' : 'fixed', display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: 'center', justifyContent: 'space-between', padding: '24px 16px', boxSizing: 'border-box', zIndex: 1000 }}>
        <div style={{ width: '40px', height: '40px', background: '#000', borderRadius: '10px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '16px' }}>W</div>
        <nav style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '24px' }}>
          <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', color: activeTab === 'home' ? '#000' : '#d0d5dd', cursor: 'pointer' }}><Icons.Home /></button>
          <button onClick={() => setActiveTab('products')} style={{ background: 'none', border: 'none', color: activeTab === 'products' ? '#000' : '#d0d5dd', cursor: 'pointer' }}><Icons.Products /></button>
          <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', color: activeTab === 'orders' ? '#000' : '#d0d5dd', cursor: 'pointer' }}><Icons.Orders /></button>
        </nav>
        <button onClick={() => setShowLogoutConfirm(true)} style={{ background: '#f9fafb', border: 'none', width: '40px', height: '40px', borderRadius: '10px', color: '#98a2b3', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icons.Logout /></button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: isMobile ? '0' : '80px', padding: isMobile ? '32px 20px' : '64px 80px', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: '800', letterSpacing: '-2px', margin: 0 }}>WEARIVO ADMIN</h2>
          <p style={{ fontSize: '11px', fontWeight: '600', color: '#12b76a', marginTop: '8px' }}>● SYSTEM LIVE</p>
        </div>

        {activeTab === 'home' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
              <div style={theme.card}><p style={{ fontSize: '10px', fontWeight: '600', color: '#667085', letterSpacing: '0.5px', marginBottom: '8px' }}>TOTAL ITEMS</p><p style={{ fontSize: '32px', fontWeight: '800', margin: 0 }}>3</p></div>
              <div style={theme.card}><p style={{ fontSize: '10px', fontWeight: '600', color: '#667085', letterSpacing: '0.5px', marginBottom: '8px' }}>PENDING ORDERS</p><p style={{ fontSize: '32px', fontWeight: '800', margin: 0, color: '#f04438' }}>0</p></div>
              <div style={theme.card}><p style={{ fontSize: '10px', fontWeight: '600', color: '#667085', letterSpacing: '0.5px', marginBottom: '8px' }}>GROSS SALES</p><p style={{ fontSize: '32px', fontWeight: '800', margin: 0 }}>0 <span style={{ fontSize: '14px', opacity: 0.3 }}>EGP</span></p></div>
            </div>
            <div style={theme.card}>
              <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '24px' }}>Recent Activity Stream</h4>
              <div style={{ padding: '80px 20px', textAlign: 'center', background: '#f9fafb', borderRadius: '16px', border: '1px dashed #eaecf0' }}>
                <p style={{ color: '#98a2b3', fontSize: '12px', fontWeight: '500' }}>STANDBY: LISTENING FOR UPDATES</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '32px', paddingLeft: '4px' }}>Inventory Management</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
              {['KIDS', 'WOMENS', 'MENS'].map(l => (
                <div key={l} style={theme.card}>
                  <div style={{ width: '100%', height: '180px', background: '#f9fafb', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>📸</div>
                  <button style={{ width: '100%', padding: '14px', background: '#000', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>UPLOAD {l}</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
