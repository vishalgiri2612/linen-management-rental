import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  ClipboardList,
  LogOut
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('Overview');

  const menuItems = [
    { name: 'Overview', icon: BarChart3 },
    { name: 'Inventory', icon: Package },
    { name: 'Bookings', icon: ClipboardList },
    { name: 'Users', icon: Users },
    { name: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Total Revenue', value: '₹1,24,500', trend: '+12.5%', isUp: true },
    { label: 'Active Rentals', value: '342', trend: '+8.2%', isUp: true },
    { label: 'Total Users', value: '1,204', trend: '+15.1%', isUp: true },
    { label: 'Return Rate', value: '98.2%', trend: '-0.4%', isUp: false },
  ];

  const recentOrders = [
    { id: 'ORD-001', student: 'Rahul Sharma', item: 'Premium Bedding Set', date: '25 Mar', status: 'Active', price: '₹999' },
    { id: 'ORD-002', student: 'Priya Patel', item: 'Study Desk Pro', date: '24 Mar', status: 'Pending', price: '₹1,499' },
    { id: 'ORD-003', student: 'Amit Kumar', item: 'Ergonomic Chair', date: '24 Mar', status: 'Completed', price: '₹899' },
    { id: 'ORD-004', student: 'Sneha Gupta', item: 'Kitchen Essentials', date: '23 Mar', status: 'Active', price: '₹599' },
  ];

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0F172A] transition-colors pt-32">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-gray-900 border-r border-slate-100 dark:border-gray-800 flex flex-col pt-4 hidden lg:flex">
        <div className="px-8 mb-12">
          <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-indigo-900/10 rounded-[2.5rem] border border-slate-100 dark:border-indigo-500/10">
            <div className="w-12 h-12 bg-slate-900 dark:bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl">
              <span className="font-black italic">A</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-indigo-600 dark:text-blue-400 uppercase tracking-[0.3em] leading-none mb-1">Vault Control</p>
              <h3 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tighter italic">Vishal Admin</h3>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveSection(item.name)}
              className={`w-full flex items-center gap-5 px-6 py-5 rounded-[2rem] transition-all font-black uppercase tracking-widest text-[10px] group ${activeSection === item.name 
                ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-3xl transform scale-[1.02]' 
                : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-gray-800 hover:text-slate-900 dark:hover:text-white'}`}
            >
              <item.icon className={`w-5 h-5 ${activeSection === item.name ? 'text-indigo-400' : 'text-slate-300 group-hover:text-slate-600'}`} />
              <span>{item.name}</span>
              {activeSection !== item.name && (
                <div className="ml-auto w-1.5 h-1.5 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-8 mt-auto">
          <button 
            onClick={() => {
              localStorage.removeItem('isAdminAuthenticated');
              window.location.reload();
            }}
            className="w-full flex items-center justify-center gap-4 px-6 py-5 rounded-[2rem] text-rose-500 bg-rose-50/50 hover:bg-rose-50 dark:hover:bg-rose-900/10 font-black uppercase tracking-widest text-[10px] transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 lg:p-14 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 animate-fade-in">
          <div>
            <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">{activeSection}</h1>
            <p className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em] mt-4 italic">Registry / Root / {activeSection}</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative group hidden sm:block">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-[2rem] py-4 pl-14 pr-8 text-[10px] font-black uppercase tracking-widest w-72 focus:outline-none focus:ring-8 focus:ring-indigo-500/5 transition-all shadow-inner"
              />
            </div>
            <button className="relative p-4 bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-2xl text-slate-300 hover:text-indigo-600 transition-all shadow-sm">
              <Bell className="w-5 h-5" />
              <span className="absolute top-4 right-4 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-gray-900" />
            </button>
            <button className="flex items-center gap-3 bg-slate-900 hover:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-3xl active:scale-95 transition-all">
              <Plus className="w-4 h-4" />
              <span>Initialize Action</span>
            </button>
          </div>
        </header>

        {activeSection === 'Overview' && (
          <div className="space-y-16 animate-fade-in">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 p-10 rounded-[3rem] border border-slate-50 dark:border-gray-800 shadow-sm hover:shadow-3xl transition-all duration-700 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-[40px] rounded-full" />
                  <div className="flex justify-between items-start mb-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic">{stat.label}</p>
                    <div className={`p-3 rounded-2xl ${stat.isUp ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 shadow-sm' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 shadow-sm'}`}>
                      {stat.isUp ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                    </div>
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-4 italic leading-none">{stat.value}</h2>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${stat.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stat.trend} <span className="text-slate-300 font-bold ml-2">Growth Rate</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
              {/* Recent Orders Table */}
              <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-[4rem] border border-slate-50 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-indigo-500/5">
                <div className="p-10 border-b border-slate-50 dark:border-gray-800 flex justify-between items-center">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Registry Log</h3>
                  <button className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em] hover:underline decoration-indigo-600/30">Examine All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50 dark:bg-gray-800/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                        <th className="px-10 py-6 italic">Personnel</th>
                        <th className="px-10 py-6 italic">Asset</th>
                        <th className="px-10 py-6 italic">Status</th>
                        <th className="px-10 py-6 text-right italic">Value</th>
                        <th className="px-10 py-6"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-gray-800">
                      {recentOrders.map((order, i) => (
                        <tr key={i} className="group hover:bg-slate-50/50 dark:hover:bg-gray-800/30 transition-all duration-300">
                          <td className="px-10 py-8">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-indigo-900 flex items-center justify-center font-black text-white text-xs shadow-lg">
                                {order.student.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-black text-slate-900 dark:text-white tracking-tight uppercase text-sm italic">{order.student}</span>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                            <span className="font-bold text-slate-500 dark:text-gray-400 text-[11px] uppercase tracking-wider">{order.item}</span>
                          </td>
                          <td className="px-10 py-8">
                            <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] italic ${
                              order.status === 'Active' ? 'bg-indigo-50 dark:bg-emerald-900/40 text-indigo-700' :
                              order.status === 'Pending' ? 'bg-amber-50 dark:bg-amber-900/40 text-amber-700' :
                              'bg-slate-100 dark:bg-blue-900/40 text-slate-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-10 py-8 text-right font-black text-slate-900 dark:text-white uppercase tracking-tighter text-lg">
                            {order.price}
                          </td>
                          <td className="px-10 py-8 text-right">
                            <button className="text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Inventory Health */}
              <div className="bg-white dark:bg-gray-900 rounded-[4rem] border border-slate-50 dark:border-gray-800 p-12 shadow-sm flex flex-col transition-all hover:shadow-indigo-500/5">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter mb-10 uppercase italic">Stock Levels</h3>
                <div className="space-y-12">
                  {[
                    { label: 'Cloud Sheets', current: 12, max: 100, color: 'bg-indigo-600' },
                    { label: 'Aura Lamps', current: 45, max: 100, color: 'bg-violet-600' },
                    { label: 'Silk Pillows', current: 78, max: 100, color: 'bg-slate-900' },
                    { label: 'Soft Blankets', current: 92, max: 100, color: 'bg-indigo-400' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-end mb-5 font-black uppercase tracking-[0.3em] text-[9px] italic">
                        <span className="text-slate-400">{item.label}</span>
                        <span className="text-slate-900 dark:text-white">{item.current}% Capacity</span>
                      </div>
                      <div className="h-3 w-full bg-slate-50 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
                        <div 
                           className={`h-full ${item.color} rounded-full transition-all duration-[2000ms] ease-out shadow-lg`} 
                           style={{ width: `${item.current}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-16 py-6 bg-slate-900 dark:bg-indigo-600 text-white rounded-[2rem] font-black text-[10px] tracking-[0.4em] uppercase shadow-3xl hover:shadow-indigo-900/20 hover:-translate-y-1 transition-all active:scale-95 italic">
                  Authorize Restock
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection !== 'Overview' && (
          <div className="h-[60vh] flex flex-col items-center justify-center animate-fade-in relative">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent pointer-events-none" />
             <div className="w-32 h-32 bg-slate-50 dark:bg-indigo-900/20 rounded-[3.5rem] flex items-center justify-center text-indigo-600 mb-10 shadow-inner relative z-10">
                <Settings className="w-12 h-12 animate-spin-slow opacity-50" />
             </div>
             <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter uppercase italic z-10">{activeSection} Module</h2>
             <p className="text-slate-400 font-bold max-w-xs text-center uppercase tracking-widest text-[9px] leading-relaxed italic z-10">Optimizing core management framework for fleet scalability.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
