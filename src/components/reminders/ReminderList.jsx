import React, { useState } from 'react';
import { HiPlus, HiBell } from 'react-icons/hi2';
import ReminderItem from './ReminderItem';
import { Button, EmptyState, Modal, Input, TextArea } from '../common';

const ReminderList = ({ reminders = [], onAddReminder, onDeleteReminder }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ date: '', description: '' });
  const [error, setError] = useState('');

  // Sort reminders by date
  const sortedReminders = [...reminders].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.date || !formData.description.trim()) {
      setError('Both date and description are required');
      return;
    }

    onAddReminder(formData);
    setFormData({ date: '', description: '' });
    setShowForm(false);
    setError('');
  };

  const handleClose = () => {
    setShowForm(false);
    setFormData({ date: '', description: '' });
    setError('');
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <HiBell className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Reminders
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {reminders.length} reminder{reminders.length !== 1 ? 's' : ''} set
            </p>
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={HiPlus}
          onClick={() => setShowForm(true)}
        >
          Add Reminder
        </Button>
      </div>

      {/* Reminder List */}
      <div className="p-6">
        {reminders.length === 0 ? (
          <EmptyState
            type="reminders"
            action={() => setShowForm(true)}
            actionLabel="Add First Reminder"
          />
        ) : (
          <div className="space-y-3">
            {sortedReminders.map(reminder => (
              <ReminderItem
                key={reminder.id}
                reminder={reminder}
                onDelete={onDeleteReminder}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Reminder Modal */}
      <Modal
        isOpen={showForm}
        onClose={handleClose}
        title="Add New Reminder"
        size="sm"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="date"
            label="Reminder Date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            required
          />
          
          <TextArea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="What should you be reminded about?"
            rows={3}
            required
          />

          {error && (
            <p className="text-sm text-rose-500">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary" fullWidth>
              Add Reminder
            </Button>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ReminderList;
