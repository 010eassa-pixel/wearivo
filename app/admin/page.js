"use client";
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push('/login');
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [router]);

  if (!user) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', fontSize: '12px', fontWeight: 'bold', letterSpacing: '4px', opacity: 0.2 }}>WEARIVO OS</div>;

  const styles = {
    aside: { width: '80px', backgroundColor: '#fff', borderRight: '1px solid #f0f0f0', position: 'fixed', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', zIndex: 1000 },
    main: { marginLeft: '80px', padding: '60px', backgroundColor: '#fcfdfe', minHeight: '100vh', width: 'calc(100% - 80px)' },
    card: { backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #f0f0f0', padding: '32px', transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' },
    statNumber: { fontSize: '42px', fontWeight: '900', margin: '10px 0 0 0', letterSpacing: '-2px' },
    navBtn: { fontSize: '24px', border: 'none', background: 'none', cursor: 'pointer', transition: '0.3s', padding: '12px', borderRadius: '15px' }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '"Inter", sans-serif', color: '#000' }}>
      
      {/* Sidebar - احترافي وبسيط */}
      <aside style={styles.aside}>
        <div style={{ width: '48px', height: '48px', background: '#000', borderRadius: '16px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '20px', marginBottom: '60px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>W</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <button onClick={() => setActiveTab('home')} style={{ ...styles.navBtn, backgroundColor: activeTab === 'home' ? '#f5f5f5' : 'transparent', opacity: activeTab === 'home' ? 1 : 0.2 }}>🏠</button>
          <button onClick={() => setActiveTab('products')} style={{ ...styles.navBtn, backgroundColor: activeTab === 'products' ? '#f5f5f5' : 'transparent', opacity: activeTab === 'products' ? 1 : 0.2 }}>👕</button>
          <button onClick={() => setActiveTab('orders')} style={{ ...styles.navBtn, backgroundColor: activeTab === 'orders' ? '#f5f5f5' : 'transparent', opacity: activeTab === 'orders' ? 1 : 0.2 }}>📦</button>
          <button onClick={() => signOut(auth)} style={{ ...styles.navBtn, opacity: 0.2, marginTop: '80px' }}>🚪</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        
        {/* Centralized Header - وريفو أدمن في النص */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-3px', margin: 0, textTransform: 'uppercase' }}>Wearivo Admin</h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#10b981', letterSpacing: '1px' }}>● SYSTEM LIVE</span>
            <span style={{ width: '4px', height: '4px', background: '#ddd', borderRadius: '50%' }}></span>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#888' }}>V1.0.4</span>
          </div>
        </div>

        {activeTab === 'home' && (
          <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginBottom: '40px' }}>
              <div style={styles.card} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <p style={{ fontSize: '11px', fontWeight: '900', color: '#999', letterSpacing: '2px' }}>GROSS SALES</p>
                <p style={styles.statNumber}>0 <span style={{ fontSize: '18px', fontWeight: '600', opacity: 0.2 }}>EGP</span></p>
              </div>
              <div style={styles.card} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <p style={{ fontSize: '11px', fontWeight: '900', color: '#999', letterSpacing: '2px' }}>PENDING ORDERS</p>
                <p style={{ ...styles.statNumber, color: '#ff4d4d' }}>0</p>
              </div>
              <div style={styles.card} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <p style={{ fontSize: '11px', fontWeight: '900', color: '#999', letterSpacing: '2px' }}>TOTAL ITEMS</p>
                <p style={styles.statNumber}>3</p>
              </div>
            </div>

            {/* Orders Feed */}
            <div style={{ ...styles.card, padding: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h4 style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-1px' }}>Recent Activity</h4>
                <div style={{ width: '40px', height: '4px', background: '#eee', borderRadius: '10px' }}></div>
              </div>
              <div style={{ padding: '80px 20px', textAlign: 'center', background: '#fafafa', borderRadius: '30px', border: '2px dashed #f0f0f0' }}>
                <p style={{ color: '#bbb', fontSize: '14px', fontWeight: '600', letterSpacing: '1px' }}>NO INCOMING REQUESTS AT THE MOMENT</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '40px', letterSpacing: '-1px' }}>Inventory Management</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
              {[
                { label: 'MENS', icon: '🤵' },
                { label: 'WOMENS', icon: '👗' },
                { label: 'KIDS', icon: '🧸' }
              ].map(item => (
                <div key={item.label} style={styles.card}>
                  <div style={{ width: '100%', height: '260px', background: '#f8f8f8', borderRadius: '25px', marginBottom: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px' }}>{item.icon}</div>
                  <button style={{ width: '100%', padding: '20px', background: '#000', color: '#fff', border: 'none', borderRadius: '18px', fontSize: '12px', fontWeight: '900', cursor: 'pointer', letterSpacing: '2px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>UPLOAD {item.label}</button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
