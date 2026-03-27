import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center bg-[#F4F1EE] dark:bg-gray-950 transition-colors duration-500">
      {/* Background Image with Immersive Overlay */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src="/hero-bg.png"
          className="w-full h-full object-cover opacity-50 dark:opacity-30 mix-blend-multiply dark:mix-blend-overlay transition-opacity duration-700"
          alt="Linen Rent Background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F1EE] via-[#F4F1EE]/90 to-[#F4F1EE]/40 dark:from-gray-950 dark:via-gray-950/90 dark:to-gray-950/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full animate-fade-in">

        {/* Premium Badge */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">

          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full shadow-xl border border-white/20 mb-10 transform-gpu hover:scale-105 transition-transform cursor-default">
              <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-ping" />
              <span className="text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-[0.2em]">Premium Hostel Living 2026</span>
            </div>

            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 text-[#1A1A1A] dark:text-white leading-[0.9] drop-shadow-sm">
              Rent <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent italic font-serif">Essentials</span>
            </h1>

            <p className="max-w-md text-xl text-gray-700 dark:text-gray-300 mb-12 leading-relaxed font-bold tracking-tight">
              Curated comfort for your student life. <br />
              <span className="text-blue-600 font-black">Browse. Rent. Relax.</span> Delivered straight to your hostel.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Link to="/browse" className="group relative w-full sm:w-auto bg-[#1A1A1A] dark:bg-blue-600 text-white font-black py-6 px-12 rounded-[2rem] transition-all shadow-2xl hover:shadow-blue-500/40 active:scale-95 overflow-hidden flex items-center justify-center">
                <span className="relative z-10 tracking-widest uppercase text-sm">Explore Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/dashboard" className="w-full sm:w-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl hover:bg-white text-gray-900 dark:text-white font-black py-6 px-12 rounded-[2rem] transition-all border border-gray-200/50 dark:border-gray-700/50 text-center shadow-xl tracking-widest uppercase text-sm active:scale-95">
                Dashboard
              </Link>
            </div>
          </div>

          {/* Pinterest-style Featured Image Group (Enhanced) */}
          <div className="flex-1 relative hidden lg:flex gap-6 h-[600px] animate-zoom-in">
            <div className="w-3/5 bg-white dark:bg-gray-900 rounded-[3rem] overflow-hidden shadow-2xl relative translate-y-12 transform-gpu hover:-translate-y-2 transition-transform duration-700">
              <img
                src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600"
                className="h-full w-full object-cover transition-transform duration-1000 hover:scale-110"
                alt="Featured Linen"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="w-2/5 flex flex-col gap-6">
              <div className="h-3/5 bg-gray-200 dark:bg-gray-800 rounded-[3rem] overflow-hidden shadow-2xl transform-gpu hover:-translate-y-2 transition-transform duration-700 delay-100">
                <img
                  src="https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=600"
                  className="h-full w-full object-cover transition-transform duration-1000 hover:scale-110"
                  alt="Featured Accessories"
                />
              </div>
              <div className="h-2/5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-10 text-white flex flex-col justify-end shadow-2xl transform-gpu hover:-translate-y-2 transition-transform duration-700 delay-200 group">
                <p className="text-3xl font-black leading-none tracking-tighter group-hover:scale-105 transition-transform">Best <br />Budget <br />Rentals</p>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mt-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
