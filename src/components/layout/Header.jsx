import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiBell,
  HiMoon,
  HiSun,
  HiPlus,
  HiGlobeAlt,
  HiArrowPathRoundedSquare,
  HiHome,
} from "react-icons/hi2";
import { useTheme } from "../../context/ThemeContext";
import { useProjects } from "../../context/ProjectContext";
import Avatar from "../common/Avatar";

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { resetData } = useProjects();
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40 shadow-sm">
      {/* Left Section: Logo & Nav */}
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
          <HiGlobeAlt className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent hidden sm:block">
          TaskSphere
        </span>
      </NavLink>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Create Project Button */}
        <button
          onClick={() => navigate("/create")}
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <HiPlus className="w-5 h-5" />
          <span>New Project</span>
        </button>

        {/* Mobile Create Button (Icon only) */}
        <button
          onClick={() => navigate("/create")}
          className="sm:hidden p-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-md"
        >
          <HiPlus className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>

        {/* Reset Data Button */}
        <button
          onClick={resetData}
          title="Reset Demo Data"
          className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <HiArrowPathRoundedSquare className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <HiBell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-800"></span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          {darkMode ? (
            <HiSun className="w-5 h-5" />
          ) : (
            <HiMoon className="w-5 h-5" />
          )}
        </button>

        {/* User Avatar */}
        <div className="pl-2 border-l border-slate-200 dark:border-slate-700 ml-1">
          <Avatar name="Sarah Chen" size="md" />
        </div>
      </div>
    </header>
  );
};

export default Header;
