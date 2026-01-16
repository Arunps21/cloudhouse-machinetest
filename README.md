# TaskSphere

TaskSphere is a modern, responsive Project Management System built with React and Tailwind CSS. It allows users to manage projects, track tasks, set reminders, and visualize progress through an intuitive dashboard.

## Features

- **📊 Interactive Dashboard**: Visual overview of project stats, completion rates, and upcoming deadlines using custom SVG charts.
- **📁 Project Management**: Create, edit, and delete projects with detailed metadata (priority, status, dates).
- **✅ Task Tracking**: Manage tasks within projects with status tracking (Todo, In Progress, Done).
- **🔔 Reminders**: Set and view reminders for critical project milestones.
- **🌙 Dark Mode**: Fully supported dark/light theme switching with system preference detection.
- **📱 Responsive Design**: Optimized for all device sizes, from mobile to desktop.
- **💾 Local Persistence**: Data is persisted using LocalStorage for a consistent experience across reloads.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **State Management**: React Context API

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── common/       # Buttons, Inputs, Modals, etc.
│   ├── dashboard/    # Charts and stats widgets
│   ├── layout/       # Header, MainLayout
│   ├── project/      # Project-related forms and views
│   ├── tasks/        # Task lists and items
│   └── reminders/    # Reminder components
├── context/          # React Context providers (Project, Theme, UI)
├── data/             # Mock data and initial state
├── pages/            # Main application pages
└── index.css         # Tailwind CSS imports
```

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cloudhouse-machinetest
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` to view the application.

## Development

- **Linting**: `npm run lint`
- **Building for Production**: `npm run build`
- **Preview Production Build**: `npm run preview`

## License

MIT
