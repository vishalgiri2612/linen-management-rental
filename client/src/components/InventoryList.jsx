import React from 'react';
import { useNavigate } from 'react-router-dom';
import { items } from '../data/products';

const categories = ['All Items', 'Bedding', 'Comfort', 'Study', 'Personal Care'];

const InventoryList = ({ searchQuery }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = React.useState('All Items');

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'All Items' || item.category === activeCategory;
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-[#F4F1EE] dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Chips */}
        <div className="flex gap-3 overflow-x-auto pb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
                activeCategory === cat 
                ? 'bg-[#2D2D2D] text-white' 
                : 'bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Discover Essentials</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => navigate(`/product/${item.id}`)}
              className={`group cursor-pointer bg-white dark:bg-gray-900 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-white ${item.span}`}
            >
              <div className="relative h-full w-full">
                <img 
                  src={item.img} 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Simplified Overlay Info to match the Pinterest aesthetic from previous image */}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest">{item.category}</h3>
                  <p className="text-lg font-black text-white">{item.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm font-bold text-white/90">
                      {item.price} <span className="text-[10px] opacity-70 font-normal">{item.period}</span>
                    </p>
                    <div className="bg-white/20 backdrop-blur-md text-white p-2 rounded-xl">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InventoryList;
