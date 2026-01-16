import React from 'react';

const ProgressBar = ({ 
  value = 0, 
  size = 'md',
  showLabel = true,
  variant = 'primary',
  animated = true,
  className = '' 
}) => {
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const variants = {
    primary: 'from-indigo-500 to-purple-600',
    success: 'from-emerald-500 to-teal-500',
    warning: 'from-amber-500 to-orange-500',
    danger: 'from-rose-500 to-red-500',
    info: 'from-blue-500 to-cyan-500'
  };

  // Determine color based on value
  const getVariantByValue = () => {
    if (value >= 100) return 'success';
    if (value >= 75) return 'primary';
    if (value >= 50) return 'info';
    if (value >= 25) return 'warning';
    return 'danger';
  };

  const effectiveVariant = variant === 'auto' ? getVariantByValue() : variant;

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Progress
          </span>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {Math.min(100, Math.max(0, value))}%
          </span>
        </div>
      )}
      <div className={`w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`
            ${sizes[size]} rounded-full bg-gradient-to-r ${variants[effectiveVariant]}
            transition-all duration-500 ease-out
            ${animated ? 'progress-bar' : ''}
          `}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
