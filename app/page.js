export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#FCFCFC] flex flex-col font-sans text-[#2D2D2D]">
      
      {/* 1. الهيدر العلوى (نفس ستايل خطوة) */}
      <header className="p-4 md:p-6 flex justify-between items-center bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <h1 className="text-2xl font-black tracking-tight uppercase">WEARIVO</h1>
        
        {/* زر الداشبورد الاحترافي بالإنجليزية */}
        <button className="group relative px-6 py-2 bg-black text-white text-[10px] font-bold tracking-[0.2em] transition-all hover:bg-zinc-800">
          <span className="relative z-10">DASHBOARD</span>
          <div className="absolute inset-0 translate-x-1 translate-y-1 border border-black group-hover:translate-x-0 group-hover:translate-y-0 transition-transform -z-10"></div>
        </button>
      </header>

      {/* 2. القسم الترحيبي (Hero Section) */}
      <section className="py-12 px-4 text-center bg-[#F8F8F8]">
        <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-3">Elegance & Luxury</h2>
        <div className="h-[1px] w-16 bg-[#2D2D2D] mx-auto mb-3 opacity-30"></div>
        <p className="text-[10px] tracking-[0.4em] uppercase opacity-60">Defining Modern Sophistication</p>
      </section>

      {/* 3. شبكة الكوليكشنات (بدل المنتجات) */}
      <section className="flex-1 max-w-7xl mx-auto w-full py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* كوليكشن رجالي */}
          <div className="group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden bg-[#F0F0F0] relative mb-4">
              <img src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Men" />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
            </div>
            <h3 className="text-center font-bold text-lg tracking-widest">رجالي / MEN</h3>
            <p className="text-center text-[9px] opacity-40 uppercase mt-1 tracking-widest">Explore Collection</p>
          </div>

          {/* كوليكشن حريمي */}
          <div className="group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden bg-[#F0F0F0] relative mb-4">
              <img src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Women" />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
            </div>
            <h3 className="text-center font-bold text-lg tracking-widest">حريمي / WOMEN</h3>
            <p className="text-center text-[9px] opacity-40 uppercase mt-1 tracking-widest">Explore Collection</p>
          </div>

          {/* كوليكشن أطفالي */}
          <div className="group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden bg-[#F0F0F0] relative mb-4">
              <img src="https://images.unsplash.com/photo-1519704943920-1844783b7511?q=80&w=600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Kids" />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
            </div>
            <h3 className="text-center font-bold text-lg tracking-widest">أطفالي / KIDS</h3>
            <p className="text-center text-[9px] opacity-40 uppercase mt-1 tracking-widest">Explore Collection</p>
          </div>

        </div>
      </section>

      {/* 4. الفوتر (تفاصيل المطور والبراند) */}
      <footer className="bg-white border-t border-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-xl font-black italic">WEARIVO</p>
            <p className="text-[9px] opacity-40 tracking-[0.3em] mt-1">PURE MINIMALIST FASHION</p>
          </div>
          
          <div className="text-center">
            <p className="text-[9px] uppercase opacity-40 mb-1">Developed By</p>
            <p className="text-sm font-bold text-black tracking-tight underline decoration-[#2D2D2D]/20">عيسى وحيد | ESSA WAHID</p>
            <a href="tel:01061445195" className="text-zinc-400 text-xs font-mono mt-1 block">01061445195</a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[9px] opacity-30 tracking-tighter">.WEARIVO. ALL RIGHTS RESERVED 2026 ©</p>
          </div>
        </div>
      </footer>

    </main>
  );
}
