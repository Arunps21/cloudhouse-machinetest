// Project Statuses
export const projectStatuses = [
  {
    value: "planned",
    label: "Planned",
    color: "bg-slate-500",
    textColor: "text-slate-500",
    bgLight: "bg-slate-100 dark:bg-slate-900",
    icon: "clipboard",
  },
  {
    value: "in-progress",
    label: "In Progress",
    color: "bg-blue-500",
    textColor: "text-blue-500",
    bgLight: "bg-blue-100 dark:bg-blue-900",
    icon: "play",
  },
  {
    value: "completed",
    label: "Completed",
    color: "bg-emerald-500",
    textColor: "text-emerald-500",
    bgLight: "bg-emerald-100 dark:bg-emerald-900",
    icon: "check",
  },
  {
    value: "on-hold",
    label: "On Hold",
    color: "bg-amber-500",
    textColor: "text-amber-500",
    bgLight: "bg-amber-100 dark:bg-amber-900",
    icon: "pause",
  },
];

// Task Statuses
export const taskStatuses = [
  {
    value: "todo",
    label: "To Do",
    color: "bg-slate-500",
    textColor: "text-slate-500",
    bgLight: "bg-slate-100 dark:bg-slate-800",
  },
  {
    value: "in-progress",
    label: "In Progress",
    color: "bg-blue-500",
    textColor: "text-blue-500",
    bgLight: "bg-blue-100 dark:bg-blue-900",
  },
  {
    value: "done",
    label: "Done",
    color: "bg-emerald-500",
    textColor: "text-emerald-500",
    bgLight: "bg-emerald-100 dark:bg-emerald-900",
  },
];

// Priority Levels
export const priorities = [
  {
    value: "low",
    label: "Low",
    color: "bg-slate-500",
    textColor: "text-slate-500",
    bgLight: "bg-slate-100 dark:bg-slate-800",
    icon: "arrow-down",
  },
  {
    value: "medium",
    label: "Medium",
    color: "bg-amber-500",
    textColor: "text-amber-500",
    bgLight: "bg-amber-100 dark:bg-amber-900",
    icon: "minus",
  },
  {
    value: "high",
    label: "High",
    color: "bg-rose-500",
    textColor: "text-rose-500",
    bgLight: "bg-rose-100 dark:bg-rose-900",
    icon: "arrow-up",
  },
];

// Utility functions
export const getStatusByValue = (value) =>
  projectStatuses.find((s) => s.value === value);
export const getTaskStatusByValue = (value) =>
  taskStatuses.find((s) => s.value === value);
export const getPriorityByValue = (value) =>
  priorities.find((p) => p.value === value);
