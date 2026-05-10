"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
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

  if (!user) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', fontSize: '12px', letterSpacing: '2px' }}>LOADING BOSTA INTERFACE...</div>;

  // الألوان والستايلات المباشرة لضمان عدم حدوث تشوه
  const styles = {
    aside: { width: '70px', backgroundColor: '#fff', borderRight: '1px solid #E3E9EF', position: 'fixed', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', zIndex: 1000 },
    main: { marginLeft: '70px', padding: '40px', backgroundColor: '#F8F9FB', minHeight: '100vh', width: 'calc(100% - 70px)' },
    card: { backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E3E9EF', padding: '24px', marginBottom: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
    redDot: { width: '10px', height: '10px', backgroundColor: '#E31E24', borderRadius: '50%', display: 'inline-block', marginRight: '8px' }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Sidebar - النسخة المصغرة الاحترافية */}
      <aside style={styles.aside}>
        <div style={{ width: '40px', height: '40px', background: '#E31E24', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px', marginBottom: '40px' }}>W</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <button onClick={() => setActiveTab('home')} style={{ fontSize: '20px', border: 'none', background: 'none', cursor: 'pointer', opacity: activeTab === 'home' ? 1 : 0.3 }}>🏠</button>
          <button onClick={() => setActiveTab('orders')} style={{ fontSize: '20px', border: 'none', background: 'none', cursor: 'pointer', opacity: activeTab === 'orders' ? 1 : 0.3 }}>📦</button>
          <button onClick={() => setActiveTab('products')} style={{ fontSize: '20px', border: 'none', background: 'none', cursor: 'pointer', opacity: activeTab === 'products' ? 1 : 0.3 }}>👕</button>
          <button onClick={() => signOut(auth)} style={{ fontSize: '20px', border: 'none', background: 'none', cursor: 'pointer', opacity: 0.3, marginTop: 'auto' }}>🚪</button>
        </nav>
      </aside>

      {/* Main Area */}
      <main style={styles.main}>
        
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2B3445' }}>Welcome Back, Essa</h2>
            <p style={{ color: '#7D879C', fontSize: '14px', marginTop: '4px' }}>Wearivo System Overview</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#7D879C', background: '#fff', padding: '8px 16px', borderRadius: '20px', border: '1px solid #E3E9EF' }}>Cairo Hub</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee', overflow: 'hidden' }}>
               <img src={`https://ui-avatars.com/api/?name=Essa&background=E31E24&color=fff`} alt="essa" />
            </div>
          </div>
        </div>

        {activeTab === 'home' && (
          <div>
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              <div style={styles.card}>
                <h4 style={{ fontSize: '14px', color: '#7D879C', margin: '0 0 16px 0' }}>PENDING TASKS</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ textAlign: 'center' }}><p style={{ fontSize: '24px', fontWeight: 'bold', color: '#E31E24', margin: 0 }}>0</p><p style={{ fontSize: '10px', color: '#7D879C' }}>NEW</p></div>
                  <div style={{ textAlign: 'center' }}><p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2B3445', margin: 0 }}>0</p><p style={{ fontSize: '10px', color: '#7D879C' }}>PICKING</p></div>
                  <div style={{ textAlign: 'center' }}><p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2B3445', margin: 0 }}>0</p><p style={{ fontSize: '10px', color: '#7D879C' }}>PACKED</p></div>
                </div>
              </div>

              <div style={styles.card}>
                <h4 style={{ fontSize: '14px', color: '#7D879C', margin: '0 0 16px 0' }}>RETURN ORDERS</h4>
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2B3445', margin: 0 }}>0</p>
                  <p style={{ fontSize: '10px', color: '#7D879C' }}>UNPROCESSED</p>
                </div>
              </div>

              <div style={styles.card}>
                <h4 style={{ fontSize: '14px', color: '#7D879C', margin: '0 0 16px 0' }}>SYSTEM STATUS</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0' }}>
                  <span style={styles.redDot}></span>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#2B3445' }}>FIREBASE CONNECTED</span>
                </div>
              </div>
            </div>

            {/* Live Orders Box */}
            <div style={styles.card}>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '20px' }}>LIVE SALES ORDERS</h4>
              <div style={{ background: '#F3F5F9', padding: '40px', borderRadius: '12px', textAlign: 'center' }}>
                <p style={{ color: '#7D879C', fontSize: '12px', letterSpacing: '1px' }}>STANDING BY FOR CUSTOMER REQUESTS</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div style={styles.card}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>UPDATE STORE SECTIONS</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {['MENS', 'WOMENS', 'KIDS'].map(item => (
                <div key={item} style={{ background: '#F8F9FB', border: '1px solid #E3E9EF', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                  <div style={{ width: '100%', height: '150px', background: '#fff', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' }}>📸</div>
                  <button style={{ width: '100%', padding: '12px', background: '#2B3445', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>UPLOAD {item}</button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
