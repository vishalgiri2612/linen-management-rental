import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

const AdminLogin = ({ setIsAdminAuthenticated }) => {
  const [adminEmail, setAdminEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated Authentication
    setTimeout(() => {
      if (adminEmail === 'admin@linenrent.com' && password === 'admin123') {
        localStorage.setItem('isAdminAuthenticated', 'true');
        setIsAdminAuthenticated(true);
        toast.success('Admin access granted!');
        navigate('/admin/dashboard');
      } else {
        toast.error('Invalid Admin Credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] dark:bg-gray-950 px-4 transition-colors">
      <div className="max-w-md w-full animate-fade-in">
        {/* Logo and Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-[2.5rem] shadow-2xl shadow-blue-500/30 mb-6 group hover:rotate-12 transition-transform duration-500">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">
            Admin <span className="text-blue-600">Access</span>
          </h1>
          <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">Authorized Personnel Only</p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 shadow-xl border border-gray-100 dark:border-gray-800">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Admin Email Address</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@linenrent.com"
                  className="w-full bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-blue-600 dark:focus:border-blue-600 focus:bg-white dark:focus:bg-gray-800 rounded-2xl py-4 pl-14 pr-6 text-gray-900 dark:text-white font-bold transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Secure Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-blue-600 dark:focus:border-blue-600 focus:bg-white dark:focus:bg-gray-800 rounded-2xl py-4 pl-14 pr-6 text-gray-900 dark:text-white font-bold transition-all outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Unlock Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-50 dark:border-gray-800 text-center">
            <div className="flex items-center justify-center gap-2 text-emerald-500">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted Access</span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <p className="mt-8 text-center text-gray-400 text-xs font-bold leading-relaxed">
          Forgot your credentials? Contact the system administrator. <br />
          Unauthorized access attempts are logged and monitored.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
