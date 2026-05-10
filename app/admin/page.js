"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login'); 
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = () => {
    signOut(auth).then(() => router.push('/login'));
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center font-bold tracking-widest opacity-30">CHECKING ADMIN ACCESS...</div>;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#3d2b1f] font-sans">
      {/* Top Bar */}
      <nav className="bg-white border-b border-gray-100 p-6 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <h1 className="text-xl font-black tracking-tighter">WEARIVO ADMIN</h1>
        <button onClick={handleLogout} className="text-[10px] font-bold opacity-40 hover:opacity-100 transition-all uppercase tracking-[0.2em]">Logout</button>
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        <div className="mb-12">
          <h2 className="text-4xl font-black mb-2">Welcome, ESSA</h2>
          <p className="text-sm opacity-50 uppercase tracking-widest">Store Management Overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest block mb-4">Total Orders</span>
            <span className="text-5xl font-black">0</span>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest block mb-4">Live Products</span>
            <span className="text-5xl font-black">3</span>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest block mb-4">Server Status</span>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-widest">Firebase Connected</span>
            </div>
          </div>
        </div>

        {/* Action Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders Section */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm min-h-[400px]">
            <h3 className="text-lg font-black mb-8 border-b border-gray-50 pb-4">ORDERS REQUESTS</h3>
            <div className="flex flex-col items-center justify-center h-48 opacity-20">
               <span className="text-4xl mb-4">📦</span>
               <p className="text-xs font-bold uppercase tracking-widest text-center">No incoming orders yet.<br/>Customer codes will appear here.</p>
            </div>
          </div>

          {/* Product Management Section */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black mb-8 border-b border-gray-50 pb-4">PRODUCT MANAGEMENT</h3>
            <div className="space-y-4">
               {/* الزرار اللي هنبرمجه الجاي */}
               <button className="w-full bg-[#3d2b1f] text-white py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:scale-[1.02] transition-transform">
                  Upload New Product Image
               </button>
               <p className="text-[9px] text-center opacity-40 uppercase">Recommended size: 300x450px for Grid</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
