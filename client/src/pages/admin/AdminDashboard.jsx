import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:5000";

const StatCard = ({ title, value, subtitle }) => {
  return (
    <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6 hover:border-red-500 transition">
      <p className="text-xs text-gray-400">{title}</p>
      <p className="text-3xl font-extrabold text-white mt-2">{value}</p>
      {subtitle && <p className="text-sm text-gray-500 mt-2">{subtitle}</p>}
    </div>
  );
};

const QuickLink = ({ title, desc, to }) => {
  return (
    <Link
      to={to}
      className="block bg-[#0b1220] border border-gray-800 rounded-2xl p-6 hover:border-red-500 transition"
    >
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-gray-400 text-sm mt-2 leading-relaxed">{desc}</p>
      <p className="text-red-400 font-bold text-sm mt-4">Open →</p>
    </Link>
  );
};

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [projRes, msgRes] = await Promise.all([
        axios.get(`${API}/api/projects`),
        axios.get(`${API}/api/contact`),
      ]);

      setProjects(projRes.data || []);
      setMessages(msgRes.data || []);
    } catch (error) {
      console.log("Dashboard fetch error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const featuredCount = useMemo(
    () => projects.filter((p) => p.featured).length,
    [projects]
  );

  const unreadCount = useMemo(
    () => messages.filter((m) => !m.isRead).length,
    [messages]
  );

  const latestMessages = useMemo(() => messages.slice(0, 4), [messages]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-[#0b1220] border border-gray-800 rounded-2xl px-6 py-4">
          <p className="text-gray-300 font-semibold">Loading dashboard...</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold">
            Admin Dashboard <span className="text-red-500">.</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your portfolio content professionally.
          </p>
        </div>

        <div className="bg-[#0b1220] border border-gray-800 rounded-2xl px-5 py-4">
          <p className="text-xs text-gray-400">Quick Tip</p>
          <p className="text-sm text-gray-300 mt-1">
            Keep only your best projects as{" "}
            <span className="text-white font-bold">Featured</span>.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Projects" value={projects.length} />
        <StatCard title="Featured Projects" value={featuredCount} />
        <StatCard title="Total Messages" value={messages.length} />
        <StatCard title="Unread Messages" value={unreadCount} subtitle="Reply fast for trust" />
      </div>

      {/* Quick Links */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold">
          Quick <span className="text-red-500">Actions</span>
        </h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <QuickLink
            title="Edit Profile"
            desc="Update your name, title, skills, resume and profile image."
            to="/admin-panel-9xHardik/dashboard/profile"
          />
          <QuickLink
            title="Manage Projects"
            desc="Add new projects, update links, and control categories."
            to="/admin-panel-9xHardik/dashboard/projects"
          />
          <QuickLink
            title="Experience"
            desc="Add internships, freelancing, and professional timeline."
            to="/admin-panel-9xHardik/dashboard/experience"
          />
          <QuickLink
            title="Messages"
            desc="View client messages, reply quickly, mark read/unread."
            to="/admin-panel-9xHardik/dashboard/messages"
          />
        </div>
      </div>

      {/* Latest Messages */}
      <div className="mt-12">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">
            Latest <span className="text-red-500">Messages</span>
          </h2>

          <Link
            to="/admin-panel-9xHardik/dashboard/messages"
            className="text-sm font-bold text-red-400 hover:text-red-300"
          >
            View all →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestMessages.length === 0 ? (
            <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6">
              <p className="text-gray-400">No messages yet.</p>
            </div>
          ) : (
            latestMessages.map((m) => (
              <div
                key={m._id}
                className={`bg-[#0b1220] border rounded-2xl p-6 ${
                  m.isRead ? "border-gray-800" : "border-red-500"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-extrabold text-white">{m.name}</h3>
                    <p className="text-sm text-gray-400">{m.email}</p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold ${
                      m.isRead
                        ? "bg-[#020617] border border-gray-800 text-gray-300"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {m.isRead ? "Read" : "Unread"}
                  </span>
                </div>

                <p className="text-gray-400 mt-3 text-sm line-clamp-2">
                  {m.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
