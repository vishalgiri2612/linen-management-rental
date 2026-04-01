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
    <div className="py-20 px-6 lg:px-12 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[10px] font-black uppercase tracking-[0.8em] text-[var(--accent-primary)]/60 mb-8 block"
            >
              Simple & Seamless
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-serif italic text-[var(--text-primary)] leading-none tracking-tighter"
            >
              How It <span className="opacity-30">Works.</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-xl text-[var(--text-primary)]/70 font-light leading-relaxed border-l-2 border-[var(--accent-primary)] pl-10 mb-2">
              Forget the laundry day stress. We handle the cleaning, so you can focus on your studies and lifestyle.
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--text-primary)]/10 border border-[var(--border)]">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-16 bg-[var(--bg-secondary)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] transition-all duration-700 group relative overflow-hidden"
            >
              {/* Step Number Decorative Background */}
              <span className="absolute -top-10 -right-10 text-[12rem] font-serif italic font-black text-[var(--text-primary)]/[0.03] group-hover:text-white/[0.03] transition-colors">
                {step.num}
              </span>

              <div className="relative z-10 space-y-12">
                <div className="w-16 h-16 border border-[var(--accent-primary)]/30 flex items-center justify-center group-hover:bg-[var(--accent-primary)] transition-all">
                  <step.icon className="w-6 h-6 text-[var(--text-primary)] group-hover:text-[var(--bg-primary)]" />
                </div>

                <div className="space-y-6">
                  <h3 className="text-3xl font-serif italic tracking-tight">{step.title}</h3>
                  <p className="text-base opacity-60 font-light leading-relaxed h-[80px]">
                    {step.description}
                  </p>
                </div>

                <div className="w-full h-px bg-[var(--border)] group-hover:bg-white/10" />

                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all block">
                  Phase {step.num}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="pt-12 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-12">
          <h2 className="text-3xl font-serif italic text-[var(--text-primary)]">Ready to upgrade your sleep?</h2>
          <Link to="/packages" className="px-16 py-8 bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-[0.4em] text-[10px] hover:opacity-80 transition-all flex items-center gap-6 group">
            Get Started Now
            <LuArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
