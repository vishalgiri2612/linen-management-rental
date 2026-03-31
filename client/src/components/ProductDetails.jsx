import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { LuLoaderCircle, LuArrowLeft, LuStar, LuShieldCheck, LuTruck, LuRefreshCw, LuShoppingBag, LuCircleCheck, LuHeart, LuShare2, LuInfo, LuChevronRight, LuArrowRight } from 'react-icons/lu';
import toast from 'react-hot-toast';



const ProductDetails = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const { addToCart } = useCart();
   const [duration, setDuration] = useState('week');
   const [item, setItem] = useState(null);
   const [loading, setLoading] = useState(true);
   const [activeTab, setActiveTab] = useState('specs');
   const [isWishlisted, setIsWishlisted] = useState(false);

   useEffect(() => {
      const fetchItem = async () => {
         try {
            const response = await fetch(`http://localhost:5000/api/items/${id}`);
            if (!response.ok) throw new Error('Not found');
            const data = await response.json();

            const getFallbackImage = (name, category) => {
               const s = (name + ' ' + category).toLowerCase();
               if (s.includes('double')) return 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=800';
               if (s.includes('pillow')) return 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=800';
               if (s.includes('sofa')) return 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800';
               return 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800';
            };

            setItem({
               id: data._id,
               name: data.itemName,
               price: `₹${data.pricePerWeek}`,
               category: data.category,
               img: data.imageUrl || getFallbackImage(data.itemName || '', data.category || ''),
               description: data.description || 'Premium curated essential for your space.',
               specs: data.specs || { material: 'Premium Cotton Blend', threadCount: '300 TC', size: 'Universal', weight: 'Standard' }
            });
         } catch (error) {
            toast.error('Product not found in our collection');
         } finally {
            setLoading(false);
            window.scrollTo(0, 0);
         }
      };
      fetchItem();
   }, [id]);

   if (loading) return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0F172A]">
         <div className="relative">
            <div className="w-24 h-24 border-2 border-emerald-600/20 border-t-emerald-600 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-[10px] font-black uppercase tracking-widest animate-pulse">Elite</span>
            </div>
         </div>
      </div>
   );

   if (!item) return (
      <div className="pt-40 text-center min-h-screen bg-[#f8f9fa] dark:bg-[#0F172A]">
         <div className="max-w-md mx-auto px-6">
            <LuInfo className="mx-auto text-slate-300 mb-8" size={64} />
            <h2 className="text-4xl font-serif italic text-slate-400 mb-4 tracking-tighter">Essential not found.</h2>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-12">The item may have been moved or is currently in circulation.</p>
            <button onClick={() => navigate('/packages')} className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black uppercase tracking-[0.3em] text-[10px] transform hover:scale-105 transition-all shadow-xl">Back to Packages</button>
         </div>
      </div>
   );

   const numericPrice = parseInt(String(item.price || '0').replace('₹', ''));
   const currentPrice = duration === 'week' ? item.price : `₹${Math.round(numericPrice * 3.5)}`;

   const handleAddToCart = () => {
      addToCart({ ...item, price: currentPrice, duration });
      toast.success('Collection Updated', {
         style: {
            background: '#191c1d',
            color: '#fff',
            borderRadius: '30px',
            fontSize: '11px',
            fontWeight: '900',
            padding: '20px 30px'
         },
         icon: <LuCircleCheck size={16} className="text-emerald-400" />
      });
   };

   return (
      <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0F172A] text-slate-900 dark:text-white transition-colors duration-700 font-sans pb-32">
         {/* Editorial Navigation */}
         <div className="max-w-[1440px] mx-auto px-6 sm:px-12 pt-32 mb-12 flex items-center justify-between">
            <button
               onClick={() => navigate(-1)}
               className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all underline underline-offset-8 decoration-transparent hover:decoration-emerald-500"
            >
               <LuArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" />
               The Catalogue
            </button>
            <div className="flex items-center gap-8">
               <button onClick={() => setIsWishlisted(!isWishlisted)} className={`transition-colors ${isWishlisted ? 'text-red-500' : 'text-slate-300 hover:text-slate-900'}`}>
                  <LuHeart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
               </button>
               <button className="text-slate-300 hover:text-slate-900 transition-colors">
                  <LuShare2 size={20} />
               </button>
            </div>
         </div>

         <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 xl:gap-32">
               {/* Gallery Segment */}
               <div className="space-y-8 animate-fade-in">
                  <div className="relative group overflow-hidden rounded-[3rem] aspect-[4/5] bg-slate-100 dark:bg-white/5 shadow-2xl">
                     <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-110"
                     />
                     <div className="absolute top-10 left-10">
                        <div className="px-6 py-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full text-[10px] font-black uppercase text-white tracking-widest shadow-xl">
                           Signature Edit
                        </div>
                     </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                     {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-square rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-white/5 opacity-40 hover:opacity-100 cursor-pointer transition-all border border-transparent hover:border-emerald-500">
                           <img src={item.img} className="w-full h-full object-cover grayscale opacity-50" />
                        </div>
                     ))}
                  </div>
               </div>

               {/* Detail Segment */}
               <div className="flex flex-col animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="space-y-12">
                     <div className="space-y-6">
                        <div className="flex items-center gap-4 text-emerald-600 dark:text-emerald-400 text-[11px] font-black uppercase tracking-[0.5em] italic">
                           <span>{item.category}</span>
                           <div className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
                           <div className="flex items-center gap-1">
                              <LuStar size={12} fill="currentColor" />
                              <span>4.9 / 5</span>
                           </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black italic text-slate-900 dark:text-white leading-[0.9] tracking-tighter uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                           {(item.name || '').replace('The ', '')}<span className="italic block font-normal lowercase tracking-tight normal-case text-slate-900 dark:text-white mt-1.5" style={{ fontFamily: "'Playfair Display', serif" }}>the curated choice.</span>
                        </h1>
                        <div className="flex items-baseline gap-4 pt-4">
                           <span className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{currentPrice}</span>
                           <span className="text-sm text-slate-400 font-bold uppercase tracking-widest italic">/ {duration} rental</span>
                        </div>
                     </div>

                     <div className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium italic max-w-lg border-l-4 border-emerald-500 pl-8">
                        "{item.description}"
                     </div>

                     <div className="space-y-10">
                        <div className="bg-white dark:bg-slate-900/50 p-10 rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-xl">
                           <p className="text-[10px] font-black text-slate-400 uppercase mb-8 tracking-[0.5em] text-center">Rental Term</p>
                           <div className="flex p-2 bg-slate-50 dark:bg-black rounded-[2.5rem] shadow-inner relative">
                              <button
                                 onClick={() => setDuration('week')}
                                 className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.3em] rounded-[2rem] transition-all duration-500 ${duration === 'week' ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-2xl' : 'text-slate-400 hover:text-slate-900'}`}
                              >
                                 Weekly
                              </button>
                              <button
                                 onClick={() => setDuration('month')}
                                 className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.3em] rounded-[2rem] transition-all duration-500 ${duration === 'month' ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-2xl' : 'text-slate-400 hover:text-slate-900'}`}
                              >
                                 Monthly
                              </button>
                           </div>
                        </div>

                        <button
                           onClick={handleAddToCart}
                           className="w-full bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-black py-8 rounded-[3.5rem] transition-all shadow-3xl transform active:scale-95 text-[10px] uppercase tracking-[0.6em] flex items-center justify-center gap-6 group"
                        >
                           Reserve this Piece
                           <LuShoppingBag size={18} className="group-hover:rotate-12 transition-transform" />
                        </button>
                     </div>

                     <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center p-6 bg-slate-50 dark:bg-white/5 rounded-[2rem] text-center">
                           <LuShieldCheck className="text-emerald-500 mb-3" size={24} />
                           <span className="text-[8px] font-black uppercase tracking-widest leading-normal">Eco Sanity <br />Certified</span>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-slate-50 dark:bg-white/5 rounded-[2rem] text-center">
                           <LuTruck className="text-emerald-500 mb-3" size={24} />
                           <span className="text-[8px] font-black uppercase tracking-widest leading-normal">Student <br />Priority</span>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-slate-50 dark:bg-white/5 rounded-[2rem] text-center">
                           <LuRefreshCw className="text-emerald-500 mb-3" size={24} />
                           <span className="text-[8px] font-black uppercase tracking-widest leading-normal">Weekly <br />Exchange</span>
                        </div>
                     </div>

                     <div className="pt-8 border-t border-slate-100 dark:border-white/5">
                        <div className="flex gap-12 mb-10 overflow-x-auto pb-4 no-scrollbar">
                           {['specs', 'care', 'delivery'].map((tab) => (
                              <button
                                 key={tab}
                                 onClick={() => setActiveTab(tab)}
                                 className={`whitespace-nowrap text-[10px] font-black uppercase tracking-[0.5em] transition-all relative ${activeTab === tab ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-900'}`}
                              >
                                 {tab}
                                 {activeTab === tab && <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-emerald-500" />}
                              </button>
                           ))}
                        </div>

                        <div className="min-h-[150px]">
                           {activeTab === 'specs' && (
                              <div className="grid grid-cols-2 gap-y-6 animate-fade-in">
                                 {Object.entries(item.specs || {}).map(([key, val]) => (
                                    <div key={key} className="space-y-1">
                                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{key}</p>
                                       <p className="text-sm font-bold text-slate-900 dark:text-white uppercase">{val}</p>
                                    </div>
                                 ))}
                              </div>
                           )}
                           {activeTab === 'care' && (
                              <ul className="space-y-4 animate-fade-in list-none">
                                 {[
                                    'Wash cold with oxygen-based whitener.',
                                    'Tumble dry low or line dry for crispness.',
                                    'Iron slightly damp for the hotel finish.',
                                    'Steam to refresh between uses.'
                                 ].map((text, i) => (
                                    <li key={i} className="flex items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400 italic">
                                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                       {text}
                                    </li>
                                 ))}
                              </ul>
                           )}
                           {activeTab === 'delivery' && (
                              <div className="space-y-6 animate-fade-in">
                                 <p className="text-sm font-medium text-slate-500 dark:text-slate-400 italic leading-relaxed">
                                    We deliver to all major student residences every Tuesday and Friday. Tracking will be available in your dashboard upon confirmation.
                                 </p>
                                 <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl">
                                    <LuInfo size={16} className="text-emerald-600" />
                                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Order by 6PM for next window delivery.</span>
                                 </div>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <section className="mt-40 border-t border-slate-100 dark:border-white/5 pt-24">
               <div className="flex items-end justify-between mb-20">
                  <div className="space-y-6">
                     <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.5em]">You might also enjoy</span>
                     <h2 className="text-5xl font-black italic tracking-tighter uppercase">Completing the edit.</h2>
                  </div>
                  <button onClick={() => navigate('/packages')} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-all">
                     Explore Packages <LuChevronRight size={16} />
                  </button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
                  <div className="p-12 bg-white dark:bg-white/5 rounded-[3rem] border border-slate-100 dark:border-white/10 text-center flex flex-col items-center justify-center space-y-4">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Discover More</p>
                     <button onClick={() => navigate('/packages')} className="flex items-center gap-4 text-sm font-black uppercase tracking-widest text-emerald-500 hover:scale-105 transition-all">View All Packages <LuArrowRight /></button>
                  </div>
               </div>
            </section>
         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
      </div>
   );
};

export default ProductDetails;
