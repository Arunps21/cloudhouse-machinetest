import React, { useState, useEffect } from 'react';
import { Button, Input, TextArea, Select } from '../common';
import { taskStatuses } from '../../data/statuses';
import { users } from '../../data/users';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'todo',
    assignee: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name || '',
        description: task.description || '',
        status: task.status || 'todo',
        assignee: task.assignee || ''
      });
    }
  }, [task]);

  const statusOptions = taskStatuses.map(s => ({
    value: s.value,
    label: s.label
  }));

  const userOptions = [
    { value: '', label: 'Unassigned' },
    ...users.map(u => ({ value: u.id, label: u.name }))
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Task name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Task Name"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="Enter task name"
        required
        error={errors.name}
      />

      <TextArea
        label="Description"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        placeholder="Describe the task..."
        rows={3}
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Status"
          value={formData.status}
          onChange={(e) => handleChange('status', e.target.value)}
          options={statusOptions}
        />

        <Select
          label="Assignee"
          value={formData.assignee}
          onChange={(e) => handleChange('assignee', e.target.value)}
          options={userOptions}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="primary" fullWidth>
          {task ? 'Update Task' : 'Add Task'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
