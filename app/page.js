export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#f4ece1] flex flex-col font-sans text-[#3d2b1f]">
      
      {/* 1. الهيدر */}
      <header className="p-8 flex justify-between items-center">
        <button className="border border-[#3d2b1f]/20 px-3 py-1 text-[10px] tracking-widest hover:bg-[#3d2b1f] hover:text-white transition-all">
          DASHBOARD
        </button>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic">WEARIVO</h1>
      </header>

      {/* 2. العنوان الرئيسي */}
      <section className="text-center mt-12 mb-16">
        <h2 className="text-3xl font-light tracking-[0.4em] uppercase">Elegance & Luxury</h2>
        <div className="w-20 h-[1px] bg-[#3d2b1f]/20 mx-auto mt-4"></div>
        <p className="text-[10px] tracking-[0.5em] uppercase opacity-50 mt-4">Defining the art of modern sophistication</p>
      </section>

      {/* 3. المربعات (بدون حواف ومتناسقة تماماً) */}
      <section className="max-w-7xl mx-auto w-full px-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* مربع أطفالي */}
          <div className="aspect-[3/4] relative group overflow-hidden bg-white/30 shadow-sm transition-transform hover:-translate-y-2">
            <img src="https://i.ibb.co/VYvYvYr/child.jpg" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Kids" />
            <div className="absolute inset-0 bg-[#f4ece1]/40 group-hover:bg-transparent transition-colors duration-500"></div>
            <div className="absolute bottom-6 left-0 right-0 text-center z-10">
              <span className="block font-bold text-xl tracking-widest text-[#3d2b1f]">أطفالي</span>
              <span className="text-[9px] tracking-[0.3em] uppercase opacity-60">KIDS COLLECTION</span>
            </div>
          </div>

          {/* مربع حريمي */}
          <div className="aspect-[3/4] relative group overflow-hidden bg-white/30 shadow-sm transition-transform hover:-translate-y-2">
            <img src="https://i.ibb.co/vYm6F6m/coat.jpg" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Women" />
            <div className="absolute inset-0 bg-[#f4ece1]/40 group-hover:bg-transparent transition-colors duration-500"></div>
            <div className="absolute bottom-6 left-0 right-0 text-center z-10">
              <span className="block font-bold text-xl tracking-widest text-[#3d2b1f]">حريمي</span>
              <span className="text-[9px] tracking-[0.3em] uppercase opacity-60">WOMEN COLLECTION</span>
            </div>
          </div>

          {/* مربع رجالي */}
          <div className="aspect-[3/4] relative group overflow-hidden bg-white/30 shadow-sm transition-transform hover:-translate-y-2">
            <img src="https://i.ibb.co/C0L0K0x/pants.jpg" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Men" />
            <div className="absolute inset-0 bg-[#f4ece1]/40 group-hover:bg-transparent transition-colors duration-500"></div>
            <div className="absolute bottom-6 left-0 right-0 text-center z-10">
              <span className="block font-bold text-xl tracking-widest text-[#3d2b1f]">رجالي</span>
              <span className="text-[9px] tracking-[0.3em] uppercase opacity-60">MEN COLLECTION</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. الفوتر */}
      <footer className="mt-auto py-12 text-center border-t border-[#3d2b1f]/5">
        <p className="text-[10px] tracking-[0.4em] font-bold opacity-80 mb-2">WEARIVO • ESSA WAHID</p>
        <p className="text-[8px] tracking-widest opacity-40 uppercase">Luxury Minimalist Aesthetic © 2026</p>
      </footer>

    </main>
  );
}
