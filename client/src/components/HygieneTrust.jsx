import React from 'react';
import { LuShieldCheck, LuWind, LuDroplets, LuThermometerSun } from 'react-icons/lu';

const HygieneTrust = () => {
  const features = [
    {
      icon: LuThermometerSun,
      title: 'Thermal Sterilization',
      description: 'Washed at 90°C to eliminate 99.9% of bacteria and allergens.',
    },
    {
      icon: LuWind,
      title: 'UV-C Sanitization',
      description: 'Post-wash ultraviolet light treatment for absolute purity.',
    },
    {
      icon: LuDroplets,
      title: 'Eco-Safe Detergents',
      description: 'Hospital-grade, hypoallergenic cleaning agents safe for all skin types.',
    },
    {
      icon: LuShieldCheck,
      title: 'Vacuum Sealed',
      description: 'Delivered in airtight, tamper-evident packaging to your room.',
    }
  ];

  return (
    <section className="py-32 bg-[#F8F9FA] dark:bg-[#0F172A] text-slate-900 dark:text-white transition-colors duration-700 font-sans relative border-y border-slate-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in">
          <span className="text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">The Clean Promise</span>
          <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Hospital-Grade <br className="md:hidden" /> <span className="font-normal italic lowercase tracking-tight" style={{ fontFamily: "'Playfair Display', serif", textTransform: 'none' }}>Hygiene.</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic mx-auto max-w-2xl">
            We understand that renting linens requires absolute trust. That's why our sanitization protocol exceeds elite hotel industry standards, ensuring your sleep is pristine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                <feature.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest italic mb-3">{feature.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-28 relative h-[400px] w-full rounded-[3rem] overflow-hidden shadow-2xl">
           <img 
              src="https://images.unsplash.com/photo-1542289901-7fa8a00bf8a0?auto=format&fit=crop&q=80&w=1600" 
              alt="Crisp clean white hotel linens" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
            />
            {/* Solid sleek overlay removing heavy gradients */}
            <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-slate-900/20" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center px-4">
              <LuShieldCheck className="w-12 h-12 text-white mb-6 opacity-90 stroke-[1.5]" />
              <p className="text-3xl md:text-5xl font-serif italic tracking-tighter mb-6 max-w-3xl leading-tight">"Like sleeping in a 5-star suite, every single night. The freshness is unmatched."</p>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-px bg-white/50" />
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-90">Verified Resident</p>
                 <div className="w-12 h-px bg-white/50" />
              </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default HygieneTrust;
