import React, { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Packages', path: '/packages' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Clean Promise', path: '/clean-promise' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 pointer-events-none ${isScrolled ? 'py-4 px-6' : 'py-0'}`}>
      <div className={`mx-auto flex items-center transition-all duration-500 bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-2xl border-x-[var(--border)] border-b-[var(--border)] pointer-events-auto ${isScrolled ? 'max-w-5xl rounded-full border px-10 py-3 shadow-emerald-500/10' : 'max-w-full rounded-none border-b px-12 py-8 shadow-none'}`}>

        {/* Logo Section */}
        <div className="w-1/4">
          <Link to="/" className="text-xl font-serif italic tracking-tighter uppercase group flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--accent-primary)] flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500">
              <span className="text-[var(--bg-primary)] font-bold rotate-[-45] group-hover:rotate-0 transition-transform">C</span>
            </div>
            {isScrolled ? '' : 'Closet'}<span className={`${isScrolled ? 'hidden' : 'opacity-40 group-hover:opacity-100 transition-opacity'}`}>Rush</span>
          </Link>
        </div>

        {/* Centered Navigation Links */}
        <div className={`flex-1 hidden lg:flex items-center justify-center transition-all duration-500 ${isScrolled ? 'gap-6' : 'gap-10'}`}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[10px] font-bold uppercase transition-all hover:text-[var(--accent-primary)] whitespace-nowrap ${isScrolled ? 'tracking-[0.2em]' : 'tracking-[0.4em]'} ${location.pathname === link.path ? 'text-[var(--accent-primary)]' : 'text-[var(--text-primary)]/50'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Elements Section */}
        <div className="w-1/4 flex items-center justify-end gap-10">
          <Link to="/cart" className="relative group">
            <LuShoppingCart className="w-5 h-5 text-[var(--text-primary)]/80 group-hover:text-[var(--accent-primary)] transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-[var(--accent-primary)] text-[var(--bg-primary)] text-[9px] font-bold h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-8">
              <Link to="/dashboard" className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-[var(--accent-primary)]/0 hover:border-[var(--accent-primary)]/100 transition-all pb-1">
                Account
              </Link>
              <button
                onClick={logout}
                className="opacity-40 hover:opacity-100 transition-opacity text-[var(--text-primary)]"
              >
                <LuLogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="px-8 py-3 bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-[0.2em] text-[10px] hover:opacity-80 transition-all">
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
            className="lg:hidden absolute top-32 left-6 right-6 bg-[var(--bg-secondary)] p-12 border border-[var(--border)] shadow-2xl z-[60] pointer-events-auto"
          >
            <div className="flex flex-col gap-12 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-serif italic text-[var(--text-primary)] uppercase tracking-tighter"
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-px bg-[var(--border)]" />

              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-[11px] font-bold uppercase tracking-[0.4em] text-[var(--accent-primary)]"
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
