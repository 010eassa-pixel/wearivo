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

      {/* 3. المربعات - مع إجبار المسافة والخط */}
      <section className="flex flex-col items-center w-full py-12 px-4">
        {/* الحاوية دي فيها margin-bottom عشان نضمن الفراغ بين كل صورة والتانية */}
        
        {/* مربع أطفالي */}
        <div className="w-[300px] h-[450px] relative overflow-hidden bg-white mb-[20px]"> 
          <img 
            src="/child.jpg" 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Kids" 
          />
          <div className="absolute top-4 right-4 flex flex-col items-end z-10 text-right">
            <span className="text-xl text-[#3d2b1f]" style={{ fontWeight: '900' }}>أطفالي</span>
            <span className="text-[10px] text-[#3d2b1f]" style={{ fontWeight: '900', letterSpacing: '0.2em' }}>KIDS</span>
          </div>
        </div>

        {/* مربع حريمي */}
        <div className="w-[300px] h-[450px] relative overflow-hidden bg-white mb-[20px]">
          <img 
            src="/coat.jpg" 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Women" 
          />
          <div className="absolute top-4 right-4 flex flex-col items-end z-10 text-right">
            <span className="text-xl text-[#3d2b1f]" style={{ fontWeight: '900' }}>حريمي</span>
            <span className="text-[10px] text-[#3d2b1f]" style={{ fontWeight: '900', letterSpacing: '0.2em' }}>WOMEN</span>
          </div>
        </div>

        {/* مربع رجالي */}
        <div className="w-[300px] h-[450px] relative overflow-hidden bg-white mb-[20px]">
          <img 
            src="/pants.jpg" 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Men" 
          />
          <div className="absolute top-4 right-4 flex flex-col items-end z-10 text-right">
            <span className="text-xl text-[#3d2b1f]" style={{ fontWeight: '900' }}>رجالي</span>
            <span className="text-[10px] text-[#3d2b1f]" style={{ fontWeight: '900', letterSpacing: '0.2em' }}>MEN</span>
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
