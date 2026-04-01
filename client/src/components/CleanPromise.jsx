import React from 'react';
import { motion } from 'framer-motion';
import { LuShieldCheck, LuThermometer, LuZap, LuDroplets, LuBox, LuAward, LuTriangleAlert, LuArrowRight } from 'react-icons/lu';

const protocols = [
  {
    title: '90°C Thermal Sterilization',
    description: 'High-temperature washing that eliminates 99.9% of bacteria and viruses. Most laundry services only wash at 40°C. We go to 90°C.',
    icon: LuThermometer,
  },
  {
    title: 'UV-C Treatment',
    description: 'A second layer of protection using medical-grade UV-C light to disrupt any remaining microorganisms. Hospital standards, for your hostel bed.',
    icon: LuZap,
  },
  {
    title: 'Eco-Safe Detergents',
    description: 'Hypoallergenic and pH-balanced detergents that are gentle on your skin and the environment. No harsh chemicals, no artificial scents.',
    icon: LuDroplets,
  },
  {
    title: 'Vacuum-Sealed Packaging',
    description: 'Linens are sealed immediately after sterilization. They stay sterile until the moment you break the seal in your room.',
    icon: LuBox,
  },
];

const CleanPromise = () => {
  return (
    <div className="py-20 px-6 lg:px-12 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
          <div className="lg:col-span-8">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[10px] font-black uppercase tracking-[1em] text-[var(--accent-primary)]/60 mb-8 block"
            >
              Zero Compromise
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-7xl lg:text-9xl font-serif italic text-[var(--text-primary)] leading-none tracking-tighter"
            >
              The Clean <br /> <span className="opacity-30">Promise.</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-xl text-[var(--text-primary)]/70 font-light leading-relaxed border-l-2 border-[var(--accent-primary)] pl-10">
              We've set a new hygiene benchmark for student living. Our 4-step protocol ensures your sleep is protected by science.
            </p>
          </div>
        </div>

        {/* Protocols Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--text-primary)]/10 border border-[var(--border)]">
          {protocols.map((protocol, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ 
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="p-16 bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] transition-all duration-700 group flex items-start gap-12 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--text-primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              
              <div className="w-20 h-20 border border-[var(--border)] flex items-center justify-center shrink-0 group-hover:bg-[var(--text-primary)] group-hover:border-[var(--text-primary)] transition-all duration-500 rounded-sm">
                <protocol.icon className="w-8 h-8 text-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-colors" />
              </div>
              <div className="space-y-6">
                <h3 className="text-3xl font-serif italic text-[var(--text-primary)] leading-tight flex items-center gap-4">
                  {protocol.title}
                  <LuArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                </h3>
                <p className="text-lg text-[var(--text-primary)]/50 font-light leading-relaxed italic group-hover:text-[var(--text-primary)]/70 transition-colors">{protocol.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Split High-Contrast Section */}
        <div className="bg-[var(--bg-secondary)] min-h-[70vh] flex flex-col lg:flex-row items-stretch border border-[var(--border)] relative overflow-hidden">
          <div className="flex-1 p-16 lg:p-32 flex flex-col justify-center space-y-16 relative z-10">
            <div className="space-y-10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--accent-primary)]">Certified Hygiene</span>
              <h2 className="text-5xl md:text-7xl font-serif italic text-[var(--text-primary)] leading-[0.85] tracking-tighter">
                Better Science, <br /> <span className="opacity-30">Better Sleep.</span>
              </h2>
              <p className="text-2xl text-[var(--text-primary)]/60 font-light leading-relaxed max-w-xl italic">
                We don't just "wash" your sheets. We treat them like medical equipment. Each batch is tracked and certified for hygiene before it reaches your door.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-px bg-[var(--text-primary)]/10 border border-[var(--text-primary)]/10">
              <div className="p-12 hover:bg-[var(--text-primary)]/[0.05] transition-colors group">
                <LuAward className="w-8 h-8 text-[var(--accent-primary)] mb-8 group-hover:scale-125 transition-transform" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-primary)]">Lab Tested</p>
              </div>
              <div className="p-12 hover:bg-[var(--text-primary)]/[0.05] transition-colors group">
                <LuTriangleAlert className="w-8 h-8 text-[var(--accent-primary)] mb-8 group-hover:scale-125 transition-transform" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-primary)]">Allergy Safe</p>
              </div>
            </div>
          </div>

          <div className="flex-1 relative min-h-[500px] lg:-mt-48">
            <img
              src="/assets/images/dorm_env.png"
              alt="Elite Dorm Environment"
              className="absolute inset-0 w-full h-full object-cover brightness-95 hover:scale-110 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-[var(--bg-primary)]/10 pointer-events-none" />
          </div>

          {/* Abstract Decoration */}
          <div className="absolute bottom-0 right-0 p-12 mix-blend-difference hidden lg:block">
            <span className="text-[15rem] font-serif italic text-white opacity-[0.02] leading-none">Clean.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanPromise;
