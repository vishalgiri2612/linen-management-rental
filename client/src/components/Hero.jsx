import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bed, ShoppingBag, Wind, ArrowRight } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-[85vh] bg-white dark:bg-[#0F172A] text-slate-900 dark:text-white overflow-hidden flex flex-col items-center pt-24 pb-12 selection:bg-indigo-100 selection:text-indigo-900 transition-all duration-1000 font-sans">
      
      {/* Premium Background Image with Layering */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-fixed bg-center bg-cover scale-110 animate-zoom-in opacity-20 dark:opacity-10" 
              style={{ backgroundImage: "url('/hero-bg.png')" }} />
         <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-white dark:from-[#0F172A]/90 dark:via-[#0F172A]/60 dark:to-[#0F172A]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full min-h-[60vh]">
        
        {/* Left Section: Text & CTA */}
        <div className="flex flex-col items-start gap-6 animate-fade-in text-left">
          <div className="flex justify-start animate-fade-in">
             <div className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">
               Hostel Living. Reimagined.
             </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl xl:text-9xl font-black italic text-slate-900 dark:text-white tracking-tighter leading-[0.85] uppercase">
              Elite <br /> Weave. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 dark:from-indigo-400 dark:via-pink-400 dark:to-indigo-500 px-2 text-6xl md:text-8xl xl:text-[7rem] leading-tight block mt-2">
                Rent Pure Bedsheets.
              </span>
            </h1>
          </div>
          
          <div className="max-w-md space-y-6">
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
              Unique bedsheet registry for elite living. <br />
              High-performance fabrics, rented and refined.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link to="/browse" className="group relative px-16 py-6 bg-slate-900 dark:bg-white text-white dark:text-black font-black rounded-full overflow-hidden transition-all shadow-2xl active:scale-95 text-[10px] uppercase tracking-[0.4em]">
                <span className="relative z-10">Explore Collection</span>
                <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
              <Link to="/lookbook" className="flex items-center gap-3 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all font-black uppercase text-[10px] tracking-[0.3em] group">
                View Lookbook <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section: CARNIVAL-style Stacked Gallery */}
        <div className="relative h-[600px] w-full flex items-center justify-center lg:justify-end pr-0 lg:pr-12 mt-12 lg:mt-0">
            
            <div className="relative w-full h-full max-w-md flex items-center justify-center">
                
                {/* Image 4: Interior (Deepest) */}
                <div onClick={() => navigate('/browse?category=Sofa Covers')} className="absolute w-64 h-80 rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl -rotate-[15deg] -translate-x-24 -translate-y-12 opacity-40 blur-[1px] transform transition-all duration-700 hover:z-50 hover:opacity-100 hover:rotate-0 hover:scale-110 hover:blur-0 cursor-pointer group">
                    <img src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800" className="w-full h-full object-cover grayscale group-hover:grayscale-0" alt="Linen Interior" />
                </div>

                {/* Image 3: Pillow/Curtains */}
                <div onClick={() => navigate('/browse?category=Pillow Covers')} className="absolute w-64 h-80 rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl rotate-[12deg] translate-x-20 translate-y-8 opacity-60 blur-[0.5px] transform transition-all duration-700 hover:z-50 hover:opacity-100 hover:rotate-0 hover:scale-110 hover:blur-0 cursor-pointer group">
                     <img src="https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=800" className="w-full h-full object-cover grayscale group-hover:grayscale-0" alt="Premium Curtains" />
                </div>

                {/* Image 2: Double Bed */}
                <div onClick={() => navigate('/browse?search=double')} className="absolute w-64 h-80 rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl -rotate-[5deg] -translate-x-12 translate-y-2 opacity-80 transform transition-all duration-700 hover:z-50 hover:opacity-100 hover:rotate-0 hover:scale-110 cursor-pointer">
                     <img src="/items/double_bed.png" className="w-full h-full object-cover" alt="Double Bed Luxury" />
                </div>

                {/* Image 1: Single Bed (Front) */}
                <div onClick={() => navigate('/browse?search=single')} className="absolute w-72 h-96 rounded-[3rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-3xl rotate-[3deg] translate-x-4 z-40 transform transition-all duration-700 hover:scale-105 cursor-pointer">
                     <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800" className="w-full h-full object-cover" alt="Single Bed Pure" />
                     <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl">
                         <div className="flex items-center justify-between">
                             <span className="text-[10px] font-black uppercase text-white tracking-widest">Aura Single</span>
                             <span className="text-[10px] font-black text-white">₹49/wk</span>
                         </div>
                     </div>
                </div>
            </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default Hero;
