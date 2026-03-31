import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LuLock, LuUser, LuArrowRight, LuShieldCheck } from 'react-icons/lu';

const AdminLogin = ({ setIsAdminAuthenticated }) => {
  const [adminEmail, setAdminEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password }),
      });

      const data = await response.json();

      if (response.ok && data.user.isAdmin) {
        localStorage.setItem('isAdminAuthenticated', 'true');
        localStorage.setItem('token', data.token);
        setIsAdminAuthenticated(true);
        toast.success(`Welcome, Commander ${data.user.name}!`, { icon: '🛡️' });
        navigate('/admin/dashboard');
      } else if (response.ok && !data.user.isAdmin) {
        toast.error('Access Denied: This portal is for administrative personnel only.');
      } else {
        toast.error(data.message || 'Invalid Credentials');
      }
    } catch (error) {
      toast.error('Connection to the Vault failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-[#EFD2B0] px-6 pt-48 transition-colors font-sans">
      <div className="max-w-[460px] w-full relative z-10 animate-fade-in">
        
        {/* Header Section */}
        <div className="mb-20 text-center">
          <span className="text-[10px] font-black uppercase tracking-[1em] text-[#1A3263]/40 mb-10 block">System Access</span>
          <h1 className="text-7xl md:text-8xl font-serif italic text-[#1A3263] tracking-tighter mb-8 leading-none">
            Admin <br /> <span className="opacity-30">Portal.</span>
          </h1>
          <p className="text-xl text-[#1A3263]/60 font-light italic leading-relaxed max-w-xs mx-auto border-t border-[#1A3263]/10 pt-8">
            Secure gateway for elite fleet management and operations.
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/20 backdrop-blur-xl p-12 md:p-16 rounded-[4rem] shadow-2xl border border-white/40 transition-all">
          <form onSubmit={handleLogin} className="space-y-12">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-[#1A3263]/40 uppercase tracking-[0.4em] ml-2">Registry Email</label>
              <div className="relative group">
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@closetrush.com"
                  className="w-full bg-transparent border-b border-[#1A3263]/20 focus:border-[#1A3263] py-6 px-4 text-[#1A3263] font-serif italic text-xl transition-all outline-none placeholder:text-[#1A3263]/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-[#1A3263]/40 uppercase tracking-[0.4em] ml-2">Vault Passcode</label>
              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-[#1A3263]/20 focus:border-[#1A3263] py-6 px-4 text-[#1A3263] font-serif italic text-xl transition-all outline-none placeholder:text-[#1A3263]/20"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1A3263] hover:bg-[#FFC570] hover:text-[#1A3263] disabled:opacity-50 text-[#EFD2B0] font-black py-8 transition-all flex items-center justify-center gap-8 uppercase tracking-[0.6em] text-[10px] group shadow-2xl"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-[#EFD2B0]/20 border-t-[#EFD2B0] rounded-full animate-spin" />
              ) : (
                <>
                  <span>Initialize Dashboard</span>
                  <LuArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-16 pt-10 border-t border-[#1A3263]/10 text-center">
            <div className="flex items-center justify-center gap-4 text-[#1A3263]/40">
              <LuShieldCheck className="w-5 h-5" />
              <span className="text-[9px] font-black uppercase tracking-[0.6em]">Secure Encrypted Tunnel</span>
            </div>
          </div>
        </div>

        {/* Support Link */}
        <div className="mt-16 text-center">
          <button 
            onClick={() => navigate('/login')}
            className="text-[10px] font-black text-[#1A3263]/40 uppercase tracking-[0.4em] hover:text-[#1A3263] transition-colors underline underline-offset-8 decoration-[#1A3263]/10"
          >
            Return to Student Portal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
