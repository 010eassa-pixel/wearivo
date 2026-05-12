"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

// أيقونات احترافية متناسقة مع سيم image_822095.png
const Icons = {
  Live: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><path d="M3 3v18h18"/><path d="M18 9l-5 5-2-2-4 4"/></svg>,
  Control: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1V15a2 2 0 0 1-2-2 2 2 0 0 1 2-2v-.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2v.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Bell: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Logout: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
};

export default function WearivoFixedDashboard() {
  const [activeTab, setActiveTab] = useState('live');
  const [orders, setOrders] = useState([]);
  const [searchCode, setSearchCode] = useState('');
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (u) => !u && router.push('/login'));
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, [router]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0b0e14', color: '#fff' }}>
      
      {/* Sidebar - النسخة الأصلية */}
      <aside style={{ width: '250px', backgroundColor: '#11151c', borderRight: '1px solid #1e2530', display: 'flex', flexDirection: 'column', padding: '30px 20px', position: 'fixed', height: '100vh' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#3b82f6', marginBottom: '50px' }}>Dashboard</h2>
        
        <nav style={{ flex: 1 }}>
          <div onClick={() => setActiveTab('live')} style={{ padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', backgroundColor: activeTab === 'live' ? '#1c222d' : 'transparent', color: activeTab === 'live' ? '#3b82f6' : '#64748b', fontWeight: '700' }}>
            <Icons.Live /> Live Orders
          </div>
          <div onClick={() => setActiveTab('control')} style={{ padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', marginTop: '10px', backgroundColor: activeTab === 'control' ? '#1c222d' : 'transparent', color: activeTab === 'control' ? '#3b82f6' : '#64748b', fontWeight: '700' }}>
            <Icons.Control /> Control
          </div>
        </nav>

        {/* زرار اللوج اوت - واضح جداً وتحت خالص */}
        <div onClick={() => signOut(auth)} style={{ padding: '20px 10px', borderTop: '1px solid #1e2530', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', color: '#ef4444', fontWeight: '900', fontSize: '16px' }}>
          <Icons.Logout /> Logout Account
        </div>
      </aside>

      {/* المحتوى الرئيسي */}
      <main style={{ flex: 1, marginLeft: '250px', padding: '40px' }}>
        
        {/* الهيدر - التنبيهات واضحة هنا */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <input 
            type="text" 
            placeholder="Search by Order Code..." 
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            style={{ width: '400px', padding: '14px 20px', borderRadius: '12px', backgroundColor: '#11151c', border: '1px solid #1e2530', color: '#fff', outline: 'none' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
            {/* زرار التنبيه (Bell) */}
            <div style={{ cursor: 'pointer', position: 'relative', backgroundColor: '#11151c', padding: '10px', borderRadius: '12px', border: '1px solid #1e2530' }}>
               <Icons.Bell />
               <span style={{ position: 'absolute', top: '8px', right: '8px', width: '10px', height: '10px', backgroundColor: '#3b82f6', borderRadius: '50%', border: '2px solid #11151c' }}></span>
            </div>
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#1c222d', border: '1px solid #3b82f6' }}></div>
          </div>
        </header>

        {activeTab === 'live' && (
          <section>
            {/* الإحصائيات - طبق الأصل */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '40px' }}>
              <div style={{ backgroundColor: '#11151c', padding: '30px', borderRadius: '25px', border: '1px solid #1e2530' }}>
                <p style={{ color: '#64748b' }}>Total Revenue</p>
                <h2 style={{ fontSize: '34px', fontWeight: '900', margin: '10px 0' }}>$8,450</h2>
                <span style={{ color: '#ef4444' }}>▼ 15%</span>
              </div>
              <div style={{ backgroundColor: '#11151c', padding: '30px', borderRadius: '25px', border: '1px solid #1e2530' }}>
                <p style={{ color: '#64748b' }}>Live Orders</p>
                <h2 style={{ fontSize: '34px', fontWeight: '900', margin: '10px 0' }}>23</h2>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#1c222d', borderRadius: '10px', marginTop: '15px' }}>
                    <div style={{ width: '72%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '10px' }}></div>
                </div>
              </div>
            </div>

            {/* سلة المشتريات / الأوردرات */}
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px' }}>Orders Stream</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {orders.filter(o => o.id.includes(searchCode)).map((order) => (
                <div key={order.id} style={{ backgroundColor: '#11151c', padding: '20px 30px', borderRadius: '20px', border: '1px solid #1e2530', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '900', color: '#3b82f6' }}>CODE: {order.id.slice(0,8)}</span>
                  <span style={{ color: '#fff' }}>{order.customerName}</span>
                  <span style={{ fontWeight: 'bold' }}>${order.total}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
