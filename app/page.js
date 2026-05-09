export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#FCFCFC] flex flex-col font-sans text-[#2D2D2D] overflow-x-hidden">
      
      {/* 1. هيدر نحيف جداً */}
      <header className="py-3 px-6 flex justify-between items-center bg-white border-b border-gray-50 sticky top-0 z-50 shadow-sm">
        <h1 className="text-xl font-black tracking-tighter uppercase">WEARIVO</h1>
        
        {/* زر داشبورد صغير وشيك */}
        <button className="group relative px-4 py-1.5 bg-black text-white text-[9px] font-bold tracking-widest transition-all hover:bg-zinc-800">
          <span className="relative z-10">DASHBOARD</span>
          <div className="absolute inset-0 translate-x-1 translate-y-1 border border-black group-hover:translate-x-0 group-hover:translate-y-0 transition-transform -z-10"></div>
        </button>
      </header>

      {/* 2. قسم العناوين - مصغر */}
      <section className="py-8 text-center bg-[#FBFBFB]">
        <h2 className="text-2xl font-light tracking-[0.2em] uppercase text-[#333]">Elegance & Luxury</h2>
        <p className="text-[8px] tracking-[0.3em] uppercase opacity-40 mt-1">Modern Sophistication</p>
      </section>

      {/* 3. شبكة الكوليكشنات - صور مصغرة جداً ومنظمة */}
      <section className="max-w-4xl mx-auto w-full py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {[
            { title: 'MEN', ar: 'رجالي', img: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=400' },
            { title: 'WOMEN', ar: 'حريمي', img: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=400' },
            { title: 'KIDS', ar: 'أطفالي', img: 'https://images.unsplash.com/photo-1519704943920-1844783b7511?q=80&w=400' }
          ].map((item, index) => (
            <div key={index} className="group cursor-pointer flex flex-col items-center">
              {/* إطار الصورة المصغر */}
              <div className="w-full aspect-[4/5] overflow-hidden bg-gray-100 border border-gray-100 shadow-sm">
                <img 
                  src={item.img} 
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" 
                  alt={item.title} 
                />
              </div>
              <h3 className="mt-3 font-bold text-sm tracking-widest">{item.ar} / {item.title}</h3>
              <div className="h-[1px] w-0 group-hover:w-10 bg-black transition-all duration-300 mt-1 opacity-20"></div>
            </div>
          ))}

        </div>
      </section>

      {/* 4. فوتر صغير وراقي */}
      <footer className="mt-auto py-8 px-6 border-t border-gray-50 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-4">
          <div className="text-center">
            <p className="text-sm font-black tracking-widest">WEARIVO</p>
            <p className="text-[7px] opacity-40 tracking-[0.4em] uppercase">Pure Minimalist</p>
          </div>
          
          <div className="flex flex-col items-center py-2">
            <p className="text-[8px] uppercase opacity-30 mb-1">Developed By</p>
            <p className="text-xs font-bold text-black tracking-tight">عيسى وحيد | ESSA WAHID</p>
            <a href="tel:01061445195" className="text-zinc-400 text-[10px] font-mono mt-0.5">01061445195</a>
          </div>

          <p className="text-[7px] opacity-30 tracking-tighter">.WEARIVO. 2026 ©</p>
        </div>
      </footer>

    </main>
  );
}
