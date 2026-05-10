"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const Icons = {
  Home: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>,
  Products: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18M9 21V9"></path></svg>,
  Orders: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path></svg>,
  Logout: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"></path></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Camera: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
};

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'MENS', description: '' });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    onAuthStateChanged(auth, (u) => u ? setUser(u) : router.push('/login'));
    return () => window.removeEventListener('resize', handleResize);
  }, [router]);

  if (!user) return null;

  const cardStyle = { backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #f2f4f7', padding: '24px' };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh', backgroundColor: '#fcfdfe' }}>
      
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '24px', textAlign: 'center', width: '300px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Sign Out?</h3>
            <p style={{ fontSize: '12px', color: '#667085', marginBottom: '24px' }}>Are you sure you want to exit?</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #eee', background: 'none', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => signOut(auth)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#000', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9998 }}>
          <form style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '24px', width: '90%', maxWidth: '400px' }}>
            <h3 style={{ fontWeight: '800', marginBottom: '20px', letterSpacing: '-1px' }}>New Product</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="Product Name" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #eee' }} />
              <input type="number" placeholder="Price (EGP)" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #eee' }} />
              <select style={{ padding: '12px', borderRadius: '10px', border: '1px solid #eee' }}>
                <option value="MENS">Mens Section</option>
                <option value="WOMENS">Womens Section</option>
                <option value="KIDS">Kids Section</option>
              </select>
              <textarea placeholder="Description" rows="3" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #eee', resize: 'none' }}></textarea>
              <label style={{ fontSize: '11px', fontWeight: '600', color: '#666' }}>Product Image:</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} style={{ fontSize: '11px' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
              <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #eee', background: '#fff', fontWeight: '600' }}>Cancel</button>
              <button type="submit" style={{ flex: 1, padding: '12px', borderRadius: '12px', background: '#000', color: '#fff', border: 'none', fontWeight: '600' }}>Save</button>
            </div>
          </form>
        </div>
      )}

      {/* Sidebar */}
      <aside style={{ width: isMobile ? '100%' : '80px', height: isMobile ? 'auto' : '100vh', backgroundColor: '#fff', borderRight: '1px solid #f2f4f7', position: isMobile ? 'relative' : 'fixed', display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: 'center', justifyContent: 'space-between', padding: '24px 16px', boxSizing: 'border-box', zIndex: 1000 }}>
        <div style={{ width: '40px', height: '40px', background: '#000', borderRadius: '10px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '16px' }}>W</div>
        <nav style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '24px' }}>
          <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', color: activeTab === 'home' ? '#000' : '#d0d5dd', cursor: 'pointer' }}><Icons.Home /></button>
          <button onClick={() => setActiveTab('products')} style={{ background: 'none', border: 'none', color: activeTab === 'products' ? '#000' : '#d0d5dd', cursor: 'pointer' }}><Icons.Products /></button>
          <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', color: activeTab === 'orders' ? '#000' : '#d0d5dd', cursor: 'pointer' }}><Icons.Orders /></button>
        </nav>
        <button onClick={() => setShowLogoutConfirm(true)} style={{ background: '#f9fafb', border: 'none', width: '40px', height: '40px', borderRadius: '10px', color: '#98a2b3', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icons.Logout /></button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: isMobile ? '0' : '80px', padding: isMobile ? '32px 20px' : '64px 80px', boxSizing: 'border-box' }}>
        
        <div style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: '800', letterSpacing: '-2px', margin: 0 }}>WEARIVO CONSOLE</h2>
            <p style={{ fontSize: '11px', fontWeight: '600', color: '#12b76a', marginTop: '4px' }}>● SYSTEM LIVE</p>
          </div>
          {activeTab === 'products' && (
            <button onClick={() => setShowAddModal(true)} style={{ background: '#000', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <Icons.Plus /> ADD PRODUCT
            </button>
          )}
        </div>

        {activeTab === 'home' && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
            <div style={cardStyle}><p style={{ fontSize: '10px', fontWeight: '600', color: '#667085', letterSpacing: '0.5px' }}>TOTAL ITEMS</p><p style={{ fontSize: '32px', fontWeight: '800', margin: '8px 0 0' }}>3</p></div>
            <div style={cardStyle}><p style={{ fontSize: '10px', fontWeight: '600', color: '#667085', letterSpacing: '0.5px' }}>PENDING ORDERS</p><p style={{ fontSize: '32px', fontWeight: '800', margin: '8px 0 0', color: '#f04438' }}>0</p></div>
            <div style={cardStyle}><p style={{ fontSize: '10px', fontWeight: '600', color: '#667085', letterSpacing: '0.5px' }}>GROSS SALES</p><p style={{ fontSize: '32px', fontWeight: '800', margin: '8px 0 0' }}>0 <span style={{ fontSize: '14px', opacity: 0.3 }}>EGP</span></p></div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <input 
              type="text" 
              placeholder="Search inventory..." 
              style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid #f2f4f7', marginBottom: '32px', outline: 'none', fontSize: '14px' }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
              <div style={{ ...cardStyle, textAlign: 'center', padding: '60px 20px' }}>
                <p style={{ fontSize: '12px', color: '#98a2b3' }}>No items found matching your search</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f2f4f7', paddingBottom: '16px', marginBottom: '24px' }}>
              <h4 style={{ margin: 0, fontWeight: '800' }}>Recent Orders</h4>
              <span style={{ fontSize: '11px', color: '#667085' }}>Showing 0 of 0</span>
            </div>
            <div style={{ textAlign: 'center', padding: '100px 20px' }}>
              <p style={{ color: '#98a2b3', fontSize: '13px' }}>Your order queue is currently empty</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
