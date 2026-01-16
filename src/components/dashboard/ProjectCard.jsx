import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiCalendar, HiArrowRight } from 'react-icons/hi2';
import { Badge, AvatarGroup, ProgressBar } from '../common';
import { getStatusByValue, getPriorityByValue } from '../../data/statuses';
import { getUsersByIds } from '../../data/users';
import { calculateCompletion, formatDate, isOverdue } from '../../data/mockProjects';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  
  const status = getStatusByValue(project.status);
  const priority = getPriorityByValue(project.priority);
  const assignees = getUsersByIds(project.assignees || []);
  const completion = calculateCompletion(project.tasks);
  const overdue = isOverdue(project.endDate) && project.status !== 'completed';

  const statusVariants = {
    'planned': 'default',
    'in-progress': 'info',
    'completed': 'success',
    'on-hold': 'warning'
  };

  const priorityVariants = {
    'low': 'default',
    'medium': 'warning',
    'high': 'danger'
  };

  return (
    <div 
      onClick={() => navigate(`/project/${project.id}`)}
      className="
        group bg-white dark:bg-slate-800 
        rounded-xl border border-slate-200 dark:border-slate-700
        p-6 shadow-sm 
        cursor-pointer transition-all duration-300
        hover:shadow-lg hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-indigo-600
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
            {project.description}
          </p>
        </div>
        <Badge variant={statusVariants[project.status]} dot>
          {status?.label}
        </Badge>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <ProgressBar 
          value={completion} 
          variant="auto"
          size="md"
        />
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-3 mb-4">
        <Badge variant={priorityVariants[project.priority]} size="sm">
          {priority?.label} Priority
        </Badge>
        {project.tasks?.length > 0 && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {project.tasks.filter(t => t.status === 'done').length}/{project.tasks.length} tasks
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
        <AvatarGroup users={assignees} max={3} size="sm" />
        
        <div className={`
          flex items-center gap-1.5 text-xs font-medium
          ${overdue ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'}
        `}>
          <HiCalendar className="w-4 h-4" />
          <span>{formatDate(project.endDate)}</span>
          {overdue && <span className="text-rose-500">(Overdue)</span>}
        </div>
      </div>

      {/* Hover Arrow */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <HiArrowRight className="w-5 h-5 text-indigo-500" />
      </div>
    </div>
  );
};

export default ProjectCard;
