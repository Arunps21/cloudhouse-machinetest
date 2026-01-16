import React from 'react';
import { ProjectForm } from '../components/project';

const CreateProject = () => {
  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Create New Project
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Fill in the details below to create a new project.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 lg:p-8">
        <ProjectForm />
      </div>
    </div>
  );
};

export default CreateProject;
