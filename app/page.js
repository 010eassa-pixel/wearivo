export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#f4ece1] flex flex-col font-sans">
      
      {/* 1. الهيدر: ثابت وشيك */}
      <header className="p-4 flex justify-between items-center bg-white border-b border-black/10 sticky top-0 z-50">
        <h1 className="text-2xl font-black tracking-tighter uppercase">WEARIVO</h1>
        <button className="bg-white text-black border-2 border-black px-6 py-2 font-bold text-[10px] tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all">
          DASHBOARD
        </button>
      </header>

      {/* 2. المحتوى الرئيسي: تركيز كامل على المربعات */}
      <section className="flex-1 flex flex-col items-center py-10 px-4">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif italic text-[#3d2b1f]">Elegance & Luxury</h2>
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-50 mt-2 text-[#3d2b1f]">Defining the art of modern sophistication</p>
        </div>

        {/* المربعات: كبرناها هنا جداً عشان تبقى هي البطل */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4 z-10">
          {[
            { ar: 'أطفالي', en: 'KIDS' },
            { ar: 'حريمي', en: 'WOMEN' },
            { ar: 'رجالي', en: 'MEN' }
          ].map((cat, i) => (
            <div key={i} className="aspect-[3/4] border-2 border-[#4b2c71] bg-white flex flex-col items-center justify-center group cursor-pointer hover:bg-[#4b2c71] transition-all duration-500 shadow-2xl">
              <span className="text-[#4b2c71] font-bold text-4xl group-hover:text-white transition-colors">{cat.ar}</span>
              <span className="text-xs tracking-[0.3em] uppercase opacity-40 group-hover:text-white mt-4">{cat.en}</span>
            </div>
          ))}
        </div>

        {/* 3. صورة الشماعة: صغرناها جداً وبقت تحت المربعات */}
        <div className="w-full max-w-2xl h-48 mt-16 overflow-hidden rounded-lg border border-black/5 shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=1000" 
            alt="Collection" 
            className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </section>

      {/* 4. الفوتر: تفاصيلك اللي مابنساهاش */}
      <footer className="p-12 text-center bg-white border-t border-black/5 mt-10">
        <div className="space-y-4">
          <p className="text-lg font-black uppercase tracking-[0.4em]">WEARIVO</p>
          <div className="h-[1px] w-12 bg-[#4b2c71] mx-auto"></div>
          <p className="text-[10px] tracking-widest opacity-60">PURE LUXURY • PURE MINIMALIST</p>
          
          <div className="pt-6">
            <p className="text-[9px] uppercase opacity-40 mb-1">Developed By</p>
            <p className="text-base font-bold text-black">عيسى وحيد | ESSA WAHID</p>
            <a href="tel:01061445195" className="text-blue-600 text-sm font-mono mt-1 inline-block">01061445195</a>
          </div>
          
          <p className="text-[9px] opacity-30 mt-8 tracking-widest">.WEARIVO. ALL RIGHTS RESERVED 2026 ©</p>
        </div>
      </footer>

    </main>
  );
}
