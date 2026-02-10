import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

const TYPES = ["Internship", "Freelance", "Job", "Open Source"];

const AdminExperience = () => {
  const [data, setData] = useState([]);
  const [activeType, setActiveType] = useState("All");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Create form
  const [form, setForm] = useState({
    role: "",
    company: "",
    type: "Internship",
    startDate: "",
    endDate: "",
    description: "",
    skillsText: "",
    certificateUrl: "",
  });

  // Edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    role: "",
    company: "",
    type: "Internship",
    startDate: "",
    endDate: "",
    description: "",
    skillsText: "",
    certificateUrl: "",
  });

  const fetchExperience = async () => {
    try {
      setError("");
      const res = await axios.get(`${API}/api/experience`);
      setData(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load experience");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const stats = useMemo(() => {
    return {
      total: data.length,
      internship: data.filter((x) => x.type === "Internship").length,
      freelance: data.filter((x) => x.type === "Freelance").length,
      job: data.filter((x) => x.type === "Job").length,
      oss: data.filter((x) => x.type === "Open Source").length,
    };
  }, [data]);

  const filtered = useMemo(() => {
    if (activeType === "All") return data;
    return data.filter((x) => x.type === activeType);
  }, [data, activeType]);

  const parseSkills = (skillsText) =>
    skillsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const resetCreateForm = () => {
    setForm({
      role: "",
      company: "",
      type: "Internship",
      startDate: "",
      endDate: "",
      description: "",
      skillsText: "",
      certificateUrl: "",
    });
  };

  const handleCreate = async () => {
    try {
      setSuccess("");
      setError("");
      setSaving(true);

      if (!form.role.trim() || !form.company.trim()) {
        setError("Role and Company are required.");
        return;
      }

      const payload = {
        role: form.role,
        company: form.company,
        type: form.type,
        startDate: form.startDate,
        endDate: form.endDate,
        description: form.description,
        skills: parseSkills(form.skillsText),
        certificateUrl: form.certificateUrl,
      };

      const res = await axios.post(`${API}/api/experience`, payload);

      setSuccess(res.data.message || "Experience added ✅");
      resetCreateForm();
      fetchExperience();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create experience");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (x) => {
    setEditId(x._id);
    setEditForm({
      role: x.role || "",
      company: x.company || "",
      type: x.type || "Internship",
      startDate: x.startDate || "",
      endDate: x.endDate || "",
      description: x.description || "",
      skillsText: (x.skills || []).join(", "),
      certificateUrl: x.certificateUrl || "",
    });
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    try {
      setSuccess("");
      setError("");
      setSaving(true);

      const payload = {
        role: editForm.role,
        company: editForm.company,
        type: editForm.type,
        startDate: editForm.startDate,
        endDate: editForm.endDate,
        description: editForm.description,
        skills: parseSkills(editForm.skillsText),
        certificateUrl: editForm.certificateUrl,
      };

      const res = await axios.put(`${API}/api/experience/${editId}`, payload);

      setSuccess(res.data.message || "Experience updated ✅");
      setEditOpen(false);
      fetchExperience();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update experience");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setSuccess("");
      setError("");
      setDeletingId(id);

      await axios.delete(`${API}/api/experience/${id}`);

      setSuccess("Experience deleted ✅");
      fetchExperience();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete experience");
    } finally {
      setDeletingId(null);
    }
  };

  const linkClass = (isActive) =>
    `px-4 py-2 rounded-full text-sm font-bold border transition ${
      isActive
        ? "bg-red-600 border-red-600 text-white"
        : "bg-[#0b1220] border-gray-800 text-gray-300 hover:border-red-500"
    }`;

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-[#0b1220] border border-gray-800 rounded-2xl px-6 py-4">
          <p className="text-gray-300 font-semibold">Loading experience...</p>
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
            Experience <span className="text-red-500">.</span>
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl">
            Add internships, freelance work, open-source experience, and jobs. This
            section is shown on your public portfolio.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Total" value={stats.total} />
          <StatCard label="Internship" value={stats.internship} />
          <StatCard label="Freelance" value={stats.freelance} />
          <StatCard label="Open Source" value={stats.oss} />
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

      {/* Create */}
      <div className="mt-8 bg-[#0b1220] border border-gray-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold">Add New Experience</h2>
        <p className="text-gray-400 text-sm mt-1">
          Keep it simple and recruiter-friendly.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder="Role (e.g. Web Developer Intern)"
            className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          />

          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Company / Organization"
            className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          />

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <input
            value={form.certificateUrl}
            onChange={(e) => setForm({ ...form, certificateUrl: e.target.value })}
            placeholder="Certificate URL (optional)"
            className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          />

          <input
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            placeholder="Start Date (e.g. Jan 2025)"
            className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          />

          <input
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            placeholder="End Date (e.g. Mar 2025 / Present)"
            className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          />
        </div>

        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Short description (what you did, impact, tools)"
          rows={4}
          className="mt-4 w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
        />

        <input
          value={form.skillsText}
          onChange={(e) => setForm({ ...form, skillsText: e.target.value })}
          placeholder="Skills (comma separated) e.g. React, Tailwind, API, Git"
          className="mt-4 w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
        />

        <button
          onClick={handleCreate}
          disabled={saving}
          className="mt-6 bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl font-bold text-white disabled:opacity-60"
        >
          {saving ? "Saving..." : "Add Experience"}
        </button>
      </div>

      {/* Filters */}
      <div className="mt-10 flex flex-wrap gap-3">
        <button
          onClick={() => setActiveType("All")}
          className={linkClass(activeType === "All")}
        >
          All
        </button>
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className={linkClass(activeType === t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">All Experience</h2>

        {filtered.length === 0 ? (
          <p className="text-gray-400 mt-3">No experience found.</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((x) => (
              <div
                key={x._id}
                className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6 hover:border-red-500 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-white">{x.role}</h3>
                    <p className="text-gray-400 text-sm mt-1">{x.company}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge text={x.type} />
                      {(x.startDate || x.endDate) && (
                        <Badge
                          text={`${x.startDate || "—"} → ${x.endDate || "—"}`}
                          subtle
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(x)}
                      className="bg-[#020617] border border-gray-800 hover:border-red-500 transition px-4 py-2 rounded-xl font-bold text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(x._id)}
                      disabled={deletingId === x._id}
                      className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl font-bold text-sm disabled:opacity-60"
                    >
                      {deletingId === x._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>

                {x.description && (
                  <p className="text-gray-300 mt-4 text-sm leading-relaxed">
                    {x.description}
                  </p>
                )}

                {(x.skills || []).length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {x.skills.slice(0, 10).map((s) => (
                      <span
                        key={s}
                        className="text-xs bg-black/30 border border-gray-700 px-3 py-1 rounded-full text-gray-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {x.certificateUrl && (
                  <div className="mt-4">
                    <a
                      href={x.certificateUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-bold text-red-400 hover:text-red-300"
                    >
                      View Certificate →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50">
          <div className="w-full max-w-2xl bg-[#0b1220] border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold">Edit Experience</h2>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={editForm.role}
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                placeholder="Role"
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <input
                value={editForm.company}
                onChange={(e) =>
                  setEditForm({ ...editForm, company: e.target.value })
                }
                placeholder="Company"
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <select
                value={editForm.type}
                onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <input
                value={editForm.certificateUrl}
                onChange={(e) =>
                  setEditForm({ ...editForm, certificateUrl: e.target.value })
                }
                placeholder="Certificate URL (optional)"
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={editForm.startDate}
                onChange={(e) =>
                  setEditForm({ ...editForm, startDate: e.target.value })
                }
                placeholder="Start Date"
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <input
                value={editForm.endDate}
                onChange={(e) => setEditForm({ ...editForm, endDate: e.target.value })}
                placeholder="End Date"
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />
            </div>

            <textarea
              value={editForm.description}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
              placeholder="Description"
              rows={4}
              className="mt-4 w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />

            <input
              value={editForm.skillsText}
              onChange={(e) =>
                setEditForm({ ...editForm, skillsText: e.target.value })
              }
              placeholder="Skills (comma separated)"
              className="mt-4 w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />

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

export default AdminExperience;

function StatCard({ label, value }) {
  return (
    <div className="bg-[#0b1220] border border-gray-800 rounded-2xl px-4 py-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-xl font-extrabold text-white">{value}</p>
    </div>
  );
}

function Badge({ text, subtle = false }) {
  return (
    <span
      className={`text-xs px-3 py-1 rounded-full font-bold border ${
        subtle
          ? "bg-[#020617] border-gray-800 text-gray-300"
          : "bg-red-600/20 border-red-600 text-red-300"
      }`}
    >
      {text}
    </span>
  );
}
