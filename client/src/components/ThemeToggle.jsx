import React from 'react';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group" aria-label="Toggle Theme">
      <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${!darkMode ? 'text-blue-600' : 'text-gray-500'}`}>Light</span>
      <div className="relative toggle-switch">
        <input 
          type="checkbox" 
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <div className="toggle-switch-background shadow-lg group-hover:shadow-blue-500/10">
          <div className="toggle-switch-handle">
            {darkMode ? (
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.071 16.071l.707.707M7.757 7.757l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </div>
        </div>
      </div>
      <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${darkMode ? 'text-green-500' : 'text-gray-500'}`}>Dark</span>
    </label>
  );
};

export default ThemeToggle;
