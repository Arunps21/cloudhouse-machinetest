import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useUI } from "../../context/UIContext";
import { ToastContainer } from "../common/Toast";

const MainLayout = () => {
  const { toasts, removeToast } = useUI();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content Area - Centered container */}
      <div className="flex-1 w-full mx-auto flex flex-col">
        <main className="flex-1 p-4 lg:p-6 w-full">
          <Outlet />
        </main>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default MainLayout;
