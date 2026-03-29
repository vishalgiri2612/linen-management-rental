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
  { name: 'Pillow Covers', route: '/browse?category=Pillow Covers', icon: Layers, count: 'Set Collection', span: 'md:col-span-1 md:row-span-2', img: 'https://images.unsplash.com/photo-1595026021616-563d08596644?w=800' },
  { name: 'Sofa Throws', route: '/browse?category=Sofa Covers', icon: Wind, count: 'Designer Textures', span: 'md:col-span-1 md:row-span-2', img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800' },
  { name: 'Sofa Covers', route: '/browse?category=Sofa Covers', icon: Sofa, count: 'Custom Fit', span: 'md:col-span-2 md:row-span-1', img: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800' },
  { name: 'Bedding Sets', route: '/browse?category=Bedding', icon: Sparkles, count: 'Coming Soon', span: 'md:col-span-4 md:row-span-1', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800', comingSoon: true },
];

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-48 bg-slate-50/50 dark:bg-[#0F172A] text-slate-900 dark:text-white transition-colors duration-700 relative overflow-hidden">

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-indigo-50 dark:bg-indigo-900/10 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-32 gap-12">
          <div className="space-y-6">
            <span className="text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-[0.6em]">Designer Comfort</span>
            <h2 className="text-7xl md:text-9xl font-black italic text-slate-900 dark:text-white tracking-tighter leading-none uppercase">
              The Bedding <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-pink-500">Edit.</span>
            </h2>
          </div>
          <p className="max-w-sm text-slate-500 dark:text-slate-400 font-medium text-xl leading-relaxed">
            Elevating your hostel space with designer linens and professional-grade textile covers. Curated fits for modern living.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 auto-rows-[350px]">
          {categories.map((cat, idx) => (
            <button
              key={cat.name}
              disabled={cat.comingSoon}
              onClick={() => navigate(cat.route)}
              className={`group relative overflow-hidden rounded-[4rem] transition-all duration-700 ${!cat.comingSoon ? 'hover:shadow-3xl hover:-translate-y-4' : 'cursor-default'} ${cat.span} bg-white dark:bg-[#130721]/50 border border-slate-100 dark:border-white/5 p-4 shadow-sm`}
            >
              <div className="relative w-full h-full overflow-hidden rounded-[3.5rem]">
                <img
                  src={cat.img}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${!cat.comingSoon ? 'grayscale group-hover:grayscale-0 group-hover:scale-110' : 'opacity-20 grayscale'} opacity-80`}
                  alt={cat.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="absolute bottom-10 left-10 text-left">
                  <h3 className="text-4xl font-black text-white tracking-tight drop-shadow-2xl uppercase italic">{cat.name}</h3>
                  <div className="flex items-center gap-4 mt-4">
                    <div className={`w-10 h-0.5 ${cat.comingSoon ? 'bg-slate-700' : 'bg-indigo-500'} rounded-full`} />
                    <p className={`text-[10px] font-black ${cat.comingSoon ? 'text-slate-500' : 'text-indigo-300'} uppercase tracking-widest`}>{cat.count}</p>
                  </div>
                </div>

                {/* Floating Icon/Badge */}
                {cat.comingSoon ? (
                  <div className="absolute top-8 right-8 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <p className="text-[8px] font-black text-white uppercase tracking-widest">Live Soon</p>
                  </div>
                ) : (
                  <div className="absolute top-8 right-8 w-14 h-14 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-700 border border-white/30">
                    <cat.icon className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-32 text-center">
          <button
            onClick={() => navigate('/browse')}
            className="inline-flex items-center gap-8 px-16 py-6 border-2 border-slate-200 dark:border-white/10 rounded-full font-black uppercase text-[10px] tracking-[0.4em] hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all group shadow-xl"
          >
            Browse Full Collection
            <ArrowRight className="group-hover:translate-x-4 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
