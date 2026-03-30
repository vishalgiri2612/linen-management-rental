import React from 'react';

const CITIES = [
  { id: 'delhi', name: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-1f20d45bfef5?w=200&h=200&fit=crop' },
  { id: 'gurugram', name: 'Gurugram', image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=200&h=200&fit=crop' },
  { id: 'faridabad', name: 'Faridabad', image: 'https://images.unsplash.com/photo-1627814405908-ca213d463870?w=200&h=200&fit=crop' },
  { id: 'noida', name: 'Noida', image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=200&h=200&fit=crop' },
  { id: 'ghaziabad', name: 'Ghaziabad', image: 'https://images.unsplash.com/photo-1627814405908-ca213d463870?w=200&h=200&fit=crop' },
  { id: 'chandigarh', name: 'Chandigarh', image: 'https://images.unsplash.com/photo-1627663240030-cf2f49454131?w=200&h=200&fit=crop' },
  { id: 'ludhiana', name: 'Ludhiana', image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=200&h=200&fit=crop' },
  { id: 'jaipur', name: 'Jaipur', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=200&h=200&fit=crop' },
  { id: 'mumbai', name: 'Mumbai', image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=200&h=200&fit=crop' },
  { id: 'pune', name: 'Pune', image: 'https://images.unsplash.com/photo-1566679056463-3ac50ecd9036?w=200&h=200&fit=crop' },
  { id: 'indore', name: 'Indore', image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=200&h=200&fit=crop' },
  { id: 'lucknow', name: 'Lucknow', image: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=200&h=200&fit=crop' },
  { id: 'hyderabad', name: 'Hyderabad', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=200&h=200&fit=crop' },
  { id: 'ahmedabad', name: 'Ahmedabad', image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=200&h=200&fit=crop' },
  { id: 'bengaluru', name: 'Bengaluru', image: 'https://images.unsplash.com/photo-1596760405808-1662641ef667?w=200&h=200&fit=crop' },
  { id: 'agra', name: 'Agra', image: 'https://images.unsplash.com/photo-1564507592357-2e60383096bb?w=200&h=200&fit=crop' },
];

const CitySelector = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-white/95 dark:bg-[#0F172A]/98 backdrop-blur-3xl overflow-y-auto px-4 py-8 md:p-12 animate-fade-in transition-all">
      <div className="max-w-7xl mx-auto w-full min-h-full flex flex-col items-center justify-center transform transition-all animate-zoom-in relative">

        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 blur-[120px] rounded-full pointer-events-none opacity-50" />

        <div className="text-center mb-12 md:mb-20 relative z-10 w-full pt-12">
          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.5em] mb-4 block italic animate-fade-in">Global Network</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter italic uppercase leading-none">
            Choose Your <br className="hidden md:block" /> Location.
          </h1>
          <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em] text-[9px] md:text-[10px]">Select a hub to initialize inventory</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-12 relative z-10 w-full px-4">
          {CITIES.map((city) => (
            <button
              key={city.id}
              onClick={() => onSelect(city)}
              className="group flex flex-col items-center gap-4 md:gap-6 transition-all hover:-translate-y-3 active:scale-95 outline-none"
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-slate-100 dark:border-white/5 group-hover:border-emerald-500 transition-all duration-500 shadow-xl group-hover:shadow-emerald-500/20 bg-white dark:bg-white/5">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-all" />
              </div>
              <div className="text-center">
                <span className="text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] transition-all duration-300 italic">
                  {city.name}
                </span>
                <div className="w-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 mx-auto mt-1 md:mt-2 group-hover:w-full transition-all duration-500" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-16 pb-12 text-center text-slate-300 dark:text-slate-600 font-black uppercase tracking-[0.6em] md:tracking-[1em] text-[10px] relative z-10">
          ClosetRush Rent Systems • Premium Edition
        </div>
      </div>
    </div>
  );
};

export default CitySelector;

