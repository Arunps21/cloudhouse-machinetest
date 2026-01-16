import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiCalendar, HiEye } from 'react-icons/hi2';
import { Badge, AvatarGroup, ProgressBar } from '../common';
import { getStatusByValue, getPriorityByValue } from '../../data/statuses';
import { getUsersByIds } from '../../data/users';
import { calculateCompletion, formatDate, isOverdue } from '../../data/mockProjects';

const ProjectTable = ({ projects }) => {
  const navigate = useNavigate();

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
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Project Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Team
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {projects.map((project) => {
              const status = getStatusByValue(project.status);
              const priority = getPriorityByValue(project.priority);
              const assignees = getUsersByIds(project.assignees || []);
              const completion = calculateCompletion(project.tasks);
              const overdue = isOverdue(project.endDate) && project.status !== 'completed';

              return (
                <tr 
                  key={project.id}
                  onClick={() => navigate(`/project/${project.id}`)}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {project.name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs">
                        {project.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={statusVariants[project.status]} dot>
                      {status?.label}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={priorityVariants[project.priority]} size="sm">
                      {priority?.label}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 min-w-32">
                      <ProgressBar 
                        value={completion} 
                        variant="auto"
                        size="sm"
                        showLabel={false}
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                        {completion}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <AvatarGroup users={assignees} max={3} size="sm" />
                  </td>
                  <td className="px-6 py-4">
                    <div className={`
                      flex items-center gap-1.5 text-sm
                      ${overdue ? 'text-rose-500 font-medium' : 'text-slate-600 dark:text-slate-400'}
                    `}>
                      <HiCalendar className="w-4 h-4" />
                      <span>{formatDate(project.endDate)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/project/${project.id}`);
                      }}
                      className="p-2 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                    >
                      <HiEye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTable;
