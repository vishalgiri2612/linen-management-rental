const ProductModal = ({ item, isOpen, onClose, onAddToCart }) => {
  const [duration, setDuration] = useState('week');

  if (!isOpen || !item) return null;

  const currentPrice = duration === 'week' ? item.price : `₹${parseInt(item.price.replace('₹', '')) * 3.5}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-md transition-all duration-500 animate-fade-in">
      <div
        className="w-full max-w-xl bg-white dark:bg-[#0F172A] rounded-t-[4rem] sm:rounded-[4rem] overflow-hidden shadow-3xl animate-in slide-in-from-bottom duration-700 relative"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20" />

        <div className="relative h-[450px] overflow-hidden group">
          <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-60" />

          <button
            onClick={onClose}
            className="absolute top-8 left-8 bg-white/10 hover:bg-white/30 backdrop-blur-xl text-white p-4 rounded-full transition-all border border-white/20 active:scale-90"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="absolute bottom-8 left-8 right-8">
            <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.5em] mb-2 block italic drop-shadow-md">Premium Essential</span>
            <h2 className="text-5xl font-black text-white leading-none tracking-tighter uppercase italic drop-shadow-2xl">{item.name}</h2>
          </div>
        </div>

        <div className="p-10">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] italic mb-1">{item.category} Registry</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none italic uppercase">{currentPrice}</p>
              <p className="text-[10px] text-indigo-600 uppercase font-black tracking-[0.4em] mt-3 italic">Reserved per {duration}</p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-[3rem] mb-10 border border-slate-100 dark:border-gray-700 shadow-inner">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-5 tracking-[0.4em] italic text-center">Rental Term Configuration</p>
            <div className="flex p-2 bg-slate-200/50 dark:bg-gray-950 rounded-[2rem] gap-2">
              <button
                onClick={() => setDuration('week')}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-[1.5rem] transition-all transform ${duration === 'week' ? 'bg-white dark:bg-gray-800 text-slate-900 dark:text-white shadow-xl scale-[1.02] italic' : 'text-slate-400 opacity-60'}`}
              >
                Weekly Cycle
              </button>
              <button
                onClick={() => setDuration('month')}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-[1.5rem] transition-all transform ${duration === 'month' ? 'bg-white dark:bg-gray-800 text-slate-900 dark:text-white shadow-xl scale-[1.02] italic' : 'text-slate-400 opacity-60'}`}
              >
                Monthly Lease
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-6 flex items-center justify-center gap-3 italic">
              <div className="w-4 h-4 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
              </div>
              Fleet optimization active: 15% lease discount applied.
            </p>
          </div>

          <button
            onClick={() => {
              onAddToCart({ ...item, price: currentPrice, duration });
              onClose();
            }}
            className="w-full bg-slate-900 hover:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-black py-7 rounded-[2.5rem] transition-all shadow-3xl transform active:scale-95 text-[10px] uppercase tracking-[0.6em] italic"
          >
            Authorize Booking - {currentPrice}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
