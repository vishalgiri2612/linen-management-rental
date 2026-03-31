import React from 'react';
import { motion } from 'framer-motion';
import { LuMessageSquare, LuMail, LuInstagram, LuMapPin, LuSend } from 'react-icons/lu';

const Support = () => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           className="relative group"
        >
          <span className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-4 block underline underline-offset-8 decoration-indigo-500 decoration-4">Get in Touch</span>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 italic tracking-tighter uppercase leading-tight">
            How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-indigo-500">Help?</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-12 leading-relaxed font-medium">
            Whether you're a student with a question or a hostel manager looking for a partnership, our team is always ready to support your hygiene journey.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group hover:translate-x-4 transition-all duration-500 cursor-pointer">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                <LuMessageSquare className="w-8 h-8 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">WhatsApp Chat</p>
                <p className="text-xl font-black text-slate-900 dark:text-white italic tracking-tighter">+91 91234 56789</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group hover:translate-x-4 transition-all duration-500 cursor-pointer">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                <LuMail className="w-8 h-8 text-indigo-500" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Email Inquiry</p>
                <p className="text-xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase">support@closetrush.com</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group hover:translate-x-4 transition-all duration-500 cursor-pointer">
              <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center border border-rose-500/20">
                <LuInstagram className="w-8 h-8 text-rose-500" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Follow Us</p>
                <p className="text-xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase">@closetrush_official</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/5 blur-[120px] -z-10" />
          <div className="p-12 md:p-16 bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none">
             <div className="mb-12">
               <h3 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase mb-2">Send a Message</h3>
               <p className="text-slate-400 text-sm font-black uppercase tracking-widest">We respond within 2 hours</p>
             </div>
             <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Your Name</label>
                       <input type="text" className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-3xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 font-bold" />
                   </div>
                   <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Your Email</label>
                       <input type="email" className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-3xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 font-bold" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">How can we help?</label>
                   <textarea rows="4" className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 font-bold resize-none"></textarea>
                </div>
                <button className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2.5rem] font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
                   Send Message <LuSend className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
             </form>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
         <div className="p-10 bg-emerald-50 dark:bg-slate-900 rounded-[3rem] border border-emerald-100 dark:border-slate-800 group hover:border-emerald-500/30 transition-all">
            <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase italic mb-4">Delhi / NCR</h4>
            <div className="flex items-start gap-3">
               <LuMapPin className="w-5 h-5 text-emerald-500 shrink-0" />
               <p className="text-sm font-medium text-slate-500 dark:text-slate-400 italic">88% Hostel Coverage in Okhla, Noida, and Greater Noida.</p>
            </div>
         </div>
         <div className="p-10 bg-indigo-50 dark:bg-slate-900 rounded-[3rem] border border-indigo-100 dark:border-slate-800 group hover:border-indigo-500/30 transition-all">
            <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase italic mb-4">Bangalore</h4>
            <div className="flex items-start gap-3">
               <LuMapPin className="w-5 h-5 text-indigo-500 shrink-0" />
               <p className="text-sm font-medium text-slate-500 dark:text-slate-400 italic">95% Hostel Coverage in Koramangala, Indiranagar, and HSR.</p>
            </div>
         </div>
         <div className="p-10 bg-rose-50 dark:bg-slate-900 rounded-[3rem] border border-rose-100 dark:border-slate-800 group hover:border-rose-500/30 transition-all">
            <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase italic mb-4">Mumbai</h4>
            <div className="flex items-start gap-3">
               <LuMapPin className="w-5 h-5 text-rose-500 shrink-0" />
               <p className="text-sm font-medium text-slate-500 dark:text-slate-400 italic">80% Hostel Coverage in Andheri, Powai, and South Bombay.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Support;
