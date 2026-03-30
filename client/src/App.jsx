import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import CitySelector from './components/CitySelector';
import Browse from './components/Browse';
import AdminLogin from './components/AdminLogin';


// Admin Protection Wrapper
const AdminRoute = ({ children, isAuth }) => {
  return isAuth ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('isAdminAuthenticated') === 'true';
  });
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('userCity'));
  const [showCitySelector, setShowCitySelector] = useState(!localStorage.getItem('userCity'));
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    // Disable body scroll when city selector is open
    if (showCitySelector) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showCitySelector]);

  const handleCitySelect = (city) => {
    localStorage.setItem('userCity', city.name);
    setSelectedCity(city.name);
    setShowCitySelector(false);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>

          <div className="min-h-screen bg-white dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-500 font-sans">
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                className: 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl',
              }}
            />
            {showCitySelector && <CitySelector onSelect={handleCitySelect} />}

            <Navbar
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              selectedCity={selectedCity}
              onCityClick={() => setShowCitySelector(true)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <Routes>
              <Route path="/" element={<Home searchQuery={searchQuery} />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute isAuth={isAdminAuthenticated}>
                    <AdminDashboard setIsAdminAuthenticated={setIsAdminAuthenticated} />
                  </AdminRoute>
                }
              />
              <Route path="/admin/login" element={<AdminLogin setIsAdminAuthenticated={setIsAdminAuthenticated} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>

            <footer className="py-24 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0F172A] mt-20 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-12 relative z-10">
                <div className="text-center md:text-left w-full flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="flex flex-col items-center md:items-start">
                    <Link to="/" className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      ClosetRush<span className="text-slate-900 dark:text-white">.</span>
                    </Link>
                    {selectedCity && (
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mt-4 italic">Serving: {selectedCity}</p>
                    )}
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6">© 2026 Student Essentials Rental. All rights reserved.</p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-all transform hover:-translate-y-1">Privacy</a>
                    <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-all transform hover:-translate-y-1">Terms</a>
                    <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-all transform hover:-translate-y-1">Support</a>
                    <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-all transform hover:-translate-y-1">Contact</a>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100 dark:bg-slate-800" />

                <p className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.8em]">Elite Living. Reimagined.</p>
              </div>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}


export default App;
