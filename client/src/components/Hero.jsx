import React from 'react';
import { motion } from 'framer-motion';
import { LuArrowRight, LuShieldCheck, LuZap } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-screen bg-[var(--bg-primary)] flex flex-col justify-center overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--text-secondary)]/[0.03] hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center pt-32 pb-16 relative z-10">

        {/* Left Side: Modern Typography */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-[var(--text-primary)]/20"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-[var(--text-secondary)]">
              Trusted by 10,000+ Students
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-6xl md:text-8xl leading-[0.85] text-[var(--text-primary)] tracking-tighter mb-10"
          >
            Sterile <br />
            <span className="italic opacity-40">Sleep.</span> <br />
            Elite <span className="text-[var(--text-primary)]">Living.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-[var(--text-primary)]/70 max-w-xl font-light mb-12 leading-relaxed"
          >
            Your hostel lifestyle, upgraded. We provide premium, vacuum-sealed linens delivered directly to your room.
            <span className="block mt-4 font-medium italic text-[var(--text-secondary)]">Focus on your dreams, we'll handle the sheets.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-10"
          >
            <Link
              to="/packages"
              className="px-10 py-5 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-[0.3em] text-[11px] hover:opacity-90 transition-all flex items-center gap-4 group shadow-xl"
            >
              View Packages
              <LuArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              to="/how-it-works"
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--text-primary)] hover:underline decoration-1 underline-offset-[12px] decoration-[var(--text-secondary)] transition-all"
            >
              How It Works
            </Link>
          </motion.div>

          {/* Feature Ribbon */}
          <div className="grid grid-cols-3 gap-12 mt-12 border-t border-[var(--border)] pt-10">
            <div className="space-y-2">
              <p className="text-4xl font-serif text-[var(--text-primary)]">4.9/5</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">Student Rating</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-serif text-[var(--text-primary)]">90°C</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">Hot Sterilized</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-serif text-[var(--text-primary)]">FREE</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">Room Delivery</p>
            </div>
          </div>
        </div>
        {/* Right Side: Dynamic Stacked Composition */}
        <motion.div 
          className="lg:col-span-5 relative h-[650px] group/stack"
          style={{ perspective: "2000px" }}
          whileHover="fanOut"
        >
          {[
            {
              src: "/assets/images/hero_1.png",
              rotate: -10,
              z: 50,
              x: "-8%",
              y: "5%",
              scale: 1,
              delay: 0.2,
              hoverX: "-12%",
              hoverY: "8%",
              hoverRotate: -15
            },
            {
              src: "/assets/images/hero_2.png",
              rotate: 5,
              z: 40,
              x: "10%",
              y: "-2%",
              scale: 0.95,
              delay: 0.3,
              hoverX: "20%",
              hoverY: "-8%",
              hoverRotate: 12
            },
            {
              src: "/assets/images/hero_3.png",
              rotate: 15,
              z: 30,
              x: "2%",
              y: "-10%",
              scale: 0.9,
              delay: 0.4,
              hoverX: "10%",
              hoverY: "-20%",
              hoverRotate: 25
            },
            {
              src: "/assets/images/hero_4.png",
              rotate: -18,
              z: 20,
              x: "5%",
              y: "8%",
              scale: 0.85,
              delay: 0.5,
              hoverX: "12%",
              hoverY: "15%",
              hoverRotate: -22
            },
            {
              src: "/assets/images/hero_5.png",
              rotate: 20,
              z: 10,
              x: "-5%",
              y: "-8%",
              scale: 0.8,
              delay: 0.6,
              hoverX: "-15%",
              hoverY: "-12%",
              hoverRotate: 30
            }
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0, 
                scale: 0.4, 
                rotateY: 45,
                rotateX: -15,
                x: i % 2 === 0 ? "-100%" : "100%",
                y: i % 2 === 0 ? "50%" : "-50%"
              }}
              whileInView={{ 
                opacity: 1, 
                rotateY: 0,
                rotateX: 0,
                rotate: img.rotate, 
                x: img.x, 
                y: img.y,
                scale: img.scale 
              }}
              animate="floating"
              variants={{
                floating: {
                  y: [img.y, (parseInt(img.y) + 1.5) + "%", img.y],
                  rotate: [img.rotate, img.rotate + 0.3, img.rotate],
                  transition: {
                    duration: 6 + i,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                },
                fanOut: {
                  x: img.hoverX,
                  y: img.hoverY,
                  rotate: img.hoverRotate,
                  transition: { type: "spring", stiffness: 100, damping: 20 }
                }
              }}
              whileHover={{ 
                zIndex: 100, 
                scale: 1.1, 
                rotate: 0,
                rotateY: 0,
                rotateX: 0,
                x: "0%",
                y: "-5%",
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              className="absolute inset-0 w-full h-[550px] bg-[var(--bg-secondary)] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden group/card cursor-pointer border-[12px] border-white rounded-[4rem]"
              style={{ 
                zIndex: img.z, 
                transformStyle: "preserve-3d",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)" 
              }}
            >
              <div 
                className="w-full h-full relative"
              >
                <img
                  src={img.src}
                  className={`w-full h-full object-cover brightness-95 group-hover/card:brightness-100 transition-all duration-1000 group-hover/card:scale-110 ${i > 0 ? 'blur-[1px] group-hover/card:blur-0' : ''}`}
                  alt="Elite Bedroom Asset"
                />
                
                {/* Minimal Overlay Info (Hidden by default, shown on extreme hover) */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none" />

                {/* Verification Tag */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover/card:opacity-100 transition-opacity">
                  <span className="text-[8px] font-bold text-white uppercase tracking-[0.4em]">Verified Sterile</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
