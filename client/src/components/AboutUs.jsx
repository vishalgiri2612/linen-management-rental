import React from 'react';
import { motion } from 'framer-motion';
import { LuCircleCheck, LuUsers, LuRocket, LuHeart, LuArrowRight } from 'react-icons/lu';

const AboutUs = () => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-4 block underline underline-offset-8 decoration-indigo-500 decoration-4">The Origin Story</span>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 italic tracking-tighter uppercase leading-[0.85]">
            Built by <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-indigo-500">Students</span>, for Students.
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-10 leading-relaxed font-medium">
            We started ClosetRush with a simple observation: hostel linens are often neglected, unhygienic, and a source of constant stress for students.
          </p>
          <div className="flex flex-wrap gap-8">
             <div className="flex flex-col items-center gap-2">
                <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">10K+</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Active Dorms</span>
             </div>
             <div className="flex flex-col items-center gap-2">
                <span className="text-4xl font-black text-emerald-500 tracking-tighter">99.9%</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Hygiene Rate</span>
             </div>
             <div className="flex flex-col items-center gap-2">
                <span className="text-4xl font-black text-indigo-500 tracking-tighter">24/7</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Swift Support</span>
             </div>
          </div>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
           className="relative"
        >
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 blur-[120px] -z-10" />
           <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644" alt="Team ClosetRush" className="w-full h-full object-cover rounded-[5rem] grayscale relative hover:grayscale-0 transition-all duration-700 shadow-2xl" />
           <div className="absolute -bottom-10 -left-10 px-12 py-8 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl">
              <LuHeart className="w-8 h-8 text-rose-500 mb-2 fill-rose-500" />
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Made with ❤️ for students</p>
           </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
         {[
           { title: 'The Mission', desc: "To elevate the standard of student living through science-backed hygiene and frictionless technology.", icon: LuRocket, color: 'text-indigo-500' },
           { title: 'The Vision', desc: "To become the global benchmark for shared living services, starting with the very first touch: the sheets.", icon: LuUsers, color: 'text-emerald-500' },
           { title: 'The Commitment', desc: "Zero compromise on quality. Every swap is a promise of medical-grade sterilization.", icon: LuCircleCheck, color: 'text-amber-500' }
         ].map((item, i) => (
           <div key={i} className="p-12 bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-emerald-500/30 transition-all overflow-hidden group">
              <item.icon className={`w-12 h-12 ${item.color} mb-8 group-hover:scale-110 transition-transform`} />
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-6 underline underline-offset-8 decoration-emerald-500/20">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed">{item.desc}</p>
           </div>
         ))}
      </div>

      <div className="bg-slate-900 rounded-[5rem] p-12 md:p-24 relative overflow-hidden text-center md:text-left">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 blur-[150px] -z-10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-8 italic tracking-tighter uppercase leading-[0.9]">
                   Meet Our <br /> <span className="text-emerald-500">Founder</span>.
                </h2>
                <div className="space-y-6 text-slate-400 text-lg font-medium italic mb-12">
                   <p>"ClosetRush isn't just a business. It's my response to the four years I spent in hostels where sleep was a luxury and hygiene was an afterthought."</p>
                   <p>Today, we're serving thousands of students across 50+ campuses, and we're just getting started.</p>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-10">
                   <div>
                      <h4 className="text-white font-black uppercase tracking-widest text-lg mb-1">Vishal G.</h4>
                      <p className="text-emerald-500 text-xs font-black uppercase tracking-[0.4em]">CEO & Founder</p>
                   </div>
                   <button className="px-8 py-5 border border-white/20 text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all flex items-center gap-3 group">
                      Follow Story <LuArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                   </button>
                </div>
             </div>
             <div className="relative">
                <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl -z-10 rounded-full" />
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7" alt="Vishal G." className="w-full h-full object-cover rounded-[5rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" />
             </div>
          </div>
      </div>
    </div>
  );
};

export default AboutUs;
