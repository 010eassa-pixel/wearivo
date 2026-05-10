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
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
};

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'MENS', description: '' });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    onAuthStateChanged(auth, (u) => u ? setUser(u) : router.push('/login'));
    return () => window.removeEventListener('resize', handleResize);
  }, [router]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    // هنا سيتم إضافة كود الرفع لـ Firebase Storage لاحقاً
    console.log("Product Data:", newProduct, "File:", imageFile);
    alert("جاهز للرفع.. تأكد من ربط Storage في الخطوة القادمة");
    setShowAddModal(false);
  };

  if (!user) return null;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh', backgroundColor: '#fcfdfe' }}>
      
      {/* Modal إضافة منتج */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <form onSubmit={handleAddProduct} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '24px', width: '90%', maxWidth: '400px' }}>
            <h3 style={{ fontWeight: '800', marginBottom: '20px' }}>إضافة منتج جديد</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="اسم المنتج" required style={{ padding: '12px', borderRadius: '10px', border: '1px solid #eee' }} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
              <input type="number" placeholder="السعر" required style={{ padding: '12px', borderRadius: '10px', border: '1px solid #eee' }} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
              <select style={{ padding: '12px', borderRadius: '10px', border: '1px solid #eee' }} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}>
                <option value="MENS">رجالي</option>
                <option value="WOMENS">حريمي</option>
                <option value="KIDS">أطفالي</option>
              </select>
              <textarea placeholder="الوصف" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #eee', resize: 'none' }} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}></textarea>
              
              {/* خيار رفع الصورة الحقيقي */}
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#666' }}>صورة المنتج:</label>
              <input type="file" accept="image/*" style={{ fontSize: '12px' }} onChange={(e) => setImageFile(e.target.files[0])} />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #eee', background: '#fff' }}>إلغاء</button>
              <button type="submit" style={{ flex: 1, padding: '12px', borderRadius: '12px', background: '#000', color: '#fff', border: 'none' }}>حفظ</button>
            </div>
          </form>
        </div>
      )}

      {/* Sidebar - ثابت بدون تغيير */}
      <aside style={{ width: isMobile ? '100%' : '80px', height: isMobile ? 'auto' : '100vh', backgroundColor: '#fff', borderRight: '1px solid #f2f4f7', position: isMobile ? 'relative' : 'fixed', display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: 'center', padding: '20px', boxSizing: 'border-box', zIndex: 1000 }}>
        <div style={{ width: '40px', height: '40px', background: '#000', borderRadius: '10px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', marginBottom: isMobile ? '0' : '40px' }}>W</div>
        <nav style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '25px' }}>
          <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', color: activeTab === 'home' ? '#000' : '#d0d5dd', cursor: 'pointer' }}><Icons.Home /></button>
          <button onClick={() => setActiveTab('products')} style={{ background: 'none', border: 'none', color: activeTab === 'products' ? '#000' : '#d0d5dd', cursor: 'pointer' }}><Icons.Products /></button>
          <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', color: activeTab === 'orders' ? '#000' : '#d0d5dd', cursor: 'pointer' }}><Icons.Orders /></button>
        </nav>
      </aside>

      {/* المحتوى الرئيسي - تم تعديل الـ Margin لمنع تآكل الكلام */}
      <main style={{ flex: 1, marginLeft: isMobile ? '0' : '100px', padding: '40px', boxSizing: 'border-box' }}>
        
        {activeTab === 'home' && <h2 style={{ fontWeight: '800' }}>لوحة التحكم - الرئيسية</h2>}

        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontWeight: '800', margin: 0 }}>إدارة المنتجات</h2>
              <button onClick={() => setShowAddModal(true)} style={{ background: '#000', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <Icons.Plus /> إضافة منتج
              </button>
            </div>

            <input 
              type="text" 
              placeholder="ابحث عن منتج بالاسم أو القسم..." 
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #f2f4f7', marginBottom: '30px', outline: 'none' }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
               {/* هنا ستظهر المنتجات لاحقاً */}
               <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', border: '1px solid #f2f4f7', textAlign: 'center' }}>
                  <p style={{ fontSize: '12px', color: '#999' }}>لا توجد منتجات حالياً. ابدأ بإضافة أول منتج.</p>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 style={{ fontWeight: '800' }}>إدارة الطلبات</h2>
            <p style={{ color: '#666' }}>لا توجد طلبات جديدة حالياً.</p>
          </div>
        )}
      </main>
    </div>
  );
}
