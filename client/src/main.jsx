import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Achievements from "./pages/Achievements";
import Goals from "./pages/Goals";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import AdminUnlock from "./pages/admin/AdminUnlock";
import ProtectedAdmin from "./pages/admin/ProtectedAdmin";
import AdminLayout from "./layouts/AdminLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminExperience from "./pages/admin/AdminExperience";
import AdminAchievements from "./pages/admin/AdminAchievements";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminSettings from "./pages/admin/AdminSettings";

const router = createBrowserRouter([
  // ✅ Portfolio Routes
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "projects", element: <Projects /> },
      { path: "goals", element: <Goals /> },
      { path: "experience", element: <Experience /> },
      { path: "achievements", element: <Achievements /> },
      { path: "blog", element: <Blog /> },
      { path: "contact", element: <Contact /> },
    ],
  },

  // ✅ Admin Unlock Page (Hidden)
  {
    path: "/admin-panel-9xHardik",
    element: <AdminUnlock />,
    errorElement: <NotFound />,
  },

  // ✅ Admin Panel Layout + Children
  {
    path: "/admin-panel-9xHardik/dashboard",
    element: (
      <ProtectedAdmin>
        <AdminLayout />
      </ProtectedAdmin>
    ),
    children: [
      { index: true, element: <AdminDashboard /> }, // default
      { path: "profile", element: <AdminProfile /> },
      { path: "projects", element: <AdminProjects /> },
      { path: "experience", element: <AdminExperience /> },
      { path: "achievements", element: <AdminAchievements /> },
      { path: "messages", element: <AdminMessages /> },
      { path: "settings", element: <AdminSettings /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
