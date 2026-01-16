import React, { useMemo } from 'react';

const Chart = ({ data, type = 'bar', title, className = '' }) => {
  // Simple bar chart implementation
  const BarChart = () => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
              <span className="font-medium text-slate-900 dark:text-white">{item.value}</span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${item.color || 'from-indigo-500 to-purple-600'}`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Simple donut chart implementation
  const DonutChart = () => {
    const total = data.reduce((sum, d) => sum + (d.value || 0), 0);

    const segments = useMemo(() => {
      if (total === 0) {
        // Return empty segments with 0 values to prevent NaN
        return data.map((item) => ({
          ...item,
          percentage: 0,
          startAngle: 0,
          endAngle: 0
        }));
      }
      
      let currentAngle = 0;
      return data.map((item) => {
        const percentage = (item.value / total) * 100;
        const angle = (item.value / total) * 360;
        const segment = {
          ...item,
          percentage: isNaN(percentage) ? 0 : percentage,
          startAngle: currentAngle,
          endAngle: currentAngle + angle
        };
        currentAngle += angle;
        return segment;
      });
    }, [data, total]);

    // SVG donut chart
    const size = 160;
    const strokeWidth = 24;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    let offset = 0;

    // If total is 0, show an empty ring
    if (total === 0) {
      return (
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <svg width={size} height={size} className="transform -rotate-90">
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth={strokeWidth}
                className="dark:stroke-slate-700"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">0</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Total</span>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap gap-3 justify-center">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <span 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.strokeColor || getColorByIndex(index) }}
                />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  {item.label} (0)
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            {segments.map((segment, index) => {
              const segmentPercentage = segment.percentage || 0;
              const strokeDasharray = `${(segmentPercentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -offset;
              offset += (segmentPercentage / 100) * circumference;

              return (
                <circle
                  key={index}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={segment.strokeColor || getColorByIndex(index)}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={String(strokeDashoffset)}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{total}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Total</span>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-3 justify-center">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <span 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.strokeColor || getColorByIndex(index) }}
              />
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {segment.label} ({segment.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`
      bg-white dark:bg-slate-800 
      rounded-xl border border-slate-200 dark:border-slate-700
      p-6 shadow-sm
      ${className}
    `}>
      {title && (
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      {type === 'bar' ? <BarChart /> : <DonutChart />}
    </div>
  );
};

// Helper function to get colors by index
const getColorByIndex = (index) => {
  const colors = [
    '#6366f1', // indigo
    '#10b981', // emerald
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // purple
    '#06b6d4', // cyan
  ];
  return colors[index % colors.length];
};

export default Chart;
