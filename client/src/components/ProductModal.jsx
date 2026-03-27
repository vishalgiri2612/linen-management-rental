import React, { useState } from 'react';

const ProductModal = ({ item, isOpen, onClose, onAddToCart }) => {
  const [duration, setDuration] = useState('week');

  if (!isOpen || !item) return null;

  const currentPrice = duration === 'week' ? item.price : `₹${parseInt(item.price.replace('₹', '')) * 3.5}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div 
        className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-t-[40px] sm:rounded-[40px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300"
      >
        <div className="relative h-[400px]">
          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition-all">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">{item.name}</h2>
              <p className="text-gray-500 font-medium text-sm mt-1">{item.category} • Standard Size</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-gray-900 dark:text-white">{currentPrice}</p>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">/{duration}</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-3xl mb-8 border border-gray-100 dark:border-gray-700">
            <p className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">Select Rent Period</p>
            <div className="flex p-1 bg-gray-200 dark:bg-gray-950 rounded-2xl relative">
              <button 
                onClick={() => setDuration('week')}
                className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${duration === 'week' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}
              >
                1 Week
              </button>
              <button 
                onClick={() => setDuration('month')}
                className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${duration === 'month' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}
              >
                1 Month
              </button>
            </div>
            <p className="text-[11px] text-gray-500 mt-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Month rental includes a 15% discount on weekly price.
            </p>
          </div>

          <button 
            onClick={() => {
              onAddToCart({ ...item, price: currentPrice, duration });
              onClose();
            }}
            className="w-full bg-[#2D2D2D] hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-black py-5 rounded-[28px] transition-all shadow-xl active:scale-95 text-lg"
          >
            Add to Rent - {currentPrice}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
