import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuShoppingBag, LuBox, LuCreditCard, LuCircleCheck, LuChevronRight, LuMapPin, LuSend, LuZap, LuCircleX, LuLoaderCircle } from 'react-icons/lu';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cart, removeFromCart, checkout, cartTotal } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hostel: '',
    room: '',
    date: ''
  });

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    const success = await checkout();
    setIsProcessing(false);
    if (success) {
      setStep(3);
    }
  };

  if (cart.length === 0 && step === 1) {
    return (
      <div className="pt-44 pb-24 px-4 flex flex-col items-center text-center">
        <LuShoppingBag className="w-24 h-24 text-slate-100 dark:text-slate-800 mb-8" />
        <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-4">Your Bag is Empty</h2>
        <p className="text-slate-500 mb-12 font-medium italic">Choose a plan to upgrade your hostel sleep.</p>
        <Link to="/packages" className="px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-500/20">
           Explore Packages
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="flex justify-center mb-16 px-8">
         <div className="flex items-center gap-12 relative">
            <div className={`absolute top-1/2 left-0 w-full h-px -z-10 transition-all duration-700 ${step > 1 ? 'bg-emerald-500' : 'bg-slate-100 dark:bg-slate-800'}`} />
            
            {[1, 2, 3].map(i => (
               <div key={i} className="flex flex-col items-center gap-3">
                  <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${step >= i ? 'bg-emerald-500 border-white dark:border-[#0F172A] text-white shadow-2xl scale-110' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-300'}`}>
                     <span className="font-black text-xs">{i}</span>
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-[0.2em] italic ${step >= i ? 'text-emerald-500' : 'text-slate-300'}`}>
                     Step 0{i}
                  </span>
               </div>
            ))}
         </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            <div className="lg:col-span-2 space-y-6">
               <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-8">Selected Packages</h3>
               {cart.map((item, i) => (
                  <div key={i} className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none flex items-center justify-between group">
                     <div className="flex items-center gap-8">
                        <div className="w-20 h-20 bg-indigo-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden">
                           <LuBox className="w-10 h-10 text-indigo-500" />
                        </div>
                        <div>
                           <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">{item.name}</h4>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">₹{item.price} / Month</p>
                        </div>
                     </div>
                     <button onClick={() => removeFromCart(item.id)} className="p-4 text-slate-300 hover:text-rose-500 transition-colors">
                        <LuCircleX className="w-6 h-6" />
                     </button>
                  </div>
               ))}
            </div>
            
            <div className="p-10 bg-slate-50 dark:bg-slate-800/50 rounded-[3rem] h-fit border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                <div>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Summary</h4>
                   <div className="space-y-6 mb-8">
                      <div className="flex justify-between font-black uppercase text-xs italic">
                         <span className="text-slate-500">Subtotal</span>
                         <span className="text-slate-900 dark:text-white">₹{cartTotal}</span>
                      </div>
                      <div className="flex justify-between font-black uppercase text-xs italic">
                         <span className="text-slate-500">Set-up Fee</span>
                         <span className="text-emerald-500">FREE</span>
                      </div>
                   </div>
                   <div className="w-full h-px bg-slate-200 dark:bg-slate-700 mb-8" />
                   <div className="flex justify-between font-black uppercase text-xl italic mb-12">
                      <span className="text-slate-900 dark:text-white">Total</span>
                      <span className="text-indigo-500">₹{cartTotal}</span>
                   </div>
                </div>
                <button onClick={handleNextStep} className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
                   Hostel Details <LuChevronRight className="w-4 h-4" />
                </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-2xl mx-auto"
          >
             <div className="p-12 bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-12 leading-tight">Where should we <br /> <span className="text-emerald-500 italic">deliver?</span></h3>
                
                <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
                   <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Hostel Name</label>
                       <div className="relative group">
                          <LuMapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500" />
                          <input 
                            required
                            type="text" 
                            placeholder="e.g. IIT Delhi, Nilgiri Hostel" 
                            className="w-full pl-16 pr-8 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-3xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 font-bold" 
                            value={formData.hostel}
                            onChange={(e) => setFormData({...formData, hostel: e.target.value})}
                          />
                       </div>
                   </div>

                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Room Number</label>
                         <input 
                            required
                            type="text" 
                            placeholder="e.g. 504" 
                            className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-3xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 font-bold" 
                            value={formData.room}
                            onChange={(e) => setFormData({...formData, room: e.target.value})}
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Move-in Date</label>
                         <div className="relative group">
                            <input 
                                required
                                type="date" 
                                className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-3xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 font-bold" 
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                            />
                         </div>
                      </div>
                   </div>

                   <div className="bg-emerald-50 dark:bg-emerald-500/5 p-8 rounded-[2rem] border border-emerald-100 dark:border-emerald-500/20 flex items-start gap-4">
                      <LuSend className="w-6 h-6 text-emerald-500 shrink-0" />
                      <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 leading-relaxed italic">
                        By placing your order, you confirm that your hostel allows outside linen services. Delivery is scheduled for 10 AM on your move-in date.
                      </p>
                   </div>

                   <button 
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                   >
                      {isProcessing ? (
                        <>Processing... <LuLoaderCircle className="w-5 h-5 animate-spin" /></>
                      ) : (
                        <>Proceed to Payment (₹{cartTotal}) <LuCreditCard className="w-5 h-5" /></>
                      )}
                   </button>
                </form>
             </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center p-20 bg-emerald-50 dark:bg-slate-900/50 rounded-[4rem] border border-emerald-100 dark:border-slate-800"
          >
             <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center mb-12 shadow-2xl shadow-emerald-500/30">
                <LuCircleCheck className="w-16 h-16 text-white" strokeWidth={3} />
             </div>
             <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-4 leading-tight">Order <br /><span className="text-emerald-500 italic">Confirmed!</span></h3>
             <p className="text-lg text-slate-500 dark:text-slate-400 font-medium italic mb-12 max-w-md">Your fresh start is scheduled. Track your sterile package in the dashboard.</p>
             <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/track" className="px-10 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl transition-all hover:scale-105">
                   Track Delivery
                </Link>
                <Link to="/dashboard" className="px-10 py-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white rounded-full font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105">
                   Go to Dashboard
                </Link>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;

