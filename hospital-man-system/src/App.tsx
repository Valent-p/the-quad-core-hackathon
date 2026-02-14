import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { initializeMockData } from "./api/data";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";

function App() {
  useEffect(() => {
    initializeMockData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Navigate to="/blog" replace />} />
          <Route path="/blog" element={<Blog />} />
          <Route
            path="/about"
            element={<div style={{ padding: "2rem" }}>About MediCore AI</div>}
          />
        </Route>

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route
            path="/blog-admin"
            element={
              <div style={{ padding: "2rem" }}>Blog Management Placeholder</div>
            }
          />
          <Route
            path="/settings"
            element={
              <div style={{ padding: "2rem" }}>Settings Placeholder</div>
            }
          />
        </Route>

        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
