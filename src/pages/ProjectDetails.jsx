import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft, HiTrash } from "react-icons/hi2";
import { useProjects } from "../context/ProjectContext";
import { useUI } from "../context/UIContext";
import { ProjectHeader, ProjectForm } from "../components/project";
import { TaskList } from "../components/tasks";
import { ReminderList } from "../components/reminders";
import { Button, Modal, EmptyState, Skeleton } from "../components/common";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getProject,
    loading,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
    addReminder,
    deleteReminder,
  } = useProjects();
  const { showToast } = useUI();

  const [project, setProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Fetch project data
  useEffect(() => {
    if (!loading) {
      const projectData = getProject(id);
      if (projectData) {
        setProject(projectData);
      }
    }
  }, [id, loading, getProject]);

  // Re-fetch when data changes (for updates)
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedProject = getProject(id);
      if (updatedProject) {
        setProject(updatedProject);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [id, getProject]);

  const handleDelete = () => {
    deleteProject(id);
    showToast("Project deleted successfully", "success");
    navigate("/");
  };

  const handleAddTask = (taskData) => {
    addTask(id, taskData);
    showToast("Task added successfully", "success");
  };

  const handleUpdateTask = (taskId, updates) => {
    updateTask(id, taskId, updates);
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(id, taskId);
    showToast("Task deleted", "info");
  };

  const handleAddReminder = (reminderData) => {
    addReminder(id, reminderData);
    showToast("Reminder added successfully", "success");
  };

  const handleDeleteReminder = (reminderId) => {
    deleteReminder(id, reminderId);
    showToast("Reminder deleted", "info");
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center gap-4">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="w-48 h-8 rounded" />
        </div>
        <Skeleton className="w-full h-64 rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="w-full h-80 rounded-xl" />
          <Skeleton className="w-full h-80 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <EmptyState
          title="Project not found"
          description="The project you're looking for doesn't exist or has been deleted."
          action={() => navigate("/")}
          actionLabel="Back to Dashboard"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Back Button & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <HiArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        <Button
          variant="ghost"
          size="sm"
          icon={HiTrash}
          onClick={() => setShowDeleteConfirm(true)}
          className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30"
        >
          Delete Project
        </Button>
      </div>

      {/* Project Header */}
      <ProjectHeader project={project} onEdit={() => setShowEditModal(true)} />

      {/* Tasks & Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskList
          tasks={project.tasks || []}
          projectId={project.id}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
        <ReminderList
          reminders={project.reminders || []}
          onAddReminder={handleAddReminder}
          onDeleteReminder={handleDeleteReminder}
        />
      </div>

      {/* Edit Project Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Project"
        size="xl"
      >
        <ProjectForm
          project={project}
          isEditing
          onClose={() => setShowEditModal(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Delete Project"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-400">
            Are you sure you want to delete{" "}
            <strong className="text-slate-900 dark:text-white">
              {project.name}
            </strong>
            ? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button variant="danger" onClick={handleDelete} fullWidth>
              Delete Project
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectDetails;
