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
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin'); 
    } catch (error) {
      alert("تأكد من تفعيل الـ Authentication في Firebase أو صحة البيانات");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', direction: 'rtl' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: '1100px', width: '100%', gap: '100px' }}>
        
        {/* رسمة الأشخاص الثابتة */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '15px' }}>
          <div style={{ textAlign: 'center' }}><div style={{ width: '15px', height: '15px', backgroundColor: '#6b7280', borderRadius: '50%', margin: '0 auto' }}></div><div style={{ width: '35px', height: '60px', backgroundColor: '#60a5fa', borderRadius: '20px 20px 0 0' }}></div></div>
          <div style={{ textAlign: 'center' }}><div style={{ width: '18px', height: '18px', backgroundColor: '#f87171', borderRadius: '50%', margin: '0 auto' }}></div><div style={{ width: '50px', height: '80px', backgroundColor: '#a855f7', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div></div>
          <div style={{ textAlign: 'center' }}><div style={{ width: '12px', height: '12px', backgroundColor: '#facc15', borderRadius: '50%', margin: '0 auto' }}></div><div style={{ width: '30px', height: '45px', backgroundColor: '#4ade80', borderRadius: '5px 5px 0 0' }}></div></div>
        </div>

        {/* فورم الدخول */}
        <div style={{ width: '350px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '45px', fontWeight: '900', color: '#1e293b' }}>Wearivo</h1>
          <p style={{ color: '#94a3b8', marginBottom: '25px' }}>أناقتك تبدأ من هنا</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="email" placeholder="البريد الإلكتروني" required style={{ padding: '15px', borderRadius: '8px', border: '1px solid #eee', backgroundColor: '#f9fafb' }} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="كلمة المرور" required style={{ padding: '15px', borderRadius: '8px', border: '1px solid #eee', backgroundColor: '#f9fafb' }} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" disabled={loading} style={{ padding: '15px', borderRadius: '8px', backgroundColor: '#2d3e50', color: 'white', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? "جاري التحقق..." : "تسجيل الدخول"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
