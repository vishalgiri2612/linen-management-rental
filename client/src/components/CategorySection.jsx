import { useNavigate } from 'react-router-dom';
import {
  Bed,
  Wind,
  Sparkles,
  Box,
  Sofa,
  Layers,
  ArrowRight
} from 'lucide-react';

const categories = [
  { name: 'Single Bedsheets', route: '/browse?search=single', icon: Bed, count: 'Ready to Rent', span: 'md:col-span-2 md:row-span-2', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800' },
  { name: 'Double Bedsheets', route: '/browse?search=double', icon: Bed, count: 'Premium Fleet', span: 'md:col-span-2 md:row-span-1', img: '/items/double_bed.png' },
  { name: 'Pillow Covers', route: '/browse?category=Pillow Covers', icon: Layers, count: 'Set Collection', span: 'md:col-span-1 md:row-span-2', img: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&q=80&w=800' },
  { name: 'Sofa Throws', route: '/browse?category=Sofa Covers', icon: Wind, count: 'Designer Textures', span: 'md:col-span-1 md:row-span-2', img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800' },
  { name: 'Sofa Covers', route: '/browse?category=Sofa Covers', icon: Sofa, count: 'Custom Fit', span: 'md:col-span-2 md:row-span-1', img: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800' },
  { name: 'Bedding Sets', route: '/browse?category=Bedding', icon: Sparkles, count: 'Full Set Collection', span: 'md:col-span-4 md:row-span-1', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200' },
];

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-8 pb-8 bg-slate-50/50 dark:bg-[#0F172A] text-slate-900 dark:text-white transition-colors duration-700 relative overflow-hidden">

      {/* Decorative Glow */}
      {/* Glow removed as per request */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 gap-8">
          <div className="space-y-4">
            <span className="text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-[0.6em]">Curated Essentials</span>
            <h2 className="text-5xl md:text-7xl font-black italic text-slate-900 dark:text-white tracking-tighter leading-none uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
              The <br /> <span className="italic font-normal lowercase tracking-tight" style={{ fontFamily: "'Playfair Display', serif", textTransform: 'none' }}>Collection.</span>
            </h2>
          </div>
          <p className="max-w-sm text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed italic">
            Five-star comfort, tailored for your space. Experience premium linen rentals that fit your aesthetic—and your budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[240px]">
          {categories.map((cat, idx) => (
            <button
              key={cat.name}
              disabled={cat.comingSoon}
              onClick={() => navigate(cat.route)}
              className={`group relative overflow-hidden rounded-[3rem] transition-all duration-700 ${!cat.comingSoon ? 'hover:shadow-3xl hover:-translate-y-4' : 'cursor-default'} ${cat.span} bg-transparent border-none shadow-none`}
            >
              <div className="relative w-full h-full overflow-hidden rounded-[3rem]">
                <img
                  src={cat.img}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${!cat.comingSoon ? 'grayscale group-hover:grayscale-0 group-hover:scale-110' : 'opacity-20 grayscale'} opacity-80`}
                  alt={cat.name}
                />
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-opacity duration-700" />

                <div className="absolute bottom-6 left-6 text-left pr-4">
                  <h3 className="text-3xl font-black text-white tracking-tight drop-shadow-2xl uppercase italic leading-none">{cat.name}</h3>
                  <div className="flex items-center gap-3 mt-3">
                    <div className={`w-8 h-0.5 ${cat.comingSoon ? 'bg-slate-700' : 'bg-emerald-500'} rounded-full`} />
                    <p className={`text-[9px] font-black ${cat.comingSoon ? 'text-slate-500' : 'text-emerald-300'} uppercase tracking-widest leading-none`}>{cat.count}</p>
                  </div>
                </div>

                {/* Floating Icon/Badge */}
                {cat.comingSoon ? (
                  <div className="absolute top-6 right-6 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <p className="text-[7px] font-black text-white uppercase tracking-widest">Live Soon</p>
                  </div>
                ) : (
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-xl rounded-[1rem] flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-700 border border-white/30">
                    <cat.icon className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/browse')}
            className="inline-flex items-center gap-8 px-16 py-6 border-2 border-slate-200 dark:border-white/10 rounded-full font-black uppercase text-[10px] tracking-[0.4em] hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all group shadow-xl"
          >
            Browse Full Collection
            <ArrowRight className="group-hover:translate-x-4 transition-transform" />
          </button>
        </div>
      </div>

      {/* Scrolling Text Ticker */}
      <div className="mt-12 relative w-full overflow-hidden whitespace-nowrap border-y border-slate-100 dark:border-white/5 py-6 flex items-center">
        <div className="flex animate-scroll-left hover:pause select-none">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-4xl md:text-5xl font-black text-black dark:text-white uppercase tracking-[0.2em] italic px-12" style={{ fontFamily: "'Playfair Display', serif" }}>
              Thank you for visiting us <span className="text-emerald-600 mx-6">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
