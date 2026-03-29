const AdminLogin = ({ setIsAdminAuthenticated }) => {
  const [adminEmail, setAdminEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated Authentication
    setTimeout(() => {
      if (adminEmail === 'admin@linenrent.com' && password === 'admin123') {
        localStorage.setItem('isAdminAuthenticated', 'true');
        setIsAdminAuthenticated(true);
        toast.success('Admin access granted!');
        navigate('/admin/dashboard');
      } else {
        toast.error('Invalid Admin Credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0F172A] px-4 transition-colors">
      <div className="max-w-md w-full animate-fade-in relative">
        
        {/* Decorative elements */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-violet-500/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Logo and Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-900 dark:bg-indigo-600 rounded-[3rem] shadow-3xl mb-10 group hover:rotate-12 transition-all duration-700">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4 italic uppercase leading-none">
            Admin <br /> <span className="text-indigo-600">Secure.</span>
          </h1>
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em] italic">System Registry Gateway</p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[4rem] p-12 shadow-3xl border border-slate-50 dark:border-white/5 relative z-10 transition-all hover:shadow-indigo-500/5">
          <form onSubmit={handleLogin} className="space-y-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-3 italic">Aura Auth Log</label>
              <div className="relative group">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@aura.io"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-600/10 focus:bg-white dark:focus:bg-gray-800 rounded-[2.5rem] py-6 pl-16 pr-8 text-slate-900 dark:text-white font-bold transition-all outline-none shadow-inner italic"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-3 italic">Vault Passcode</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-600/10 focus:bg-white dark:focus:bg-gray-800 rounded-[2.5rem] py-6 pl-16 pr-8 text-slate-900 dark:text-white font-bold transition-all outline-none shadow-inner italic"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-700 disabled:bg-slate-400 text-white font-black py-7 rounded-[2.5rem] shadow-3xl active:scale-95 transition-all flex items-center justify-center gap-6 uppercase tracking-[0.5em] text-[10px] group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Initialize Dashboard</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-slate-50 dark:border-gray-800 text-center">
            <div className="flex items-center justify-center gap-3 text-indigo-500/50">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[9px] font-black uppercase tracking-[0.5em]">Quantum Encrypted Tunnel</span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <p className="mt-12 text-center text-slate-300 dark:text-slate-600 text-[10px] font-black leading-relaxed uppercase tracking-[0.2em] italic">
          Credentials restricted? Contact Fleet Admin. <br />
          Unauthorized access attempts are logged and purged.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
