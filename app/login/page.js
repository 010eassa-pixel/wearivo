"use client";
import { useState } from 'react';
import { auth } from '../../firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin'); 
    } catch (error) {
      alert("بيانات الدخول غير صحيحة");
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'sans-serif', padding: '20px', overflowY: 'auto'
    }}>
      <div style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', maxWidth: '1000px', width: '100%', gap: '50px'
      }}>
        
        {/* الجزء الأيسر: الرسوم التوضيحية (الأشخاص) */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '15px', borderBottom: '1px dashed #eee', paddingBottom: '40px' }}>
          {/* شخص أزرق */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#6b7280', borderRadius: '50%', marginBottom: '4px' }}></div>
            <div style={{ width: '40px', height: '64px', backgroundColor: '#60a5fa', borderRadius: '40px 40px 0 0' }}></div>
            <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
               <div style={{ width: '8px', height: '32px', backgroundColor: '#374151' }}></div>
               <div style={{ width: '8px', height: '32px', backgroundColor: '#374151' }}></div>
            </div>
          </div>
          {/* شخص بنفسجي */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#f87171', borderRadius: '50%', marginBottom: '4px' }}></div>
            <div style={{ width: '56px', height: '80px', backgroundColor: '#a855f7', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
          </div>
          {/* شخص أخضر */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#facc15', borderRadius: '50%', marginBottom: '4px' }}></div>
            <div style={{ width: '32px', height: '48px', backgroundColor: '#4ade80', borderRadius: '8px 8px 0 0' }}></div>
            <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
               <div style={{ width: '6px', height: '16px', backgroundColor: '#374151' }}></div>
               <div style={{ width: '6px', height: '16px', backgroundColor: '#374151' }}></div>
            </div>
          </div>
        </div>

        {/* الجزء الأيمن: فورم الدخول */}
        <div style={{ flex: 1, maxWidth: '400px', width: '100%', textAlign: 'right' }} dir="rtl">
          <div style={{ marginBottom: '30px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#1e293b', margin: '0 0 8px 0' }}>Wearivo</h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>أناقتك تبدأ من هنا</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="email" 
              placeholder="البريد الإلكتروني" 
              style={{ width: '100%', backgroundColor: '#f8fafc', padding: '18px', borderRadius: '8px', border: '1px solid #f1f5f9', textAlign: 'right', outline: 'none' }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="كلمة المرور" 
              style={{ width: '100%', backgroundColor: '#f8fafc', padding: '18px', borderRadius: '8px', border: '1px solid #f1f5f9', textAlign: 'right', outline: 'none' }}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <button 
              type="submit"
              style={{ width: '100%', backgroundColor: '#2d3e50', color: 'white', padding: '18px', borderRadius: '8px', fontWeight: 'bold', fontSize: '18px', border: 'none', cursor: 'pointer' }}
            >
              تسجيل الدخول
            </button>

            <button 
              type="button"
              style={{ width: '100%', backgroundColor: '#f1f5f9', color: '#475569', padding: '18px', borderRadius: '8px', fontWeight: 'bold', fontSize: '18px', border: 'none', cursor: 'pointer' }}
            >
              إنشاء حساب جديد
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
