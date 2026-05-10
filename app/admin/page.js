"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase'; // تأكد إن الـ db متصدر من ملف الفايربيز
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const Icons = {
  Home: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>,
  Products: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18M9 21V9"></path></svg>,
  Orders: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
};

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // بيانات المنتج الجديد
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'MENS', description: '', imageUrl: '' });

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

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), newProduct);
      alert("Product added successfully!");
      setShowAddModal(false);
      setNewProduct({ name: '', price: '', category: 'MENS', description: '', imageUrl: '' });
    } catch (error) {
      alert("Error adding product: " + error.message);
    }
  };

  if (!user) return null;

  const cardStyle = { backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #f2f4f7', padding: '24px' };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh', backgroundColor: '#fcfdfe' }}>
      
      {/* Add Product Modal - نافذة إضافة منتج */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <form onSubmit={handleAddProduct} style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '32px', width: '90%', maxWidth: '450px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '24px', letterSpacing: '-1px' }}>Add New Product</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" placeholder="Product Name" required style={{ padding: '14px', borderRadius: '12px', border: '1px solid #eee', outline: 'none' }} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
              <input type="number" placeholder="Price (EGP)" required style={{ padding: '14px', borderRadius: '12px', border: '1px solid #eee', outline: 'none' }} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
              <select style={{ padding: '14px', borderRadius: '12px', border: '1px solid #eee' }} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}>
                <option value="MENS">Mens Section</option>
                <option value="WOMENS">Womens Section</option>
                <option value="KIDS">Kids Section</option>
              </select>
              <textarea placeholder="Description" rows="3" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #eee', outline: 'none', resize: 'none' }} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}></textarea>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
              <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '14px', borderRadius: '14px', border: '1px solid #eee', background: '#fff', fontWeight: '600' }}>Cancel</button>
              <button type="submit" style={{ flex: 1, padding: '14px', borderRadius: '14px', border: 'none', background: '#000', color: '#fff', fontWeight: '600' }}>Save Product</button>
            </div>
          </form>
        </div>
      )}

      {/* Sidebar */}
      <aside style={{ width: isMobile ? '100%' : '100px', height: isMobile ? 'auto' : '100vh', backgroundColor: '#fff', borderRight: '1px solid #f2f4f7', position: isMobile ? 'relative' : 'fixed', display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: 'center', justifyContent: 'space-between', padding: '30px 20px', zIndex: 1000 }}>
        <div style={{ width: '42px', height: '42px', background: '#000', borderRadius: '12px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900' }}>W</div>
        <nav style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '30px' }}>
          <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', color: activeTab === 'home' ? '#000' : '#d0d5dd', cursor: 'pointer' }}><Icons.Home /></button>
          <button onClick={() => setActiveTab('products')} style={{ background: 'none', border: 'none', color: activeTab === 'products' ? '#000' : '#d0d5dd', cursor: 'pointer' }}><Icons.Products /></button>
          <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', color: activeTab === 'orders' ? '#000' : '#d0d5dd', cursor: 'pointer' }}><Icons.Orders /></button>
        </nav>
        <button style={{ background: '#f9fafb', border: '1px solid #eee', width: '40px', height: '40px', borderRadius: '10px', cursor: 'pointer' }} onClick={() => signOut(auth)}>🚪</button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: isMobile ? '0' : '100px', padding: isMobile ? '40px 20px' : '60px 80px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '-1.5px' }}>WEARIVO CONSOLE</h2>
          <button onClick={() => setShowAddModal(true)} style={{ background: '#000', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '14px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <Icons.Plus /> ADD PRODUCT
          </button>
        </div>

        {activeTab === 'products' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            {/* Search Bar */}
            <div style={{ position: 'relative', marginBottom: '40px' }}>
              <span style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }}><Icons.Search /></span>
              <input 
                type="text" 
                placeholder="Search products by name or category..." 
                style={{ width: '100%', padding: '18px 18px 18px 50px', borderRadius: '18px', border: '1px solid #f2f4f7', outline: 'none', fontSize: '14px', backgroundColor: '#fff' }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '30px' }}>Live Inventory</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '20px' }}>
              {/* هنا سيتم عرض المنتجات من الفايربيز لاحقاً */}
              <div style={cardStyle}>
                 <p style={{ fontSize: '12px', color: '#667085' }}>No products found matching "{searchTerm}"</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'home' && (
           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
             <div style={cardStyle}><p style={{ fontSize: '11px', fontWeight: '600', color: '#667085' }}>TOTAL PRODUCTS</p><p style={{ fontSize: '32px', fontWeight: '900' }}>3</p></div>
             <div style={cardStyle}><p style={{ fontSize: '11px', fontWeight: '600', color: '#667085' }}>MENS ITEMS</p><p style={{ fontSize: '32px', fontWeight: '900' }}>1</p></div>
             <div style={cardStyle}><p style={{ fontSize: '11px', fontWeight: '600', color: '#667085' }}>WOMENS ITEMS</p><p style={{ fontSize: '32px', fontWeight: '900' }}>1</p></div>
           </div>
        )}

      </main>
    </div>
  );
}
