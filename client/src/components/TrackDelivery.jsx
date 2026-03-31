import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuPackage, LuTruck, LuNavigation, LuCircleCheck, LuSearch } from 'react-icons/lu';

const steps = [
  { label: 'Packed', date: 'Mar 31, 10:00 AM', status: 'completed' },
  { label: 'Dispatched', date: 'Mar 31, 11:30 AM', status: 'completed' },
  { label: 'Out for Delivery', date: 'Mar 31, 01:15 PM', status: 'active' },
  { label: 'Delivered', date: '--', status: 'pending' },
];

const TrackDelivery = () => {
  const [orderId, setOrderId] = useState('');
  const [tracking, setTracking] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    if (orderId) setTracking(true);
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-4 block underline underline-offset-8 decoration-indigo-500 decoration-4"
        >
          Real-time Updates
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 italic tracking-tighter uppercase"
        >
          Track My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-indigo-500 to-emerald-500">Delivery</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto"
        >
          Enter your Order ID to see where your fresh linens are. Confidence in every mile.
        </motion.p>
      </div>

      <div className="max-w-2xl mx-auto">
         <form onSubmit={handleTrack} className="mb-12 flex gap-4">
             <div className="relative flex-1 group">
                 <LuSearch className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                 <input 
                    type="text" 
                    placeholder="Enter Order ID (e.g. CR-10293)" 
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full pl-16 pr-8 py-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-none focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold text-slate-900 dark:text-white"
                 />
             </div>
             <button className="px-10 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all">
                Track
             </button>
         </form>

         <AnimatePresence>
            {tracking && (
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden"
                >
                    <div className="flex justify-between items-start mb-12">
                        <div>
                           <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Order ID: {orderId}</p>
                           <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Out for Delivery</h2>
                        </div>
                        <div className="w-16 h-16 bg-emerald-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
                           <LuTruck className="w-8 h-8 text-emerald-500 animate-pulse" />
                        </div>
                    </div>

                    <div className="relative flex flex-col gap-12 ml-4">
                        <div className="absolute left-[-1.5rem] top-4 bottom-4 w-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: '75%' }}
                              transition={{ duration: 1.5, ease: 'easeOut' }}
                              className="w-full bg-emerald-500" 
                           />
                        </div>

                        {steps.map((step, index) => (
                           <div key={index} className="relative pl-8">
                               <div className={`absolute left-[-2.25rem] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 z-10 transition-all duration-500 ${step.status === 'completed' ? 'bg-emerald-500' : step.status === 'active' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-slate-100 dark:bg-slate-800'}`} />
                               <div className="flex justify-between items-center text-sm">
                                   <div>
                                       <h4 className={`font-black uppercase tracking-widest ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-900 dark:text-white'}`}>{step.label}</h4>
                                       <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-1">{step.date}</p>
                                   </div>
                                   {step.status === 'completed' && <LuCircleCheck className="w-5 h-5 text-emerald-500" />}
                                   {step.status === 'active' && <LuNavigation className="w-5 h-5 text-emerald-500 animate-bounce" />}
                               </div>
                           </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-emerald-50 dark:bg-slate-800/50 rounded-2xl border border-emerald-100 dark:border-emerald-500/10">
                        <p className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 text-center tracking-widest">Courier: Rajesh Kumar • +91 98765 43210</p>
                    </div>
                </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
};

export default TrackDelivery;
