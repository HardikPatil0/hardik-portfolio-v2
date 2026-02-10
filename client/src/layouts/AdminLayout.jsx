import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-panel-9xHardik");
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-xl font-semibold transition ${
      isActive
        ? "bg-red-600 text-white"
        : "text-gray-300 hover:bg-[#0f172a] hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      {/* Sidebar */}
      <aside className="w-72 hidden md:flex flex-col border-r border-gray-800 p-6">
        <h1 className="text-xl font-extrabold">
          Hardik<span className="text-red-500">Admin</span>
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Manage portfolio content & uploads.
        </p>

     <nav className="mt-8 space-y-2">
  <NavLink to="" end className={linkClass}>
    Dashboard
  </NavLink>

  <NavLink to="profile" className={linkClass}>
    Profile (Home/About)
  </NavLink>

  <NavLink to="projects" className={linkClass}>
    Projects
  </NavLink>

  <NavLink to="experience" className={linkClass}>
    Experience
  </NavLink>

  <NavLink to="achievements" className={linkClass}>
    Achievements
  </NavLink>

  <NavLink to="messages" className={linkClass}>
    Messages
  </NavLink>

  <NavLink to="settings" className={linkClass}>
    Settings
  </NavLink>
</nav>


        <button
          onClick={handleLogout}
          className="mt-auto bg-[#0b1220] border border-gray-800 hover:border-red-500 transition rounded-xl px-4 py-3 font-bold"
        >
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
