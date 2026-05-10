"use client";
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

// أيقونات SVG احترافية وبسيطة
const Icons = {
  Home: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
  ),
  Products: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
  ),
  Orders: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
  ),
  Logout: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
  ),
  Camera: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
  )
};

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push('/login');
      else setUser(currentUser);
    });
    return () => { window.removeEventListener('resize', handleResize); unsubscribe(); };
  }, [router]);

  if (!user) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', fontSize: '12px', fontWeight: '900', letterSpacing: '5px', opacity: 0.1 }}>WEARIVO</div>;

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh', backgroundColor: '#fcfdfe', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '35px', textAlign: 'center', width: '90%', maxWidth: '340px', boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 10px 0', letterSpacing: '-1px' }}>Confirm Logout</h3>
            <p style={{ fontSize: '14px', color: '#888', fontWeight: '500', marginBottom: '35px', lineHeight: '1.5' }}>Are you sure you want to exit the admin panel?</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, padding: '16px', borderRadius: '18px', border: '1px solid #eee', backgroundColor: '#fff', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => signOut(auth)} style={{ flex: 1, padding: '16px', borderRadius: '18px', border: 'none', backgroundColor: '#000', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside style={{ 
        width: isMobile ? '100%' : '100px', 
        height: isMobile ? 'auto' : '100vh', 
        backgroundColor: '#fff', 
        borderRight: isMobile ? 'none' : '1px solid #f0f0f0', 
        borderBottom: isMobile ? '1px solid #f0f0f0' : 'none',
        position: isMobile ? 'relative' : 'fixed',
        display: 'flex',
        flexDirection: isMobile ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '15px 25px' : '45px 0',
        zIndex: 1000
      }}>
        <div style={{ width: '48px', height: '48px', background: '#000', borderRadius: '15px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '20px', boxShadow: '0 8px 15px rgba(0,0,0,0.1)' }}>W</div>
        
        <nav style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: isMobile ? '20px' : '35px', alignItems: 'center' }}>
          <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: activeTab === 'home' ? '#000' : '#d1d5db', transition: '0.3s' }}><Icons.Home /></button>
          <button onClick={() => setActiveTab('products')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: activeTab === 'products' ? '#000' : '#d1d5db', transition: '0.3s' }}><Icons.Products /></button>
          <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: activeTab === 'orders' ? '#000' : '#d1d5db', transition: '0.3s' }}><Icons.Orders /></button>
        </nav>

        <button onClick={() => setShowLogoutConfirm(true)} style={{ background: '#f9fafb', border: '1px solid #f3f4f6', width: '45px', height: '45px', borderRadius: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}><Icons.Logout /></button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: isMobile ? '0' : '100px', padding: isMobile ? '40px 20px' : '70px 90px' }}>
        
        {/* Centralized Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '70px' }}>
          <h2 style={{ fontSize: isMobile ? '32px' : '52px', fontWeight: '900', letterSpacing: '-3px', margin: 0, textTransform: 'uppercase' }}>Wearivo Admin</h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
             <span style={{ fontSize: '11px', fontWeight: '800', color: '#10b981', letterSpacing: '1px' }}>● SYSTEM LIVE</span>
             <span style={{ width: '4px', height: '4px', backgroundColor: '#e5e7eb', borderRadius: '50%' }}></span>
             <span style={{ fontSize: '11px', fontWeight: '600', color: '#9ca3af' }}>V1.0.8</span>
          </div>
        </div>

        {activeTab === 'home' && (
          <div style={{ animation: 'fadeIn 0.6s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '30px', marginBottom: '50px' }}>
              {[
                { label: 'TOTAL ITEMS', val: '3', color: '#000' },
                { label: 'PENDING ORDERS', val: '0', color: '#ef4444' },
                { label: 'GROSS SALES', val: '0 EGP', color: '#000' }
              ].map((stat, i) => (
                <div key={i} style={{ background: '#fff', padding: '35px', borderRadius: '28px', border: '1px solid #f0f0f0', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                  <p style={{ fontSize: '10px', fontWeight: '800', color: '#9ca3af', letterSpacing: '1.5px', marginBottom: '10px' }}>{stat.label}</p>
                  <p style={{ fontSize: isMobile ? '36px' : '46px', fontWeight: '900', margin: 0, color: stat.color, letterSpacing: '-2px' }}>{stat.val}</p>
                </div>
              ))}
            </div>

            <div style={{ background: '#fff', padding: '45px', borderRadius: '28px', border: '1px solid #f0f0f0' }}>
              <h4 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '35px', letterSpacing: '-0.5px' }}>Recent Activity Stream</h4>
              <div style={{ padding: '90px 20px', textAlign: 'center', background: '#fafbfc', borderRadius: '25px', border: '2px dashed #f1f5f9' }}>
                <p style={{ color: '#9ca3af', fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px' }}>STANDBY: NO INCOMING REQUESTS FOUND</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div style={{ animation: 'fadeIn 0.6s ease' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '45px', letterSpacing: '-1px' }}>Inventory Management</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '35px' }}>
              {['KIDS', 'WOMENS', 'MENS'].map(label => (
                <div key={label} style={{ background: '#fff', padding: '30px', borderRadius: '28px', border: '1px solid #f0f0f0', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '100%', height: '240px', background: '#f8fafc', borderRadius: '22px', marginBottom: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icons.Camera />
                  </div>
                  <button style={{ width: '100%', padding: '20px', background: '#000', color: '#fff', border: 'none', borderRadius: '18px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', letterSpacing: '1px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>UPLOAD {label}</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
