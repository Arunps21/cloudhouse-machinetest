import React from 'react';
import { HiMagnifyingGlass, HiBell, HiMoon, HiSun, HiBars3, HiPlus } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useUI } from '../../context/UIContext';
import Avatar from '../common/Avatar';

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { toggleSidebar } = useUI();
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors lg:hidden"
        >
          <HiBars3 className="w-6 h-6" />
        </button>
        
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-64 lg:w-80 pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Create Project Button */}
        <button
          onClick={() => navigate('/create')}
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <HiPlus className="w-5 h-5" />
          <span>New Project</span>
        </button>

        {/* Mobile Create Button */}
        <button
          onClick={() => navigate('/create')}
          className="sm:hidden p-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg"
        >
          <HiPlus className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <HiBell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          {darkMode ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
        </button>

        {/* User Avatar */}
        <div className="ml-2 flex items-center gap-3">
          <Avatar name="Sarah Chen" size="md" />
        </div>
      </div>
    </header>
  );
};

export default Header;
