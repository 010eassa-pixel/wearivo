"use client";
import { useState, useEffect } from 'react';
import { auth } from '../../firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // حالة لمعرفة مقاس الشاشة
  const router = useRouter();

  useEffect(() => {
    // كود لمعرفة لو المستخدم فاتح من موبايل
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // تحميل الخط الاحترافي
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("برجاء إدخال البريد والباسورد");
    
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      console.log("نجح الدخول:", userCredential.user);
      router.push('/admin'); 
    } catch (error) {
      console.error("Firebase Error:", error.code);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        alert("الإيميل أو الباسورد غلط");
      } else {
        alert("تأكد من تفعيل Email/Password في Firebase");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      zIndex: 9999, 
      backgroundColor: 'white', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontFamily: "'Inter', sans-serif",
      padding: '20px' // مسافة أمان للموبايل
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row', // قلب العناصر تحت بعض في الموبايل
        alignItems: 'center', 
        justifyContent: isMobile ? 'center' : 'space-between', 
        maxWidth: '1000px', 
        width: '100%', 
        gap: isMobile ? '30px' : '50px' 
      }}>
        
        {/* الرسمة التوضيحية - بتختفي في الموبايل الصغير جداً أو بتصغر */}
        {!isMobile && (
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '15px' }}>
            <div style={{ width: '40px', height: '60px', backgroundColor: '#60a5fa', borderRadius: '20px 20px 0 0' }}></div>
            <div style={{ width: '50px', height: '80px', backgroundColor: '#a855f7', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
            <div style={{ width: '30px', height: '45px', backgroundColor: '#4ade80', borderRadius: '5px 5px 0 0' }}></div>
          </div>
        )}

        {/* فورم Wearivo */}
        <div style={{ 
          flex: 1, 
          maxWidth: '400px', 
          width: '100%', 
          textAlign: 'center' 
        }} dir="rtl">
          <h1 style={{ 
            fontSize: isMobile ? '40px' : '50px', 
            fontWeight: '900', 
            color: '#1e293b', 
            margin: '0',
            letterSpacing: '-2px'
          }}>Wearivo</h1>
          <p style={{ color: '#94a3b8', marginBottom: '30px' }}>أناقتك تبدأ من هنا</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="email" 
              placeholder="البريد الإلكتروني" 
              required 
              style={{ 
                padding: '15px', 
                borderRadius: '8px', 
                border: '1px solid #f1f5f9', 
                backgroundColor: '#f8fafc',
                fontSize: '14px'
              }} 
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input 
              type="password" 
              placeholder="كلمة المرور" 
              required 
              style={{ 
                padding: '15px', 
                borderRadius: '8px', 
                border: '1px solid #f1f5f9', 
                backgroundColor: '#f8fafc',
                fontSize: '14px'
              }} 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button 
              type="submit" 
              disabled={loading} 
              style={{ 
                padding: '15px', 
                borderRadius: '8px', 
                backgroundColor: '#1e293b', // اللون الكحلي الغامق
                color: 'white', 
                fontWeight: 'bold', 
                border: 'none', 
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                transition: '0.3s'
              }}
            >
              {loading ? "جاري التحقق..." : "تسجيل الدخول"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
