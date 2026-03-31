import React from 'react';
import { motion } from 'framer-motion';
import { LuCircleCheck, LuTruck, LuPackage, LuRefreshCcw, LuArrowRight } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const steps = [
  {
    num: '01',
    title: 'Choose Plan',
    description: 'Select the tier that fits your hostel lifestyle — from Essential to Elite.',
    icon: LuCircleCheck,
  },
  {
    num: '02',
    title: 'Place Order',
    description: 'Quick checkout with your hostel details and move-in date.',
    icon: LuPackage,
  },
  {
    num: '03',
    title: 'We Deliver',
    description: 'Vacuum-sealed, sterile linens delivered directly to your room.',
    icon: LuTruck,
  },
  {
    num: '04',
    title: 'We Swap',
    description: 'Automated swap on schedule. Always fresh, always clean.',
    icon: LuRefreshCcw,
  },
];

const HowItWorks = () => {
  return (
    <div className="py-48 px-6 lg:px-12 bg-[#EFD2B0]">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[10px] font-black uppercase tracking-[0.8em] text-[#1A3263]/60 mb-8 block"
            >
              Simple & Seamless
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-serif italic text-[#1A3263] leading-none tracking-tighter"
            >
              How It <span className="opacity-30">Works.</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-4">
             <p className="text-xl text-[#1A3263]/70 font-light leading-relaxed border-l-2 border-[#FFC570] pl-10 mb-2">
                Forget the laundry day stress. We handle the cleaning, so you can focus on your studies and lifestyle.
             </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1A3263]/10 border border-[#1A3263]/10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-16 bg-[#EFD2B0] hover:bg-[#1A3263] hover:text-[#EFD2B0] transition-all duration-700 group relative overflow-hidden"
            >
              {/* Step Number Decorative Background */}
              <span className="absolute -top-10 -right-10 text-[12rem] font-serif italic font-black text-[#1A3263]/[0.03] group-hover:text-white/[0.03] transition-colors">
                {step.num}
              </span>

              <div className="relative z-10 space-y-12">
                <div className="w-16 h-16 border border-[#FFC570]/30 flex items-center justify-center group-hover:bg-[#FFC570] transition-all">
                   <step.icon className="w-6 h-6 text-[#1A3263] group-hover:text-[#1A3263]" />
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif italic tracking-tight">{step.title}</h3>
                  <p className="text-base opacity-60 font-light leading-relaxed h-[80px]">
                    {step.description}
                  </p>
                </div>

                <div className="w-full h-px bg-[#1A3263]/10 group-hover:bg-white/10" />
                
                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all block">
                  Phase {step.num}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="pt-20 border-t border-[#1A3263]/10 flex flex-col md:flex-row items-center justify-between gap-12">
           <h2 className="text-3xl font-serif italic text-[#1A3263]">Ready to upgrade your sleep?</h2>
           <Link to="/packages" className="px-16 py-8 bg-[#1A3263] text-[#EFD2B0] font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-black transition-all flex items-center gap-6 group">
              Get Started Now
              <LuArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
