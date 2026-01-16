import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useUI } from '../../context/UIContext';
import { ToastContainer } from '../common/Toast';

const MainLayout = () => {
  const { toasts, removeToast } = useUI();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <Header />

          {/* Page Content */}
          <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default MainLayout;
