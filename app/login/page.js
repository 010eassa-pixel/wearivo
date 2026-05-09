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
    // الخلفية بيضاء تماماً عشان نفصل عن تصميم الموقع الأساسي
    <div className="min-h-screen bg-white flex items-center justify-center font-sans p-4 z-[9999] relative">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl w-full gap-12">
        
        {/* الجزء الأيسر: الرسوم التوضيحية للأشخاص */}
        <div className="hidden md:flex flex-1 justify-center items-end gap-4 border-b border-dashed border-gray-200 pb-10">
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 bg-gray-400 rounded-full mb-1"></div>
            <div className="w-10 h-16 bg-blue-300 rounded-t-full"></div>
            <div className="flex gap-1 mt-1">
               <div className="w-2 h-8 bg-gray-600"></div>
               <div className="w-2 h-8 bg-gray-600"></div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-5 h-5 bg-red-300 rounded-full mb-1"></div>
            <div className="w-14 h-20 bg-purple-400" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-yellow-300 rounded-full mb-1"></div>
            <div className="w-8 h-12 bg-green-400 rounded-t-md"></div>
            <div className="flex gap-1 mt-1">
               <div className="w-1.5 h-4 bg-gray-600"></div>
               <div className="w-1.5 h-4 bg-gray-600"></div>
            </div>
          </div>
        </div>

        {/* الجزء الأيمن: فورم الدخول */}
        <div className="flex-1 max-w-md w-full text-right" dir="rtl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Wearivo</h1>
            <p className="text-gray-400 text-sm">أناقتك تبدأ من هنا</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="email" 
              placeholder="البريد الإلكتروني" 
              className="w-full bg-gray-50 p-4 rounded-md border border-gray-200 focus:ring-2 focus:ring-slate-400 text-right outline-none text-black"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="كلمة المرور" 
              className="w-full bg-gray-50 p-4 rounded-md border border-gray-200 focus:ring-2 focus:ring-slate-400 text-right outline-none text-black"
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <button 
              type="submit"
              className="w-full bg-[#2d3e50] text-white py-4 rounded-md font-bold text-lg hover:bg-[#1a2531] transition-all"
            >
              تسجيل الدخول
            </button>

            <button 
              type="button"
              className="w-full bg-gray-100 text-slate-600 py-4 rounded-md font-bold text-lg hover:bg-gray-200 transition-all"
            >
              إنشاء حساب جديد
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
