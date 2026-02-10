import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

const projectTypes = ["Frontend", "Full Stack", "CMS"];

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Create form
  const [form, setForm] = useState({
    title: "",
    desc: "",
    techText: "",
    github: "",
    live: "",
    featured: false,
    type: "Frontend",
  });

  // Edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    desc: "",
    techText: "",
    github: "",
    live: "",
    featured: false,
    type: "Frontend",
  });

  const fetchProjects = async () => {
    try {
      setError("");
      const res = await axios.get(`${API}/api/projects`);
      setProjects(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async () => {
    try {
      setSuccess("");
      setError("");
      setSaving(true);

      if (!form.title.trim() || !form.desc.trim()) {
        setError("Title and Description are required.");
        return;
      }

      const tech = form.techText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await axios.post(`${API}/api/projects`, {
        title: form.title,
        desc: form.desc,
        tech,
        github: form.github,
        live: form.live,
        featured: form.featured,
        type: form.type,
      });

      setSuccess(res.data.message || "Project created ✅");

      setForm({
        title: "",
        desc: "",
        techText: "",
        github: "",
        live: "",
        featured: false,
        type: "Frontend",
      });

      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (p) => {
    setEditId(p._id);
    setEditForm({
      title: p.title || "",
      desc: p.desc || "",
      techText: (p.tech || []).join(", "),
      github: p.github || "",
      live: p.live || "",
      featured: p.featured || false,
      type: p.type || "Frontend",
    });
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    try {
      setSuccess("");
      setError("");
      setSaving(true);

      const tech = editForm.techText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await axios.put(`${API}/api/projects/${editId}`, {
        title: editForm.title,
        desc: editForm.desc,
        tech,
        github: editForm.github,
        live: editForm.live,
        featured: editForm.featured,
        type: editForm.type,
      });

      setSuccess(res.data.message || "Project updated ✅");
      setEditOpen(false);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update project");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setSuccess("");
      setError("");
      setDeletingId(id);

      await axios.delete(`${API}/api/projects/${id}`);

      setSuccess("Project deleted ✅");
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete project");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div className="text-white">Loading projects...</div>;
  }

  return (
    <section>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">
            Projects <span className="text-red-500">.</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Add, edit, delete and feature projects on your portfolio.
          </p>
        </div>

        <div className="bg-[#0b1220] border border-gray-800 rounded-2xl px-5 py-4">
          <p className="text-xs text-gray-400">Total Projects</p>
          <p className="text-2xl font-extrabold text-white">{projects.length}</p>
        </div>
      </div>

      {/* Alerts */}
      {(error || success) && (
        <div className="mt-6">
          {error && (
            <p className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded-xl">
              {error}
            </p>
          )}
          {success && (
            <p className="bg-green-600/20 border border-green-600 text-green-400 px-4 py-3 rounded-xl">
              {success}
            </p>
          )}
        </div>
      )}

      {/* Create Project */}
      <div className="mt-8 bg-[#0b1220] border border-gray-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold">Add New Project</h2>
        <p className="text-gray-400 text-sm mt-1">
          Keep it short and client-friendly.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Project Title"
            className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          />

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          >
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <input
            value={form.techText}
            onChange={(e) => setForm({ ...form, techText: e.target.value })}
            placeholder="Tech stack (comma separated) e.g. React, Node, MongoDB"
            className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500 md:col-span-2"
          />
        </div>

        <textarea
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
          placeholder="Project Description"
          rows={4}
          className="mt-4 w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
        />

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            placeholder="GitHub URL (optional)"
            className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          />

          <input
            value={form.live}
            onChange={(e) => setForm({ ...form, live: e.target.value })}
            placeholder="Live URL (optional)"
            className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          <p className="text-sm text-gray-300">Mark as Featured</p>
        </div>

        <button
          onClick={handleCreate}
          disabled={saving}
          className="mt-6 bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl font-bold text-white disabled:opacity-60"
        >
          {saving ? "Saving..." : "Add Project"}
        </button>
      </div>

      {/* Project List */}
      <div className="mt-10">
        <h2 className="text-xl font-bold">All Projects</h2>

        {projects.length === 0 ? (
          <p className="text-gray-400 mt-3">No projects added yet.</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div
                key={p._id}
                className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6 hover:border-red-500 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{p.title}</h3>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs bg-[#020617] border border-gray-800 px-3 py-1 rounded-full text-gray-200">
                        {p.type || "Frontend"}
                      </span>

                      {p.featured && (
                        <span className="text-xs bg-red-600 px-3 py-1 rounded-full font-bold">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="text-gray-400 text-sm mt-3">{p.desc}</p>
                  </div>
                </div>

                {/* Tech */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {(p.tech || []).slice(0, 8).map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-[#020617] border border-gray-800 px-3 py-1 rounded-full text-gray-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-4 flex gap-3">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-bold text-green-400 hover:text-green-300"
                    >
                      Live
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-bold text-blue-400 hover:text-blue-300"
                    >
                      GitHub
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => openEdit(p)}
                    className="bg-[#020617] border border-gray-800 hover:border-red-500 transition px-4 py-2 rounded-xl font-bold text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    disabled={deletingId === p._id}
                    className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl font-bold text-sm disabled:opacity-60"
                  >
                    {deletingId === p._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50">
          <div className="w-full max-w-2xl bg-[#0b1220] border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold">Edit Project</h2>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                placeholder="Project Title"
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <select
                value={editForm.type}
                onChange={(e) =>
                  setEditForm({ ...editForm, type: e.target.value })
                }
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              >
                {projectTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <input
                value={editForm.techText}
                onChange={(e) =>
                  setEditForm({ ...editForm, techText: e.target.value })
                }
                placeholder="Tech stack (comma separated)"
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500 md:col-span-2"
              />
            </div>

            <textarea
              value={editForm.desc}
              onChange={(e) =>
                setEditForm({ ...editForm, desc: e.target.value })
              }
              placeholder="Project Description"
              rows={4}
              className="mt-4 w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={editForm.github}
                onChange={(e) =>
                  setEditForm({ ...editForm, github: e.target.value })
                }
                placeholder="GitHub URL"
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <input
                value={editForm.live}
                onChange={(e) =>
                  setEditForm({ ...editForm, live: e.target.value })
                }
                placeholder="Live URL"
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <input
                type="checkbox"
                checked={editForm.featured}
                onChange={(e) =>
                  setEditForm({ ...editForm, featured: e.target.checked })
                }
              />
              <p className="text-sm text-gray-300">Featured Project</p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditOpen(false)}
                className="bg-[#020617] border border-gray-800 hover:border-gray-600 transition px-5 py-2 rounded-xl font-bold"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                disabled={saving}
                className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-xl font-bold disabled:opacity-60"
              >
                {saving ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminProjects;
