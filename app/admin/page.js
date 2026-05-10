"use client";
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

// أيقونات SVG بسيطة واحترافية
const Icons = {
  Home: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
  ),
  Products: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.62 1.96v14.16a2 2 0 0 0 1.62 1.96L8 23a4 4 0 0 0 8 0l4.38-1.42a2 2 0 0 0 1.62-1.96V5.42a2 2 0 0 0-1.62-1.96z"></path><path d="M12 2v21"></path></svg>
  ),
  Orders: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
  ),
  Logout: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
  ),
  Camera: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
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

  const handleLogout = () => {
    signOut(auth).then(() => { setShowLogoutConfirm(false); router.push('/login'); });
  };

  if (!user) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', fontSize: '10px', fontWeight: 'bold', letterSpacing: '4px', opacity: 0.2 }}>WEARIVO OS</div>;

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh', backgroundColor: '#fcfdfe', fontFamily: '"Inter", sans-serif' }}>
      
      {/* Logout Warning Modal */}
      {showLogoutConfirm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '32px', textAlign: 'center', width: '90%', maxWidth: '350px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 10px 0' }}>Confirm Logout</h3>
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '30px' }}>Are you sure you want to exit the admin panel?</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, padding: '16px', borderRadius: '16px', border: '1px solid #eee', backgroundColor: '#fff', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleLogout} style={{ flex: 1, padding: '16px', borderRadius: '16px', border: 'none', backgroundColor: '#000', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Logout</button>
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
        padding: '30px 20px',
        boxSizing: 'border-box',
        zIndex: 1000
      }}>
        <div style={{ width: '45px', height: '45px', background: '#000', borderRadius: '14px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '18px' }}>W</div>
        
        <nav style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '30px', alignItems: 'center' }}>
          <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: activeTab === 'home' ? '#000' : '#ccc', transition: '0.3s' }}>
            <Icons.Home />
          </button>
          <button onClick={() => setActiveTab('products')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: activeTab === 'products' ? '#000' : '#ccc', transition: '0.3s' }}>
            <Icons.Products />
          </button>
          <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: activeTab === 'orders' ? '#000' : '#ccc', transition: '0.3s' }}>
            <Icons.Orders />
          </button>
        </nav>

        <button onClick={() => setShowLogoutConfirm(true)} style={{ 
          background: '#f9f9f9', 
          border: '1px solid #eee', 
          width: '45px', 
          height: '45px', 
          borderRadius: '14px', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#888'
        }}>
          <Icons.Logout />
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        marginLeft: isMobile ? '0' : '100px', 
        padding: isMobile ? '30px 20px' : '60px 80px', 
        boxSizing: 'border-box'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: '900', letterSpacing: '-2px', margin: 0, textTransform: 'uppercase' }}>Wearivo Admin</h2>
          <p style={{ fontSize: '12px', fontWeight: '800', color: '#10b981', marginTop: '10px' }}>● SYSTEM LIVE</p>
        </div>

        {activeTab === 'home' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '25px', marginBottom: '40px' }}>
              <div style={{ background: '#fff', padding: '30px', borderRadius: '24px', border: '1px solid #f0f0f0' }}>
                <p style={{ fontSize: '10px', fontWeight: '900', color: '#999', letterSpacing: '1px' }}>TOTAL ITEMS</p>
                <p style={{ fontSize: '36px', fontWeight: '900', margin: '10px 0 0 0' }}>3</p>
              </div>
              <div style={{ background: '#fff', padding: '30px', borderRadius: '24px', border: '1px solid #f0f0f0' }}>
                <p style={{ fontSize: '10px', fontWeight: '900', color: '#999', letterSpacing: '1px' }}>PENDING ORDERS</p>
                <p style={{ fontSize: '36px', fontWeight: '900', margin: '10px 0 0 0', color: '#ff4d4d' }}>0</p>
              </div>
              <div style={{ background: '#fff', padding: '30px', borderRadius: '24px', border: '1px solid #f0f0f0' }}>
                <p style={{ fontSize: '10px', fontWeight: '900', color: '#999', letterSpacing: '1px' }}>GROSS SALES</p>
                <p style={{ fontSize: '36px', fontWeight: '900', margin: '10px 0 0 0' }}>0 <span style={{ fontSize: '16px', opacity: 0.2 }}>EGP</span></p>
              </div>
            </div>

            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid #f0f0f0' }}>
              <h4 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '30px', textAlign: 'left' }}>Recent Activity</h4>
              <div style={{ padding: '80px 20px', textAlign: 'center', background: '#fafafa', borderRadius: '24px', border: '2px dashed #f0f0f0' }}>
                <p style={{ color: '#bbb', fontSize: '12px', fontWeight: '600' }}>NO INCOMING REQUESTS</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '40px', textAlign: 'left', paddingLeft: '10px' }}>Inventory Management</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '30px' }}>
              {['KIDS', 'WOMENS', 'MENS'].map(label => (
                <div key={label} style={{ background: '#fff', padding: '25px', borderRadius: '24px', border: '1px solid #f0f0f0' }}>
                  <div style={{ width: '100%', height: '220px', background: '#f8f8f8', borderRadius: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icons.Camera />
                  </div>
                  <button style={{ width: '100%', padding: '18px', background: '#000', color: '#fff', border: 'none', borderRadius: '16px', fontSize: '12px', fontWeight: '900', cursor: 'pointer' }}>UPLOAD {label}</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
