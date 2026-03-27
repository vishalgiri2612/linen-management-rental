import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // For admin, keep the existing mock logic if they want, 
    // but the user asked for new account login.
    if (isAdmin) {
      toast.error("Please use Admin Login page for admin access");
      return;
    }

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);
        
        toast.success(`Welcome back, ${data.user.name}!`, {
          icon: '👋',
        });

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      toast.error('Connection error. Please try again later.');
    }
  };


  return (
    <div className="min-h-screen flex transition-colors font-sans bg-white dark:bg-gray-950">

      {/* Left Side: High Quality Imagery Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
          alt="Premium Linen"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-blue-900/40 to-black/60 mix-blend-multiply" />

        {/* Floating Content Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-20 text-white">
          <Link to="/" className="text-3xl font-black tracking-tighter">
            LINEN RENT <span className="text-blue-400">.</span>
          </Link>

          <div className="animate-fade-in-up">
            <h2 className="text-6xl font-black leading-none mb-6 tracking-tighter">
              Curated Comfort <br />
              <span className="text-blue-400 italic font-serif text-5xl">For Your Student Life</span>
            </h2>
            <p className="max-w-md text-xl text-gray-200 font-medium leading-relaxed">
              Experience the highest quality linen rental service tailored for premium hostel stays.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm font-black tracking-[0.2em] uppercase opacity-60">
            <span>Premium</span>
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
            <span>Reliable</span>
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
            <span>Fast Delivery</span>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 relative bg-[#FDFCFB] dark:bg-gray-950">

        {/* Subtle background glow for the right side */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[440px] w-full relative z-10">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 italic">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
              Managed Essentials
            </div>
            <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-4 leading-none">
              Welcome <br /> Back
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-bold text-lg">
              Please enter your credentials to access your dashboard.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 shadow-2xl shadow-blue-900/5 dark:shadow-none p-1 transition-all">
            {/* Role Switcher */}
            <div className="flex p-2 bg-gray-50 dark:bg-gray-800 rounded-2xl mb-10 border border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setIsAdmin(false)}
                className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${!isAdmin ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Student
              </button>
              <button
                onClick={() => setIsAdmin(true)}
                className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${isAdmin ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Admin
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-black text-gray-900 dark:text-white mb-2 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="batuhankra312@gmail.com"
                  className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-blue-600/20 focus:bg-white dark:focus:bg-gray-800 rounded-2xl py-5 px-6 text-gray-900 dark:text-white focus:outline-none transition-all font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 shadow-inner"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2 ml-1">
                  <label className="block text-sm font-black text-gray-900 dark:text-white">Password</label>
                  <a href="#" className="text-xs font-black text-blue-600 hover:underline">Forgot?</a>
                </div>
                <input
                  type="password"
                  required
                  name="password"
                  placeholder="••••••••••••"
                  className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-blue-600/20 focus:bg-white dark:focus:bg-gray-800 rounded-2xl py-5 px-6 text-gray-900 dark:text-white focus:outline-none transition-all font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 shadow-inner"
                />
              </div>

              <div className="flex items-center gap-3 px-1 pt-2">
                <input type="checkbox" className="rounded-md border-gray-200 dark:border-gray-700 text-blue-600 focus:ring-0 w-5 h-5 transition-all cursor-pointer" />
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Keep me logged in</span>
              </div>

              <button type="submit" className="w-full bg-gray-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl hover:shadow-black/20 active:scale-95 text-base tracking-widest uppercase">
                Sign In
              </button>
            </form>

            <div className="mt-8 flex items-center gap-4 text-gray-300 dark:text-gray-700 px-4">
              <div className="h-px flex-1 bg-current"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Secure Access</span>
              <div className="h-px flex-1 bg-current"></div>
            </div>

            <button className="w-full mt-8 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-white font-bold py-5 rounded-2xl transition-all border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-3 shadow-sm active:scale-95">
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="mt-12 text-center text-sm font-bold text-gray-500">
            New here? {' '}
            <Link to="/signup" className="text-gray-900 dark:text-white hover:text-blue-600 transition-colors underline underline-offset-4 font-black">
              Join Linen Rent
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
