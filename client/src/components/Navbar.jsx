import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ darkMode, setDarkMode, selectedCity, onCityClick }) => {
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-[#0F172A]/70 backdrop-blur-3xl border-b border-slate-100 dark:border-slate-800 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center gap-16">
            <Link to="/" className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic flex items-center gap-2">
              LINEN<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">RENT.</span>
            </Link>
            
            {/* Location Selector */}
            <button 
              onClick={onCityClick}
              className="hidden lg:flex items-center gap-3 group px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-white/5 rounded-full transition-all border border-slate-100 dark:border-white/5 shadow-sm"
            >
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full group-hover:animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                {selectedCity || 'Locate'}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-10">
            <div className="hidden md:flex items-center gap-12 mr-6 text-slate-900 dark:text-white">
              <Link to="/browse" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all transform hover:-translate-y-0.5">Catalogue</Link>
              <Link to="/dashboard" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all transform hover:-translate-y-0.5">Dashboard</Link>
            </div>
            
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

            <Link to="/cart" className="relative p-4 text-slate-900 dark:text-white group bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
              <svg className="w-5 h-5 stroke-[2.5] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[8px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-[#0F172A] shadow-lg">
                {cartCount}
              </span>
            </Link>

            <div className="flex items-center gap-6 pl-8 border-l border-slate-100 dark:border-white/5">
              {isAuthenticated ? (
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hidden sm:inline-block">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <button 
                    onClick={logout}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all underline underline-offset-[12px] decoration-indigo-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="relative px-12 py-4 group overflow-hidden rounded-full shadow-lg transition-all active:scale-95">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 group-hover:from-indigo-700 group-hover:to-violet-700 transition-all" />
                  <span className="relative z-10 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors">
                    Join Us
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
