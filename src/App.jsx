import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ProjectProvider } from "./context/ProjectContext";
import { UIProvider } from "./context/UIContext";
import { MainLayout } from "./components/layout";
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import ProjectDetails from "./pages/ProjectDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider>
      <ProjectProvider>
        <UIProvider>
          <Router>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/create" element={<CreateProject />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        </UIProvider>
      </ProjectProvider>
    </ThemeProvider>
  );
}

export default App;
