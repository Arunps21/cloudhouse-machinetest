import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  HiHome, 
  HiClipboardDocumentList, 
  HiPlus, 
  HiCog6Tooth,
  HiChartBar,
  HiUserGroup,
  HiBell,
  HiXMark,
  HiArrowPathRoundedSquare
} from 'react-icons/hi2';
import { useUI } from '../../context/UIContext';
import { useProjects } from '../../context/ProjectContext';

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useUI();
  const { resetData } = useProjects();
  const location = useLocation();

  const mainNavItems = [
    { 
      path: '/', 
      label: 'Dashboard', 
      icon: HiHome 
    },
    { 
      path: '/create', 
      label: 'Create Project', 
      icon: HiPlus 
    }
  ];

  const secondaryNavItems = [
    { 
      path: '#analytics', 
      label: 'Analytics', 
      icon: HiChartBar,
      disabled: true
    },
    { 
      path: '#team', 
      label: 'Team', 
      icon: HiUserGroup,
      disabled: true
    },
    { 
      path: '#notifications', 
      label: 'Notifications', 
      icon: HiBell,
      disabled: true
    },
    { 
      path: '#settings', 
      label: 'Settings', 
      icon: HiCog6Tooth,
      disabled: true
    }
  ];

  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path;
    
    if (item.disabled) {
      return (
        <div
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-50"
        >
          <item.icon className="w-5 h-5" />
          <span className="text-sm font-medium">{item.label}</span>
          <span className="ml-auto text-xs bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full">Soon</span>
        </div>
      );
    }

    return (
      <NavLink
        to={item.path}
        onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
        className={`
          flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
          ${isActive 
            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }
        `}
      >
        <item.icon className="w-5 h-5" />
        <span className="text-sm font-medium">{item.label}</span>
      </NavLink>
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white dark:bg-slate-800 
          border-r border-slate-200 dark:border-slate-700
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <HiClipboardDocumentList className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              ProjectFlow
            </span>
          </NavLink>
          
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 lg:hidden"
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
          {/* Main Navigation */}
          <div className="space-y-1">
            <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Main Menu
            </h3>
            {mainNavItems.map(item => (
              <NavItem key={item.path} item={item} />
            ))}
          </div>

          {/* Secondary Navigation */}
          <div className="space-y-1">
            <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Others
            </h3>
            {secondaryNavItems.map(item => (
              <NavItem key={item.path} item={item} />
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={resetData}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <HiArrowPathRoundedSquare className="w-5 h-5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
