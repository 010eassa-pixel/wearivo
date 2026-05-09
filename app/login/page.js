import Link from 'next/link'; // السطر ده مكانه الصح هنا فوق خالص

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4ece1] font-sans text-[#3d2b1f] selection:bg-[#3d2b1f] selection:text-[#f4ece1]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f4ece1]/80 backdrop-blur-md border-b border-[#3d2b1f]/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-black tracking-tighter cursor-pointer">WEARIVO</h1>
            <nav className="hidden md:flex items-center gap-6">
              {['COLLECTIONS', 'NEW ARRIVALS', 'ABOUT'].map((item) => (
                <a key={item} href="#" className="text-[10px] tracking-[0.2em] font-bold opacity-40 hover:opacity-100 transition-all uppercase">
                  {item}
                </a>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            {/* زرار الداشبورد المتعدل */}
            <Link href="/login">
              <button className="border border-[#3d2b1f]/20 px-3 py-1 text-[10px] font-bold opacity-60 hover:opacity-100 transition-all uppercase tracking-widest">
                DASHBOARD
              </button>
            </Link>
            <div className="w-8 h-8 rounded-full bg-[#3d2b1f] flex items-center justify-center text-[#f4ece1] cursor-pointer">
              <span className="text-[10px] font-bold">0</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        <section className="px-6 py-20 max-w-7xl mx-auto text-center">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            ELEVATE YOUR<br />STREET STYLE.
          </h2>
          <p className="max-w-md mx-auto text-sm opacity-60 leading-relaxed mb-10">
            Discover a curated collection of premium essentials designed for the modern individual. Quality, comfort, and timeless design in every stitch.
          </p>
          <button className="bg-[#3d2b1f] text-[#f4ece1] px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:scale-105 transition-transform">
            Shop Collection
          </button>
        </section>

        {/* Categories Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-1">
          {['MEN', 'WOMEN', 'KIDS'].map((cat) => (
            <div key={cat} className="relative aspect-[4/5] bg-[#3d2b1f]/5 overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <h3 className="text-white text-2xl font-black tracking-widest group-hover:scale-110 transition-transform">{cat}</h3>
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-[#3d2b1f]/5 text-center">
        <p className="text-[10px] tracking-widest opacity-40 uppercase">© 2026 WEARIVO. All rights reserved.</p>
      </footer>
    </div>
  );
}
