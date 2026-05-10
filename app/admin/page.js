"use client";
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

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
            <p style={{ fontSize: '30px', margin: '0' }}>⚠️</p>
            <h3 style={{ fontSize: '20px', fontWeight: '900', margin: '15px 0' }}>Confirm Logout</h3>
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '30px' }}>Are you sure you want to exit the admin panel?</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, padding: '16px', borderRadius: '16px', border: '1px solid #eee', backgroundColor: '#fff', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleLogout} style={{ flex: 1, padding: '16px', borderRadius: '16px', border: 'none', backgroundColor: '#E31E24', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar - تم إصلاحه لضمان ظهور زر الخروج */}
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
        
        <nav style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '30px' }}>
          <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', opacity: activeTab === 'home' ? 1 : 0.2 }}>🏠</button>
          <button onClick={() => setActiveTab('products')} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', opacity: activeTab === 'products' ? 1 : 0.2 }}>👕</button>
          <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', opacity: activeTab === 'orders' ? 1 : 0.2 }}>📦</button>
        </nav>

        {/* زرار الخروج - في مكان واضح جداً الآن */}
        <button onClick={() => setShowLogoutConfirm(true)} style={{ 
          background: '#f9f9f9', 
          border: '1px solid #eee', 
          width: '45px', 
          height: '45px', 
          borderRadius: '14px', 
          fontSize: '20px', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>🚪</button>
      </aside>

      {/* Main Content - تم إصلاح المسافات لمنع تآكل الكلمات */}
      <main style={{ 
        flex: 1, 
        marginLeft: isMobile ? '0' : '100px', 
        padding: isMobile ? '30px 20px' : '60px 80px', // زيادة البادنج الجانبي لمنع التآكل
        boxSizing: 'border-box'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: '900', letterSpacing: '-2px', margin: 0, textTransform: 'uppercase' }}>Wearivo Admin</h2>
          <p style={{ fontSize: '12px', fontWeight: '800', color: '#10b981', marginTop: '10px' }}>● SYSTEM LIVE</p>
        </div>

        {activeTab === 'home' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '25px', marginBottom: '40px' }}>
              <div style={{ background: '#fff', padding: '30px', borderRadius: '24px', border: '1px solid #f0f0f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <p style={{ fontSize: '10px', fontWeight: '900', color: '#999', letterSpacing: '1px' }}>TOTAL ITEMS</p>
                <p style={{ fontSize: '36px', fontWeight: '900', margin: '10px 0 0 0' }}>3</p>
              </div>
              <div style={{ background: '#fff', padding: '30px', borderRadius: '24px', border: '1px solid #f0f0f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <p style={{ fontSize: '10px', fontWeight: '900', color: '#999', letterSpacing: '1px' }}>PENDING ORDERS</p>
                <p style={{ fontSize: '36px', fontWeight: '900', margin: '10px 0 0 0', color: '#ff4d4d' }}>0</p>
              </div>
              <div style={{ background: '#fff', padding: '30px', borderRadius: '24px', border: '1px solid #f0f0f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <p style={{ fontSize: '10px', fontWeight: '900', color: '#999', letterSpacing: '1px' }}>GROSS SALES</p>
                <p style={{ fontSize: '36px', fontWeight: '900', margin: '10px 0 0 0' }}>0 <span style={{ fontSize: '16px', opacity: 0.2 }}>EGP</span></p>
              </div>
            </div>

            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid #f0f0f0' }}>
              <h4 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '30px', textAlign: 'left' }}>Recent Activity</h4>
              <div style={{ padding: '80px 20px', textAlign: 'center', background: '#fafafa', borderRadius: '24px', border: '2px dashed #f0f0f0' }}>
                <p style={{ color: '#bbb', fontSize: '14px', fontWeight: '600' }}>NO INCOMING REQUESTS</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            {/* تم حل مشكلة تآكل كلمة Management هنا بزيادة الـ Margin */}
            <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '40px', textAlign: 'left', paddingLeft: '10px' }}>Inventory Management</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '30px' }}>
              {['MENS', 'WOMENS', 'KIDS'].map(label => (
                <div key={label} style={{ background: '#fff', padding: '25px', borderRadius: '24px', border: '1px solid #f0f0f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '100%', height: '220px', background: '#f8f8f8', borderRadius: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>📸</div>
                  <button style={{ width: '100%', padding: '18px', background: '#000', color: '#fff', border: 'none', borderRadius: '16px', fontSize: '12px', fontWeight: '900', cursor: 'pointer', transition: '0.2s' }}>UPLOAD {label}</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
