"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'products'
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push('/login');
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [router]);

  if (!user) return <div className="h-screen flex items-center justify-center bg-white text-[10px] tracking-[0.3em] opacity-30">LOADING SYSTEM...</div>;

  return (
    <div className="flex min-h-screen bg-[#fcfcfc] text-[#1a1a1a] font-sans">
      
      {/* Sidebar - شريط الجنب الاحترافي */}
      <aside className="w-64 bg-white border-r border-[#eeeeee] flex flex-col fixed h-full z-50">
        <div className="p-8 border-b border-[#eeeeee] mb-4">
          <h1 className="text-[14px] font-black tracking-widest uppercase italic">Wearivo</h1>
          <p className="text-[8px] opacity-30 font-bold tracking-[0.2em] mt-1">CONTROL CENTER</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-bold transition-all ${activeTab === 'orders' ? 'bg-[#1a1a1a] text-white shadow-lg shadow-black/10' : 'text-[#888] hover:bg-[#f9f9f9]'}`}
          >
            <span>📦</span> LIVE ORDERS
          </button>
          
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-bold transition-all ${activeTab === 'products' ? 'bg-[#1a1a1a] text-white shadow-lg shadow-black/10' : 'text-[#888] hover:bg-[#f9f9f9]'}`}
          >
            <span>✨</span> PRODUCT MANAGEMENT
          </button>
        </nav>

        <div className="p-6 border-t border-[#eeeeee]">
          <button onClick={() => signOut(auth)} className="w-full text-[10px] font-bold opacity-40 hover:opacity-100 hover:text-red-600 transition-all uppercase tracking-widest">
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-12">
        
        {activeTab === 'orders' ? (
          <section className="animate-in fade-in duration-500">
            <header className="mb-10">
              <h2 className="text-3xl font-bold tracking-tight mb-2">Live Orders</h2>
              <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em]">Customer Request Stream</p>
            </header>

            <div className="bg-white border border-[#eeeeee] rounded-2xl p-20 text-center shadow-sm">
              <div className="w-16 h-16 bg-[#f9f9f9] rounded-full flex items-center justify-center mx-auto mb-6">
                 <span className="opacity-20 text-xl">💤</span>
              </div>
              <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">All orders are processed. Standing by.</p>
            </div>
          </section>
        ) : (
          <section className="animate-in fade-in duration-500">
            <header className="mb-10">
              <h2 className="text-3xl font-bold tracking-tight mb-2">Products</h2>
              <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em]">Manage Sections & Inventory</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['MENS SECTION', 'WOMENS SECTION', 'KIDS SECTION'].map((section) => (
                <div key={section} className="bg-white border border-[#eeeeee] p-8 rounded-2xl hover:border-[#1a1a1a] transition-all group shadow-sm">
                  <h3 className="text-[11px] font-black tracking-widest mb-6 opacity-40 group-hover:opacity-100">{section}</h3>
                  <div className="aspect-[3/4] bg-[#f9f9f9] rounded-xl mb-6 flex items-center justify-center border border-dashed border-[#ddd]">
                    <span className="text-[10px] font-bold opacity-20 uppercase">No Image Active</span>
                  </div>
                  <button className="w-full bg-[#f9f9f9] group-hover:bg-[#1a1a1a] group-hover:text-white py-4 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all">
                    Update Image
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 p-8 bg-[#1a1a1a] text-white rounded-2xl flex justify-between items-center">
              <div>
                <h4 className="text-sm font-bold mb-1">Global Site Control</h4>
                <p className="text-[10px] opacity-50">Change site-wide colors, banners, and announcements.</p>
              </div>
              <button className="bg-white text-black px-6 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest">Open Global Settings</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
