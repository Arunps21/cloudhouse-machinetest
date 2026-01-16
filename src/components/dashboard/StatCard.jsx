import React from 'react';
import { 
  HiClipboardDocumentList, 
  HiCheckCircle, 
  HiExclamationTriangle, 
  HiClock,
  HiArrowTrendingUp,
  HiArrowTrendingDown
} from 'react-icons/hi2';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue,
  variant = 'default',
  className = '' 
}) => {
  const variants = {
    default: {
      bg: 'bg-gradient-to-br from-slate-500 to-slate-600',
      light: 'bg-slate-100 dark:bg-slate-800'
    },
    primary: {
      bg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      light: 'bg-indigo-100 dark:bg-indigo-900/50'
    },
    success: {
      bg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      light: 'bg-emerald-100 dark:bg-emerald-900/50'
    },
    warning: {
      bg: 'bg-gradient-to-br from-amber-500 to-orange-600',
      light: 'bg-amber-100 dark:bg-amber-900/50'
    },
    danger: {
      bg: 'bg-gradient-to-br from-rose-500 to-red-600',
      light: 'bg-rose-100 dark:bg-rose-900/50'
    },
    info: {
      bg: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      light: 'bg-blue-100 dark:bg-blue-900/50'
    }
  };

  const config = variants[variant];

  return (
    <div className={`
      relative overflow-hidden
      bg-white dark:bg-slate-800 
      rounded-xl border border-slate-200 dark:border-slate-700
      p-6 shadow-sm hover:shadow-md transition-shadow
      ${className}
    `}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </p>
          {trend && (
            <div className={`
              flex items-center gap-1 text-sm font-medium
              ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}
            `}>
              {trend === 'up' ? (
                <HiArrowTrendingUp className="w-4 h-4" />
              ) : (
                <HiArrowTrendingDown className="w-4 h-4" />
              )}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className={`
          w-12 h-12 rounded-xl ${config.bg}
          flex items-center justify-center shadow-lg
        `}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {/* Decorative gradient */}
      <div className={`
        absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-10
        ${config.bg}
      `} />
    </div>
  );
};

// Pre-configured stat cards for dashboard
export const TotalProjectsStat = ({ value, trend, trendValue }) => (
  <StatCard
    title="Total Projects"
    value={value}
    icon={HiClipboardDocumentList}
    variant="primary"
    trend={trend}
    trendValue={trendValue}
  />
);

export const CompletedProjectsStat = ({ value, trend, trendValue }) => (
  <StatCard
    title="Completed"
    value={value}
    icon={HiCheckCircle}
    variant="success"
    trend={trend}
    trendValue={trendValue}
  />
);

export const OverdueProjectsStat = ({ value, trend, trendValue }) => (
  <StatCard
    title="Overdue"
    value={value}
    icon={HiExclamationTriangle}
    variant="danger"
    trend={trend}
    trendValue={trendValue}
  />
);

export const InProgressProjectsStat = ({ value, trend, trendValue }) => (
  <StatCard
    title="In Progress"
    value={value}
    icon={HiClock}
    variant="info"
    trend={trend}
    trendValue={trendValue}
  />
);

export default StatCard;
