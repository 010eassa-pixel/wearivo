"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push('/login');
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [router]);

  if (!user) return <div className="h-screen flex items-center justify-center bg-white text-xs tracking-widest opacity-30">LOADING BOSTA INTERFACE...</div>;

  return (
    <div className="flex min-h-screen bg-[#F8F9FB] text-[#2B3445] font-sans overflow-hidden">
      
      {/* Sidebar - شريط بوسطا الجانبي المماثل للصورة */}
      <aside className="w-[70px] hover:w-[220px] bg-white border-r border-[#E3E9EF] flex flex-col fixed h-full z-50 transition-all duration-300 group overflow-hidden">
        <div className="p-4 mb-6 flex items-center gap-3">
          <div className="min-w-[40px] h-[40px] bg-[#E31E24] rounded-lg flex items-center justify-center shadow-md shadow-red-200">
             <span className="text-white font-bold text-xl">B</span>
          </div>
          <span className="font-bold text-[#E31E24] opacity-0 group-hover:opacity-100 transition-opacity">Fulfillment</span>
        </div>

        <nav className="flex-1 flex flex-col gap-1 px-2">
          {[
            { id: 'home', icon: '🏠', label: 'Home' },
            { id: 'orders', icon: '📦', label: 'Orders' },
            { id: 'products', icon: '👕', label: 'Products' },
            { id: 'inventory', icon: '📊', label: 'Inventory' },
            { id: 'settings', icon: '⚙️', label: 'Settings' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-[#F3F5F9] text-[#E31E24]' : 'hover:bg-[#F3F5F9] text-[#7D879C]'}`}
            >
              <span className="text-xl min-w-[30px] flex justify-center">{item.icon}</span>
              <span className="text-[14px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </nav>

        <button onClick={() => signOut(auth)} className="p-4 text-[#7D879C] hover:text-[#E31E24] transition-colors flex items-center gap-4">
           <span className="text-xl min-w-[30px] flex justify-center">🚪</span>
           <span className="text-[14px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">Logout</span>
        </button>
      </aside>

      {/* Main Content - نفس توزيع كروت بوسطا */}
      <main className="flex-1 ml-[70px] p-8 overflow-y-auto">
        
        {/* Header - Welcome User */}
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-[#E3E9EF]">
          <div>
            <h2 className="text-2xl font-bold text-[#2B3445]">Welcome Back, {user.email.split('@')[0]}</h2>
            <p className="text-[#7D879C] text-sm">Have a quick look on what's happening</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="bg-[#F3F5F9] p-2 px-4 rounded-full text-xs font-bold text-[#7D879C]">New Cairo Hub</div>
             <div className="w-10 h-10 bg-[#E3E9EF] rounded-full border-2 border-white shadow-sm overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Essa+Wahed&background=random" alt="user" />
             </div>
          </div>
        </header>

        {activeTab === 'home' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats Grid - نفس اللي في صورتك بالظبط */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Card 1: Pending Tasks */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E3E9EF]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-[#2B3445]">Pending Tasks</h3>
                  <button className="text-lg">🔄</button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                   <div><p className="text-3xl font-bold text-[#E31E24]">265</p><p className="text-[10px] text-[#7D879C] uppercase font-bold mt-1">Manifest</p></div>
                   <div><p className="text-3xl font-bold text-[#4E97FD]">0</p><p className="text-[10px] text-[#7D879C] uppercase font-bold mt-1">Manual</p></div>
                   <div><p className="text-3xl font-bold text-[#2B3445]">34</p><p className="text-[10px] text-[#7D879C] uppercase font-bold mt-1">Unassigned</p></div>
                </div>
              </div>

              {/* Card 2: Return Orders */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E3E9EF]">
                 <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-[#2B3445]">Return Orders</h3>
                  <button className="text-lg">🔄</button>
                </div>
                <div className="flex justify-around items-center h-full pb-8">
                   <div className="text-center"><p className="text-3xl font-bold text-[#4E97FD]">0</p><p className="text-[10px] text-[#7D879C] font-bold">Pending Creation</p></div>
                   <div className="text-center"><p className="text-3xl font-bold text-[#E31E24]">514</p><p className="text-[10px] text-[#7D879C] font-bold">Unprocessed</p></div>
                </div>
              </div>

              {/* Card 3: Manifest */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E3E9EF]">
                 <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-[#2B3445]">Manifest</h3>
                  <button className="text-lg">🔄</button>
                </div>
                <div className="flex justify-around items-center h-full pb-8">
                   <div className="text-center"><p className="text-3xl font-bold text-[#4E97FD]">0</p><p className="text-[10px] text-[#7D879C] font-bold">Ready</p></div>
                   <div className="text-center"><p className="text-3xl font-bold text-[#2B3445]">0</p><p className="text-[10px] text-[#7D879C] font-bold">Draft</p></div>
                </div>
              </div>
            </div>

            {/* Sales Orders Table Style */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E3E9EF]">
               <h3 className="font-bold mb-6">Live Sales Orders</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                  {[
                    { n: '948', t: 'Picked' }, { n: '7', t: 'Picking' }, { n: '0', t: 'Consolidation' }, { n: '401', t: 'Packed' },
                    { n: '273', t: 'Packing' }, { n: '2', t: 'Shipment' }, { n: '265', t: 'Ready' }, { n: '8436', t: 'Shipped' }
                  ].map((s, i) => (
                    <div key={i} className="bg-[#F3F5F9] p-4 rounded-xl text-center">
                       <p className="text-xl font-bold text-[#2B3445]">{s.n}</p>
                       <p className="text-[10px] text-[#7D879C] font-bold uppercase">{s.t}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-bold mb-6">Product Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Men', 'Women', 'Kids'].map((cat) => (
                <div key={cat} className="bg-white p-6 rounded-2xl border border-[#E3E9EF] shadow-sm hover:border-[#E31E24] transition-all group">
                   <div className="aspect-[4/5] bg-[#F3F5F9] rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                      <span className="text-[#7D879C] opacity-20 text-4xl">📸</span>
                   </div>
                   <h4 className="font-bold mb-4">{cat} Section</h4>
                   <button className="w-full bg-[#2B3445] group-hover:bg-[#E31E24] text-white py-3 rounded-xl font-bold text-xs transition-colors uppercase tracking-widest">
                      Upload New Item
                   </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
