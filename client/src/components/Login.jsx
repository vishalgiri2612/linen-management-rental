import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);
        toast.success(`Welcome back, ${data.user.name}!`, { icon: '👋' });
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      toast.error('Connection error. Please try again later.');
    }
  };


  return (
    <div className="min-h-screen flex transition-colors font-sans bg-[#EFD2B0] pt-24">
      {/* Left Side: Editorial Imagery */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
          alt="Premium Elite Linen"
        />
        <div className="absolute inset-0 bg-[#1A3263]/60 mix-blend-multiply" />

        <div className="relative z-10 w-full h-full flex flex-col justify-between p-24 text-[#EFD2B0]">
          <div className="animate-fade-in-up space-y-10">
            <span className="text-[10px] font-black uppercase tracking-[1em] block">The Protocol</span>
            <h2 className="text-8xl md:text-9xl font-serif italic leading-[0.85] tracking-tighter">
              Curated <br />
              <span className="opacity-40">Comfort.</span>
            </h2>
            <p className="max-w-md text-2xl font-light leading-relaxed italic opacity-70">
              Hospital-grade hygiene meets architectural design. Welcome to the new standard.
            </p>
          </div>

          <div className="flex items-center gap-10 text-[10px] font-black tracking-[0.4em] uppercase opacity-40">
            <span>Sterile</span>
            <div className="w-1 h-1 bg-[#FFC570] rounded-full" />
            <span>Elite</span>
            <div className="w-1 h-1 bg-[#FFC570] rounded-full" />
            <span>Seamless</span>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-24 relative">
        <div className="max-w-[460px] w-full relative z-10 bg-white/20 backdrop-blur-xl p-12 md:p-16 rounded-[4rem] shadow-2xl border border-white/40">
          <div className="mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#1A3263]/40 mb-10 block">Access Portal</span>
            <h1 className="text-7xl md:text-8xl font-serif italic text-[#1A3263] tracking-tighter mb-8 leading-none">
              Welcome <br /> <span className="opacity-30">Back.</span>
            </h1>
            <p className="text-xl text-[#1A3263]/60 font-light italic border-l border-[#1A3263]/20 pl-8">
              Enter your credentials to manage your elite linen cycle.
            </p>
          </div>

          <div className="transition-all">
            {/* Role Switcher */}
            <div className="flex p-1 bg-[#1A3263]/5 rounded-2xl mb-14 border border-[#1A3263]/10">
              <button className="flex-1 py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all bg-[#1A3263] text-[#EFD2B0] shadow-2xl rounded-xl">
                Student
              </button>
              <button
                onClick={() => navigate('/admin/login')}
                className="flex-1 py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all text-[#1A3263]/40 hover:text-[#1A3263] rounded-xl"
              >
                Admin
              </button>
            </div>

            <form className="space-y-10" onSubmit={handleLogin}>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-[#1A3263]/40 uppercase tracking-[0.4em]">Email Address</label>
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="name@closetrush.com"
                  className="w-full bg-[#1A3263]/5 border-b border-[#1A3263]/10 focus:border-[#1A3263] py-6 px-4 text-[#1A3263] focus:outline-none transition-all font-serif italic text-xl placeholder:text-[#1A3263]/20"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-black text-[#1A3263]/40 uppercase tracking-[0.4em]">Passcode</label>
                  <a href="#" className="text-[9px] font-black text-[#1A3263]/40 uppercase tracking-widest hover:text-[#1A3263] transition-colors underline underline-offset-4 decoration-[#1A3263]/10">Forgot?</a>
                </div>
                <input
                  type="password"
                  required
                  name="password"
                  placeholder="••••••••••••"
                  className="w-full bg-[#1A3263]/5 border-b border-[#1A3263]/10 focus:border-[#1A3263] py-6 px-4 text-[#1A3263] focus:outline-none transition-all font-serif italic text-xl placeholder:text-[#1A3263]/20"
                />
              </div>

              <div className="flex items-center gap-6">
                <input type="checkbox" className="w-5 h-5 bg-transparent border border-[#1A3263]/20 text-[#1A3263] focus:ring-0 rounded-none cursor-pointer" />
                <span className="text-[10px] font-black text-[#1A3263]/40 uppercase tracking-[0.2em]">Keep active</span>
              </div>

              <button type="submit" className="w-full bg-[#1A3263] text-[#EFD2B0] font-black py-8 transition-all hover:bg-[#FFC570] hover:text-[#1A3263] text-[10px] uppercase tracking-[0.6em] shadow-2xl">
                Enter Portal
              </button>
            </form>

            <div className="mt-16 text-center text-[10px] font-black uppercase tracking-[0.4em] text-[#1A3263]/40">
              New to the network? {' '}
              <Link to="/signup" className="text-[#1A3263] hover:text-[#FFC570] transition-colors underline underline-offset-8 decoration-[#1A3263]/20">
                Join the Fleet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
