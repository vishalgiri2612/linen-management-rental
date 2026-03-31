import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import Packages from './Packages';
import CleanPromise from './CleanPromise';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import { Link } from 'react-router-dom';
import { LuArrowRight, LuCircleCheck } from 'react-icons/lu';

const Home = () => {
  return (
    <div className="overflow-hidden bg-[#EFD2B0]">
      <Hero />

      {/* Narrative Section: The Philosophy */}
      <section className="bg-[#1A3263] text-[#EFD2B0] relative flex items-center overflow-hidden border-y border-white/5 py-32">

        <div className="w-full relative z-10 flex flex-col lg:flex-row items-stretch">

          {/* LEFT SECTION: Mission & Protocol (Contained) */}
          <div className="flex-1 flex flex-col justify-center py-32 lg:py-60 px-6 sm:px-12 lg:pl-[10%] lg:pr-24">
            <div className="max-w-2xl space-y-16">
              <div className="space-y-8">
                <span className="text-[10px] font-black uppercase tracking-[1em] text-[#FFC570] block">
                  THE NEW STANDARD
                </span>
                <h2 className="text-6xl lg:text-8xl xl:text-9xl font-serif italic text-white leading-[0.85] tracking-tighter">
                  Reclaiming <br /> <span className="opacity-30">Hostel Life.</span>
                </h2>
                <p className="text-2xl text-[#EFD2B0]/70 font-light leading-relaxed">
                  Hygiene shouldn't be a luxury. We've combined industrial sterilization with an elite logistics network to bring hospital-grade care to your dorm room.
                </p>
              </div>

              <Link to="/about" className="inline-flex items-center gap-10 group">
                <div className="w-16 h-16 rounded-full border border-[#FFC570]/30 flex items-center justify-center group-hover:bg-[#FFC570] group-hover:text-[#1A3263] transition-all duration-700">
                  <LuArrowRight className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FFC570]">Explore</span>
                  <span className="text-sm font-serif italic text-white opacity-40 group-hover:opacity-100 transition-opacity">Our Protoctol</span>
                </div>
              </Link>
            </div>
          </div>

          {/* RIGHT SECTION: Feature Set (Bleeding to the edge) */}
          <div className="flex-1 bg-white/[0.02] border-l border-white/5 py-32 lg:py-60 px-6 sm:px-12 lg:px-24 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-20 max-w-4xl mr-auto">
              {[
                {
                  num: '01',
                  title: 'Thermal Logic',
                  desc: 'Fibers treated at 90°C for 100% total sterilization.'
                },
                {
                  num: '02',
                  title: 'Airtight Seal',
                  desc: 'Vacuum packing for zero contamination in transit.'
                },
                {
                  num: '03',
                  title: 'Golden Ratio',
                  desc: 'Premium fabric at student-optimized budgets.'
                },
                {
                  num: '04',
                  title: 'Smart Cycle',
                  desc: 'Predictive swapping handles the sheets for you.'
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="space-y-6 pt-12 border-t border-[#EFD2B0]/10 hover:border-[#FFC570]/30 transition-colors duration-700 group"
                >
                  <span className="text-sm font-black font-serif italic text-[#FFC570] opacity-[0.15] group-hover:opacity-100 transition-opacity">
                    {item.num}
                  </span>
                  <div className="space-y-4">
                    <h4 className="text-2xl font-serif italic text-white group-hover:text-[#FFC570] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-lg text-[#EFD2B0]/40 font-light leading-relaxed group-hover:text-[#EFD2B0]/70 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <div className="mt-[-4rem]">
        <HowItWorks />
      </div>

      <Packages isDark={true} />

      <CleanPromise />

      <Testimonials />

      {/* The Grand Finale: CTA */}
      <section className="py-20 relative bg-[#EFD2B0] overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-7xl md:text-[12rem] font-serif text-[#1A3263] mb-24 tracking-tighter leading-[0.75]">
            Experience <br /> <span className="italic opacity-20">the Elite.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
            <Link
              to="/signup"
              className="px-20 py-8 bg-[#1A3263] text-[#EFD2B0] font-bold uppercase tracking-[0.5em] text-[10px] hover:bg-[#FFC570] hover:text-[#1A3263] transition-all duration-500 shadow-2xl"
            >
              Join ClosetRush
            </Link>
            <Link
              to="/contact"
              className="px-20 py-8 border border-[#1A3263] text-[#1A3263] font-bold uppercase tracking-[0.5em] text-[10px] hover:bg-[#1A3263] hover:text-[#EFD2B0] transition-all duration-500"
            >
              Speak to Concierge
            </Link>
          </div>
        </div>

        {/* Scrolling Banner (Moved to Bottom) */}
        <div className="w-full overflow-hidden py-10 border-y border-[#1A3263]/5 mt-32 whitespace-nowrap">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex gap-20 items-center"
          >
            {[...Array(8)].map((_, i) => (
              <span key={i} className="text-4xl lg:text-7xl font-serif italic text-[#1A3263] opacity-10 uppercase tracking-tighter flex-shrink-0">
                Experience the comfort and hygiene •
              </span>
            ))}
          </motion.div>
        </div>


      </section>
    </div>
  );
};

export default Home;
