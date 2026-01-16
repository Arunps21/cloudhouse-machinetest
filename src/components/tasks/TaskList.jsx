import React, { useState } from "react";
import { HiPlus, HiClipboardDocumentList } from "react-icons/hi2";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { Button, EmptyState, Modal } from "../common";

const TaskList = ({
  tasks = [],
  projectId,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleStatusChange = (taskId, newStatus) => {
    onUpdateTask(taskId, { status: newStatus });
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormSubmit = (taskData) => {
    if (editingTask) {
      onUpdateTask(editingTask.id, taskData);
    } else {
      onAddTask(taskData);
    }
    setShowForm(false);
    setEditingTask(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  // Group tasks by status
  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
            <HiClipboardDocumentList className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Tasks
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {doneTasks.length} of {tasks.length} completed
            </p>
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={HiPlus}
          onClick={() => setShowForm(true)}
        >
          Add Task
        </Button>
      </div>

      {/* Task List */}
      <div className="p-6">
        {tasks.length === 0 ? (
          <EmptyState
            type="tasks"
            action={() => setShowForm(true)}
            actionLabel="Add First Task"
          />
        ) : (
          <div className="space-y-6">
            {/* In Progress */}
            {inProgressTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  In Progress ({inProgressTasks.length})
                </h3>
                <div className="space-y-2">
                  {inProgressTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onStatusChange={handleStatusChange}
                      onEdit={handleEdit}
                      onDelete={onDeleteTask}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* To Do */}
            {todoTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  To Do ({todoTasks.length})
                </h3>
                <div className="space-y-2">
                  {todoTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onStatusChange={handleStatusChange}
                      onEdit={handleEdit}
                      onDelete={onDeleteTask}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Done */}
            {doneTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Completed ({doneTasks.length})
                </h3>
                <div className="space-y-2">
                  {doneTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onStatusChange={handleStatusChange}
                      onEdit={handleEdit}
                      onDelete={onDeleteTask}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Task Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={handleFormClose}
        title={editingTask ? "Edit Task" : "Add New Task"}
        size="md"
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      </Modal>
    </div>
  );
};

export default TaskList;
