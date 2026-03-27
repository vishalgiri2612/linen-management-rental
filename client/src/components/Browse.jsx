import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Search, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Browse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/items');
        const data = await response.json();
        // Map backend fields to frontend names if necessary, though it's better to use backend names
        const mappedData = data.map(item => ({
          id: item._id,
          name: item.itemName,
          price: `₹${item.pricePerWeek}`,
          category: item.category,
          img: item.imageUrl,
          description: item.description
        }));
        setItems(mappedData);
      } catch (error) {
        toast.error('Failed to load inventory');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) setActiveCategory(cat);
  }, [location.search]);

  const categories = ['All Items', ...new Set(items.map(item => item.category))];

  const filteredItems = items.filter(item => 
    (activeCategory === 'All Items' || item.category === activeCategory) &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    addToCart(item);
  };


  return (
    <div className="min-h-screen bg-[#FDFCFB] dark:bg-gray-950 transition-colors pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <h1 className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-4 leading-none">
              Browse <br />
              <span className="text-blue-600">Collection</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-bold">
              Explore 20+ premium essentials curated for the modern hostel lifestyle.
            </p>
          </div>

          {/* Search Bar - Moved from Home to Browse */}
          <div className="relative group w-full md:w-96">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="Search rentals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2rem] py-5 pl-14 pr-8 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold placeholder:text-gray-300 dark:placeholder:text-gray-600 shadow-xl shadow-blue-900/5"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-start gap-3 mb-16 px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3.5 rounded-2xl text-[10px] uppercase font-black tracking-[0.2em] transition-all shadow-sm ${
                activeCategory === cat 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                : 'bg-white dark:bg-gray-900 text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-100 dark:border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
             <Loader2 size={40} className="animate-spin text-blue-600 mb-4" />
             <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Loading Inventory...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in">
            {filteredItems.map((item) => (

            <div 
              key={item.id}
              onClick={() => navigate(`/product/${item.id}`)}
              className="group cursor-pointer bg-white dark:bg-gray-900 rounded-[3rem] overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-5 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg text-gray-900 dark:text-white border border-white/20">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <button 
                    onClick={(e) => handleAddToCart(e, item)}
                    className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:bg-black active:scale-95 transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight mb-3">
                  {item.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium line-clamp-2 mb-8">
                  {item.description}
                </p>
                <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-800 pt-6">
                  <div>
                    <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">Rent per week</span>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">
                      {item.price}<span className="text-sm font-bold text-gray-400 ml-1">/wk</span>
                    </p>
                  </div>
                  <button className="text-xs font-black text-gray-900 dark:text-white hover:text-blue-600 uppercase tracking-wider transition-colors">
                    Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-32">
            <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-bold text-2xl tracking-tight italic">No results found for "{searchQuery}"</p>
            <button 
                onClick={() => setSearchQuery('')}
                className="mt-6 text-blue-600 font-black uppercase tracking-widest text-xs hover:underline"
            >
                Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
