import React from 'react';
import { HiCalendar, HiPencilSquare, HiTrash } from 'react-icons/hi2';
import { Badge, Avatar, AvatarGroup, ProgressBar } from '../common';
import { getStatusByValue, getPriorityByValue } from '../../data/statuses';
import { getUserById, getUsersByIds } from '../../data/users';
import { formatDate, calculateCompletion } from '../../data/mockProjects';

const ProjectHeader = ({ project, onEdit }) => {
  const status = getStatusByValue(project.status);
  const priority = getPriorityByValue(project.priority);
  const projectManager = getUserById(project.projectManager);
  const assignees = getUsersByIds(project.assignees || []);
  const completion = calculateCompletion(project.tasks);

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
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {project.name}
            </h1>
            <Badge variant={statusVariants[project.status]} dot>
              {status?.label}
            </Badge>
            <Badge variant={priorityVariants[project.priority]}>
              {priority?.label}
            </Badge>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            {project.description}
          </p>
        </div>
        
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <HiPencilSquare className="w-4 h-4" />
          Edit Project
        </button>
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Overall Progress
          </span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {completion}%
          </span>
        </div>
        <ProgressBar value={completion} variant="auto" size="lg" showLabel={false} />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          {project.tasks?.filter(t => t.status === 'done').length || 0} of {project.tasks?.length || 0} tasks completed
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Timeline */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <HiCalendar className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
              Timeline
            </span>
          </div>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {formatDate(project.startDate)}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            to {formatDate(project.endDate)}
          </p>
        </div>

        {/* Project Manager */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase block mb-2">
            Project Manager
          </span>
          {projectManager ? (
            <div className="flex items-center gap-2">
              <Avatar name={projectManager.name} color={projectManager.color} size="sm" />
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                {projectManager.name}
              </span>
            </div>
          ) : (
            <span className="text-sm text-slate-400">Not assigned</span>
          )}
        </div>

        {/* Team */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase block mb-2">
            Team Members
          </span>
          {assignees.length > 0 ? (
            <div className="flex items-center gap-2">
              <AvatarGroup users={assignees} max={4} size="sm" />
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {assignees.length} member{assignees.length > 1 ? 's' : ''}
              </span>
            </div>
          ) : (
            <span className="text-sm text-slate-400">No members</span>
          )}
        </div>

        {/* Tasks & Reminders */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase block mb-2">
            Items
          </span>
          <div className="flex items-center gap-4">
            <div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {project.tasks?.length || 0}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">Tasks</span>
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {project.reminders?.length || 0}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">Reminders</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
