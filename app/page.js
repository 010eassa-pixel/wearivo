export default function Home() {
  return (
    <main className="min-h-screen bg-[#f2f2f2] flex flex-col font-sans overflow-x-hidden">
      
      {/* 1. الهيدر: اسم البراند وتفاصيلك */}
      <header className="p-6 flex justify-between items-center border-b-2 border-black bg-white sticky top-0 z-50">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">Wearivo</h1>
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase opacity-60">Developed by 010EASSA-PIXEL</p>
        </div>
        
        {/* زرار الداشبورد: كبير، واضح، واحترافي */}
        <button className="bg-[#d4ff00] text-black font-black py-3 px-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
          DASHBOARD
        </button>
      </header>

      {/* 2. المربعات: صور حقيقية ومقاسات مضبوطة */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full bg-white border-b-2 border-black">
        {/* مربع رجالي */}
        <div className="aspect-square border-r-2 border-black relative group overflow-hidden">
          <img src="https://images.unsplash.com/photo-1516257984877-a03a80476661?q=80&w=500" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
          <div className="absolute top-4 left-4 bg-black text-[#d4ff00] px-3 py-1 font-bold italic">MEN</div>
        </div>
        
        {/* مربع حريمي */}
        <div className="aspect-square border-r-2 border-black relative group overflow-hidden">
          <img src="https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=500" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
          <div className="absolute top-4 left-4 bg-black text-[#d4ff00] px-3 py-1 font-bold italic">WOMEN</div>
        </div>

        {/* مربع أطفالي */}
        <div className="aspect-square relative group overflow-hidden">
          <img src="https://images.unsplash.com/photo-1514090458221-65bb69af63e6?q=80&w=500" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
          <div className="absolute top-4 left-4 bg-black text-[#d4ff00] px-3 py-1 font-bold italic">KIDS</div>
        </div>
      </div>

      {/* 3. الصورة اللي عجبتك: متصغرة ومظبوطة في النص */}
      <div className="py-16 px-4 flex flex-col items-center justify-center bg-[#f2f2f2]">
        <div className="max-w-4xl w-full border-2 border-black p-2 bg-white shadow-xl">
           <img 
            src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000" 
            className="w-full h-[400px] object-cover" 
            alt="Wearivo Collection"
          />
        </div>
        
        <div className="mt-10 text-center">
          <h3 className="text-5xl font-black tracking-tighter italic uppercase mb-4">Elegance & Luxury</h3>
          <button className="bg-black text-[#d4ff00] font-black py-4 px-12 text-lg border-2 border-black hover:bg-[#d4ff00] hover:text-black transition-all">
            SHOP THE COLLECTION
          </button>
        </div>
      </div>

      {/* 4. الفوتر القديم الشيك */}
      <footer className="p-8 bg-black text-white flex justify-between items-end border-t-4 border-[#d4ff00]">
        <div>
          <p className="text-2xl font-black italic">WEARIVO</p>
          <p className="text-[10px] opacity-40 uppercase tracking-[0.3em]">Premium Fashion Brand 2026</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase opacity-40">Maintained by</p>
          <p className="text-[#d4ff00] font-bold text-lg">010EASSA-PIXEL</p>
        </div>
      </footer>

    </main>
  );
}
