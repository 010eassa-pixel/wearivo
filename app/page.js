export default function Home() {
  return (
    <main className="min-h-screen bg-[#f2f2f2] flex flex-col font-sans">
      
      {/* الهيدر واسم البراند */}
      <header className="p-8 flex justify-between items-center border-b border-black">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase">Wearivo</h1>
        <div className="text-right">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">Elegance & Luxury</p>
          {/* كلمة داشبورد مكبرة وشكلها احترافي */}
          <h2 className="text-2xl font-black text-[#d4ff00] bg-black px-4 py-1 mt-2 inline-block skew-x-[-10deg]">
            DASHBOARD
          </h2>
        </div>
      </header>

      {/* شبكة المربعات الاحترافية - الملابس الحقيقية */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-black bg-white">
        <div className="aspect-[3/4] border-r border-black relative group overflow-hidden">
          <img src="https://images.unsplash.com/photo-1516257984877-a03a80476661?q=80&w=600" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
          <span className="absolute bottom-6 left-6 text-white font-bold text-xl tracking-widest bg-black px-3">MEN</span>
        </div>
        
        <div className="aspect-[3/4] border-r border-black relative group overflow-hidden">
          <img src="https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=600" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
          <span className="absolute bottom-6 left-6 text-white font-bold text-xl tracking-widest bg-black px-3">WOMEN</span>
        </div>

        <div className="aspect-[3/4] relative group overflow-hidden">
          <img src="https://images.unsplash.com/photo-1514090458221-65bb69af63e6?q=80&w=600" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
          <span className="absolute bottom-6 left-6 text-white font-bold text-xl tracking-widest bg-black px-3">KIDS</span>
        </div>
      </div>

      {/* خلفية كومة الملابس (نفس روح الصورة اللي بعتها) */}
      <div className="relative py-24 flex flex-col items-center justify-center overflow-hidden bg-[#e8e8e8]">
        {/* صورة الكومة كخلفية مندمجة */}
        <img 
          src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply" 
          alt="Pile of clothes"
        />
        
        <div className="relative z-10 text-center">
          <p className="text-[#d4ff00] font-black text-xs tracking-[0.5em] mb-4 bg-black px-2 py-1 inline-block">THE NEW COLLECTION</p>
          <h3 className="text-7xl font-black tracking-tighter mb-8 italic uppercase">This is Wearivo.</h3>
          <button className="bg-[#d4ff00] text-black font-black py-5 px-16 text-lg hover:bg-black hover:text-[#d4ff00] transition-all border-2 border-black">
            SHOP THE PILE
          </button>
        </div>
      </div>

      {/* تفاصيل المطور والبراند (القديمة) */}
      <footer className="p-10 bg-black text-white flex flex-col md:flex-row justify-between items-center border-t-4 border-[#d4ff00]">
        <div>
          <p className="text-xl font-bold">WEARIVO © 2026</p>
          <p className="text-[10px] opacity-50 uppercase tracking-widest">Premium Quality Clothing</p>
        </div>
        <div className="mt-6 md:mt-0 text-center md:text-right">
          <p className="text-xs font-mono">Developed by:</p>
          <p className="text-[#d4ff00] font-bold tracking-widest">010EASSA-PIXEL</p>
        </div>
      </footer>

    </main>
  );
}
