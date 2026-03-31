import React from 'react';
import { motion } from 'framer-motion';
import { LuArrowRight, LuShieldCheck, LuZap } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-[#EFD2B0] flex flex-col justify-center overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1A3263]/[0.03] hidden lg:block" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center py-32 relative z-10">
        
        {/* Left Side: Modern Typography */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-12 h-px bg-[#1A3263]/30"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-[#1A3263]/60">
              Trusted by 10,000+ Students
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-8xl md:text-[10rem] leading-[0.85] text-[#1A3263] tracking-tighter mb-12"
          >
            Sterile <br />
            <span className="italic opacity-40">Sleep.</span> <br />
            Elite <span className="text-[#FFC570]">Living.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-[#1A3263]/70 max-w-xl font-light mb-16 leading-relaxed"
          >
            Your hostel lifestyle, upgraded. We provide premium, vacuum-sealed linens delivered directly to your room. 
            <span className="block mt-6 font-medium italic text-[#547792]">Focus on your dreams, we'll handle the sheets.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-10"
          >
            <Link
              to="/packages"
              className="px-12 py-6 bg-[#1A3263] text-[#EFD2B0] font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-[#1A3263]/90 transition-all flex items-center gap-4 group shadow-2xl shadow-[#1A3263]/20"
            >
              View Packages 
              <LuArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              to="/how-it-works"
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#1A3263] hover:underline decoration-1 underline-offset-[12px] decoration-[#FFC570] transition-all"
            >
              How It Works
            </Link>
          </motion.div>

          {/* Feature Ribbon */}
          <div className="grid grid-cols-3 gap-12 mt-32 border-t border-[#1A3263]/10 pt-16">
            <div className="space-y-2">
              <p className="text-4xl font-serif text-[#1A3263]">4.9/5</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#547792]">Student Rating</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-serif text-[#1A3263]">90°C</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#547792]">Hot Sterilized</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-serif text-[#1A3263]">FREE</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#547792]">Room Delivery</p>
            </div>
          </div>
        </div>

        {/* Right Side: Composition */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full h-[750px] overflow-hidden group border-[20px] border-[#EFD2B0] shadow-[0px_60px_100px_-20px_rgba(26,50,99,0.3)]"
          >
            <img 
              src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7" 
              alt="Premium Bedding Scene" 
              className="w-full h-full object-cover brightness-95 group-hover:scale-110 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-[#1A3263]/10 mix-blend-overlay" />
            
            <div className="absolute -bottom-1 -right-1 bg-[#FFC570] p-10 hidden xl:block">
              <LuShieldCheck className="w-12 h-12 text-[#1A3263] mb-6" />
              <p className="font-serif text-2xl italic leading-tight text-[#1A3263]">Elite <br /> Standards.</p>
            </div>
          </motion.div>
          
          {/* Decorative Float */}
          <motion.div
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -left-10 w-40 h-40 bg-[#EFD2B0] border border-[#1A3263]/10 p-6 flex flex-col justify-center items-center text-center z-20 shadow-xl"
          >
            <LuZap className="w-8 h-8 text-[#FFC570] mb-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A3263]">Premium <br /> Package</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
