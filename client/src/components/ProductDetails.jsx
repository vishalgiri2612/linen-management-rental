import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [duration, setDuration] = useState('week');
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/items');
        const data = await response.json();
        const found = data.find(i => i._id === id);
        
        const getFallbackImage = (name, category) => {
          const s = (name + ' ' + category).toLowerCase();
          if (s.includes('double')) return 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=800';
          if (s.includes('pillow')) return 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=800';
          if (s.includes('sofa')) return 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800';
          return 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800';
        };

        if (found) {
          setItem({
            id: found._id,
            name: found.itemName,
            price: `₹${found.pricePerWeek}`,
            category: found.category,
            img: found.imageUrl || getFallbackImage(found.itemName || '', found.category || ''),
            description: found.description || 'Premium curated essential for your space.',
          });
        }
      } catch (error) {
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0F172A]">
       <Loader2 className="animate-spin text-indigo-600" size={60} />
    </div>
  );

  if (!item) return (
    <div className="pt-32 text-center min-h-screen bg-white dark:bg-[#0F172A]">
       <h2 className="text-3xl font-black text-slate-300 uppercase tracking-[0.4em]">Essential Not Found</h2>
       <button onClick={() => navigate('/browse')} className="mt-8 px-10 py-4 bg-slate-900 text-white rounded-full font-black uppercase tracking-widest text-[10px]">Back to Browse</button>
    </div>
  );

  const currentPrice = duration === 'week' ? item.price : `₹${parseInt(item.price.replace('₹', '')) * 3.5}`;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white dark:bg-[#0F172A] transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-12 flex items-center gap-3 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px] group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Image Section */}
          <div className="relative aspect-[4/5] rounded-[5rem] overflow-hidden shadow-3xl bg-slate-50 border border-slate-100 dark:border-white/5">
            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
            <button className="absolute top-10 right-10 bg-white/80 dark:bg-black/40 backdrop-blur-xl text-slate-900 dark:text-white p-6 rounded-3xl transition-all shadow-xl hover:scale-110">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Product Info Section */}
          <div className="px-2 space-y-12">
            <div>
              <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.5em] mb-6 block italic">
                {item.category} • Signature Series
              </span>
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] mb-10 tracking-tighter uppercase italic">
                {item.name}
              </h1>
              <div className="flex items-end gap-4">
                <p className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">{currentPrice}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-2 tracking-[0.2em] italic">/{duration} rental</p>
              </div>
            </div>

            <div className="space-y-10">
              {/* Duration Selector */}
              <div className="bg-slate-50 dark:bg-gray-900/50 p-10 rounded-[4rem] shadow-sm border border-slate-100 dark:border-white/10">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-8 tracking-[0.4em] text-center">Select Duration</p>
                <div className="flex p-2 bg-white dark:bg-gray-950 rounded-[3rem] shadow-inner relative">
                  <button 
                    onClick={() => setDuration('week')}
                    className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] rounded-[2.5rem] transition-all duration-500 ${duration === 'week' ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-2xl scale-[1.02]' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    1 Week
                  </button>
                  <button 
                    onClick={() => setDuration('month')}
                    className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] rounded-[2.5rem] transition-all duration-500 ${duration === 'month' ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-2xl scale-[1.02]' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    1 Month
                  </button>
                </div>
                <div className="mt-8 flex items-start gap-4 p-5 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-3xl border border-indigo-100/50 dark:border-indigo-500/10">
                   <div className="w-10 h-10 bg-white dark:bg-indigo-900 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                   </div>
                  <p className="text-[11px] text-indigo-700 dark:text-indigo-400 font-bold leading-relaxed uppercase tracking-wider">
                    Student Priority: Includes premium quality sanitization and local student delivery perks.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => addToCart({ ...item, price: currentPrice, duration })}
                className="w-full bg-slate-900 hover:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-black py-8 rounded-[3.5rem] transition-all shadow-3xl transform active:scale-95 text-[10px] uppercase tracking-[0.5em] flex items-center justify-center gap-6 group"
              >
                Reserve Collection
                <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
              </button>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="p-6 rounded-[3rem] bg-slate-50 dark:bg-gray-800/50 border border-slate-100 dark:border-gray-800 shadow-sm">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Quality</p>
                <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">Eco-Sanitized</p>
              </div>
              <div className="p-6 rounded-[3rem] bg-slate-50 dark:bg-gray-800/50 border border-slate-100 dark:border-gray-800 shadow-sm">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Service</p>
                <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">Student Express</p>
              </div>
            </div>
            
            {/* Description */}
            <div className="mt-12 bg-white dark:bg-gray-800/20 p-10 rounded-[4rem] border border-slate-100 dark:border-gray-800 shadow-sm">
               <h3 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.4em] mb-6 underline underline-offset-8 decoration-indigo-600/30">Description</h3>
               <p className="text-slate-500 dark:text-gray-400 leading-relaxed font-bold text-sm tracking-tight">
                 {item.description}
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
