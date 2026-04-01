import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

// Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import CitySelector from './components/CitySelector';

import AdminLogin from './components/AdminLogin';

// New Pages
import HowItWorks from './components/HowItWorks';
import Packages from './components/Packages';
import CleanPromise from './components/CleanPromise';
import AboutUs from './components/AboutUs';
import TrackDelivery from './components/TrackDelivery';
import FAQ from './components/FAQ';
import Support from './components/Support';
import Referral from './components/Referral';

const AppContent = ({
  darkMode,
  setDarkMode,
  selectedCity,
  setShowCitySelector,
  handleCitySelect,
  showCitySelector,
  isAdminAuthenticated,
  setIsAdminAuthenticated
}) => {
  const location = useLocation();
  const isAdminPath = location.pathname.includes('/admin');

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent-primary)] selection:text-[var(--bg-primary)] transition-colors duration-500 font-sans">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          className: 'bg-white dark:bg-[#1E293B] text-slate-900 dark:white border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl',
        }}
      />

      {showCitySelector && <CitySelector onSelect={handleCitySelect} />}

      {!isAdminPath && (
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          selectedCity={selectedCity}
          onCityClick={() => setShowCitySelector(true)}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/clean-promise" element={<CleanPromise />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/support" element={<Support />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/track" element={<TrackDelivery />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/admin/dashboard"
          element={
            isAdminAuthenticated ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route path="/admin/login" element={<AdminLogin setIsAdminAuthenticated={setIsAdminAuthenticated} />} />

        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>

      {!isAdminPath && (
        <footer className="py-16 bg-[var(--bg-secondary)] text-[var(--text-primary)] relative overflow-hidden border-t border-[var(--border)] rounded-t-[60px] lg:rounded-t-[100px]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-24">
              <div className="md:col-span-1 space-y-10">
                <Link to="/" className="text-4xl font-serif italic text-[var(--text-primary)] tracking-tighter uppercase block">
                  Closet<span className="opacity-40">Rush</span>
                </Link>
                <p className="text-lg text-[var(--text-primary)]/40 font-light italic leading-relaxed">
                  Elevating the hostel experience through architectural hygiene and industrial-grade sterilization.
                </p>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-[var(--text-secondary)] mb-10">Company</h4>
                <div className="flex flex-col gap-6">
                  <Link to="/about" className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-primary)]/40 hover:text-[var(--text-primary)] transition-colors">Our Story</Link>
                  <Link to="/contact" className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-primary)]/40 hover:text-[var(--text-primary)] transition-colors">Contact</Link>
                  <Link to="/referral" className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-primary)]/40 hover:text-[var(--text-primary)] transition-colors">Referral</Link>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-[var(--text-secondary)] mb-10">Support</h4>
                <div className="flex flex-col gap-6">
                  <Link to="/faq" className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-primary)]/40 hover:text-[var(--text-primary)] transition-colors">FAQ</Link>
                  <Link to="/track" className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-primary)]/40 hover:text-[var(--text-primary)] transition-colors">Track Order</Link>
                  <Link to="/support" className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-primary)]/40 hover:text-[var(--text-primary)] transition-colors">Help Center</Link>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-[var(--text-secondary)] mb-10">Legals</h4>
                <div className="flex flex-col gap-6">
                  <a href="#" className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-primary)]/40 hover:text-[var(--text-primary)] transition-colors">Privacy</a>
                  <a href="#" className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-primary)]/40 hover:text-[var(--text-primary)] transition-colors">Terms</a>
                  {selectedCity && (
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--text-secondary)] mt-6 italic">Serving: {selectedCity}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-16 border-t border-[var(--border)]">
              <p className="text-[10px] font-black text-[var(--text-primary)]/10 uppercase tracking-[1em]">Elite Living. Reimagined.</p>
              <p className="text-[9px] font-bold text-[var(--text-primary)]/20 uppercase tracking-[0.4em]">© 2026 ClosetRush. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('isAdminAuthenticated') === 'true';
  });
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || '');
  const [showCitySelector, setShowCitySelector] = useState(!localStorage.getItem('selectedCity'));

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleCitySelect = (city) => {
    setSelectedCity(city.name);
    localStorage.setItem('selectedCity', city.name);
    setShowCitySelector(false);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            selectedCity={selectedCity}
            setShowCitySelector={setShowCitySelector}
            handleCitySelect={handleCitySelect}
            showCitySelector={showCitySelector}
            isAdminAuthenticated={isAdminAuthenticated}
            setIsAdminAuthenticated={setIsAdminAuthenticated}
          />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
