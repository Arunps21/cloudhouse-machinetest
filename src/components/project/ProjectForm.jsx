import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiPlus, HiTrash, HiCalendar, HiExclamationCircle } from 'react-icons/hi2';
import { Button, Input, TextArea, Select, MultiSelect } from '../common';
import { projectStatuses, priorities } from '../../data/statuses';
import { users } from '../../data/users';
import { useProjects } from '../../context/ProjectContext';
import { useUI } from '../../context/UIContext';

const ProjectForm = ({ project, isEditing = false, onClose }) => {
  const navigate = useNavigate();
  const { createProject, updateProject } = useProjects();
  const { showToast } = useUI();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    status: 'planned',
    priority: 'medium',
    projectManager: '',
    assignees: [],
    reminders: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form if editing
  useEffect(() => {
    if (isEditing && project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        startDate: project.startDate || '',
        endDate: project.endDate || '',
        status: project.status || 'planned',
        priority: project.priority || 'medium',
        projectManager: project.projectManager || '',
        assignees: project.assignees || [],
        reminders: project.reminders || []
      });
    }
  }, [isEditing, project]);

  const userOptions = users.map(u => ({
    value: u.id,
    label: u.name,
    color: u.color
  }));

  const statusOptions = projectStatuses.map(s => ({
    value: s.value,
    label: s.label
  }));

  const priorityOptions = priorities.map(p => ({
    value: p.value,
    label: p.label
  }));

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'Due date is required';
    } else if (formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    if (formData.assignees.length === 0) {
      newErrors.assignees = 'At least one assignee is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is edited
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const addReminder = () => {
    const newReminder = {
      id: `temp_${Date.now()}`,
      date: '',
      description: ''
    };
    setFormData(prev => ({
      ...prev,
      reminders: [...prev.reminders, newReminder]
    }));
  };

  const updateReminder = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      reminders: prev.reminders.map((r, i) => 
        i === index ? { ...r, [field]: value } : r
      )
    }));
  };

  const removeReminder = (index) => {
    setFormData(prev => ({
      ...prev,
      reminders: prev.reminders.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Filter out empty reminders
      const cleanReminders = formData.reminders.filter(r => r.date && r.description);

      if (isEditing) {
        updateProject(project.id, {
          ...formData,
          reminders: cleanReminders
        });
        showToast('Project updated successfully!', 'success');
        if (onClose) onClose();
      } else {
        const newProject = createProject({
          ...formData,
          reminders: cleanReminders
        });
        showToast('Project created successfully!', 'success');
        navigate(`/project/${newProject.id}`);
      }
    } catch (error) {
      showToast('An error occurred. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
            1
          </span>
          Basic Information
        </h3>
        
        <Input
          label="Project Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter project name"
          required
          error={errors.name}
        />

        <TextArea
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe the project objectives and scope..."
          rows={4}
        />
      </div>

      {/* Dates */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
            2
          </span>
          Timeline
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            type="date"
            label="Start Date"
            value={formData.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
          />
          <Input
            type="date"
            label="Due Date"
            value={formData.endDate}
            onChange={(e) => handleChange('endDate', e.target.value)}
            required
            error={errors.endDate}
          />
        </div>
      </div>

      {/* Status & Priority */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
            3
          </span>
          Status & Priority
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
            options={statusOptions}
          />
          <Select
            label="Priority"
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            options={priorityOptions}
          />
        </div>
      </div>

      {/* Team */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
            4
          </span>
          Team Assignment
        </h3>
        
        <Select
          label="Project Manager"
          value={formData.projectManager}
          onChange={(e) => handleChange('projectManager', e.target.value)}
          options={userOptions}
          placeholder="Select project manager"
        />

        <MultiSelect
          label="Team Members"
          options={userOptions}
          value={formData.assignees}
          onChange={(value) => handleChange('assignees', value)}
          placeholder="Select team members"
          required
          error={errors.assignees}
        />
      </div>

      {/* Reminders */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
              5
            </span>
            Reminders
          </h3>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={addReminder}
            icon={HiPlus}
          >
            Add Reminder
          </Button>
        </div>
        
        {formData.reminders.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700">
            <HiCalendar className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No reminders added yet
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {formData.reminders.map((reminder, index) => (
              <div 
                key={reminder.id} 
                className="flex gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                <Input
                  type="date"
                  value={reminder.date}
                  onChange={(e) => updateReminder(index, 'date', e.target.value)}
                  containerClassName="flex-shrink-0 w-40"
                />
                <Input
                  value={reminder.description}
                  onChange={(e) => updateReminder(index, 'description', e.target.value)}
                  placeholder="Reminder description"
                  containerClassName="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeReminder(index)}
                  className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30"
                >
                  <HiTrash className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error Summary */}
      {Object.keys(errors).length > 0 && (
        <div className="p-4 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 rounded-lg">
          <div className="flex items-start gap-3">
            <HiExclamationCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-rose-800 dark:text-rose-200">
                Please fix the following errors:
              </p>
              <ul className="mt-1 text-sm text-rose-700 dark:text-rose-300 list-disc list-inside">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          fullWidth
          className="sm:flex-1"
        >
          {isEditing ? 'Update Project' : 'Create Project'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={() => isEditing && onClose ? onClose() : navigate('/')}
          className="sm:w-32"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
