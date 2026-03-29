import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Star, Zap, Gem, Leaf, Wind, Bed, Sofa, ArrowUpRight, ArrowRight, Clock, Box, ShieldCheck, User, Settings, CreditCard, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthenticated, token, logout } = useAuth();
  const [rentals, setRentals] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/rent/my-rentals', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setRentals(data);
      } catch (error) {
        console.error('Failed to fetch rentals');
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) fetchRentals();
  }, [token, isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0F172A] text-[#191c1d] dark:text-[#f8fafc] pt-24 pb-32 transition-colors duration-700 selection:bg-indigo-100">
      
      {/* Floating Modern Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 dark:bg-black/40 backdrop-blur-2xl border-b border-[#c7c4d7]/15">
         <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-[#6366F1] rounded-2xl flex items-center justify-center text-white text-lg font-black italic">L</div>
               <span className="text-xl font-black italic uppercase tracking-tighter">LINEN<span className="text-[#6366F1]">RENT.</span></span>
            </div>
            <div className="flex items-center gap-8">
               <Link to="/browse" className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-[#6366F1] transition-colors">Catalogue</Link>
               <button onClick={logout} className="text-[10px] font-black uppercase tracking-[0.3em] text-[#464554] hover:text-red-500 transition-colors flex items-center gap-2">
                  <LogOut size={14} /> Exit
               </button>
            </div>
         </div>
      </nav>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 mt-16 animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
        
        {/* Welcome Header */}
        <header className="mb-24">
          <p className="text-[#6366F1] font-black text-[10px] uppercase tracking-[0.6em] mb-6">Personal Atelier</p>
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div>
               <h1 className="text-[clamp(3rem,6vw,5rem)] font-serif italic leading-none tracking-tighter">
                 Good Morning, <br />
                 <span className="font-sans font-black not-italic text-[#191c1d] dark:text-white">{user?.name?.split(' ')[0]}.</span>
               </h1>
            </div>
            <div className="flex items-center gap-6">
               <div className="text-right">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#c7c4d7] mb-1">Total Curated</p>
                  <p className="text-2xl font-black italic leading-none">₹1,240 <span className="text-xs non-italic text-[#c7c4d7] tracking-normal font-normal">/mo</span></p>
               </div>
               <div className="w-px h-12 bg-[#c7c4d7]/30" />
               <div className="text-right">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#c7c4d7] mb-1">Impact Grade</p>
                  <p className="text-2xl font-black text-emerald-500 leading-none">A+</p>
               </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Content Area: Bento Grid */}
          <div className="col-span-12 lg:col-span-8 space-y-12">
            
            {/* The Featured Collection Card (The "Active" piece) */}
            <div className="group relative overflow-hidden rounded-[3.5rem] bg-[#edeeef] dark:bg-white/5 aspect-[21/10] md:aspect-[21/9] flex items-center p-12 lg:p-20 transition-all duration-700 hover:shadow-2xl hover:shadow-indigo-500/5">
               <div className="relative z-10 max-w-md space-y-8">
                  <div className="flex items-center gap-3">
                     <span className="w-2 h-2 bg-[#6366F1] rounded-full animate-pulse" />
                     <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#464554]">Currently Managed</span>
                  </div>
                  <h3 className="text-5xl font-serif italic leading-tight text-[#191c1d] dark:text-white">The Egyptian <br /> Cotton Set.</h3>
                  <p className="text-sm text-[#464554] dark:text-slate-400 font-normal leading-relaxed">Your signature collection is currently active. Next scheduled cycle is January 14th.</p>
                  <div className="flex gap-4">
                     <button className="px-10 py-5 bg-[#6366F1] text-white rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#4648d4] transition-all shadow-xl shadow-indigo-600/20 active:scale-95">Manage Edit</button>
                     <button className="px-8 py-5 border border-[#c7c4d7] rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#191c1d] hover:text-white hover:border-[#191c1d] transition-all active:scale-95">Archive</button>
                  </div>
               </div>
               
               {/* Decorative Element */}
               <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-1000 grayscale group-hover:grayscale-0">
                  <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" alt="Fabric" />
               </div>
            </div>

            {/* Sub-Metrics Bento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
               {/* Trackers Tonal Card */}
               <div className="p-12 bg-white dark:bg-white/5 border border-[#c7c4d7]/15 rounded-[3rem] space-y-10 group hover:border-[#6366F1]/30 transition-all">
                  <div className="flex justify-between items-center">
                     <Clock className="text-[#6366F1]" size={20} />
                     <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#c7c4d7]">Timeline</span>
                  </div>
                  <div className="space-y-2">
                     <p className="text-4xl font-black italic">12 Days</p>
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#464554]">Until Next Refresh</p>
                  </div>
                  <div className="w-full bg-[#edeeef] dark:bg-white/10 h-px" />
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                     <span className="text-[#c7c4d7]">Jan 02</span>
                     <span className="text-[#6366F1]">Jan 14</span>
                  </div>
               </div>

               {/* Loyalty Tonal Card */}
               <div className="p-12 bg-white dark:bg-white/5 border border-[#c7c4d7]/15 rounded-[3rem] space-y-10 group hover:border-[#6366F1]/30 transition-all">
                  <div className="flex justify-between items-center">
                     <Gem className="text-pink-400" size={20} />
                     <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#c7c4d7]">Archive Points</span>
                  </div>
                  <div className="space-y-2">
                     <p className="text-4xl font-black italic">2.4k pts</p>
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#464554]">Master Textile Tier</p>
                  </div>
                  <div className="w-full bg-[#edeeef] dark:bg-white/10 h-px" />
                  <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-pink-400 group-hover:translate-x-1 transition-transform">
                     Redeem Collection <ArrowUpRight size={14} />
                  </button>
               </div>
            </div>

            {/* The Interior Log (Past Orders) */}
            <section className="space-y-12">
               <div className="flex items-center justify-between border-b border-[#c7c4d7]/15 pb-8 px-2">
                  <h2 className="text-2xl font-serif italic">Interior Log.</h2>
                  <button className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c7c4d7] hover:text-[#191c1d] transition-colors">View All Archive</button>
               </div>
               
               <div className="space-y-6">
                  {loading ? (
                    <div className="py-20 text-center text-[10px] font-black uppercase tracking-[0.5em] text-[#c7c4d7]">Decrypting archive...</div>
                  ) : rentals.length === 0 ? (
                    <div className="p-16 border-2 border-dashed border-[#c7c4d7]/30 rounded-[3rem] text-center space-y-8">
                       <p className="text-lg font-serif italic text-[#c7c4d7]">No previous selections found.</p>
                       <Link to="/browse" className="inline-block px-12 py-5 bg-[#191c1d] text-white rounded-full font-black text-[10px] uppercase tracking-[0.4em]">Start Curation</Link>
                    </div>
                  ) : (
                    rentals.map((rental, i) => (
                      <div key={i} className="flex items-center justify-between p-8 bg-white dark:bg-white/5 border border-[#c7c4d7]/15 rounded-[2.5rem] group hover:border-[#6366F1]/30 transition-all">
                         <div className="flex items-center gap-8">
                            <div className="w-20 h-20 rounded-[1.5rem] bg-[#edeeef] overflow-hidden">
                               <img src={rental.itemId?.imageUrl || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200'} className="w-full h-full object-cover" alt="Item" />
                            </div>
                            <div>
                               <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#6366F1] mb-2">{rental.bookingStatus}</p>
                               <h4 className="text-xl font-black">{rental.itemId?.itemName}</h4>
                               <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[#c7c4d7]">{new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}</p>
                            </div>
                         </div>
                         <button className="w-12 h-12 rounded-full border border-[#c7c4d7] flex items-center justify-center text-[#191c1d] dark:text-white hover:bg-[#191c1d] hover:text-white transition-all">
                            <ArrowUpRight size={18} />
                         </button>
                      </div>
                    ))
                  )}
               </div>
            </section>
          </div>

          {/* Sidebar Area: User & Settings */}
          <aside className="col-span-12 lg:col-span-4 space-y-12">
             {/* Profile Card */}
             <div className="p-12 bg-white dark:bg-white/5 border border-[#c7c4d7]/15 rounded-[3.5rem] space-y-12 shadow-2xl shadow-indigo-900/5">
                <div className="flex flex-col items-center text-center space-y-6">
                   <div className="relative group">
                      <div className="absolute inset-0 bg-[#6366F1] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} className="w-32 h-32 rounded-full border-4 border-white relative z-10 shadow-2xl" alt="Avatar" />
                   </div>
                   <div>
                      <h4 className="text-2xl font-black tracking-tighter">{user?.name}</h4>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6366F1] mt-2">Certified Resident</p>
                   </div>
                </div>

                <div className="w-full h-px bg-[#c7c4d7]/15" />

                <nav className="space-y-4">
                   {[
                     { label: 'Profile Details', icon: <User size={16} /> },
                     { label: 'Billing Atelier', icon: <CreditCard size={16} /> },
                     { label: 'Preferences', icon: <Settings size={16} /> },
                     { label: 'Account Security', icon: <ShieldCheck size={16} /> },
                   ].map((item, i) => (
                      <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-[#edeeef] dark:hover:bg-white/5 transition-colors group">
                         <div className="flex items-center gap-4 text-[#464554] dark:text-white group-hover:text-[#6366F1]">
                            {item.icon}
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                         </div>
                         <ArrowRight size={14} className="text-[#c7c4d7] opacity-0 group-hover:opacity-100 transition-all" />
                      </button>
                   ))}
                </nav>

                <div className="p-8 bg-[#6366F1]/5 rounded-[2.5rem] border border-[#6366F1]/10 space-y-4">
                   <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#6366F1]">Atelier Service</p>
                   <p className="text-xs text-[#464554] dark:text-slate-400 font-normal leading-relaxed">Your subscription tier allows for premium linen swaps every 14 days.</p>
                </div>
             </div>

             {/* Support/Eco Card */}
             <div className="p-12 bg-[#191c1d] text-white rounded-[3.5rem] space-y-8 relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                   <Leaf size={32} className="text-emerald-400" />
                   <h4 className="text-3xl font-serif italic">Living Leaf.</h4>
                   <p className="text-sm text-white/60 font-normal leading-relaxed">Your choice of rental vs purchase has saved approximately <span className="text-white font-bold">12,000 liters</span> of water this month.</p>
                   <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 hover:text-white transition-colors">Download Impact Report <ArrowUpRight size={14} /></button>
                </div>
                {/* Subtle Glow */}
                <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-emerald-500/10 blur-[100px] rounded-full" />
             </div>
          </aside>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default Dashboard;
