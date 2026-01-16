import React from 'react';
import { HiInboxStack, HiClipboardDocumentList, HiBell, HiExclamationTriangle } from 'react-icons/hi2';
import Button from './Button';

const EmptyState = ({ 
  type = 'default',
  title,
  description,
  action,
  actionLabel = 'Get Started',
  icon: CustomIcon,
  className = '' 
}) => {
  const presets = {
    default: {
      icon: HiInboxStack,
      title: 'No data available',
      description: 'There is nothing to display here yet.'
    },
    projects: {
      icon: HiClipboardDocumentList,
      title: 'No projects found',
      description: 'Create your first project to get started.'
    },
    tasks: {
      icon: HiClipboardDocumentList,
      title: 'No tasks yet',
      description: 'Add tasks to track your project progress.'
    },
    reminders: {
      icon: HiBell,
      title: 'No reminders set',
      description: 'Add reminders to stay on top of important dates.'
    },
    search: {
      icon: HiInboxStack,
      title: 'No results found',
      description: 'Try adjusting your search or filters.'
    },
    error: {
      icon: HiExclamationTriangle,
      title: 'Something went wrong',
      description: 'An error occurred while loading data.'
    }
  };

  const preset = presets[type] || presets.default;
  const Icon = CustomIcon || preset.icon;
  const displayTitle = title || preset.title;
  const displayDescription = description || preset.description;

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
        {displayTitle}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
        {displayDescription}
      </p>
      {action && (
        <Button onClick={action} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
