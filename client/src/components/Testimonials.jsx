import React from 'react';
import { motion } from 'framer-motion';
import { LuQuote, LuStar } from 'react-icons/lu';

const testimonials = [
  {
    name: 'Aravind K.',
    hostel: 'IIT Delhi, Nilgiri Hostel',
    quote: "Finally, a service that understands student life. The vacuum-sealed sheets feel like they're straight out of a spa. No more laundry day stress!",
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=aravind'
  },
  {
    name: 'Meghna S.',
    hostel: 'NIFT Noida, PG-3',
    quote: "The 90°C sterilization is the real game-changer. My allergies are gone, and the bedding is always fresh. Elite living at student prices indeed.",
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=meghna'
  },
  {
    name: 'Rahul V.',
    hostel: 'SRM University, Kaari Hostel',
    quote: "I was skeptical, but the Comfort Suite plan is worth every penny. The delivery is punctual and the sheets are premium quality.",
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=rahul'
  },
];

const Testimonials = () => {
  return (
    <div className="py-20 bg-[#1A3263] text-[#EFD2B0] relative overflow-hidden border-y border-white/5">

      {/* Editorial Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none w-full text-center">
        <p className="text-[20rem] font-serif italic text-white whitespace-nowrap">Voice.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-16">
          <div className="space-y-8">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[10px] font-black uppercase tracking-[1em] text-[#FFC570] block"
            >
              Customer Testimonials
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-9xl font-serif italic text-white leading-[0.85] tracking-tighter"
            >
              Students' <br /> <span className="opacity-30">Choice.</span>
            </motion.h2>
          </div>
          <p className="text-xl text-[#EFD2B0]/50 font-light max-w-sm border-l border-[#FFC570]/30 pl-10 mb-4">
            Discover how ClosetRush is redefining the hostel experience for elite students across India.
          </p>
        </div>
      </div>

      {/* Full-width Marquee Section */}
      <div className="relative mt-20 overflow-hidden group/marquee border-y border-white/5">
        <div className="flex animate-scroll-left gap-px hover:pause bg-white/10 w-fit">
          {[...testimonials, ...testimonials, ...testimonials].map((test, i) => (
            <motion.div
              key={i}
              className="p-20 bg-[#1A3263] hover:bg-white/[0.03] transition-all duration-700 flex flex-col group relative w-[500px] shrink-0"
            >
              <div className="flex gap-2 mb-12">
                {[...Array(test.rating)].map((_, j) => (
                  <LuStar key={j} className="w-4 h-4 fill-[#FFC570] text-[#FFC570]" strokeWidth={0} />
                ))}
              </div>

              <p className="text-2xl text-[#EFD2B0] font-serif italic mb-16 leading-relaxed relative z-10 group-hover:translate-x-2 transition-transform h-32 overflow-hidden line-clamp-4">
                "{test.quote}"
              </p>

              <div className="mt-auto flex items-center gap-6 border-t border-white/10 pt-12">
                <div className="w-14 h-14 border border-[#FFC570]/30 grayscale group-hover:grayscale-0 transition-all overflow-hidden rotate-45 shrink-0">
                  <img src={test.avatar} alt={test.name} className="-rotate-45 scale-150 w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-serif italic text-lg whitespace-nowrap">{test.name}</h4>
                  <p className="text-[#FFC570] text-[9px] font-black uppercase tracking-[0.2em] opacity-40 whitespace-nowrap">{test.hostel}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimal Marquee Section with focus on content */}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="mt-32 pt-20 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { label: 'Active Dorms', value: 10000, suffix: '+', icon: '10K' },
              { label: 'Hygiene Rate', value: 99.9, suffix: '%', icon: '99' },
              { label: 'Swift Support', value: 24, suffix: '/7', icon: '24' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center md:items-start group">
                <div className="flex items-baseline gap-2 mb-4">
                  <StatCounter target={stat.value} />
                  <span className="text-4xl lg:text-6xl font-serif italic text-white/40">{stat.suffix}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-[#FFC570]/30 group-hover:w-12 transition-all" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#EFD2B0]/60 group-hover:text-[#EFD2B0] transition-colors">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campus Presence Section */}
        <div className="mt-32 pt-16 border-t border-white/10">
          <span className="text-[10px] font-black uppercase tracking-[1em] text-[#FFC570] block mb-20 text-center">Campus Presence</span>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-white/10 border border-white/10">
            {['IIT Delhi', 'SRM', 'VIT Velore', 'Manipal', 'BITS Pilani'].map((campus, i) => (
              <div key={i} className="py-12 px-6 bg-[#1A3263] flex items-center justify-center group hover:bg-white transition-all duration-700">
                <p className="text-3xl font-serif italic text-[#EFD2B0] group-hover:text-[#1A3263] transition-colors opacity-30 group-hover:opacity-100 uppercase tracking-tighter">
                  {campus}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCounter = ({ target }) => {
  const [count, setCount] = React.useState(0);
  const isInView = React.useRef(false);
  const nodeRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView.current) {
          isInView.current = true;
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // Easing function: easeOutExpo
            const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            const currentCount = (easedProgress * target);
            setCount(target % 1 === 0 ? Math.floor(currentCount) : Number(currentCount.toFixed(1)));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={nodeRef} className="text-7xl lg:text-9xl font-black text-white leading-none tracking-tighter">
      {count}
    </span>
  );
};

export default Testimonials;
