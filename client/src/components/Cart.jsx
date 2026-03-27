import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, cartTotal, checkout } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-20 min-h-screen text-center px-4 bg-white dark:bg-gray-950 transition-colors">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Ready to enhance your hostel comfort?</p>
        <Link to="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/20">
          Browse Essentials
        </Link>
      </div>
    );
  }

  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.error(`${name} removed from cart`);
  };

  const handleCheckout = async () => {
    const success = await checkout();
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center md:text-left">Your Comfort Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-6 shadow-sm">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
                    <button onClick={() => handleRemove(item.id, item.name)} className="text-gray-400 hover:text-rose-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-blue-600 dark:text-blue-400 font-bold mt-1">{item.price}</p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded transition-colors text-gray-600 dark:text-white font-bold">-</button>
                      <span className="w-8 text-center text-sm font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded transition-colors text-gray-600 dark:text-white font-bold">+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl lg:sticky lg:top-24">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Deposit Fee</span>
                  <span>₹200</span>
                </div>
                <div className="h-px bg-gray-100 dark:bg-gray-800 w-full" />
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total Due</span>
                  <span>₹{cartTotal + 200}</span>
                </div>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-blue-500/20 mb-4"
              >
                Rent Essentials Now
              </button>
              <p className="text-xs text-center text-gray-500">Free doorstep delivery within 24 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
