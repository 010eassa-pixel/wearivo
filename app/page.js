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
      <section className="text-center mt-10">
        <h2 className="text-2xl font-light tracking-[0.4em] uppercase">Elegance & Luxury</h2>
        <p className="text-[9px] tracking-[0.4em] uppercase opacity-50 mt-2">Defining the art of modern sophistication</p>
      </section>

      {/* 3. المربعات - نفس ترتيب الصورة مع مسافة بسيطة وخط تقيل */}
      <section className="flex flex-col items-center w-full py-12 px-4 space-y-4"> 
        {/* space-y-4 بتعمل المسافة الصغيرة اللي أنت عايزها بين كل مربع والتاني */}
          
          {/* مربع أطفالي */}
          <div className="w-[300px] h-[450px] relative group overflow-hidden bg-white">
            <img 
              src="/child.jpg" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt="Kids" 
            />
            <div className="absolute top-4 right-4 flex flex-col items-end z-10 text-right">
              <span className="font-black text-xl tracking-tighter text-[#3d2b1f] drop-shadow-sm">أطفالي</span>
              <span className="text-[10px] font-black tracking-widest text-[#3d2b1f] opacity-80">KIDS</span>
            </div>
          </div>

          {/* مربع حريمي */}
          <div className="w-[300px] h-[450px] relative group overflow-hidden bg-white">
            <img 
              src="/coat.jpg" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt="Women" 
            />
            <div className="absolute top-4 right-4 flex flex-col items-end z-10 text-right">
              <span className="font-black text-xl tracking-tighter text-[#3d2b1f] drop-shadow-sm">حريمي</span>
              <span className="text-[10px] font-black tracking-widest text-[#3d2b1f] opacity-80">WOMEN</span>
            </div>
          </div>

          {/* مربع رجالي */}
          <div className="w-[300px] h-[450px] relative group overflow-hidden bg-white">
            <img 
              src="/pants.jpg" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt="Men" 
            />
            <div className="absolute top-4 right-4 flex flex-col items-end z-10 text-right">
              <span className="font-black text-xl tracking-tighter text-[#3d2b1f] drop-shadow-sm">رجالي</span>
              <span className="text-[10px] font-black tracking-widest text-[#3d2b1f] opacity-80">MEN</span>
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
