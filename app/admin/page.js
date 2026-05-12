"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function WearivoAdminConsole() {
  const [activeTab, setActiveTab] = useState('live');
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchCode, setSearchCode] = useState('');
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (u) => !u && router.push('/login'));
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'row-reverse', // السايد بار يمين زي الصورة
      minHeight: '100vh', 
      backgroundColor: '#05070a', // السيم الغامق جداً
      color: '#fff', 
      fontFamily: 'sans-serif',
      direction: 'rtl' 
    }}>
      
      {/* Sidebar - Right Side (image_81abc1.png) */}
      <aside style={{ 
        width: '280px', 
        backgroundColor: '#0a0d14', 
        borderLeft: '1px solid #1a1f2b', 
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '60px', textAlign: 'center' }}>Dashboard</h1>
        
        <nav style={{ flex: 1 }}>
          <div onClick={() => setActiveTab('live')} style={{ 
            padding: '15px 20px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px',
            backgroundColor: activeTab === 'live' ? '#141b2b' : 'transparent',
            color: activeTab === 'live' ? '#3b82f6' : '#5b6a82',
            fontWeight: '600', marginBottom: '10px'
          }}>
            <span>📊</span> Live Orders
          </div>
          
          <div onClick={() => setActiveTab('control')} style={{ 
            padding: '15px 20px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px',
            backgroundColor: activeTab === 'control' ? '#141b2b' : 'transparent',
            color: activeTab === 'control' ? '#3b82f6' : '#5b6a82',
            fontWeight: '600'
          }}>
            <span>⚙️</span> Control
          </div>
        </nav>

        <div onClick={() => signOut(auth)} style={{ color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold', padding: '20px', borderTop: '1px solid #1a1f2b' }}>
          تسجيل الخروج
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', textAlign: 'right' }}>
        
        {/* Header - Search & Notifications */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#141b2b', border: '1px solid #3b82f6' }}></div>
            <div style={{ background: '#0a0d14', padding: '10px', borderRadius: '12px', border: '1px solid #1a1f2b', cursor: 'pointer' }}>🔔</div>
          </div>

          <input 
            type="text" 
            placeholder="ابحث بالكود..." 
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            style={{ 
              width: '400px', padding: '12px 20px', borderRadius: '12px', border: '1px solid #1a1f2b', 
              backgroundColor: '#0a0d14', color: '#fff', outline: 'none' 
            }} 
          />
        </header>

        {activeTab === 'live' ? (
          <div>
            {/* الاحصائيات - مطابقة لـ image_81abc1.png */}
            <div style={{ display: 'flex', gap: '25px', marginBottom: '40px' }}>
              <div style={{ 
                backgroundColor: '#0a0d14', padding: '30px', borderRadius: '25px', border: '1px solid #1a1f2b', 
                flex: 1, position: 'relative'
              }}>
                <p style={{ color: '#5b6a82', fontSize: '14px' }}>Live Orders</p>
                <h2 style={{ fontSize: '48px', fontWeight: '900', margin: '15px 0' }}>23</h2>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#141b2b', borderRadius: '10px' }}>
                  <div style={{ width: '65%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '10px' }}></div>
                </div>
              </div>
              <div style={{ flex: 1 }}></div> {/* ترك مساحة كما في الصورة */}
            </div>

            {/* سلة المشتريات */}
            <h3 style={{ marginBottom: '20px' }}>أحدث الأوردرات</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {orders.filter(o => o.id.includes(searchCode)).map(order => (
                <div key={order.id} style={{ backgroundColor: '#0a0d14', padding: '20px', borderRadius: '15px', border: '1px solid #1a1f2b', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>#{order.id.slice(0,6)}</span>
                  <span>{order.customerName}</span>
                  <span style={{ fontWeight: 'bold' }}>{order.total} EGP</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* قسم الكنترول - Add Product */
          <div style={{ backgroundColor: '#0a0d14', padding: '50px', borderRadius: '25px', border: '1px solid #1a1f2b', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '30px' }}>لوحة التحكم بالمتجر</h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '18px 45px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px' }}
            >
              + إضافة منتج جديد لـ Wearivo
            </button>
          </div>
        )}

        {/* Modal الإضافة - ممنوع الكلام يتاكل */}
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: '#0a0d14', padding: '40px', borderRadius: '30px', width: '450px', border: '1px solid #1a1f2b', textAlign: 'right' }}>
              <h3 style={{ marginBottom: '30px' }}>تفاصيل المنتج</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input type="text" placeholder="اسم المنتج" style={{ padding: '15px', borderRadius: '10px', background: '#05070a', border: '1px solid #1a1f2b', color: '#fff' }} />
                <input type="number" placeholder="السعر" style={{ padding: '15px', borderRadius: '10px', background: '#05070a', border: '1px solid #1a1f2b', color: '#fff' }} />
                <div style={{ border: '2px dashed #1a1f2b', padding: '20px', borderRadius: '10px', color: '#5b6a82' }}>ارفع الصورة هنا</div>
              </div>
              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '15px', borderRadius: '12px', background: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d' }}>إلغاء</button>
                <button style={{ flex: 1, padding: '15px', borderRadius: '12px', background: '#3b82f6', color: '#fff', fontWeight: 'bold' }}>حفظ المنتج</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
