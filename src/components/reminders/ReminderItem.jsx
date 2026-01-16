import React from 'react';
import { HiCalendar, HiTrash, HiExclamationTriangle, HiClock } from 'react-icons/hi2';
import { Badge } from '../common';
import { formatDate, isOverdue, isUpcoming, getRelativeDate } from '../../data/mockProjects';

const ReminderItem = ({ reminder, onDelete }) => {
  const overdue = isOverdue(reminder.date);
  const upcoming = isUpcoming(reminder.date);

  return (
    <div className={`
      flex items-center gap-4 p-4 
      rounded-lg border transition-all duration-200
      ${overdue 
        ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800' 
        : upcoming
          ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
          : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700'
      }
    `}>
      {/* Icon */}
      <div className={`
        flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
        ${overdue 
          ? 'bg-rose-100 dark:bg-rose-900/50' 
          : upcoming
            ? 'bg-amber-100 dark:bg-amber-900/50'
            : 'bg-slate-200 dark:bg-slate-700'
        }
      `}>
        {overdue ? (
          <HiExclamationTriangle className="w-5 h-5 text-rose-500" />
        ) : upcoming ? (
          <HiClock className="w-5 h-5 text-amber-500" />
        ) : (
          <HiCalendar className="w-5 h-5 text-slate-500 dark:text-slate-400" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`
          font-medium
          ${overdue 
            ? 'text-rose-800 dark:text-rose-200' 
            : 'text-slate-900 dark:text-white'
          }
        `}>
          {reminder.description}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`
            text-sm
            ${overdue 
              ? 'text-rose-600 dark:text-rose-400' 
              : upcoming
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-slate-500 dark:text-slate-400'
            }
          `}>
            {formatDate(reminder.date)}
          </span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span className={`
            text-sm font-medium
            ${overdue 
              ? 'text-rose-600 dark:text-rose-400' 
              : upcoming
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-slate-500 dark:text-slate-400'
            }
          `}>
            {getRelativeDate(reminder.date)}
          </span>
        </div>
      </div>

      {/* Status Badge */}
      {overdue && (
        <Badge variant="danger" size="sm">
          Overdue
        </Badge>
      )}
      {upcoming && !overdue && (
        <Badge variant="warning" size="sm">
          Upcoming
        </Badge>
      )}

      {/* Delete Button */}
      <button
        onClick={() => onDelete(reminder.id)}
        className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors"
      >
        <HiTrash className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ReminderItem;
