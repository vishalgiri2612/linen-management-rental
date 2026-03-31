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
    <div className="min-h-screen flex transition-colors font-sans bg-[#EFD2B0] pt-24">
      {/* Left Side: Editorial Imagery */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=1200"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0"
          alt="Premium Elite Living"
        />
        <div className="absolute inset-0 bg-[#1A3263]/60 mix-blend-multiply" />

        <div className="relative z-10 w-full h-full flex flex-col justify-between p-24 text-[#EFD2B0]">
          <div className="animate-fade-in-up space-y-10">
            <span className="text-[10px] font-black uppercase tracking-[1em] block">The Network</span>
            <h2 className="text-8xl md:text-9xl font-serif italic leading-[0.85] tracking-tighter">
              Start Your <br />
              <span className="opacity-40">Journey.</span>
            </h2>
            <p className="max-w-md text-2xl font-light leading-relaxed italic opacity-70">
              Join the elite circle of students redefining hostel living through curated essentials.
            </p>
          </div>

          <div className="flex items-center gap-10 text-[10px] font-black tracking-[0.4em] uppercase opacity-40">
            <span>Join</span>
            <div className="w-1 h-1 bg-[#FFC570] rounded-full" />
            <span>Scale</span>
            <div className="w-1 h-1 bg-[#FFC570] rounded-full" />
            <span>Sleep</span>
          </div>
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-24 relative">
        <div className="max-w-[540px] w-full relative z-10 bg-white/20 backdrop-blur-xl p-12 md:p-16 rounded-[4rem] shadow-2xl border border-white/40">
          <div className="mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#1A3263]/40 mb-10 block">Create Membership</span>
            <h1 className="text-7xl md:text-8xl font-serif italic text-[#1A3263] tracking-tighter mb-8 leading-none">
              Apply to <br /> <span className="opacity-30">the Fleet.</span>
            </h1>
            <p className="text-xl text-[#1A3263]/60 font-light italic border-l border-[#1A3263]/20 pl-8">
              Become part of a network that values sterilization as much as style.
            </p>
          </div>

          <div className="transition-all">
            {/* Role Switcher */}
            <div className="flex p-1 bg-[#1A3263]/5 rounded-2xl mb-10 border border-[#1A3263]/10">
              <button
                onClick={() => setIsAdmin(false)}
                className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all rounded-xl ${!isAdmin ? 'bg-[#1A3263] text-[#EFD2B0] shadow-2xl' : 'text-[#1A3263]/40 hover:text-[#1A3263]'}`}
              >
                Student
              </button>
              <button
                onClick={() => setIsAdmin(true)}
                className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all rounded-xl ${isAdmin ? 'bg-[#1A3263] text-[#EFD2B0] shadow-2xl' : 'text-[#1A3263]/40 hover:text-[#1A3263]'}`}
              >
                Admin
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSignup}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-[#1A3263]/40 uppercase tracking-[0.4em]">First Name</label>
                  <input
                    type="text"
                    required
                    name="firstName"
                    placeholder="John"
                    className="w-full bg-[#1A3263]/5 border-b border-[#1A3263]/10 focus:border-[#1A3263] py-4 px-2 text-[#1A3263] focus:outline-none transition-all font-serif italic text-lg placeholder:text-[#1A3263]/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-[#1A3263]/40 uppercase tracking-[0.4em]">Last Name</label>
                  <input
                    type="text"
                    required
                    name="lastName"
                    placeholder="Doe"
                    className="w-full bg-[#1A3263]/5 border-b border-[#1A3263]/10 focus:border-[#1A3263] py-4 px-2 text-[#1A3263] focus:outline-none transition-all font-serif italic text-lg placeholder:text-[#1A3263]/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-[#1A3263]/40 uppercase tracking-[0.4em]">Email Address</label>
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="name@closetrush.com"
                  className="w-full bg-[#1A3263]/5 border-b border-[#1A3263]/10 focus:border-[#1A3263] py-4 px-2 text-[#1A3263] focus:outline-none transition-all font-serif italic text-lg placeholder:text-[#1A3263]/20"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-[#1A3263]/40 uppercase tracking-[0.4em]">Passcode</label>
                <input
                  type="password"
                  required
                  name="password"
                  placeholder="••••••••••••"
                  className="w-full bg-[#1A3263]/5 border-b border-[#1A3263]/10 focus:border-[#1A3263] py-4 px-2 text-[#1A3263] focus:outline-none transition-all font-serif italic text-lg placeholder:text-[#1A3263]/20"
                />
              </div>

              <div className="flex items-center gap-6 py-4">
                <input type="checkbox" required className="w-5 h-5 bg-transparent border border-[#1A3263]/20 text-[#1A3263] focus:ring-0 rounded-none cursor-pointer" />
                <span className="text-[10px] font-black text-[#1A3263]/40 uppercase tracking-[0.3em]">Accept Terms</span>
              </div>

              <button type="submit" className="w-full bg-[#1A3263] text-[#EFD2B0] font-black py-8 transition-all hover:bg-[#FFC570] hover:text-[#1A3263] text-[10px] uppercase tracking-[0.6em] shadow-2xl">
                Join Membership
              </button>
            </form>

            <div className="mt-16 text-center text-[10px] font-black uppercase tracking-[0.4em] text-[#1A3263]/40">
              Already in the fleet? {' '}
              <Link to="/login" className="text-[#1A3263] hover:text-[#FFC570] transition-colors underline underline-offset-8 decoration-[#1A3263]/20">
                Access Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
