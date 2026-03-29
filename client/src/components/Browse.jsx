import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Search, Loader2, Filter, SlidersHorizontal, ShoppingBag, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const MOCK_ITEMS = [
  { id: 1, name: 'The Classic Single Bed Set', category: 'Bedding', description: 'Fresh, crisp cotton tailored for your modern single bed. A tactile essential.', price: 49, img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800' },
  { id: 2, name: 'Signature Double Sheets', category: 'Bedding', description: 'Expansive, luxurious feel with our premium double bed weave. Rest effortlessly.', price: 89, img: '/items/double_bed.png' },
  { id: 3, name: 'Oxford Pillow Slips', category: 'Pillow Covers', description: 'Twin set of finely detailed, breathable cotton pillow covers.', price: 29, img: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=800' },
  { id: 4, name: 'Velvet Throw Pillow Cover', category: 'Pillow Covers', description: 'Deep-pile velvet with a hand-finished edge. Pure editorial comfort.', price: 35, img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800' },
  { id: 5, name: 'Minimalist Sofa Throw', category: 'Sofa Covers', description: 'Drape your living space in structural warmth with our signature throw.', price: 110, img: 'https://images.unsplash.com/photo-1512331283953-19967202237d?w=800' },
  { id: 6, name: 'Linen Sectional Cover', category: 'Sofa Covers', description: 'Complete coverage in natural, earthy tones for a cohesive aesthetic.', price: 149, img: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800' },
];

const Browse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category') || 'All Pieces';
  const initialSearch = searchParams.get('search') || '';
  
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
    
    const search = searchParams.get('search');
    if (search !== null) setSearchQuery(search);
  }, [location.search]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/items');
        if (!response.ok) throw new Error();
        const data = await response.json();
        
        const getFallbackImage = (name, category) => {
          const s = (name + ' ' + category).toLowerCase();
          if (s.includes('double')) return '/items/double_bed.png';
          if (s.includes('pillow')) return 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=800';
          if (s.includes('sofa')) return 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800';
          return 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800';
        };

        if (data.length === 0) {
          setItems(MOCK_ITEMS);
        } else {
          const mappedData = data.map(item => ({
            id: item._id,
            name: item.itemName,
            price: item.pricePerWeek,
            category: item.category,
            img: item.imageUrl || getFallbackImage(item.itemName || '', item.category || ''),
            description: item.description || 'Premium curated essential for your space.',
          }));
          setItems(mappedData);
        }
      } catch (error) {
        setItems(MOCK_ITEMS);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const categories = ['All Pieces', 'Bedding', 'Pillow Covers', 'Sofa Covers'];

  const filteredItems = items.filter(item => 
    (activeCategory === 'All Pieces' || item.category === activeCategory) &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    item.price <= priceRange[1]
  );

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    addToCart({ ...item, price: `₹${item.price}` });
    toast.success('Collection updated', {
      style: {
        background: '#191c1d',
        color: '#fff',
        borderRadius: '24px',
        fontSize: '12px',
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0F172A] text-[#191c1d] dark:text-[#f8fafc] pt-32 pb-32 transition-colors duration-700 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Editorial Grid Gutter */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        
        {/* Header Section: The Editorial North Star */}
        <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12 border-b border-[#c7c4d7]/15 pb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
               <Sparkles size={16} className="text-[#6366F1]" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6366F1]">The Curated Thread</span>
            </div>
            <h1 className="text-[clamp(3.5rem,8vw,6rem)] font-serif italic font-light tracking-tighter leading-[0.9] capitalize mb-10 animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              The Curated <br />
              <span className="font-sans font-black not-italic text-[#6366F1]/90">Inventory.</span>
            </h1>
            <p className="text-xl text-[#464554] dark:text-slate-400 font-normal leading-relaxed max-w-lg animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              Moving away from rigid constraints, we embrace an aesthetic reminiscent of a premium lifestyle magazine. Soft, luxurious, and deeply intentional.
            </p>
          </div>

          {/* Minimal Search Field */}
          <div className="relative w-full md:w-[400px] animate-fade-in opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
             <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-white/5 border-b border-[#c7c4d7] dark:border-white/10 py-6 pr-12 text-lg focus:outline-none transition-all placeholder:text-[#c7c4d7] font-serif italic"
             />
             <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <Search size={24} className="text-[#c7c4d7]" />
             </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-24">
          
          {/* Tonal Navigation Aside */}
          <aside className="w-full lg:w-64 shrink-0 space-y-20 animate-fade-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            <div className="space-y-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#c7c4d7]">Material & Edit</h3>
              <nav className="flex lg:flex-col flex-wrap gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left px-2 py-3 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative group ${
                      activeCategory === cat 
                      ? 'text-[#6366F1]' 
                      : 'text-[#464554] hover:text-[#191c1d] dark:hover:text-white'
                    }`}
                  >
                    {cat}
                    {activeCategory === cat && (
                      <div className="absolute left-[-1rem] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#6366F1] rounded-full" />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            <div className="space-y-10">
               <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#c7c4d7]">Intensity</h3>
               <div className="space-y-8 px-2">
                  <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-px bg-[#c7c4d7] appearance-none cursor-pointer accent-[#6366F1]"
                  />
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.3em] text-[#464554]">
                     <span>₹0</span>
                     <span>Under ₹{priceRange[1]}</span>
                  </div>
               </div>
            </div>
          </aside>

          {/* The Bento Collection Grid */}
          <main className="flex-1">
             {loading ? (
                <div className="flex flex-col items-center justify-center py-60">
                   <div className="w-12 h-12 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin mb-6" />
                   <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[#c7c4d7]">Curating the feed...</p>
                </div>
             ) : filteredItems.length === 0 ? (
                <div className="text-center py-60 bg-[#edeeef] dark:bg-white/5 rounded-[3rem]">
                   <p className="font-serif italic text-3xl text-[#c7c4d7]">No pieces found in this edit.</p>
                </div>
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-12 gap-y-24">
                   {filteredItems.map((item, idx) => (
                      <div 
                        key={item.id}
                        onClick={() => navigate(`/product/${item.id}`)}
                        className={`group relative flex flex-col cursor-pointer transition-all duration-700 animate-fade-in opacity-0`}
                        style={{ 
                          animationDelay: `${1.2 + (idx * 0.1)}s`, 
                          animationFillMode: 'forwards',
                          marginTop: idx % 3 === 1 ? '4rem' : '0' // Intentional Asymmetry
                        }}
                      >
                         {/* Image Layer: The Canvas */}
                         <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-[#edeeef] dark:bg-white/5 transition-all duration-1000 group-hover:rounded-[1.5rem]">
                            <img 
                               src={item.img} 
                               alt={item.name} 
                               className="w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                            />
                            
                            {/* The Glass Badge: Tonal Layering */}
                            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/20 rounded-[1.5rem] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex justify-between items-center">
                               <span className="text-[10px] font-black uppercase tracking-widest">Enquire</span>
                               <ArrowUpRight size={16} />
                            </div>

                            {/* Corner Price Tag */}
                            <div className="absolute top-6 right-6 w-12 h-12 bg-white dark:bg-[#191c1d] rounded-full flex items-center justify-center text-[10px] font-black shadow-xl group-hover:scale-110 transition-transform">
                               ₹{item.price}
                            </div>
                         </div>

                         {/* Content Section: The Editorial Tension */}
                         <div className="pt-10 space-y-4 px-2">
                            <div className="flex items-center gap-3">
                               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#6366F1]">{item.category}</span>
                               <div className="w-1 h-1 bg-[#c7c4d7] rounded-full" />
                               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#464554]">The 2024 Edit</span>
                            </div>
                            <h3 className="text-3xl font-serif italic text-[#191c1d] dark:text-white leading-tight group-hover:text-[#6366F1] transition-colors">{item.name}</h3>
                            <p className="text-sm text-[#464554] dark:text-slate-400 font-normal leading-relaxed line-clamp-2">{item.description}</p>
                            
                            <button 
                              onClick={(e) => handleAddToCart(e, item)}
                              className="mt-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] group/btn transition-all"
                            >
                               <span className="border-b border-transparent group-hover/btn:border-[#6366F1] pb-1">Add to selection</span>
                               <div className="w-8 h-8 rounded-full border border-[#c7c4d7] flex items-center justify-center group-hover/btn:bg-[#6366F1] group-hover/btn:border-[#6366F1] group-hover/btn:text-white transition-all">
                                  <ShoppingBag size={12} />
                               </div>
                            </button>
                         </div>
                      </div>
                   ))}
                </div>
             )}
          </main>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default Browse;
