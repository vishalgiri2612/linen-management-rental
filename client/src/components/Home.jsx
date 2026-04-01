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
    <div className="overflow-hidden bg-[var(--bg-primary)]">
      <Hero />

      {/* Narrative Section: The Philosophy */}
      <section className="bg-[var(--bg-secondary)] text-[var(--text-primary)] relative flex items-center overflow-hidden border-y border-[var(--border)] py-12">

        <div className="w-full relative z-10 flex flex-col lg:flex-row items-stretch">

          {/* LEFT SECTION: Mission & Protocol (Contained) */}
          <div className="flex-1 flex flex-col justify-center py-12 lg:py-20 px-6 sm:px-12 lg:pl-[10%] lg:pr-24">
            <div className="max-w-2xl space-y-10">
              <div className="space-y-8">
                <span className="text-[10px] font-black uppercase tracking-[1em] text-[var(--accent-primary)] block">
                  THE NEW STANDARD
                </span>
                <h2 className="text-6xl lg:text-8xl xl:text-9xl font-serif italic text-[var(--text-primary)] leading-[0.85] tracking-tighter">
                  Reclaiming <br /> <span className="opacity-30">Hostel Life.</span>
                </h2>
                <p className="text-2xl text-[var(--text-primary)]/70 font-light leading-relaxed">
                  Hygiene shouldn't be a luxury. We've combined industrial sterilization with an elite logistics network to bring hospital-grade care to your dorm room.
                </p>
              </div>

              <Link to="/about" className="inline-flex items-center gap-10 group">
                <div className="w-16 h-16 rounded-full border border-[var(--accent-primary)]/30 flex items-center justify-center group-hover:bg-[var(--accent-primary)] group-hover:text-[var(--bg-primary)] transition-all duration-700">
                  <LuArrowRight className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--accent-primary)]">Explore</span>
                  <span className="text-sm font-serif italic text-[var(--text-primary)] opacity-40 group-hover:opacity-100 transition-opacity">Our Protoctol</span>
                </div>
              </Link>
            </div>
          </div>

          {/* RIGHT SECTION: Feature Set (Bleeding to the edge) */}
          <div className="flex-1 bg-[var(--text-primary)]/[0.02] border-l border-[var(--border)] py-12 lg:py-20 px-6 sm:px-12 lg:px-24 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mr-auto">
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
                  className="space-y-6 pt-8 border-t border-[var(--text-primary)]/10 hover:border-[var(--accent-primary)]/30 transition-colors duration-700 group"
                >
                  <span className="text-sm font-black font-serif italic text-[var(--accent-primary)] opacity-[0.15] group-hover:opacity-100 transition-opacity">
                    {item.num}
                  </span>
                  <div className="space-y-4">
                    <h4 className="text-2xl font-serif italic text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-lg text-[var(--text-primary)]/40 font-light leading-relaxed group-hover:text-[var(--text-primary)]/70 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <div>
        <HowItWorks />
      </div>

      <Packages isDark={false} />

      <CleanPromise />

      <Testimonials />

      {/* The Grand Finale: CTA */}
      <section className="py-12 relative bg-[var(--bg-primary)] overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-7xl md:text-[12rem] font-serif text-[var(--text-primary)] mb-24 tracking-tighter leading-[0.75]">
            Experience <br /> <span className="italic opacity-20">the Elite.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
            <Link
              to="/signup"
              className="px-20 py-8 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-[0.5em] text-[10px] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] transition-all duration-500 shadow-2xl"
            >
              Join ClosetRush
            </Link>
            <Link
              to="/contact"
              className="px-20 py-8 border border-[var(--text-primary)] text-[var(--text-primary)] font-bold uppercase tracking-[0.5em] text-[10px] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-500"
            >
              Speak to Concierge
            </Link>
          </div>
        </div>

        {/* Scrolling Banner (Moved to Bottom) */}
        <div className="w-full overflow-hidden py-10 border-y border-[var(--border)] mt-16 whitespace-nowrap">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex gap-20 items-center"
          >
            {[...Array(8)].map((_, i) => (
              <span key={i} className="text-4xl lg:text-7xl font-serif italic text-[var(--text-primary)] opacity-10 uppercase tracking-tighter flex-shrink-0">
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
