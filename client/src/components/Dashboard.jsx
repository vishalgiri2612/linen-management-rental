import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, isAuthenticated, token } = useAuth();
  const [activeTab, setActiveTab] = React.useState('Dashboard');
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
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const menuItems = [
    { name: 'Dashboard', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    )},
    { name: 'Analytics', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    )},
    { name: 'Task List', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
    )},
    { name: 'Tracking', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    )},
    { name: 'Setting', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    )},
  ];

  return (
    <div className="flex min-h-screen bg-[#FDFCFB] dark:bg-gray-950 transition-colors pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col items-center py-10 px-6 hidden lg:flex">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-lg">L</div>
          <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter">LinenRental</span>
        </div>

        <div className="relative mb-10 w-full group">
          <div className="w-24 h-24 mx-auto rounded-3xl overflow-hidden shadow-2xl ring-4 ring-offset-4 ring-blue-500/20 dark:ring-offset-gray-950 transition-transform group-hover:scale-110 duration-500">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-1/4 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md border-2 border-white dark:border-gray-900">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="font-black text-gray-900 dark:text-white">{user?.name}</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Hostel: {user?.hostelId}, Room: {user?.roomNumber}</p>
          </div>
        </div>

        <nav className="w-full space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-bold ${activeTab === item.name 
                ? 'bg-[#F4F1EE] dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
            >
              <span className={activeTab === item.name ? 'text-blue-600' : ''}>{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Hello, {user?.name?.split(' ')[0]}</h1>
            <p className="text-gray-400 font-bold text-sm mt-1">Today is Monday, 25 March 2026</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-gray-100 dark:bg-gray-950 border border-transparent focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-blue-500/20 rounded-2xl py-3 px-5 pl-11 text-sm font-bold transition-all w-64"
              />
              <svg className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <button className="bg-gray-900 dark:bg-blue-600 text-white px-6 py-3.5 rounded-2xl font-black text-sm shadow-xl hover:-translate-y-1 transition-all active:scale-95">
              Add New Booking
            </button>
          </div>
        </header>

        <div className="w-full">
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Rentals for today</h2>
            {loading ? (
              <p>Loading rentals...</p>
            ) : rentals.length === 0 ? (
              <p className="text-gray-500 font-bold italic">No active rentals found. Start browsing to rent essentials!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rentals.map((rental, i) => (
                  <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all duration-500">
                    <div className="flex items-center gap-6">
                      <div className={`w-1.5 h-16 rounded-full bg-${i % 2 === 0 ? 'blue' : 'indigo'}-500 shadow-lg`} />
                      <div>
                        <h4 className="font-black text-gray-900 dark:text-white text-xl leading-none mb-2">{rental.itemId?.itemName}</h4>
                        <p className="text-gray-400 font-bold text-sm tracking-tight">Status: {rental.bookingStatus} • Due: {new Date(rental.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${rental.bookingStatus === 'active' ? 'bg-indigo-600 border-indigo-600' : 'border-gray-100 dark:border-gray-800'}`}>
                      {rental.bookingStatus === 'active' && <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>


      {/* Right Sidebar */}
      <aside className="w-80 bg-white dark:bg-gray-950 border-l border-gray-50 dark:border-gray-900 p-10 hidden 2xl:block overflow-y-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xl font-black text-gray-900 dark:text-white">Calendar</h2>
          <button className="relative w-10 h-10 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <div className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-gray-950" />
          </button>
        </div>

        <div className="space-y-12">
          {['Oct 20, 2026', 'Oct 21, 2026', 'Oct 22, 2026'].map((date, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{date}</span>
                <span className="text-gray-300">•••</span>
              </div>
              <div className="space-y-6">
                {[
                  { time: '10:00', title: 'Pickup Request', desc: 'Premium Linen' },
                  { time: '13:20', title: 'Due Return', desc: 'Study Lamp' }
                ].map((event, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-xs font-black text-gray-900 dark:text-white w-10">{event.time}</span>
                    <div className="flex-1 pl-4 border-l-4 border-orange-500 rounded">
                      <h5 className="text-sm font-black text-gray-900 dark:text-white">{event.title}</h5>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">{event.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
