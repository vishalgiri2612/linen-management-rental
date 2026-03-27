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
    <div className="flex min-h-screen bg-[#FDFCFB] dark:bg-gray-950 transition-colors pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col pt-8 hidden lg:flex">
        <div className="px-6 mb-10">
          <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <span className="font-black">A</span>
            </div>
            <div>
              <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest leading-none">Admin Panel</p>
              <h3 className="font-black text-gray-900 dark:text-white text-sm">Vishal Admin</h3>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveSection(item.name)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold group ${activeSection === item.name 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm tracking-tight">{item.name}</span>
              {activeSection !== item.name && (
                <div className="ml-auto w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <button 
            onClick={() => {
              localStorage.removeItem('isAdminAuthenticated');
              setIsAdminAuthenticated(false);
            }}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 font-bold transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 animate-fade-in">
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">{activeSection}</h1>
            <p className="text-gray-400 font-bold text-sm">Dashboard / {activeSection}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group hidden sm:block">
              <Search className="absolute left-4 top-1/2 -track-y-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search rentals..." 
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl py-3 pl-12 pr-6 text-sm font-bold w-64 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <button className="relative p-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl text-gray-400 hover:text-blue-600 transition-all shadow-sm">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-gray-900" />
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
              <Plus className="w-4 h-4" />
              <span>New Action</span>
            </button>
          </div>
        </header>

        {activeSection === 'Overview' && (
          <div className="space-y-10 animate-fade-in">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 group">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                    <div className={`p-2 rounded-lg ${stat.isUp ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600'}`}>
                      {stat.isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    </div>
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">{stat.value}</h2>
                  <p className={`text-xs font-bold ${stat.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stat.trend} <span className="text-gray-400 font-medium ml-1">vs last month</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              {/* Recent Orders Table */}
              <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
                <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Recent Rentals</h3>
                  <button className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                        <th className="px-8 py-4">Student</th>
                        <th className="px-8 py-4">Item</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4 text-right">Price</th>
                        <th className="px-8 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                      {recentOrders.map((order, i) => (
                        <tr key={i} className="group hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-all duration-300">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-black text-gray-600 dark:text-gray-400 text-xs">
                                {order.student.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-bold text-gray-900 dark:text-white">{order.student}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="font-bold text-gray-500 dark:text-gray-400 text-sm">{order.item}</span>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              order.status === 'Active' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600' :
                              order.status === 'Pending' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600' :
                              'bg-blue-100 dark:bg-blue-900/40 text-blue-600'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                            {order.price}
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button className="text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
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
              <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 p-10 shadow-sm flex flex-col">
                <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-8">Stock Alerts</h3>
                <div className="space-y-10">
                  {[
                    { label: 'Bedsheets', current: 12, max: 100, color: 'bg-rose-500' },
                    { label: 'Study Lamps', current: 45, max: 100, color: 'bg-amber-500' },
                    { label: 'Pillows', current: 78, max: 100, color: 'bg-blue-500' },
                    { label: 'Blankets', current: 92, max: 100, color: 'bg-emerald-500' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-end mb-4 font-black uppercase tracking-widest text-[10px]">
                        <span className="text-gray-400">{item.label}</span>
                        <span className="text-gray-900 dark:text-white">{item.current}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${item.color} rounded-full transition-all duration-1000 delay-300`} 
                          style={{ width: `${item.current}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-12 py-5 bg-gray-900 dark:bg-blue-600 text-white rounded-2xl font-black text-sm tracking-widest uppercase shadow-xl hover:-translate-y-1 transition-all active:scale-95">
                  Restock Now
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection !== 'Overview' && (
          <div className="h-[60vh] flex flex-col items-center justify-center animate-fade-in">
             <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] flex items-center justify-center text-blue-600 mb-6">
                <Settings className="w-10 h-10 animate-spin-slow" />
             </div>
             <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">{activeSection} Module</h2>
             <p className="text-gray-400 font-bold max-w-xs text-center">This administrative tool is currently being optimized for high-performance management.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
