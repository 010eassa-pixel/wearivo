export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#f4ece1] flex flex-col font-sans text-[#3d2b1f]">
      
      {/* 1. الهيدر العلوى */}
      <header className="p-6 flex justify-between items-center">
        <button className="border border-[#4b2c71] px-2 py-0.5 text-[10px] text-[#4b2c71] font-bold">
          DASHBOARD
        </button>
        <h1 className="text-3xl font-black tracking-tighter">WEARIVO</h1>
      </header>

      {/* 2. العنوان */}
      <section className="text-center mt-8">
        <h2 className="text-2xl font-medium tracking-[0.3em] uppercase">Elegance & Luxury</h2>
        <p className="text-[9px] tracking-[0.4em] uppercase opacity-60 mt-2">Defining the art of modern sophistication</p>
      </section>

      {/* 3. قسم المربعات (نفس الحجم والتنسيق اللي في الصورة بالظبط) */}
      <section className="flex justify-center w-full py-12 px-4">
        {/* الحاوية الرئيسية ببرواز واحد كما في الصورة */}
        <div className="flex flex-col md:flex-row border-2 border-[#4b2c71] bg-white">
          
          {/* مربع أطفالي - صورة image_ac0765.jpg */}
          <div className="w-[280px] h-[380px] border-b md:border-b-0 md:border-r-2 border-[#4b2c71] relative group">
            <img src="https://i.ibb.co/VYvYvYr/child.jpg" className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-100 transition-opacity duration-500" alt="Kids" />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
              <span className="text-[#4b2c71] font-bold text-2xl">أطفالي</span>
              <span className="text-[10px] tracking-widest mt-1 opacity-60">KIDS</span>
            </div>
          </div>

          {/* مربع حريمي - صورة image_ac613e.jpg */}
          <div className="w-[280px] h-[380px] border-b md:border-b-0 md:border-r-2 border-[#4b2c71] relative group">
            <img src="https://i.ibb.co/vYm6F6m/coat.jpg" className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-100 transition-opacity duration-500" alt="Women" />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
              <span className="text-[#4b2c71] font-bold text-2xl">حريمي</span>
              <span className="text-[10px] tracking-widest mt-1 opacity-60">WOMEN</span>
            </div>
          </div>

          {/* مربع رجالي - صورة image_ac64bc.png */}
          <div className="w-[280px] h-[380px] relative group">
            <img src="https://i.ibb.co/C0L0K0x/pants.jpg" className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-100 transition-opacity duration-500" alt="Men" />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
              <span className="text-[#4b2c71] font-bold text-2xl">رجالي</span>
              <span className="text-[10px] tracking-widest mt-1 opacity-60">MEN</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. الفوتر (بيانات عيسى وحيد) */}
      <footer className="mt-auto pb-10 text-center border-t border-[#3d2b1f]/10 pt-10">
        <div className="mb-6">
          <p className="font-bold tracking-[0.2em]">WEARIVO</p>
          <p className="text-[8px] opacity-50 uppercase">Pure Luxury • Pure Minimalist</p>
        </div>
        <div className="mb-4">
          <p className="text-[9px] opacity-40 uppercase mb-1">Developed By</p>
          <p className="font-bold text-sm">عيسى وحيد | ESSA WAHID</p>
        </div>
        <div className="flex flex-col items-center">
          <a href="tel:01061445195" className="text-blue-700 text-sm font-mono underline decoration-blue-200">01061445195</a>
          <p className="text-[8px] opacity-30 mt-4 tracking-tighter">.WEARIVO. ALL RIGHTS RESERVED 2026 ©</p>
        </div>
      </footer>

    </main>
  );
}
