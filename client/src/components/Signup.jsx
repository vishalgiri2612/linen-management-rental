import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = React.useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const name = `${formData.get('firstName')} ${formData.get('lastName')}`;
    const email = formData.get('email');
    const password = formData.get('password');

    const phone = "0000000000";
    const hostelId = "H001";
    const roomNumber = "101";

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone, hostelId, roomNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Your account is created! Please log in.', { icon: '🎉', duration: 4000 });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('Connection error. Please try again later.');
    }
  };


  return (
    <div className="min-h-screen flex transition-colors font-sans bg-white dark:bg-[#0F172A]">

      {/* Left Side: High Quality Imagery Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=1200"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0"
          alt="Premium Elite Living"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-emerald-900/40 to-black/60 mix-blend-multiply" />

        {/* Floating Content Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-24 text-white">


          <div className="animate-fade-in-up">
            <h2 className="text-7xl md:text-8xl font-black leading-[0.85] mb-8 tracking-tighter uppercase italic">
              Start Your <br />
              <span className="text-emerald-400">Journey.</span>
            </h2>
            <p className="max-w-md text-xl text-slate-200 font-medium leading-relaxed italic uppercase tracking-wider text-sm">
              Join the community of students enjoying curated comfort and premium hostel essentials.
            </p>
          </div>

          <div className="flex items-center gap-6 text-[10px] font-black tracking-[0.4em] uppercase opacity-60 italic">
            <span>Easy Setup</span>
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            <span>Fast Delivery</span>
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            <span>Support Anytime</span>
          </div>
        </div>
      </div>

      {/* Right Side: Signup Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-24 relative bg-white dark:bg-[#0F172A]">

        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[460px] w-full relative z-10">
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-10 italic">
              <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
              Join the Network
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-none italic uppercase">
              Create <br /> Account.
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">
              Join thousands of students enjoying premium rentals.
            </p>
          </div>

          <div className="transition-all">
            {/* Role Switcher */}
            <div className="flex p-2 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] mb-10 border border-slate-100 dark:border-gray-700">
              <button
                onClick={() => setIsAdmin(false)}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.3em] rounded-[2rem] transition-all ${!isAdmin ? 'bg-white dark:bg-emerald-600 text-slate-900 dark:text-white shadow-xl scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Student
              </button>
              <button
                onClick={() => setIsAdmin(true)}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.3em] rounded-[2rem] transition-all ${isAdmin ? 'bg-white dark:bg-emerald-600 text-emerald-600 dark:text-white shadow-xl scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Admin
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSignup}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-1">First Name</label>
                  <input
                    type="text"
                    required
                    name="firstName"
                    placeholder="John"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-600/10 focus:bg-white dark:focus:bg-gray-800 rounded-3xl py-5 px-6 text-slate-900 dark:text-white focus:outline-none transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-gray-600 shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-1">Last Name</label>
                  <input
                    type="text"
                    required
                    name="lastName"
                    placeholder="Doe"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-600/10 focus:bg-white dark:focus:bg-gray-800 rounded-3xl py-5 px-6 text-slate-900 dark:text-white focus:outline-none transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-gray-600 shadow-inner"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-1">Email Log</label>
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="name@closetrush.com"
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-600/10 focus:bg-white dark:focus:bg-gray-800 rounded-3xl py-5 px-6 text-slate-900 dark:text-white focus:outline-none transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-gray-600 shadow-inner"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-1">Passcode</label>
                <input
                  type="password"
                  required
                  name="password"
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-600/10 focus:bg-white dark:focus:bg-gray-800 rounded-3xl py-5 px-6 text-slate-900 dark:text-white focus:outline-none transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-gray-600 shadow-inner"
                />
              </div>

              <div className="flex items-center gap-4 px-2">
                <input type="checkbox" required className="rounded-lg border-slate-200 dark:border-gray-700 text-emerald-600 focus:ring-0 w-6 h-6 transition-all cursor-pointer" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Accept Terms</span>
              </div>

              <button type="submit" className="w-full bg-slate-900 dark:bg-emerald-600 hover:bg-black dark:hover:bg-emerald-700 text-white font-black py-6 rounded-[2.5rem] transition-all shadow-3xl hover:shadow-emerald-900/20 active:scale-95 text-[10px] uppercase tracking-[0.4em]">
                Join Portal
              </button>
            </form>

            <button className="w-full mt-8 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 text-slate-600 dark:text-white font-black py-5 rounded-[2.5rem] transition-all border border-slate-100 dark:border-gray-700 flex items-center justify-center gap-4 shadow-sm active:scale-95 text-[10px] uppercase tracking-[0.3em]">
              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google Auth
            </button>
          </div>

          <div className="mt-16 text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            Already in the fleet? {' '}
            <Link to="/login" className="text-slate-900 dark:text-white hover:text-emerald-600 transition-colors underline underline-offset-4 decoration-emerald-600/30">
              Access Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
