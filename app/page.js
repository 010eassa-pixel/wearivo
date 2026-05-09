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

      {/* 3. قسم المربعات (الصور الجديدة وبنفس الحجم الطولي بدون حواف) */}
      <section className="flex justify-center w-full py-12">
        <div className="flex flex-col md:flex-row gap-0 shadow-2xl">
          
          {/* مربع أطفالي - صورة الطفل */}
          <div className="w-[300px] h-[450px] relative group overflow-hidden bg-[#e8dfd3]">
            <img 
              src="https://i.ibb.co/VYvYvYr/child.jpg" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 transition-all duration-500" 
              alt="Kids" 
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none bg-[#3d2b1f]/5 group-hover:bg-transparent transition-all">
              <span className="font-bold text-2xl tracking-widest text-[#3d2b1f] drop-shadow-sm">أطفالي</span>
              <span className="text-[10px] tracking-widest mt-1 opacity-70 font-medium">KIDS</span>
            </div>
          </div>

          {/* مربع حريمي - صورة البالطو */}
          <div className="w-[300px] h-[450px] relative group overflow-hidden bg-[#e8dfd3]">
            <img 
              src="https://i.ibb.co/vYm6F6m/coat.jpg" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 transition-all duration-500" 
              alt="Women" 
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none bg-[#3d2b1f]/5 group-hover:bg-transparent transition-all">
              <span className="font-bold text-2xl tracking-widest text-[#3d2b1f] drop-shadow-sm">حريمي</span>
              <span className="text-[10px] tracking-widest mt-1 opacity-70 font-medium">WOMEN</span>
            </div>
          </div>

          {/* مربع رجالي - صورة البنطلون */}
          <div className="w-[300px] h-[450px] relative group overflow-hidden bg-[#e8dfd3]">
            <img 
              src="https://i.ibb.co/C0L0K0x/pants.jpg" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 transition-all duration-500" 
              alt="Men" 
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none bg-[#3d2b1f]/5 group-hover:bg-transparent transition-all">
              <span className="font-bold text-2xl tracking-widest text-[#3d2b1f] drop-shadow-sm">رجالي</span>
              <span className="text-[10px] tracking-widest mt-1 opacity-70 font-medium">MEN</span>
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
