import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LuPackage, LuCalendar, LuClock, LuRefreshCcw, LuMapPin, LuSettings, LuPause, LuCircleX, LuCreditCard, LuShieldCheck } from 'react-icons/lu';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        // Fetch Profile
        const profRes = await fetch('http://localhost:5000/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const profData = await profRes.json();
        setProfile(profData);

        // Fetch Rentals
        const rentRes = await fetch('http://localhost:5000/api/rent/my', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const rentData = await rentRes.json();
        setOrders(rentData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/rent/status/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
        toast.success(`Plan ${newStatus} successfully`);
      }
    } catch (err) {
      toast.error('Failed to update plan status');
    }
  };

  const handleRaiseRequest = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/support/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ type: 'Replacement', description: 'Urgent swap requested from dashboard' })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message, { icon: '🛡️' });
      }
    } catch (err) {
      toast.error('Request failed');
    }
  };

  const handleUpdateAddress = () => {
    toast('Address updates coming soon to mobile app!', { icon: '📍' });
  };

  if (loading) return (
    <div className="pt-60 pb-24 text-center">
      <div className="w-12 h-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Synchronizing Vault...</p>
    </div>
  );

  const activeOrder = orders.find(o => o.status === 'active' || o.status === 'pending') || orders[0];

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16">
        <div>
           <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-4 block underline underline-offset-8 decoration-indigo-500 decoration-4"
           >
              Welcome back
           </motion.span>
           <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase leading-[0.85]"
           >
              {profile?.name || user?.name || 'Student'}<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-indigo-500">.</span>
           </motion.h1>
        </div>
        <div className="flex gap-4">
           <button 
              onClick={() => toast.success('Billing portal active')}
              className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:scale-105 active:scale-95 transition-all"
           >
              Manage Billing
           </button>
           <button className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white">
              <LuSettings className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
         {/* Active Plan Card */}
         <div className="lg:col-span-2 p-10 md:p-14 bg-slate-900 dark:bg-white rounded-[3.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[40%] h-full bg-emerald-500/10 backdrop-blur-3xl -skew-x-12 translate-x-1/2 p-12 flex flex-col items-end justify-center">
               <LuShieldCheck className="w-32 h-32 text-emerald-500/20 mb-8" />
            </div>
            
            <div className="relative z-10">
               <div className="inline-flex items-center gap-3 px-6 py-2 bg-emerald-500/20 text-emerald-500 rounded-full mb-8 border border-emerald-500/20">
                  <LuPackage className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Active Subscription</span>
               </div>
               {activeOrder ? (
                 <>
                   <h2 className="text-4xl md:text-6xl font-black text-white dark:text-slate-900 mb-4 uppercase italic tracking-tighter uppercase leading-tight">
                     {activeOrder.item?.itemName?.split(' ')[0]} <br />
                     <span className="text-emerald-500 italic">{activeOrder.item?.itemName?.split(' ').slice(1).join(' ')}</span>
                   </h2>
                   <p className="text-slate-400 dark:text-slate-500 text-lg font-medium italic mb-12">
                     Next Swap: {new Date(activeOrder.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                   </p>
                   
                   <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={() => handleUpdateStatus(activeOrder._id, activeOrder.status === 'paused' ? 'active' : 'paused')}
                        className="px-8 py-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-2xl transition-all hover:scale-105"
                      >
                         <LuPause className={`w-4 h-4 ${activeOrder.status === 'paused' ? 'fill-emerald-500 text-emerald-500' : 'fill-slate-900 dark:fill-white'}`} /> 
                         {activeOrder.status === 'paused' ? 'Resume Plan' : 'Pause Plan'}
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(activeOrder._id, 'cancelled')}
                        className="px-8 py-5 bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all hover:scale-105"
                      >
                         <LuCircleX className="w-4 h-4" /> Cancel Plan
                      </button>
                   </div>
                 </>
               ) : (
                 <div className="py-12">
                    <h3 className="text-3xl font-black text-white uppercase italic">No Active Plan</h3>
                    <p className="text-slate-400 mt-4 italic mb-10">Start your elite journey by choosing a collection.</p>
                 </div>
               )}
            </div>
         </div>

         {/* Stats Card */}
         <div className="p-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] flex flex-col justify-between shadow-2xl shadow-slate-200/50 dark:shadow-none">
            <div className="space-y-8">
               <div className="flex justify-between items-center group cursor-pointer hover:translate-x-2 transition-transform">
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
                         <LuRefreshCcw className="w-6 h-6 text-indigo-500" />
                      </div>
                      <div>
                         <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Total Orders</p>
                         <p className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">{orders.length} Hits</p>
                      </div>
                  </div>
               </div>

               <div className="w-full h-px bg-slate-50 dark:bg-slate-800" />

               <div className="flex justify-between items-center group cursor-pointer hover:translate-x-2 transition-transform">
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-rose-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
                         <LuCreditCard className="w-6 h-6 text-rose-500" />
                      </div>
                      <div>
                         <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Est. Billing</p>
                         <p className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">₹{orders.reduce((acc, curr) => acc + (curr.item?.pricePerWeek || 0), 0)} Paid</p>
                      </div>
                  </div>
               </div>

               <div className="w-full h-px bg-slate-50 dark:bg-slate-800" />

               <div className="flex justify-between items-center group cursor-pointer hover:translate-x-2 transition-transform">
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
                         <LuMapPin className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                         <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Primary Hostel</p>
                         <p className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">{profile?.address?.hostel || 'IIT Delhi, Nilgiri'}</p>
                      </div>
                  </div>
               </div>
            </div>

            <button 
              onClick={handleUpdateAddress}
              className="w-full py-5 border border-indigo-100 dark:border-indigo-500/20 text-indigo-500 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all mt-8"
            >
               Update Address
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         <div className="p-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Delivery History</h3>
               <button className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">View All</button>
            </div>
            <div className="space-y-6">
               {orders.length === 0 ? (
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center py-10 italic">No history recorded.</p>
               ) : (
                 orders.map((order, i) => (
                    <div key={i} className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-between group hover:border-emerald-500/30 transition-all border border-transparent">
                       <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center">
                             <LuPackage className="w-5 h-5 text-slate-400" />
                          </div>
                          <div>
                             <p className="font-black text-slate-900 dark:text-white uppercase text-xs italic">{order._id.slice(-6).toUpperCase()} • {order.item?.itemName}</p>
                             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full animate-pulse ${order.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          <span className={`text-[10px] font-black uppercase tracking-widest ${order.status === 'active' ? 'text-emerald-500' : 'text-amber-500'}`}>{order.status}</span>
                       </div>
                    </div>
                 ))
               )}
            </div>
         </div>

         <div className="p-12 bg-indigo-50 dark:bg-slate-900 border border-indigo-100 dark:border-indigo-500/20 rounded-[3.5rem] flex flex-col items-center justify-center text-center">
            <LuRefreshCcw className="w-16 h-16 text-indigo-500 mb-8 animate-spin-slow" />
            <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-4 italic leading-tight">Need a Replacement?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium italic mb-10 max-w-sm">Spilled coffee? No problem. Raise an urgent replacement request and we'll swap it within 4 hours.</p>
            <button 
              onClick={handleRaiseRequest}
              className="px-12 py-5 bg-indigo-500 text-white rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
            >
               Raise Request
            </button>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
