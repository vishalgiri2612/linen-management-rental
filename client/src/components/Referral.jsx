import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LuZap, LuUsers, LuGift, LuArrowRight, LuCopy, LuCheck } from 'react-icons/lu';

const Referral = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "ROOMIE_2026_XPD";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { title: 'Share Code', desc: 'Send your unique referral code to your roommates or friends.', icon: LuZap, color: 'text-indigo-500' },
    { title: 'They Sign Up', desc: 'Your friends get 10% off their first month on any package.', icon: LuUsers, color: 'text-emerald-500' },
    { title: 'Earn Credits', desc: 'Get ₹50 credit in your dashboard for every friend who joins.', icon: LuGift, color: 'text-rose-500' },
  ];

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-black uppercase tracking-[0.4em] text-rose-500 mb-4 block underline underline-offset-8 decoration-emerald-500 decoration-4">Refer & Earn</span>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 italic tracking-tighter uppercase leading-[0.85]">
            Better <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-500">Roomies</span>. <br /> Better Rewards.
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-10 leading-relaxed font-medium">
            Everything is better shared. Invite your hostel mates to ClosetRush and earn service credits for every successful referral.
          </p>
          
          <div className="p-10 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-rose-500/5 blur-[100px] pointer-events-none" />
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Your Unique Code</p>
             <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 px-8 py-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter w-full">
                   {referralCode}
                </div>
                <button 
                  onClick={handleCopy}
                  className={`px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all active:scale-95 w-full sm:w-auto shadow-2xl ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'}`}
                >
                   {copied ? <><LuCheck className="w-5 h-5" /> Copied</> : <><LuCopy className="w-5 h-5" /> Copy Code</>}
                </button>
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
           <div className="bg-slate-900 rounded-[5rem] overflow-hidden p-12 md:p-20 relative group">
              <LuGift className="w-32 h-32 text-indigo-500/10 absolute top-[-2rem] right-[-2rem] group-hover:rotate-12 transition-transform duration-700" />
              <h3 className="text-white text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-2">The <span className="text-rose-500">Rewards</span>.</h3>
              <p className="text-slate-400 text-lg font-medium italic mb-12">Earn more as you grow the community.</p>
              
              <div className="space-y-6">
                 {[
                    { count: '1-5 Referrals', reward: '₹50 per person' },
                    { count: '6-10 Referrals', reward: '₹75 per person + 1 Free Wash' },
                    { count: '10+ Referrals', reward: '₹100 per person + Premium Concierge' }
                 ].map((tier, i) => (
                    <div key={i} className="flex justify-between items-center p-6 bg-white/5 border border-white/10 rounded-3xl group-hover:border-indigo-500/30 transition-all">
                       <span className="text-sm font-black uppercase tracking-widest text-slate-400">{tier.count}</span>
                       <span className="text-white font-black italic uppercase tracking-tighter">{tier.reward}</span>
                    </div>
                 ))}
              </div>
           </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
         {steps.map((step, i) => (
           <div key={i} className="p-12 bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                 <step.icon className={`w-8 h-8 ${step.color}`} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-4">{step.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed">{step.desc}</p>
           </div>
         ))}
      </div>

      <div className="p-16 md:p-24 bg-emerald-500 rounded-[5rem] overflow-hidden relative text-center group flex flex-col items-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/10 blur-[100px] pointer-events-none group-hover:scale-150 transition-transform duration-700" />
          <h3 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase mb-12">Start <br /> Referring.</h3>
          <button className="px-16 py-8 bg-slate-900 text-white rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-4 group">
             Visit Dashboard <LuArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
      </div>
    </div>
  );
};

export default Referral;
