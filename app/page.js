export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#f4ece1] flex flex-col font-sans text-[#3d2b1f]">
      
      {/* 1. الهيدر */}
      <header className="p-6 flex justify-between items-center w-full">
        <h1 className="text-3xl font-black tracking-tighter">WEARIVO</h1>
        <button className="border border-[#3d2b1f]/20 px-2 py-0.5 text-[10px] opacity-60">
          DASHBOARD
        </button>
      </header>

      {/* 2. العنوان الرئيسي */}
      <section className="text-center mt-10 px-4">
        <h2 className="text-2xl font-light tracking-[0.4em] uppercase">Elegance & Luxury</h2>
        <p className="text-[9px] tracking-[0.4em] uppercase opacity-50 mt-2">Defining the art of modern sophistication</p>
      </section>

      {/* 3. قسم المربعات - مع إجبار المسافة وتقل الخط */}
      <section className="flex justify-center w-full py-16 px-4">
        {/* space-y للموبايل و md:space-x للشاشة الكبيرة بتضمن المسافة اللي طلبتها */}
        <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-12 items-center justify-center">
          
          {/* مربع أطفالي */}
          <div className="w-[300px] h-[450px] relative group overflow-hidden bg-white shadow-2xl">
            <img 
              src="/child.jpg" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt="Kids" 
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/20">
              <span className="font-black text-3xl tracking-widest text-white drop-shadow-2xl">أطفالي</span>
              <span className="text-sm font-bold tracking-[0.3em] mt-2 text-white uppercase">KIDS</span>
            </div>
          </div>

          {/* مربع حريمي */}
          <div className="w-[300px] h-[450px] relative group overflow-hidden bg-white shadow-2xl">
            <img 
              src="/coat.jpg" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt="Women" 
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/20">
              <span className="font-black text-3xl tracking-widest text-white drop-shadow-2xl">حريمي</span>
              <span className="text-sm font-bold tracking-[0.3em] mt-2 text-white uppercase">WOMEN</span>
            </div>
          </div>

          {/* مربع رجالي */}
          <div className="w-[300px] h-[450px] relative group overflow-hidden bg-white shadow-2xl">
            <img 
              src="/pants.jpg" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt="Men" 
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/20">
              <span className="font-black text-3xl tracking-widest text-white drop-shadow-2xl">رجالي</span>
              <span className="text-sm font-bold tracking-[0.3em] mt-2 text-white uppercase">MEN</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. الفوتر */}
      <footer className="mt-auto pb-10 text-center">
        <p className="font-bold tracking-[0.2em] text-sm opacity-80">WEARIVO</p>
        <p className="text-[8px] opacity-40 uppercase mt-1">Developed By ESSA WAHID</p>
      </footer>

    </main>
  );
}
