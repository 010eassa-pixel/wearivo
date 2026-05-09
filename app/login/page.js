"use client";
import { useState, useEffect } from 'react';
import { auth } from '../../firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // الكود ده بيضمن إن الصفحة تبدأ من فوق خالص وتلغي أي تأثيرات خارجية
  useEffect(() => {
    document.body.style.backgroundColor = "white";
    return () => { document.body.style.backgroundColor = ""; };
  }, []);

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
    /* fixed و inset-0 عشان الصفحة تفرش على الشاشة كلها وتلغي الهيدر والفوتر بتوع الموقع */
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center font-sans p-4 overflow-y-auto">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl w-full gap-12 bg-white">
        
        {/* الجزء الأيسر: الرسوم التوضيحية (الأشخاص) */}
        <div className="hidden md:flex flex-1 justify-center items-end gap-4 border-b border-dashed border-gray-200 pb-10">
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 bg-gray-500 rounded-full mb-1"></div>
            <div className="w-10 h-16 bg-blue-400 rounded-t-full"></div>
            <div className="flex gap-1 mt-1">
               <div className="w-2 h-8 bg-gray-700"></div>
               <div className="w-2 h-8 bg-gray-700"></div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-5 h-5 bg-red-400 rounded-full mb-1"></div>
            <div className="w-14 h-20 bg-purple-500" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-yellow-400 rounded-full mb-1"></div>
            <div className="w-8 h-12 bg-green-500 rounded-t-md"></div>
            <div className="flex gap-1 mt-1">
               <div className="w-1.5 h-4 bg-gray-700"></div>
               <div className="w-1.5 h-4 bg-gray-700"></div>
            </div>
          </div>
        </div>

        {/* الجزء الأيمن: فورم الدخول */}
        <div className="flex-1 max-w-md w-full text-right" dir="rtl">
          <div className="mb-8">
            <h1 className="text-5xl font-black text-slate-800 mb-2 tracking-tighter">Wearivo</h1>
            <p className="text-gray-400 text-sm tracking-widest">أناقتك تبدأ من هنا</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="email" 
              placeholder="البريد الإلكتروني" 
              className="w-full bg-gray-50 p-5 rounded-lg border border-gray-100 focus:ring-2 focus:ring-slate-400 text-right outline-none text-black"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="كلمة المرور" 
              className="w-full bg-gray-50 p-5 rounded-lg border border-gray-100 focus:ring-2 focus:ring-slate-400 text-right outline-none text-black"
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <button 
              type="submit"
              className="w-full bg-[#2d3e50] text-white py-5 rounded-lg font-bold text-lg hover:bg-[#1a2531] transition-all shadow-lg shadow-blue-900/10"
            >
              تسجيل الدخول
            </button>

            <button 
              type="button"
              className="w-full bg-gray-100 text-slate-600 py-5 rounded-lg font-bold text-lg hover:bg-gray-200 transition-all"
            >
              إنشاء حساب جديد
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
