import React from 'react';
import { HiCheck, HiTrash, HiPencil } from 'react-icons/hi2';
import { Badge, Avatar } from '../common';
import { getTaskStatusByValue } from '../../data/statuses';
import { getUserById } from '../../data/users';

const TaskItem = ({ task, onStatusChange, onEdit, onDelete }) => {
  const status = getTaskStatusByValue(task.status);
  const assignee = getUserById(task.assignee);

  const statusVariants = {
    'todo': 'default',
    'in-progress': 'info',
    'done': 'success'
  };

  const getNextStatus = (currentStatus) => {
    const statusOrder = ['todo', 'in-progress', 'done'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    return statusOrder[(currentIndex + 1) % statusOrder.length];
  };

  return (
    <div className={`
      group flex items-center gap-4 p-4 
      bg-white dark:bg-slate-800 
      border border-slate-200 dark:border-slate-700 
      rounded-lg shadow-sm
      hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600
      transition-all duration-200
      ${task.status === 'done' ? 'opacity-75' : ''}
    `}>
      {/* Checkbox */}
      <button
        onClick={() => onStatusChange(task.id, getNextStatus(task.status))}
        className={`
          flex-shrink-0 w-6 h-6 rounded-full border-2 
          flex items-center justify-center transition-all
          ${task.status === 'done' 
            ? 'bg-emerald-500 border-emerald-500' 
            : task.status === 'in-progress'
              ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30'
              : 'border-slate-300 dark:border-slate-600 hover:border-indigo-500'
          }
        `}
      >
        {task.status === 'done' && <HiCheck className="w-4 h-4 text-white" />}
        {task.status === 'in-progress' && (
          <div className="w-2 h-2 rounded-full bg-blue-500" />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className={`
            font-medium text-slate-900 dark:text-white
            ${task.status === 'done' ? 'line-through text-slate-500 dark:text-slate-400' : ''}
          `}>
            {task.name}
          </h4>
          <Badge variant={statusVariants[task.status]} size="sm">
            {status?.label}
          </Badge>
        </div>
        {task.description && (
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
            {task.description}
          </p>
        )}
      </div>

      {/* Assignee */}
      {assignee && (
        <Avatar 
          name={assignee.name} 
          color={assignee.color} 
          size="sm"
        />
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(task)}
          className="p-2 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
        >
          <HiPencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors"
        >
          <HiTrash className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
