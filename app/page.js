export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#f4ece1] flex flex-col font-sans text-[#3d2b1f]">
      
      {/* 1. الهيدر (نفس التنسيق بالظبط) */}
      <header className="p-6 flex justify-between items-center">
        <button className="border border-[#4b2c71] px-2 py-0.5 text-[8px] text-[#4b2c71] font-bold tracking-tighter hover:bg-[#4b2c71] hover:text-white transition-colors">
          DASHBOARD
        </button>
        <h1 className="text-3xl font-black tracking-tighter uppercase">WEARIVO</h1>
      </header>

      {/* 2. العنوان (نفس التنسيق بالظبط) */}
      <section className="text-center mt-10">
        <h2 className="text-2xl font-medium tracking-[0.3em] uppercase">Elegance & Luxury</h2>
        <p className="text-[8px] tracking-[0.4em] uppercase opacity-60 mt-2">Defining the art of modern sophistication</p>
      </section>

      {/* 3. المربعات بالصور الجديدة (بنفس المقاسات) */}
      <section className="max-w-6xl mx-auto w-full py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#4b2c71]">
          
          {/* قسم أطفالي - صورة الطفل */}
          <div className="aspect-square border-b md:border-b-0 md:border-r border-[#4b2c71] bg-white flex flex-col items-center justify-center relative group overflow-hidden">
            <img src="https://i.ibb.co/VYvYvYr/child.jpg" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-opacity duration-500" alt="Kids" />
            <div className="relative z-10 text-center bg-white/60 p-4 w-full">
              <span className="block text-[#4b2c71] font-bold text-xl mb-1">أطفالي</span>
              <span className="text-[8px] tracking-widest uppercase opacity-60">KIDS</span>
            </div>
          </div>

          {/* قسم حريمي - صورة البالطو */}
          <div className="aspect-square border-b md:border-b-0 md:border-r border-[#4b2c71] bg-white flex flex-col items-center justify-center relative group overflow-hidden">
            <img src="https://i.ibb.co/vYm6F6m/coat.jpg" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-opacity duration-500" alt="Women" />
            <div className="relative z-10 text-center bg-white/60 p-4 w-full">
              <span className="block text-[#4b2c71] font-bold text-xl mb-1">حريمي</span>
              <span className="text-[8px] tracking-widest uppercase opacity-60">WOMEN</span>
            </div>
          </div>

          {/* قسم رجالي - صورة البنطلون */}
          <div className="aspect-square bg-white flex flex-col items-center justify-center relative group overflow-hidden">
            <img src="https://i.ibb.co/C0L0K0x/pants.jpg" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-opacity duration-500" alt="Men" />
            <div className="relative z-10 text-center bg-white/60 p-4 w-full">
              <span className="block text-[#4b2c71] font-bold text-xl mb-1">رجالي</span>
              <span className="text-[8px] tracking-widest uppercase opacity-60">MEN</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. تفاصيل المطور والفوتر (نفس الصورة) */}
      <footer className="pb-12 text-center flex flex-col items-center space-y-6">
        <div className="text-center">
          <p className="text-sm font-bold tracking-[0.3em]">WEARIVO</p>
          <p className="text-[7px] tracking-[0.4em] opacity-60 mt-1 uppercase">Pure Luxury • Pure Minimalist</p>
        </div>

        <div className="space-y-1">
          <p className="text-[8px] opacity-40 uppercase">Developed By</p>
          <p className="text-xs font-bold uppercase">ESSA WAHID | عيسى وحيد</p>
        </div>

        <div className="text-center">
          <a href="tel:01061445195" className="text-blue-700 text-sm font-mono border-b border-blue-700/20">01061445195</a>
          <p className="text-[8px] opacity-40 mt-4 tracking-tighter uppercase">.WEARIVO. ALL RIGHTS RESERVED 2026 ©</p>
        </div>
      </footer>

    </main>
  );
}
