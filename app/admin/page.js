"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Icons = {
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Orders: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>,
  Style: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>,
  Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Logout: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
};

export default function WearivoUltimateDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [cafeColor, setCafeColor] = useState('#D2B48C');
  const router = useRouter();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    onAuthStateChanged(auth, (u) => u ? setUser(u) : router.push('/login'));
  }, [router]);

  if (!user) return null;

  const cardStyle = { backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eef2f6', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      
      {/* 1. Logout Confirm */}
      {showLogoutConfirm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', textAlign: 'center', width: '380px' }}>
            <div style={{ width: '60px', height: '60px', background: '#fff1f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><Icons.Logout /></div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Sign Out?</h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>Are you sure you want to exit, Essa?</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', fontWeight: '700' }}>Cancel</button>
              <button onClick={() => signOut(auth)} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', background: '#ef4444', color: '#fff', fontWeight: '700' }}>Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Sidebar (Left Side) */}
      <aside style={{ width: '280px', backgroundColor: '#1e293b', padding: '40px 24px', display: 'flex', flexDirection: 'column', color: '#fff', position: 'fixed', height: '100vh', left: 0 }}>
        <div style={{ fontSize: '28px', fontWeight: '900', color: cafeColor, letterSpacing: '-1.5px', marginBottom: '50px', textAlign: 'center' }}>WEARIVO</div>
        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[
              { id: 'dashboard', label: 'Dashboard', Icon: Icons.Dashboard },
              { id: 'orders', label: 'Live Orders', Icon: Icons.Orders },
              { id: 'style', label: 'Brand Style', Icon: Icons.Style }
            ].map((item) => (
              <li key={item.id} onClick={() => setActiveTab(item.id)} style={{ 
                padding: '16px 20px', borderRadius: '12px', marginBottom: '8px', cursor: 'pointer', 
                display: 'flex', alignItems: 'center', gap: '16px', 
                background: activeTab === item.id ? cafeColor : 'transparent', 
                color: activeTab === item.id ? '#1e293b' : '#94a3b8', 
                fontWeight: activeTab === item.id ? '700' : '500', transition: '0.3s' 
              }}>
                <item.Icon /> {item.label}
              </li>
            ))}
          </ul>
        </nav>
        <div onClick={() => setShowLogoutConfirm(true)} style={{ padding: '16px 20px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px', color: '#fca5a5', fontWeight: '700', borderTop: '1px solid #334155', paddingTop: '30px' }}>
          <Icons.Logout /> Logout
        </div>
      </aside>

      {/* 3. Content */}
      <main style={{ flex: 1, marginLeft: '280px', padding: '50px 60px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: 0 }}>WEARIVO CONSOLE</h1>
            <p style={{ fontSize: '13px', color: '#10b981', fontWeight: '700', marginTop: '4px' }}>● SYSTEM ONLINE</p>
          </div>
          <button onClick={() => setShowAddProduct(true)} style={{ background: '#000', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '14px', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}>
            <Icons.Plus /> ADD PRODUCT
          </button>
        </header>

        {activeTab === 'dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div style={cardStyle}>
              <p style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Transactions</p>
              <h2 style={{ fontSize: '36px', fontWeight: '800', margin: '15px 0' }}>$208,187</h2>
              <div style={{ height: '40px', background: 'linear-gradient(90deg, #d2b48c 20%, transparent 100%)', opacity: 0.2, borderRadius: '4px' }}></div>
            </div>
            <div style={cardStyle}>
              <p style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Project Rating</p>
              <h2 style={{ fontSize: '36px', fontWeight: '800', margin: '15px 0' }}>4.3 <span style={{ fontSize: '18px', color: '#fbbf24' }}>★★★★☆</span></h2>
              <p style={{ fontSize: '12px', color: '#64748b' }}>+2.5 this month</p>
            </div>
            <div style={cardStyle}>
              <p style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Total Products</p>
              <h2 style={{ fontSize: '36px', fontWeight: '800', margin: '15px 0' }}>3</h2>
              <p style={{ fontSize: '12px', color: '#12b76a' }}>Inventory Sync Active</p>
            </div>

            <div style={{ ...cardStyle, gridColumn: 'span 2' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px' }}>Recent Activity</h3>
              <div style={{ textAlign: 'center', padding: '60px 0', border: '1px dashed #e2e8f0', borderRadius: '12px', color: '#94a3b8' }}>
                Waiting for incoming data stream...
              </div>
            </div>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px' }}>Sales Analytics</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '100px' }}>
                <div style={{ flex: 1, height: '40%', background: cafeColor, borderRadius: '4px' }}></div>
                <div style={{ flex: 1, height: '80%', background: '#1e293b', borderRadius: '4px' }}></div>
                <div style={{ flex: 1, height: '50%', background: cafeColor, borderRadius: '4px' }}></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'style' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '24px' }}>Brand Color</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <input type="color" value={cafeColor} onChange={(e) => setCafeColor(e.target.value)} style={{ width: '60px', height: '60px', border: 'none', borderRadius: '12px' }} />
                <p style={{ fontSize: '15px', fontWeight: '700' }}>Primary: {cafeColor.toUpperCase()}</p>
              </div>
            </div>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '24px' }}>Global Style</h3>
              <select style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <option>Soft Beige Texture</option>
                <option>Minimalist White</option>
                <option>Dark Mode Slate</option>
              </select>
            </div>
          </div>
        )}

        {showAddProduct && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9998 }}>
            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '32px', width: '480px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '32px' }}>Add Product</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="text" placeholder="Title" style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <div style={{ display: 'flex', gap: '15px' }}>
                  <input type="number" placeholder="Price" style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                  <select style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <option>Mens Wear</option><option>Womens Wear</option><option>Kids Wear</option>
                  </select>
                </div>
                <textarea placeholder="Description" rows="3" style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', resize: 'none' }}></textarea>
                <input type="file" style={{ fontSize: '11px' }} />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                <button onClick={() => setShowAddProduct(false)} style={{ flex: 1, padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#fff', fontWeight: '700' }}>Cancel</button>
                <button style={{ flex: 1, padding: '16px', borderRadius: '16px', border: 'none', background: '#000', color: '#fff', fontWeight: '700' }}>Save</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
