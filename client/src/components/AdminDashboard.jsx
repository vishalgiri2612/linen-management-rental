import React, { useState, useEffect } from 'react';
import {
  LuChartBar,
  LuPackage,
  LuUsers,
  LuSettings,
  LuBell,
  LuSearch,
  LuPlus,
  LuEllipsisVertical,
  LuArrowUpRight,
  LuArrowDownRight,
  LuClipboardList,
  LuLogOut,
  LuShoppingCart,
  LuCalendar,
  LuDroplets,
  LuCreditCard,
  LuMapPin,
  LuRefreshCw,
  LuGift,
  LuChartPie,
  LuChevronRight,
  LuInfo,
  LuCheck,
  LuClock,
  LuTriangleAlert
} from 'react-icons/lu';
import toast from 'react-hot-toast';

const StatCard = ({ label, value, trend, isUp, icon: Icon }) => (
  <div className="bg-white/40 backdrop-blur-md p-8 rounded-[3.5rem] border border-[#1A3263]/5 hover:shadow-2xl transition-all duration-700 group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-24 h-24 bg-[#1A3263]/5 blur-[40px] rounded-full" />
    <div className="flex justify-between items-start mb-6">
      <div className="p-4 rounded-2xl bg-[#1A3263]/5 text-[#1A3263]/40 group-hover:text-[#1A3263] transition-colors">
        {Icon && <Icon className="w-6 h-6" />}
      </div>
      <div className={`p-3 rounded-2xl ${isUp ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
        {isUp ? <LuArrowUpRight className="w-5 h-5" /> : <LuArrowDownRight className="w-5 h-5" />}
      </div>
    </div>
    <p className="text-[10px] font-black text-[#1A3263]/40 uppercase tracking-[0.4em] italic mb-2 px-1">{label}</p>
    <h2 className="text-5xl font-serif italic text-[#1A3263] tracking-tighter mb-4 italic leading-none">{value}</h2>
    <p className={`text-[10px] font-black uppercase tracking-widest ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
      {trend} <span className="text-[#1A3263]/20 font-bold ml-2">Growth Rate</span>
    </p>
  </div>
);

const SectionHeader = ({ title, subtitle, onAction }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 animate-fade-in">
    <div>
      <h1 className="text-7xl font-serif italic text-[#1A3263] tracking-tighter leading-none">{title}</h1>
      <p className="text-[#1A3263]/40 font-black text-[10px] uppercase tracking-[0.5em] mt-6 italic border-l border-[#1A3263]/20 pl-6">Registry / {subtitle || title}</p>
    </div>
    <div className="flex items-center gap-6">
      <div className="relative group hidden sm:block">
        <LuSearch className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A3263]/40 group-focus-within:text-[#1A3263] transition-colors" />
        <input
          type="text"
          placeholder="Search Registry..."
          className="bg-white/40 backdrop-blur-md border border-[#1A3263]/5 rounded-[2.5rem] py-5 pl-16 pr-8 text-[10px] font-black uppercase tracking-widest w-80 focus:outline-none transition-all shadow-sm italic placeholder:text-[#1A3263]/20"
        />
      </div>
      {onAction && (
        <button onClick={onAction} className="flex items-center gap-4 bg-[#1A3263] hover:bg-[#FFC570] hover:text-[#1A3263] text-[#EFD2B0] px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl transition-all">
          <LuPlus className="w-5 h-5" />
          <span>New Entry</span>
        </button>
      )}
    </div>
  </div>
);

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('Overview');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const statsRes = await fetch('http://localhost:5000/api/admin/stats');
        const statsData = await statsRes.json();
        setStats(statsData);

        const itemsRes = await fetch('http://localhost:5000/api/items');
        const itemsData = await itemsRes.json();
        setInventory(itemsData);

        const ordersRes = await fetch('http://localhost:5000/api/rent/all', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const ordersData = await ordersRes.json();
        setOrders(ordersData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const handleAction = () => {
    toast.success('Action successfully queued', { icon: '⚙️' });
  };

  const menuItems = [
    { name: 'Overview', icon: LuChartBar },
    { name: 'Orders', icon: LuShoppingCart },
    { name: 'Subscribers', icon: LuUsers },
    { name: 'Schedule', icon: LuCalendar },
    { name: 'Inventory', icon: LuPackage },
    { name: 'Laundry', icon: LuDroplets },
    { name: 'Payments', icon: LuCreditCard },
    { name: 'Locations', icon: LuMapPin },
    { name: 'Replacements', icon: LuRefreshCw },
    { name: 'Promos', icon: LuGift },
    { name: 'Reports', icon: LuChartPie },
    { name: 'Settings', icon: LuSettings },
  ];

  if (loading) return (
     <div className="h-screen bg-[#EFD2B0] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#1A3263] border-t-transparent rounded-full animate-spin mb-8" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1A3263]">Decrypting Registry...</p>
     </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'Overview':
        return (
          <div className="space-y-16 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              <StatCard label="Total Users" value={stats?.totalUsers || 0} trend="+12.5%" isUp={true} icon={LuUsers} />
              <StatCard label="Circulating Fleet" value={stats?.totalRentals || 0} trend="+18.2%" isUp={true} icon={LuCreditCard} />
              <StatCard label="Available Items" value={stats?.totalItems || 0} trend="-3.1%" isUp={false} icon={LuCalendar} />
              <StatCard label="Growth Rate" value="1.2%" trend="-0.4%" isUp={true} icon={LuChartPie} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
              <div className="xl:col-span-2 bg-white/40 backdrop-blur-md rounded-[4rem] border border-[#1A3263]/5 shadow-sm overflow-hidden flex flex-col">
                <div className="p-10 border-b border-[#1A3263]/10 flex justify-between items-center">
                  <h3 className="text-3xl font-serif italic text-[#1A3263] tracking-tighter">Recent Dispatches</h3>
                  <button onClick={handleAction} className="text-[#1A3263]/40 font-black text-[10px] uppercase tracking-[0.4em] hover:text-[#1A3263]">Audit All</button>
                </div>
                <div className="overflow-x-auto p-4">
                   <table className="w-full">
                      <thead>
                         <tr className="text-[10px] font-black text-[#1A3263]/40 uppercase tracking-widest text-left">
                            <th className="px-8 py-6 italic">Hub</th>
                            <th className="px-8 py-6 italic">Personnel</th>
                            <th className="px-8 py-6 italic">Status</th>
                            <th className="px-8 py-6 text-right">Time</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 dark:divide-gray-800">
                         {orders.map(order => (
                            <tr key={order._id} className="group hover:bg-slate-50/50 dark:hover:bg-gray-800/20 transition-all">
                               <td className="px-6 py-6 font-black text-xs uppercase italic text-slate-900 dark:text-white">Faridabad H01</td>
                               <td className="px-6 py-6">
                                  <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-500/20" />
                                     <span className="text-[11px] font-bold text-slate-500">{order.user?.name || 'Student'}</span>
                                  </div>
                               </td>
                               <td className="px-6 py-6">
                                  <span className="px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 text-[9px] font-black uppercase italic tracking-widest">{order.status}</span>
                               </td>
                               <td className="px-6 py-6 text-right text-[10px] font-bold text-slate-400 italic">Today</td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
              </div>
              <div className="bg-white/40 backdrop-blur-md rounded-[4rem] border border-[#1A3263]/5 p-12 shadow-sm">
                 <h3 className="text-3xl font-serif italic text-[#1A3263] tracking-tighter mb-12">Fleet Health</h3>
                 <div className="space-y-12">
                   {[
                     { label: 'Cloud Sheets', val: 78, color: 'bg-emerald-500' },
                     { label: 'Aura Covers', val: 45, color: 'bg-indigo-600' },
                     { label: 'Silk Pillows', val: 92, color: 'bg-rose-500' },
                   ].map((it, i) => (
                     <div key={i}>
                       <div className="flex justify-between font-black uppercase text-[9px] italic mb-3">
                         <span className="text-slate-400">{it.label}</span>
                         <span className="text-slate-900 dark:text-white">{it.val}%</span>
                       </div>
                       <div className="h-2 w-full bg-slate-50 dark:bg-gray-800 rounded-full overflow-hidden">
                         <div className={`h-full ${it.color} transition-all duration-1000`} style={{ width: `${it.val}%` }} />
                       </div>
                     </div>
                   ))}
                  </div>
              </div>
            </div>
          </div>
        );
      case 'Orders':
        return (
          <div className="animate-fade-in space-y-12">
             <div className="flex gap-4 p-2 bg-white/40 backdrop-blur-md rounded-[2.5rem] w-fit mb-12 border border-[#1A3263]/5">
                {['All', 'New', 'Confirmed', 'Packed', 'Dispatched', 'Delivered'].map(status => (
                   <button key={status} onClick={handleAction} className="px-8 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all hover:bg-white hover:shadow-sm italic">
                    {status}
                  </button>
                ))}
             </div>
             <div className="bg-white/40 backdrop-blur-md rounded-[4rem] border border-[#1A3263]/5 overflow-hidden shadow-sm">
                <table className="w-full">
                   <thead>
                      <tr className="bg-[#1A3263]/5 text-[10px] font-black text-[#1A3263]/40 uppercase tracking-widest text-left">
                         <th className="px-10 py-6">Order ID</th>
                         <th className="px-10 py-6">Personnel</th>
                         <th className="px-10 py-6">Hostel</th>
                         <th className="px-10 py-6">Plan</th>
                         <th className="px-10 py-6">Status</th>
                         <th className="px-10 py-6"></th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-[#1A3263]/5">
                      {orders.map(order => (
                         <tr key={order._id} className="group hover:bg-[#1A3263]/5 transition-all cursor-pointer">
                            <td className="px-10 py-8 text-xs font-black italic text-[#1A3263]">{order._id}</td>
                            <td className="px-10 py-8">
                               <p className="text-[11px] font-bold text-[#1A3263] uppercase italic">{order.user?.name || 'Anonymous'}</p>
                               <p className="text-[9px] text-[#1A3263]/40 font-medium">{order.user?.email || 'No email'}</p>
                            </td>
                            <td className="px-10 py-8 text-[10px] font-black text-[#1A3263]/60 uppercase italic">IIT Delhi / Unknown</td>
                            <td className="px-10 py-8">
                               <span className="px-3 py-1 rounded-full bg-[#1A3263]/5 text-[#1A3263] text-[9px] font-black uppercase tracking-widest">{order.item?.itemName || 'Custom Request'}</span>
                            </td>
                            <td className="px-10 py-8">
                               <span className="flex items-center gap-2 text-emerald-500 font-black text-[9px] uppercase tracking-widest italic">
                                  <LuCheck className="w-3 h-3" /> {order.status}
                               </span>
                            </td>
                            <td className="px-10 py-8 text-right">
                               <LuEllipsisVertical className="w-4 h-4 text-[#1A3263]/20" />
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        );
      case 'Inventory':
        return (
          <div className="animate-fade-in space-y-12">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                   <div className="bg-white/40 backdrop-blur-md rounded-[4rem] border border-[#1A3263]/5 p-12 shadow-sm">
                      <h3 className="text-2xl font-serif italic text-[#1A3263] tracking-tighter uppercase leading-none mb-10">Warehouse Management</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {inventory.map(item => (
                            <div key={item._id} className="p-6 bg-white/60 rounded-3xl border border-[#1A3263]/5 flex items-center justify-between">
                               <div>
                                  <p className="text-[10px] font-black text-[#1A3263]/40 uppercase tracking-[0.3em] mb-2">{item.itemName}</p>
                                  <p className="text-2xl font-black text-[#1A3263] tracking-tighter italic">₹{item.pricePerWeek} <span className="text-[10px] text-[#1A3263]/40 italic">/ Week</span></p>
                               </div>
                               <button onClick={handleAction} className="w-10 h-10 rounded-2xl bg-[#1A3263]/5 flex items-center justify-center text-[#1A3263] hover:bg-[#1A3263] hover:text-white transition-all shadow-sm">
                                  <LuPlus className="w-4 h-4" />
                               </button>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
                <div className="bg-white/40 backdrop-blur-md rounded-[4rem] border border-[#1A3263]/5 p-12 shadow-sm h-fit">
                   <h4 className="text-lg font-serif italic text-[#1A3263] tracking-tighter uppercase leading-none mb-12 text-rose-500">Low Stock Log</h4>
                   <div className="space-y-6">
                      {[1,2].map(i => (
                         <div key={i} className="flex items-center gap-5 p-5 bg-rose-500/5 rounded-2.5xl border border-rose-500/10">
                            <LuTriangleAlert className="w-6 h-6 text-rose-500" />
                            <div>
                               <p className="text-[11px] font-black text-[#1A3263] tracking-tight uppercase italic">Elite Quilt Sets</p>
                               <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest italic">Only 12 Left</p>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        );
      case 'Laundry':
        return (
          <div className="animate-fade-in space-y-12">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: 'Received Dirty', val: 128, icon: LuClock, color: 'text-[#1A3263]/40' },
                  { label: 'Wash Cycle', val: 45, icon: LuDroplets, color: 'text-indigo-500' },
                  { label: 'UV Sanitizing', val: 89, icon: LuRefreshCw, color: 'text-emerald-500' },
                  { label: 'Ready/Packed', val: 210, icon: LuPackage, color: 'text-[#1A3263]' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/40 backdrop-blur-md p-8 rounded-[3rem] border border-[#1A3263]/5 shadow-sm flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-[1rem] bg-[#1A3263]/5 flex items-center justify-center mb-6 ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <p className="text-[10px] font-black text-[#1A3263]/40 uppercase tracking-[0.4em] italic mb-2">{stat.label}</p>
                    <h2 className="text-3xl font-black text-[#1A3263] tracking-tighter italic">{stat.val}</h2>
                  </div>
                ))}
             </div>
          </div>
        );
      default:
        return (
          <div className="h-[60vh] flex flex-col items-center justify-center animate-fade-in relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent pointer-events-none" />
            <div className="w-32 h-32 bg-slate-50 dark:bg-indigo-900/20 rounded-[3.5rem] flex items-center justify-center text-indigo-600 mb-10 shadow-inner relative z-10">
              <LuSettings className="w-12 h-12 animate-spin-slow opacity-50" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter uppercase italic z-10">{activeSection} Module</h2>
            <p className="text-slate-400 font-bold max-w-xs text-center uppercase tracking-widest text-[9px] leading-relaxed italic z-10">Optimizing core management framework for fleet scalability.</p>
            <button onClick={handleAction} className="mt-8 px-12 py-5 bg-[#1A3263] text-[#EFD2B0] rounded-2.5xl font-black uppercase text-[10px] tracking-widest italic shadow-3xl hover:scale-105 active:scale-95 transition-all">Re-initialize Segment</button>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#EFD2B0] transition-colors pt-32 selection:bg-[#1A3263] selection:text-[#EFD2B0]">
      {/* Sidebar */}
      <aside className="w-72 bg-[#1A3263] flex flex-col pt-8 hidden lg:flex sticky top-32 h-[calc(100vh-8rem)] rounded-tr-[4rem]">
        <div className="px-8 mb-12">
          <div className="flex items-center gap-5 p-6 bg-white/5 rounded-[2.5rem] border border-white/5">
            <div className="w-14 h-14 bg-[#FFC570] rounded-2xl flex items-center justify-center text-[#1A3263] shadow-2xl">
              <span className="font-black italic text-xl">A</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-[#FFC570] uppercase tracking-[0.4em] leading-none mb-2">Vault Host</p>
              <h3 className="font-serif italic text-[#EFD2B0] text-lg tracking-tighter">Vishal Admin</h3>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto pb-8 custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveSection(item.name)}
              className={`w-full flex items-center gap-5 px-8 py-5 rounded-[2rem] transition-all font-black uppercase tracking-widest text-[9px] group ${activeSection === item.name
                ? 'bg-[#EFD2B0] text-[#1A3263] shadow-3xl transform scale-[1.02]'
                : 'text-[#EFD2B0]/40 hover:bg-white/5 hover:text-[#EFD2B0]'}`}
            >
              <item.icon className={`w-5 h-5 ${activeSection === item.name ? 'text-[#1A3263]' : 'text-[#EFD2B0]/40 group-hover:text-[#EFD2B0]'}`} />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 mt-auto">
          <button
            onClick={() => {
              localStorage.removeItem('isAdminAuthenticated');
              window.location.reload();
            }}
            className="w-full flex items-center justify-center gap-4 px-6 py-5 rounded-2.5xl text-[#FFC570] bg-white/5 hover:bg-rose-500/10 hover:text-rose-500 font-black uppercase tracking-widest text-[10px] transition-all group"
          >
            <LuLogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Terminate</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 lg:p-14 overflow-y-auto">
        <SectionHeader 
          title={activeSection} 
          subtitle={activeSection === 'Overview' ? 'System Logs' : activeSection}
          onAction={activeSection === 'Orders' || activeSection === 'Inventory' ? handleAction : null}
        />
        {renderSection()}
      </main>
    </div>
  );
};

export default AdminDashboard;
