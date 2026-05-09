export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#f4ece1] flex flex-col font-sans overflow-x-hidden">
      
      {/* الهيدر: اسم البراند وزر الداشبورد */}
      <header className="p-5 flex justify-between items-center bg-white/80 backdrop-blur-sm border-b border-black/5 sticky top-0 z-50">
        <h1 className="text-3xl font-black tracking-tighter uppercase">WEARIVO</h1>
        <button className="bg-white text-black border-2 border-black px-8 py-2 font-bold text-[10px] tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase">
          DASHBOARD
        </button>
      </header>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 flex flex-col items-center py-12 px-4 space-y-10">
        
        {/* العناوين */}
        <div className="text-center">
          <h2 className="text-4xl font-serif italic tracking-wide text-[#3d2b1f]">Elegance & Luxury</h2>
          <p className="text-[9px] tracking-[0.4em] uppercase opacity-60 mt-2 text-[#3d2b1f]">Defining the art of modern sophistication</p>
        </div>

        {/* المربعات: مكبرة وشكلها احترافي */}
        <div className="flex flex-wrap gap-6 w-full max-w-5xl justify-center">
          {['أطفالي', 'حريمي', 'رجالي'].map((cat, i) => (
            <div key={i} className="w-64 h-80 border-2 border-[#4b2c71] bg-white flex flex-col items-center justify-center group cursor-pointer hover:bg-[#4b2c71] transition-all duration-500 shadow-lg">
              <span className="text-[#4b2c71] font-bold text-2xl group-hover:text-white transition-colors">{cat}</span>
              <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 group-hover:text-white mt-2">
                {i === 0 ? 'KIDS' : i === 1 ? 'WOMEN' : 'MEN'}
              </span>
            </div>
          ))}
        </div>

        {/* صورة الشماعة: مصغرة ومنسقة */}
        <div className="w-full max-w-lg h-48 mt-8 border-t border-black/10 pt-8">
          <img 
            src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=800" 
            alt="Hanger" 
            className="w-full h-full object-contain mix-blend-multiply opacity-70"
          />
        </div>
      </div>

      {/* الفوتر: يظهر بسكرول خفيف تحت */}
      <footer className="p-10 text-center bg-white border-t border-[#3d2b1f]/10 mt-10">
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-sm font-black uppercase tracking-[0.5em]">WEARIVO</p>
          <div className="h-[1px] w-20 bg-black mx-auto opacity-20"></div>
          <p className="text-[10px] tracking-widest opacity-60 uppercase">Pure Luxury • Pure Minimalist</p>
          
          <div className="py-4">
            <p className="text-[9px] uppercase opacity-40 mb-1">Developed By</p>
            <p className="text-sm font-bold text-black tracking-tight">عيسى وحيد | ESSA WAHID</p>
            <a href="tel:01061445195" className="text-blue-700 text-xs font-mono block mt-1 hover:underline">01061445195</a>
          </div>
          
          <p className="text-[9px] opacity-40 tracking-tighter">.WEARIVO. ALL RIGHTS RESERVED 2026 ©</p>
        </div>
      </footer>

    </main>
  );
}
