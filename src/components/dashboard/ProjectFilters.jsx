import React, { useState } from 'react';
import { HiMagnifyingGlass, HiFunnel, HiViewColumns, HiListBullet, HiXMark } from 'react-icons/hi2';
import { Button, Select } from '../common';
import { projectStatuses, priorities } from '../../data/statuses';

const ProjectFilters = ({ 
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange 
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    ...projectStatuses.map(s => ({ value: s.value, label: s.label }))
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    ...priorities.map(p => ({ value: p.value, label: p.label }))
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'status', label: 'Status' },
    { value: 'completion', label: 'Completion' }
  ];

  const hasActiveFilters = statusFilter || priorityFilter || searchTerm;

  const clearFilters = () => {
    onSearchChange('');
    onStatusChange('');
    onPriorityChange('');
  };

  return (
    <div className="space-y-4">
      {/* Main Filter Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Filter Toggle (Mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="sm:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
        >
          <HiFunnel className="w-5 h-5" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
          )}
        </button>

        {/* Desktop Filters */}
        <div className="hidden sm:flex items-center gap-3">
          <Select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            options={statusOptions}
            className="w-40"
          />
          <Select
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
            options={priorityOptions}
            className="w-40"
          />
          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            options={sortOptions}
            className="w-36"
          />
        </div>

        {/* View Mode Toggle */}
        <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid' 
                ? 'bg-white dark:bg-slate-600 shadow-sm text-indigo-600 dark:text-indigo-400' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <HiViewColumns className="w-5 h-5" />
          </button>
          <button
            onClick={() => onViewModeChange('table')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'table' 
                ? 'bg-white dark:bg-slate-600 shadow-sm text-indigo-600 dark:text-indigo-400' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <HiListBullet className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Filters Panel */}
      {showFilters && (
        <div className="sm:hidden p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 space-y-3 animate-slideDown">
          <Select
            label="Status"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            options={statusOptions}
          />
          <Select
            label="Priority"
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
            options={priorityOptions}
          />
          <Select
            label="Sort By"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            options={sortOptions}
          />
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={clearFilters} fullWidth>
              Clear Filters
            </Button>
          </div>
        </div>
      )}

      {/* Active Filters Pills */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
              Search: "{searchTerm}"
              <button onClick={() => onSearchChange('')}>
                <HiXMark className="w-4 h-4" />
              </button>
            </span>
          )}
          {statusFilter && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
              Status: {projectStatuses.find(s => s.value === statusFilter)?.label}
              <button onClick={() => onStatusChange('')}>
                <HiXMark className="w-4 h-4" />
              </button>
            </span>
          )}
          {priorityFilter && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
              Priority: {priorities.find(p => p.value === priorityFilter)?.label}
              <button onClick={() => onPriorityChange('')}>
                <HiXMark className="w-4 h-4" />
              </button>
            </span>
          )}
          <button
            onClick={clearFilters}
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectFilters;
