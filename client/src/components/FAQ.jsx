import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuPlus, LuMinus, LuSearch, LuCircleHelp } from 'react-icons/lu';

const faqs = [
  {
    category: 'Hygiene & Quality',
    questions: [
      { q: "What does '90°C Thermal Sterilization' mean?", a: "Standard washing machines only go up to 40-50°C. We use industrial thermal tunnels at 90°C to kill 99.9% of bacteria, allergens, and germs, ensuring the highest medical-grade hygiene standards." },
      { q: "How is it vacuum-sealed?", a: "Immediately after sterilization and drying, each item is packed into a sterile poly-shield and vacuum-sealed. This ensures zero contamination from our facility to your hands." },
    ]
  },
  {
    category: 'Subscription & Delivery',
    questions: [
      { q: "Can I choose my swap day?", a: "Yes, during checkout you can select your preferred weekly swap day (e.g. Every Monday or Wednesday). You can also change this later from your dashboard." },
      { q: "What happens if I'm not in my room?", a: "We coordinate with your hostel reception or security. If permitted, we'll leave the fresh pack there and collect the used one. If not, we'll reschedule for the next morning." },
    ]
  },
  {
    category: 'Damages & Policies',
    questions: [
      { q: "What if I spill coffee on the sheets?", a: "Minor stains are covered under our cleaning process. For major damage (tears, holes), Elite Living users have a full waiver. For others, nominal charges apply based on the item." },
      { q: "Can I pause my plan during vacations?", a: "Absolutely! You can pause your subscription for up to 30 days from your dashboard with a single click. Billing will resume only when you return." },
    ]
  }
];

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen">
      <div className="text-center mb-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-indigo-500/5 blur-[150px] -z-10" />
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-4 block underline underline-offset-8 decoration-indigo-500 decoration-4"
        >
          Have Questions?
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 italic tracking-tighter uppercase leading-[0.85]"
        >
          Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-indigo-500">Curiosities</span>
        </motion.h1>
        
        <div className="relative max-w-xl mx-auto mt-12 group">
           <LuSearch className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
           <input 
              type="text" 
              placeholder="Search for questions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full shadow-2xl shadow-slate-200/50 dark:shadow-none focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-slate-900 dark:text-white"
           />
        </div>
      </div>

      <div className="space-y-16 mb-24">
         {faqs.map((category, catIndex) => (
            <div key={catIndex}>
               <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-400 mb-8 ml-4 italic">{category.category}</h2>
               <div className="space-y-4">
                  {category.questions.map((faq, qIndex) => {
                     const identifier = `${catIndex}-${qIndex}`;
                     const isActive = activeQuestion === identifier;
                     
                     if (searchTerm && !faq.q.toLowerCase().includes(searchTerm.toLowerCase()) && !faq.a.toLowerCase().includes(searchTerm.toLowerCase())) return null;

                     return (
                        <motion.div 
                           key={qIndex}
                           className={`p-1 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-500 ${isActive ? 'bg-indigo-50/20 dark:bg-indigo-500/5 border-indigo-500/30' : ''}`}
                        >
                           <button 
                              onClick={() => setActiveQuestion(isActive ? null : identifier)}
                              className="w-full px-10 py-8 flex items-center justify-between text-left group"
                           >
                              <div className="flex items-center gap-6">
                                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isActive ? 'bg-indigo-500 text-white shadow-xl shadow-indigo-500/30' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}>
                                    <LuCircleHelp className="w-6 h-6" />
                                 </div>
                                 <span className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">{faq.q}</span>
                              </div>
                              <div className={`w-8 h-8 rounded-full border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center transition-transform duration-500 ${isActive ? 'rotate-180 bg-indigo-500 border-none' : ''}`}>
                                 {isActive ? <LuMinus className="text-white w-4 h-4" /> : <LuPlus className="text-slate-400 w-4 h-4" />}
                              </div>
                           </button>
                           
                           <AnimatePresence>
                              {isActive && (
                                 <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                 >
                                    <div className="px-10 pb-8 pt-2">
                                       <div className="w-full h-px bg-slate-50 dark:bg-slate-800 mb-8" />
                                       <p className="text-lg text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed">
                                          {faq.a}
                                       </p>
                                    </div>
                                 </motion.div>
                              )}
                           </AnimatePresence>
                        </motion.div>
                     );
                  })}
               </div>
            </div>
         ))}
      </div>

      <div className="p-16 bg-slate-900 rounded-[5rem] overflow-hidden relative text-center group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[100px] pointer-events-none group-hover:scale-150 transition-transform duration-700" />
          <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">Still have questions?</h3>
          <p className="text-slate-400 text-sm font-black uppercase tracking-widest mb-10">We're here to help you 24/7</p>
          <button className="px-12 py-6 bg-white text-slate-900 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-2xl">
             Contact Support
          </button>
      </div>
    </div>
  );
};

export default FAQ;
