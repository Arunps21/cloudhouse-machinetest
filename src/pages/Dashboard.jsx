import React, { useState, useMemo } from 'react';
import { useProjects } from '../context/ProjectContext';
import { 
  TotalProjectsStat, 
  CompletedProjectsStat, 
  OverdueProjectsStat, 
  InProgressProjectsStat,
  Chart,
  ProjectCard,
  ProjectTable,
  ProjectFilters
} from '../components/dashboard';
import { EmptyState, ProjectCardSkeleton, DashboardStatSkeleton } from '../components/common';
import { calculateCompletion } from '../data/mockProjects';

const Dashboard = () => {
  const { projects, loading, error, getStats } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');

  const stats = getStats();

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter) {
      result = result.filter(p => p.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter) {
      result = result.filter(p => p.priority === priorityFilter);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'dueDate':
          return new Date(a.endDate) - new Date(b.endDate);
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'status':
          return a.status.localeCompare(b.status);
        case 'completion':
          return calculateCompletion(b.tasks) - calculateCompletion(a.tasks);
        default:
          return 0;
      }
    });

    return result;
  }, [projects, searchTerm, statusFilter, priorityFilter, sortBy]);

  // Chart data
  const statusChartData = [
    { label: 'Completed', value: stats.completed, strokeColor: '#10b981' },
    { label: 'In Progress', value: stats.inProgress, strokeColor: '#3b82f6' },
    { label: 'Planned', value: stats.planned, strokeColor: '#64748b' },
    { label: 'On Hold', value: stats.onHold, strokeColor: '#f59e0b' }
  ];

  const priorityChartData = [
    { label: 'High Priority', value: stats.highPriority, color: 'from-rose-500 to-red-600' },
    { label: 'Medium Priority', value: stats.mediumPriority, color: 'from-amber-500 to-orange-500' },
    { label: 'Low Priority', value: stats.lowPriority, color: 'from-slate-400 to-slate-500' }
  ];

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <EmptyState
          type="error"
          description={error}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Welcome back! Here's an overview of your projects.
        </p>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <DashboardStatSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <TotalProjectsStat value={stats.total} />
          <InProgressProjectsStat value={stats.inProgress} />
          <CompletedProjectsStat value={stats.completed} />
          <OverdueProjectsStat value={stats.overdue} />
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart 
          type="donut" 
          data={statusChartData} 
          title="Projects by Status" 
        />
        <Chart 
          type="bar" 
          data={priorityChartData} 
          title="Projects by Priority" 
        />
      </div>

      {/* Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            All Projects
          </h2>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </span>
        </div>

        <ProjectFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <EmptyState
            type={searchTerm || statusFilter || priorityFilter ? 'search' : 'projects'}
            action={searchTerm || statusFilter || priorityFilter ? () => {
              setSearchTerm('');
              setStatusFilter('');
              setPriorityFilter('');
            } : undefined}
            actionLabel="Clear Filters"
          />
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="animate-slideUp"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <ProjectTable projects={filteredProjects} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
