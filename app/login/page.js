"use client";
import { useState } from 'react';
import { auth } from '../../firebase'; // تأكد إن مسار ملف فيربيز صح
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
      // دي الفانكشن اللي بتكلم فيربيز وتتأكد من الحساب
      await signInWithEmailAndPassword(auth, email, password);
      // لو البيانات صح، هينقلك لصفحة اسمها admin (هنكريتها دلوقتي)
      router.push('/admin'); 
    } catch (error) {
      console.error(error);
      alert("خطأ: تأكد من الإيميل والباسورد أو فعل الخاصية في Firebase");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1000px', width: '100%', gap: '50px' }}>
        
        {/* الرسمة التوضيحية (الأشخاص) */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '15px' }}>
           {/* ... نفس كود الأشخاص اللي بعتهولك المرة اللي فاتت ... */}
        </div>

        {/* فورم الدخول */}
        <div style={{ flex: 1, maxWidth: '400px', width: '100%', textAlign: 'right' }} dir="rtl">
          <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#1e293b' }}>Wearivo</h1>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
            <input 
              type="email" 
              placeholder="البريد الإلكتروني" 
              required
              style={{ width: '100%', padding: '18px', borderRadius: '8px', border: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="كلمة المرور" 
              required
              style={{ width: '100%', padding: '18px', borderRadius: '8px', border: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="submit"
              disabled={loading}
              style={{ width: '100%', backgroundColor: '#2d3e50', color: 'white', padding: '18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {loading ? "جاري التحقق..." : "تسجيل الدخول"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
