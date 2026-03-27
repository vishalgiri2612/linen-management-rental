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
        // Since we don't have a single item fetch route yet, we fetch all and find
        // In a real app, GET /api/items/:id is better
        const response = await fetch('http://localhost:5000/api/items');
        const data = await response.json();
        const found = data.find(i => i._id === id);
        
        if (found) {
          setItem({
            id: found._id,
            name: found.itemName,
            price: `₹${found.pricePerWeek}`,
            category: found.category,
            img: found.imageUrl,
            description: found.description
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
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] dark:bg-gray-950">
       <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  if (!item) return (
    <div className="pt-32 text-center min-h-screen bg-[#FDFCFB] dark:bg-gray-950">
       <h2 className="text-2xl font-black text-gray-400 uppercase tracking-widest">Product Not Found</h2>
       <button onClick={() => navigate('/browse')} className="mt-4 text-blue-600 font-bold hover:underline">Back to Browse</button>
    </div>
  );

  const currentPrice = duration === 'week' ? item.price : `₹${parseInt(item.price.replace('₹', '')) * 3.5}`;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#F4F1EE] dark:bg-gray-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors font-bold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Image Section */}
          <div className="relative aspect-square rounded-[48px] overflow-hidden shadow-2xl">
            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            <button className="absolute top-8 right-8 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-4 rounded-full transition-all">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Product Info Section */}
          <div className="px-2">
            <div className="mb-10">
              <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] mb-4 block">
                {item.category} • Student Essential
              </span>
              <h1 className="text-5xl font-black text-[#2D2D2D] dark:text-white leading-tight mb-4">
                {item.name}
              </h1>
              <div className="flex items-end gap-3">
                <p className="text-4xl font-black text-gray-900 dark:text-white">{currentPrice}</p>
                <p className="text-sm text-gray-400 font-bold uppercase mb-1">/{duration}</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Duration Selector */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-800">
                <p className="text-xs font-black text-gray-400 uppercase mb-6 tracking-widest text-center">Rental Period</p>
                <div className="flex p-1.5 bg-[#F4F1EE] dark:bg-gray-950 rounded-[28px] relative">
                  <button 
                    onClick={() => setDuration('week')}
                    className={`flex-1 py-4 text-sm font-black rounded-[22px] transition-all ${duration === 'week' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    1 Week
                  </button>
                  <button 
                    onClick={() => setDuration('month')}
                    className={`flex-1 py-4 text-sm font-black rounded-[22px] transition-all ${duration === 'month' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    1 Month
                  </button>
                </div>
                <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-[11px] text-blue-700 dark:text-blue-400 font-medium leading-relaxed">
                    Note: All student rentals include a quality check and professional sanitization before delivery.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => addToCart({ ...item, price: currentPrice, duration })}
                className="w-full bg-[#2D2D2D] hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-black py-6 rounded-[32px] transition-all shadow-2xl transform active:scale-95 text-xl flex items-center justify-center gap-4 group"
              >
                Add to Rent
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-4 mt-12">
              <div className="p-4 rounded-3xl bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Standard</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Eco-Sanitized</p>
              </div>
              <div className="p-4 rounded-3xl bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Support</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">24/7 Service</p>
              </div>
            </div>
            
            {/* Description */}
            <div className="mt-12 bg-white/30 dark:bg-gray-800/20 p-8 rounded-[40px] border border-gray-100 dark:border-gray-800">
               <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-4">Product Details</h3>
               <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
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
