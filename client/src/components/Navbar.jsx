import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ darkMode, setDarkMode, selectedCity, onCityClick }) => {
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFCFB]/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-12">
            <Link to="/" className="text-2xl font-black text-[#2D2D2D] dark:text-white tracking-tighter">
              LINEN RENT <span className="text-blue-600">.</span>
            </Link>
            
            {/* Location Selector */}
            <button 
              onClick={onCityClick}
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-2xl transition-all group group-hover:shadow-lg shadow-sm"
            >
              <svg className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {selectedCity || 'Select City'}
              </span>
              <svg className="w-3.5 h-3.5 text-gray-400 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 mr-4">
              <Link to="/browse" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white text-sm font-bold transition-colors">Browse</Link>
              <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white text-sm font-bold transition-colors">Dashboard</Link>
            </div>
            
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

            <Link to="/cart" className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors mr-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 110 4 2 2 0 010-4z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                {cartCount}
              </span>
            </Link>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-100 dark:border-gray-700">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-500 hidden sm:inline-block">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <button 
                    onClick={logout}
                    className="bg-gray-900 dark:bg-gray-800 hover:bg-black dark:hover:bg-gray-700 text-white text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all shadow-lg shadow-blue-900/20 dark:shadow-blue-900/30">
                  Login
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

