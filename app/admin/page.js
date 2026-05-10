"use client";
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push('/login');
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [router]);

  if (!user) return <div className="h-screen flex items-center justify-center bg-white text-[10px] tracking-[0.3em] opacity-30">AUTHENTICATING...</div>;

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#1a1a1a] font-sans selection:bg-[#1a1a1a] selection:text-white">
      
      {/* Sidebar / Header Combo */}
      <nav className="bg-white border-b border-[#eeeeee] px-8 py-5 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
             <span className="text-white text-[10px] font-bold">W</span>
          </div>
          <h1 className="text-[13px] font-black tracking-widest uppercase">Wearivo Console</h1>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest hidden md:block">System Online</span>
          <button onClick={() => signOut(auth)} className="text-[10px] font-bold hover:line-through transition-all uppercase tracking-widest">Logout</button>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto p-8">
        
        {/* Welcome Area */}
        <header className="mb-12">
          <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em] mb-2">Internal Management</p>
          <h2 className="text-4xl font-light tracking-tight">Welcome back, <span className="font-bold">Essa</span></h2>
        </header>

        {/* Bosta Style Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Pending Orders', val: '0', color: '#1a1a1a' },
            { label: 'Out for Delivery', val: '0', color: '#1a1a1a' },
            { label: 'Inventory Items', val: '3', color: '#1a1a1a' },
            { label: 'Success Rate', val: '100%', color: '#00c853' }
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-[#eeeeee] p-6 rounded-xl hover:border-[#1a1a1a] transition-colors group">
              <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest mb-4 group-hover:opacity-100 transition-opacity">{stat.label}</p>
              <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.val}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Order Feed (Amazon Style Table) */}
          <div className="lg:col-span-2 bg-white border border-[#eeeeee] rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-[#eeeeee] flex justify-between items-center">
               <h3 className="text-[11px] font-bold uppercase tracking-widest">Incoming Requests</h3>
               <div className="flex gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-[9px] font-bold opacity-40 uppercase tracking-widest">Live Updates</span>
               </div>
            </div>
            <div className="h-[400px] flex flex-col items-center justify-center text-center p-12">
               <div className="w-16 h-16 bg-[#f9f9f9] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
               </div>
               <p className="text-[10px] font-bold opacity-20 uppercase tracking-[0.2em]">Queue is currently empty</p>
            </div>
          </div>

          {/* Quick Actions (The Upload Center) */}
          <div className="space-y-6">
            <div className="bg-[#1a1a1a] text-white p-8 rounded-2xl shadow-xl shadow-black/10">
              <h3 className="text-[11px] font-bold uppercase tracking-widest mb-6 opacity-60">Store Inventory</h3>
              <p className="text-xl font-light mb-8 leading-relaxed">Update your <span className="font-bold italic underline">Wearivo</span> storefront with new arrivals.</p>
              
              <button className="w-full bg-white text-[#1a1a1a] py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#f0f0f0] transition-colors">
                Upload New Image
              </button>
              <p className="text-[8px] opacity-40 text-center mt-4 tracking-widest">ASPECT RATIO 4:5 RECOMMENDED</p>
            </div>

            <div className="bg-white border border-[#eeeeee] p-8 rounded-2xl">
              <h3 className="text-[11px] font-bold uppercase tracking-widest mb-4">System Alerts</h3>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-[10px] text-blue-600 font-medium leading-relaxed">
                  Your Firebase database is connected. All orders are encrypted and secure.
                </p>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer Branding */}
      <footer className="p-12 text-center opacity-20">
        <p className="text-[9px] font-bold tracking-[0.5em] uppercase">WEARIVO INTERNAL OS v1.0</p>
      </footer>

    </div>
  );
}
