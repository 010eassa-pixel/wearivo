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
    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  }, [router]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setShowLogoutConfirm(false);
      router.push('/login');
    });
  };

  if (!user) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', fontSize: '10px', fontWeight: 'bold', letterSpacing: '4px', opacity: 0.2 }}>WEARIVO OS</div>;

  const styles = {
    container: { display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh', fontFamily: '"Inter", sans-serif', color: '#000', backgroundColor: '#fcfdfe' },
    aside: { 
      width: isMobile ? '100%' : '80px', 
      height: isMobile ? 'auto' : '100vh', 
      backgroundColor: '#fff', 
      borderRight: isMobile ? 'none' : '1px solid #f0f0f0', 
      borderBottom: isMobile ? '1px solid #f0f0f0' : 'none',
      position: isMobile ? 'relative' : 'fixed', 
      display: 'flex', 
      flexDirection: isMobile ? 'row' : 'column', 
      alignItems: 'center', 
      justifyContent: isMobile ? 'space-between' : 'space-between', // توزيع العناصر لتوفير مساحة للخرج
      padding: isMobile ? '15px 20px' : '40px 0', 
      zIndex: 1000 
    },
    main: { marginLeft: isMobile ? '0' : '80px', padding: isMobile ? '30px 20px' : '60px', width: '100%', boxSizing: 'border-box' },
    card: { backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #f0f0f0', padding: isMobile ? '20px' : '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: '20px' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }
  };

  return (
    <div style={styles.container}>
      
      {/* Logout Warning Modal */}
      {showLogoutConfirm && (
        <div style={styles.modalOverlay}>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '30px', textAlign: 'center', maxWidth: '350px', width: '90%' }}>
            <p style={{ fontSize: '30px', margin: '0' }}>⚠️</p>
            <h3 style={{ fontSize: '20px', fontWeight: '900', margin: '15px 0' }}>Are you sure?</h3>
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '30px' }}>You will need to login again to access the admin panel.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, padding: '15px', borderRadius: '15px', border: '1px solid #f0f0f0', background: '#fff', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleLogout} style={{ flex: 1, padding: '15px', borderRadius: '15px', border: 'none', background: '#000', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside style={styles.aside}>
        <div style={{ width: '40px', height: '40px', background: '#000', borderRadius: '12px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '16px' }}>W</div>
        
        <nav style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: isMobile ? '15px' : '30px' }}>
          <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', opacity: activeTab === 'home' ? 1 : 0.2 }}>🏠</button>
          <button onClick={() => setActiveTab('products')} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', opacity: activeTab === 'products' ? 1 : 0.2 }}>👕</button>
          <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', opacity: activeTab === 'orders' ? 1 : 0.2 }}>📦</button>
        </nav>

        {/* زرار الخروج - تم تحسين مكانه */}
        <button onClick={() => setShowLogoutConfirm(true)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', opacity: 0.2, marginBottom: isMobile ? '0' : '20px' }}>🚪</button>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '30px' : '60px' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '48px', fontWeight: '900', letterSpacing: '-2px', margin: 0, textTransform: 'uppercase' }}>Wearivo Admin</h2>
          <p style={{ fontSize: '11px', fontWeight: '800', color: '#10b981', marginTop: '5px' }}>● SYSTEM LIVE</p>
        </div>

        {activeTab === 'home' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '15px' : '30px', marginBottom: '40px' }}>
              <div style={styles.card}>
                <p style={{ fontSize: '10px', fontWeight: '900', color: '#999', letterSpacing: '1px' }}>TOTAL ITEMS</p>
                <p style={{ fontSize: isMobile ? '32px' : '42px', fontWeight: '900', margin: '5px 0 0 0' }}>3</p>
              </div>
              <div style={styles.card}>
                <p style={{ fontSize: '10px', fontWeight: '900', color: '#999', letterSpacing: '1px' }}>PENDING ORDERS</p>
                <p style={{ fontSize: isMobile ? '32px' : '42px', fontWeight: '900', margin: '5px 0 0 0', color: '#ff4d4d' }}>0</p>
              </div>
              <div style={styles.card}>
                <p style={{ fontSize: '10px', fontWeight: '900', color: '#999', letterSpacing: '1px' }}>GROSS SALES</p>
                <p style={{ fontSize: isMobile ? '32px' : '42px', fontWeight: '900', margin: '5px 0 0 0' }}>0 <span style={{ fontSize: '16px', opacity: 0.2 }}>EGP</span></p>
              </div>
            </div>

            <div style={styles.card}>
              {/* تعديل المحاذاة هنا لليسار قليلاً */}
              <h4 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '25px', paddingLeft: '5px' }}>Recent Activity</h4>
              <div style={{ padding: '80px 20px', textAlign: 'center', background: '#fafafa', borderRadius: '20px', border: '2px dashed #f0f0f0' }}>
                <p style={{ color: '#bbb', fontSize: '12px', fontWeight: '600' }}>NO INCOMING REQUESTS</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            {/* تعديل المحاذاة هنا لليسار قليلاً */}
            <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '35px', paddingLeft: '5px' }}>Inventory Management</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '15px' : '30px', marginBottom: '40px' }}>
              {['KIDS', 'WOMENS', 'MENS'].map(label => (
                <div key={label} style={styles.card}>
                  <div style={{ width: '100%', height: '220px', background: '#f8f8f8', borderRadius: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>📸</div>
                  <button style={{ width: '100%', padding: '16px', background: '#000', color: '#fff', border: 'none', borderRadius: '15px', fontSize: '11px', fontWeight: '900', cursor: 'pointer' }}>UPLOAD {label}</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
