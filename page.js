import Link from 'next/link';

export default function Home() {
  const mainCategories = [
    { id: 1, ar: 'رجالي', en: 'MEN', slug: 'men' },
    { id: 2, ar: 'حريمي', en: 'WOMEN', slug: 'women' },
    { id: 3, ar: 'أطفالي', en: 'KIDS', slug: 'kids' },
  ];

  return (
    <main className="bg-white min-h-screen text-right font-sans selection:bg-black selection:text-white" dir="rtl">
      
      {/* Navbar - شريط التنقل */}
      <nav className="flex justify-between items-center py-6 px-10 border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <h1 className="text-2xl font-black tracking-[0.2em] text-black uppercase">WEARIVO</h1>
        
        <div className="flex items-center gap-8">
          {/* زر DASHBOARD المستطيل الصغير */}
          <Link href="/dashboard" className="border-2 border-black bg-black text-white px-5 py-2 text-[9px] font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300">
            DASHBOARD
          </Link>
        </div>
      </nav>

      {/* Hero Section - جملة الأناقة والفخامة */}
      <header className="text-center py-20 px-4">
        <h2 className="text-4xl md:text-6xl font-black text-black mb-4 tracking-tighter uppercase leading-none">
          Elegance & Luxury
        </h2>
        <p className="text-gray-500 text-[10px] md:text-xs tracking-[0.4em] uppercase font-light">
          Defining the Art of Modern Sophistication
        </p>
      </header>

    {/* container المربعات - مضبوط عشان يلمهم في النص */}
<section className="flex justify-center items-center pb-32 px-6">
  <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 max-w-4xl w-full">
    {mainCategories.map((item) => (
      <Link href={`/category/${item.slug}`} key={item.id} className="w-full md:w-1/3 max-w-[250px] group">
        {/* المربع الصغير بحافة تقيلة */}
        <div className="aspect-square bg-white border-[3px] border-black flex flex-col items-center justify-center transition-all duration-500 group-hover:bg-black relative overflow-hidden shadow-sm">
          
          <span className="text-black text-5xl font-black opacity-5 group-hover:text-white group-hover:opacity-10 transition-all duration-700">W</span>
          
          {/* نصوص القسم */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
             <h3 className="text-lg font-black text-black group-hover:text-white transition-colors duration-500 uppercase tracking-tighter leading-none">{item.ar}</h3>
             <p className="text-[7px] font-bold text-gray-400 group-hover:text-gray-300 tracking-[0.2em] mt-1 uppercase">{item.en}</p>
          </div>
          
        </div>
      </Link>
    ))}
  </div>
</section>

      {/* Footer - الفوتر الاحترافي باسمك */}
      <footer className="bg-black text-white py-16 px-10 border-t border-gray-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-right">
            <h4 className="text-2xl font-black tracking-widest mb-2">WEARIVO</h4>
            <p className="text-gray-500 text-[10px] tracking-widest uppercase">Pure Luxury • Pure Minimalist</p>
          </div>
          
          <div className="text-center md:text-left">
            <p className="text-[10px] text-gray-500 tracking-widest mb-2 uppercase">Developed By</p>
            <h5 className="text-lg font-bold text-white mb-1">عيسى وحيد | ESSA WAHID</h5>
            <a href="tel:01061445195" className="text-xl font-black tracking-[0.1em] hover:text-gray-300 transition block">01061445195</a>
          </div>
        </div>
        <div className="mt-16 text-center text-[9px] text-gray-700 tracking-[0.4em] uppercase">
          © 2026 WEARIVO. All Rights Reserved.
        </div>
      </footer>
    </main>
  );
}