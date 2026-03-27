import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

        <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-blue-500/30 ${darkMode ? 'dark bg-gray-950 text-white' : 'bg-[#FDFCFB] text-gray-900'}`}>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              className: `${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`,
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

          <footer className="py-12 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950 mt-12 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-xl font-bold text-[#2D2D2D] dark:text-white cursor-pointer">
                  Linen Rent
                </span>
                {selectedCity && (
                  <p className="text-xs text-blue-500 font-medium mt-1">Serving in {selectedCity}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">© 2026 Student Essentials Rental. All rights reserved.</p>
              </div>
              <div className="flex gap-8 text-sm text-gray-400">
                <a href="#" className="hover:text-blue-600 dark:hover:text-white transition-colors font-bold">Privacy</a>
                <a href="#" className="hover:text-blue-600 dark:hover:text-white transition-colors font-bold">Terms</a>
                <a href="#" className="hover:text-blue-600 dark:hover:text-white transition-colors font-bold">Support</a>
                <a href="#" className="hover:text-blue-600 dark:hover:text-white transition-colors font-bold">Contact</a>
              </div>
            </div>
          </footer>
        </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}


export default App;
