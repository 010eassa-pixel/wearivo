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

  if (!user) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', fontSize: '12px', letterSpacing: '2px' }}>INITIALIZING WEARIVO OS...</div>;

  const styles = {
    aside: { width: '80px', backgroundColor: '#fff', borderRight: '1px solid #eee', position: 'fixed', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 0', zIndex: 1000 },
    main: { marginLeft: '80px', padding: '50px', backgroundColor: '#F9FBFC', minHeight: '100vh', width: 'calc(100% - 80px)' },
    card: { backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #edf2f7', padding: '30px', marginBottom: '30px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginBottom: '30px' },
    statusBadge: { fontSize: '11px', fontWeight: 'bold', color: '#10b981', background: '#ecfdf5', padding: '6px 14px', borderRadius: '12px', border: '1px solid #d1fae5' }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a202c' }}>
      
      {/* Sidebar */}
      <aside style={styles.aside}>
        <div style={{ width: '45px', height: '45px', background: '#1a1a1a', borderRadius: '12px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '18px', marginBottom: '50px' }}>W</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <button onClick={() => setActiveTab('home')} title="Overview" style={{ fontSize: '22px', border: 'none', background: 'none', cursor: 'pointer', opacity: activeTab === 'home' ? 1 : 0.2 }}>🏠</button>
          <button onClick={() => setActiveTab('products')} title="Products" style={{ fontSize: '22px', border: 'none', background: 'none', cursor: 'pointer', opacity: activeTab === 'products' ? 1 : 0.2 }}>👕</button>
          <button onClick={() => setActiveTab('orders')} title="Orders" style={{ fontSize: '22px', border: 'none', background: 'none', cursor: 'pointer', opacity: activeTab === 'orders' ? 1 : 0.2 }}>📦</button>
          <button onClick={() => signOut(auth)} title="Logout" style={{ fontSize: '22px', border: 'none', background: 'none', cursor: 'pointer', opacity: 0.2, marginTop: '100px' }}>🚪</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '45px' }}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-1px', margin: 0 }}>Wearivo Admin</h2>
            <p style={{ color: '#718096', fontSize: '15px', marginTop: '8px', fontWeight: '500' }}>Welcome back, Essa Wahid</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={styles.statusBadge}>● SYSTEM ONLINE</span>
            <div style={{ width: '45px', height: '45px', borderRadius: '14px', background: '#1a1a1a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>EW</div>
          </div>
        </div>

        {activeTab === 'home' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            {/* Quick Stats */}
            <div style={styles.grid}>
              <div style={styles.card}>
                <p style={{ fontSize: '12px', fontWeight: '700', color: '#a0aec0', marginBottom: '15px', letterSpacing: '1px' }}>TOTAL SALES</p>
                <p style={{ fontSize: '36px', fontWeight: '800', margin: 0 }}>0 <span style={{ fontSize: '16px', color: '#cbd5e0' }}>EGP</span></p>
              </div>
              <div style={styles.card}>
                <p style={{ fontSize: '12px', fontWeight: '700', color: '#a0aec0', marginBottom: '15px', letterSpacing: '1px' }}>PENDING ORDERS</p>
                <p style={{ fontSize: '36px', fontWeight: '800', margin: 0, color: '#f56565' }}>0</p>
              </div>
              <div style={styles.card}>
                <p style={{ fontSize: '12px', fontWeight: '700', color: '#a0aec0', marginBottom: '15px', letterSpacing: '1px' }}>ACTIVE PRODUCTS</p>
                <p style={{ fontSize: '36px', fontWeight: '800', margin: 0 }}>3</p>
              </div>
            </div>

            {/* Orders Tracking Box */}
            <div style={styles.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '800' }}>Recent Orders Feed</h4>
                <button style={{ background: 'none', border: 'none', color: '#4a5568', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>VIEW ALL →</button>
              </div>
              <div style={{ padding: '60px', textAlign: 'center', background: '#f7fafc', borderRadius: '15px', border: '2px dashed #edf2f7' }}>
                <p style={{ color: '#a0aec0', fontSize: '14px', fontWeight: '600' }}>No incoming requests from customers yet.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '30px' }}>Store Sections Management</h3>
            <div style={styles.grid}>
              {[
                { name: 'رجالي', en: 'MENS' },
                { name: 'حريمي', en: 'WOMENS' },
                { name: 'أطفالي', en: 'KIDS' }
              ].map(section => (
                <div key={section.en} style={styles.card}>
                  <div style={{ width: '100%', height: '220px', background: '#f1f5f9', borderRadius: '15px', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '40px' }}>📷</span>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8' }}>{section.name}</span>
                  </div>
                  <button style={{ width: '100%', padding: '16px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', transition: 'transform 0.2s' }}>
                    UPLOAD {section.en} IMAGE
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
