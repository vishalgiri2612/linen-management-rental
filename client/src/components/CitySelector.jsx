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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-white/90 backdrop-blur-2xl overflow-y-auto animate-fade-in transition-all">
      <div className="max-w-7xl w-full py-12 px-6 transform transition-all animate-zoom-in relative">
        
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="text-center mb-24 relative z-10">
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.5em] mb-6 block italic">Global Network</span>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 tracking-tighter italic uppercase leading-none">
            Choose Your <br /> <span className="text-indigo-600">Location.</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Select a hub to initialize inventory</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-12 gap-y-16 relative z-10">
          {CITIES.map((city) => (
            <button
              key={city.id}
              onClick={() => onSelect(city)}
              className="group flex flex-col items-center gap-6 transition-all hover:-translate-y-4 active:scale-95 outline-none"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-[3rem] overflow-hidden border border-slate-100 group-hover:border-indigo-500 transition-all duration-500 shadow-2xl group-hover:shadow-indigo-500/20 bg-white">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
              </div>
              <div className="text-center">
                <span className="text-slate-400 group-hover:text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-300 italic">
                  {city.name}
                </span>
                <div className="w-0 h-0.5 bg-indigo-600 mx-auto mt-2 group-hover:w-full transition-all duration-500" />
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-32 text-center text-slate-200 dark:text-slate-800 font-black uppercase tracking-[1em] text-[10px]">
          Linen Rent Hub Systems
        </div>
      </div>
    </div>
  );
};

export default CitySelector;

