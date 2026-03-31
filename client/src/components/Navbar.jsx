import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LuShoppingCart, LuLogOut, LuUser, LuMenu, LuX } from 'react-icons/lu';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Packages', path: '/packages' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Clean Promise', path: '/clean-promise' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-8 px-6 lg:px-12 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-6 bg-[#1A3263] text-[#EFD2B0] shadow-[30px_30px_60px_-15px_rgba(26,50,99,0.4)] border border-white/5 pointer-events-auto">
        <div className="flex items-center gap-16">
          <Link to="/" className="text-xl font-serif italic tracking-tighter uppercase group flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FFC570] flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500">
              <span className="text-[#1A3263] font-bold rotate-[-45] group-hover:rotate-0 transition-transform">C</span>
            </div>
            Closet<span className="opacity-40 group-hover:opacity-100 transition-opacity">Rush</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all hover:text-[#FFC570] ${location.pathname === link.path ? 'text-[#FFC570]' : 'text-[#EFD2B0]/50'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-10">
          <Link to="/cart" className="relative group">
            <LuShoppingCart className="w-5 h-5 text-[#EFD2B0]/80 group-hover:text-[#FFC570] transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-[#FFC570] text-[#1A3263] text-[9px] font-bold h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-8">
              <Link to="/dashboard" className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-[#FFC570]/0 hover:border-[#FFC570]/100 transition-all pb-1">
                Account
              </Link>
              <button 
                onClick={logout}
                className="opacity-40 hover:opacity-100 transition-opacity"
              >
                <LuLogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="px-8 py-3 bg-[#FFC570] text-[#1A3263] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all">
              Login
            </Link>
          )}

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden"
          >
            {isOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-32 left-6 right-6 bg-[#1A3263] p-12 border border-white/5 shadow-2xl z-[60] pointer-events-auto"
          >
            <div className="flex flex-col gap-12 text-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-serif italic text-white uppercase tracking-tighter"
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="h-px bg-white/10" />
              
              <Link 
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#FFC570]"
              >
                Access Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
