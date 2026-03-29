import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, cartTotal, checkout } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-48 pb-20 min-h-screen text-center px-4 bg-white dark:bg-[#0F172A] transition-colors relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20" />
        <h2 className="text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter uppercase italic leading-none">Your Fleet <br /> is Empty.</h2>
        <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] mb-12 italic">No active essentials in transit</p>
        <Link to="/browse" className="inline-block bg-slate-900 hover:bg-black dark:bg-indigo-600 text-white font-black py-6 px-12 rounded-[2.5rem] transition-all shadow-3xl text-[10px] uppercase tracking-[0.4em]">
          Browse Collection
        </Link>
      </div>
    );
  }

  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.error(`${name} removed from fleet`);
  };

  const handleCheckout = async () => {
    const success = await checkout();
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="pt-40 pb-24 min-h-screen bg-white dark:bg-[#0F172A] transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 animate-fade-in">
          <div>
            <h1 className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-[0.85]">Your <br /> Selection.</h1>
            <p className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.5em] mt-6 italic">Registry / Active Cart</p>
          </div>
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] italic">{cart.length} Essentials Identified</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-10">
            {cart.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-900 p-8 rounded-[3.5rem] border border-slate-100 dark:border-gray-800 flex items-center gap-10 shadow-sm hover:shadow-3xl transition-all duration-700 relative group group">
                <div className="w-32 h-32 bg-slate-50 dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shrink-0 shadow-lg border border-slate-100 group-hover:scale-105 transition-transform duration-500">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[9px] font-black text-indigo-600 dark:text-blue-400 uppercase tracking-[0.4em] mb-2 block italic">Verified Essential</span>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">{item.name}</h3>
                    </div>
                    <button onClick={() => handleRemove(item.id, item.name)} className="text-slate-200 hover:text-rose-500 transition-colors p-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-8">
                    <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">{item.price}</p>
                    
                    <div className="flex items-center bg-slate-50 dark:bg-gray-800 rounded-[1.5rem] p-1.5 shadow-inner">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-10 h-10 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all text-slate-400 hover:text-slate-900 font-black shadow-none hover:shadow-sm">-</button>
                      <span className="w-10 text-center text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all text-slate-400 hover:text-slate-900 font-black shadow-none hover:shadow-sm">+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 p-10 rounded-[4rem] border border-slate-50 dark:border-gray-800 shadow-3xl lg:sticky lg:top-32 relative overflow-hidden transition-all hover:shadow-indigo-500/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] rounded-full" />
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter uppercase italic">Registry Summary</h3>
              <div className="space-y-6 mb-12">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-slate-900 dark:text-white tracking-tighter text-sm">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <span>Registry Fee</span>
                  <span className="text-slate-900 dark:text-white tracking-tighter text-sm">₹200</span>
                </div>
                <div className="h-px bg-slate-50 dark:bg-gray-800 w-full" />
                <div className="flex justify-between items-end pt-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white">Total Due</span>
                  <span className="text-5xl font-black text-indigo-600 dark:text-white tracking-tighter leading-none italic uppercase">₹{cartTotal + 200}</span>
                </div>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="w-full bg-slate-900 hover:bg-black dark:bg-indigo-600 text-white font-black py-7 rounded-[2.5rem] transition-all shadow-3xl transform active:scale-95 text-[10px] uppercase tracking-[0.5em] mb-6"
              >
                Initialize Rental
              </button>
              <div className="flex items-center justify-center gap-3 text-slate-300 dark:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] italic">Express transit within 24hr</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
