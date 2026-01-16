import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  mockProjects,
  generateId,
  calculateCompletion,
} from "../data/mockProjects";

const ProjectContext = createContext();

// LocalStorage key
const STORAGE_KEY = "pms_projects";

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load projects from localStorage or use mock data
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const savedProjects = localStorage.getItem(STORAGE_KEY);
        if (savedProjects) {
          setProjects(JSON.parse(savedProjects));
        } else {
          setProjects(mockProjects);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProjects));
        }
      } catch (err) {
        setError("Failed to load projects. Please try again.");
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Save to localStorage whenever projects change
  useEffect(() => {
    if (!loading && projects.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }
  }, [projects, loading]);

  // Get project by ID
  const getProject = useCallback(
    (id) => {
      return projects.find((p) => p.id === id);
    },
    [projects],
  );

  // Create new project
  const createProject = useCallback((projectData) => {
    const newProject = {
      id: generateId("p"),
      ...projectData,
      tasks: projectData.tasks || [],
      reminders: projectData.reminders || [],
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  }, []);

  // Update project
  const updateProject = useCallback((id, updates) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === id) {
          return {
            ...project,
            ...updates,
            updatedAt: new Date().toISOString().split("T")[0],
          };
        }
        return project;
      }),
    );
  }, []);

  // Delete project
  const deleteProject = useCallback((id) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  }, []);

  // Add task to project
  const addTask = useCallback((projectId, taskData) => {
    const newTask = {
      id: generateId("t"),
      ...taskData,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: [...project.tasks, newTask],
            updatedAt: new Date().toISOString().split("T")[0],
          };
        }
        return project;
      }),
    );
    return newTask;
  }, []);

  // Update task
  const updateTask = useCallback((projectId, taskId, updates) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: project.tasks.map((task) =>
              task.id === taskId ? { ...task, ...updates } : task,
            ),
            updatedAt: new Date().toISOString().split("T")[0],
          };
        }
        return project;
      }),
    );
  }, []);

  // Delete task
  const deleteTask = useCallback((projectId, taskId) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: project.tasks.filter((task) => task.id !== taskId),
            updatedAt: new Date().toISOString().split("T")[0],
          };
        }
        return project;
      }),
    );
  }, []);

  // Add reminder to project
  const addReminder = useCallback((projectId, reminderData) => {
    const newReminder = {
      id: generateId("r"),
      ...reminderData,
    };
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            reminders: [...project.reminders, newReminder],
            updatedAt: new Date().toISOString().split("T")[0],
          };
        }
        return project;
      }),
    );
    return newReminder;
  }, []);

  // Delete reminder
  const deleteReminder = useCallback((projectId, reminderId) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            reminders: project.reminders.filter((r) => r.id !== reminderId),
            updatedAt: new Date().toISOString().split("T")[0],
          };
        }
        return project;
      }),
    );
  }, []);

  // Get dashboard statistics
  const getStats = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const total = projects.length;
    const completed = projects.filter((p) => p.status === "completed").length;
    const inProgress = projects.filter(
      (p) => p.status === "in-progress",
    ).length;
    const planned = projects.filter((p) => p.status === "planned").length;
    const onHold = projects.filter((p) => p.status === "on-hold").length;
    const overdue = projects.filter((p) => {
      const endDate = new Date(p.endDate);
      return endDate < today && p.status !== "completed";
    }).length;

    const highPriority = projects.filter((p) => p.priority === "high").length;
    const mediumPriority = projects.filter(
      (p) => p.priority === "medium",
    ).length;
    const lowPriority = projects.filter((p) => p.priority === "low").length;

    const totalTasks = projects.reduce(
      (sum, p) => sum + (p.tasks?.length || 0),
      0,
    );
    const completedTasks = projects.reduce(
      (sum, p) =>
        sum + (p.tasks?.filter((t) => t.status === "done").length || 0),
      0,
    );

    return {
      total,
      completed,
      inProgress,
      planned,
      onHold,
      overdue,
      highPriority,
      mediumPriority,
      lowPriority,
      totalTasks,
      completedTasks,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      taskCompletionRate:
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    };
  }, [projects]);

  // Reset to mock data
  const resetData = useCallback(() => {
    setProjects(mockProjects);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProjects));
  }, []);

  const value = {
    projects,
    loading,
    error,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
    addReminder,
    deleteReminder,
    getStats,
    resetData,
    calculateCompletion,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};

export default ProjectContext;
