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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="max-w-5xl w-full py-8 px-4 transform transition-all animate-zoom-in">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-white mb-16 tracking-tight drop-shadow-lg">
          Please select your City
        </h1>
        
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-12">
          {CITIES.map((city) => (
            <button
              key={city.id}
              onClick={() => onSelect(city)}
              className="group flex flex-col items-center gap-4 transition-all hover:scale-110 active:scale-95 outline-none"
            >
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-white/30 group-hover:border-blue-500 transition-all duration-300 shadow-2xl">
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-transparent transition-all" />
              </div>
              <span className="text-white/80 group-hover:text-white font-bold text-xl tracking-tight transition-all duration-300">
                {city.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitySelector;

