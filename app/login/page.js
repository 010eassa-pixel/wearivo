"use client";
import { useState } from 'react';
import { auth } from '../../firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("برجاء إدخال البريد والباسورد");
    
    setLoading(true);
    try {
      // التأكد من أن الإيميل ممسوح منه أي مسافات زائدة
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
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1000px', width: '100%', gap: '50px', padding: '20px' }}>
        
        {/* الرسمة التوضيحية */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '15px' }} className="hidden md:flex">
          <div style={{ width: '40px', height: '60px', backgroundColor: '#60a5fa', borderRadius: '20px 20px 0 0' }}></div>
          <div style={{ width: '50px', height: '80px', backgroundColor: '#a855f7', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
          <div style={{ width: '30px', height: '45px', backgroundColor: '#4ade80', borderRadius: '5px 5px 0 0' }}></div>
        </div>

        {/* الفورم */}
        <div style={{ flex: 1, maxWidth: '400px', width: '100%', textAlign: 'center' }} dir="rtl">
          <h1 style={{ fontSize: '50px', fontWeight: '900', color: '#1e293b', margin: '0' }}>Wearivo</h1>
          <p style={{ color: '#94a3b8', marginBottom: '30px' }}>أناقتك تبدأ من هنا</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="email" 
              placeholder="البريد الإلكتروني" 
              required 
              style={{ padding: '15px', borderRadius: '8px', border: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }} 
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input 
              type="password" 
              placeholder="كلمة المرور" 
              required 
              style={{ padding: '15px', borderRadius: '8px', border: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }} 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button 
              type="submit" 
              disabled={loading} 
              style={{ padding: '15px', borderRadius: '8px', backgroundColor: '#2d3e50', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
            >
              {loading ? "جاري التحقق..." : "تسجيل الدخول"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
