export default function Home() {
  return (
    <main className="h-screen w-full bg-[#f9f9f9] flex flex-col overflow-hidden font-sans">
      
      {/* الهيدر: الداشبورد واسم البراند */}
      <header className="p-4 flex justify-between items-center bg-white border-b border-gray-200">
        <button className="bg-white text-black border-2 border-black px-6 py-2 font-bold text-xs tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
          DASHBOARD
        </button>
        <h1 className="text-3xl font-black tracking-tighter uppercase">WEARIVO</h1>
      </header>

      {/* المحتوى الرئيسي: المربعات والشماعة */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-6 p-4">
        
        <div className="text-center">
          <h2 className="text-2xl font-light tracking-[0.4em] uppercase">Elegance & Luxury</h2>
          <p className="text-[8px] tracking-[0.3em] uppercase opacity-50 mt-1">Defining the art of modern sophistication</p>
        </div>

        {/* المربعات الثلاثة بنفس ستايل الصورة */}
        <div className="flex gap-4 w-full max-w-4xl justify-center">
          {['أطفالي', 'حريمي', 'رجالي'].map((cat, i) => (
            <div key={i} className="w-48 h-64 border-2 border-[#4b2c71] bg-white flex flex-col items-center justify-center group cursor-pointer hover:bg-[#4b2c71] transition-colors">
              <span className="text-[#4b2c71] font-bold text-lg group-hover:text-white">{cat}</span>
              <span className="text-[8px] tracking-widest uppercase opacity-40 group-hover:text-white">
                {i === 0 ? 'KIDS' : i === 1 ? 'WOMEN' : 'MEN'}
              </span>
            </div>
          ))}
        </div>

        {/* صورة الشماعة الاحترافية - متناسقة مع الخلفية */}
        <div className="w-full max-w-md h-40 relative">
          <img 
            src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=800" 
            alt="Hanger" 
            className="w-full h-full object-contain mix-blend-multiply opacity-80"
          />
        </div>
      </div>

      {/* الفوتر: تفاصيل المطور اللي طلبتها */}
      <footer className="p-6 text-center border-t border-gray-200 bg-white">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest">WEARIVO</p>
          <p className="text-[8px] tracking-widest opacity-60">PURE LUXURY • PURE MINIMALIST</p>
          <div className="py-2">
            <p className="text-[8px] uppercase opacity-40">Developed By</p>
            <p className="text-xs font-bold text-black">عيسى وحيد | ESSA WAHID</p>
            <a href="tel:01061445195" className="text-blue-600 text-[10px] font-mono">01061445195</a>
          </div>
          <p className="text-[8px] opacity-40 tracking-tighter">.WEARIVO. ALL RIGHTS RESERVED 2026 ©</p>
        </div>
      </footer>

    </main>
  );
}
