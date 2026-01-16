import React from "react";
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiInformationCircle,
  HiXCircle,
  HiXMark,
} from "react-icons/hi2";

const Toast = ({ id, message, type = "info", onClose }) => {
  const types = {
    info: {
      icon: HiInformationCircle,
      bg: "bg-blue-50 dark:bg-blue-900/50",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-800 dark:text-blue-200",
      iconColor: "text-blue-500",
    },
    success: {
      icon: HiCheckCircle,
      bg: "bg-emerald-50 dark:bg-emerald-900/50",
      border: "border-emerald-200 dark:border-emerald-800",
      text: "text-emerald-800 dark:text-emerald-200",
      iconColor: "text-emerald-500",
    },
    warning: {
      icon: HiExclamationCircle,
      bg: "bg-amber-50 dark:bg-amber-900/50",
      border: "border-amber-200 dark:border-amber-800",
      text: "text-amber-800 dark:text-amber-200",
      iconColor: "text-amber-500",
    },
    error: {
      icon: HiXCircle,
      bg: "bg-rose-50 dark:bg-rose-900/50",
      border: "border-rose-200 dark:border-rose-800",
      text: "text-rose-800 dark:text-rose-200",
      iconColor: "text-rose-500",
    },
  };

  const config = types[type];
  const Icon = config.icon;

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg
        ${config.bg} ${config.border}
        animate-slideUp
      `}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${config.iconColor}`} />
      <p className={`text-sm font-medium ${config.text}`}>{message}</p>
      <button
        onClick={() => onClose(id)}
        className={`ml-auto p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 ${config.text}`}
      >
        <HiXMark className="w-4 h-4" />
      </button>
    </div>
  );
};

// Toast Container
export const ToastContainer = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col-reverse gap-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};

export default Toast;
