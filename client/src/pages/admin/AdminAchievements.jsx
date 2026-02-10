import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

const CATEGORIES = [
  "Certification",
  "Internship",
  "Award",
  "Hackathon",
  "Open Source",
];

const AdminAchievements = () => {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Create form
  const [form, setForm] = useState({
    title: "",
    issuer: "",
    category: "Certification",
    date: "",
    proofUrl: "",
    featured: false,
  });

  // Edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    issuer: "",
    category: "Certification",
    date: "",
    proofUrl: "",
    featured: false,
  });

  const fetchAchievements = async () => {
    try {
      setError("");
      const res = await axios.get(`${API}/api/achievements`);
      setItems(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load achievements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((x) => x.category === activeCategory);
  }, [items, activeCategory]);

  const stats = useMemo(() => {
    return {
      total: items.length,
      featured: items.filter((x) => x.featured).length,
    };
  }, [items]);

  const handleCreate = async () => {
    try {
      setSuccess("");
      setError("");
      setSaving(true);

      if (!form.title.trim()) {
        setError("Title is required.");
        return;
      }

      const res = await axios.post(`${API}/api/achievements`, {
        title: form.title,
        issuer: form.issuer,
        category: form.category,
        date: form.date,
        proofUrl: form.proofUrl,
        featured: form.featured,
      });

      setSuccess(res.data.message || "Achievement added ✅");

      setForm({
        title: "",
        issuer: "",
        category: "Certification",
        date: "",
        proofUrl: "",
        featured: false,
      });

      fetchAchievements();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add achievement");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (x) => {
    setEditId(x._id);
    setEditForm({
      title: x.title || "",
      issuer: x.issuer || "",
      category: x.category || "Certification",
      date: x.date || "",
      proofUrl: x.proofUrl || "",
      featured: x.featured || false,
    });
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    try {
      setSuccess("");
      setError("");
      setSaving(true);

      const res = await axios.put(`${API}/api/achievements/${editId}`, editForm);

      setSuccess(res.data.message || "Achievement updated ✅");
      setEditOpen(false);
      fetchAchievements();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update achievement");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setSuccess("");
      setError("");
      setDeletingId(id);

      await axios.delete(`${API}/api/achievements/${id}`);

      setSuccess("Achievement deleted ✅");
      fetchAchievements();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete achievement");
    } finally {
      setDeletingId(null);
    }
  };

  const chipClass = (isActive) =>
    `px-4 py-2 rounded-full text-sm font-bold border transition ${
      isActive
        ? "bg-red-600 border-red-600 text-white"
        : "bg-[#0b1220] border-gray-800 text-gray-300 hover:border-red-500"
    }`;

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-[#0b1220] border border-gray-800 rounded-2xl px-6 py-4">
          <p className="text-gray-300 font-semibold">Loading achievements...</p>
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
            Achievements <span className="text-red-500">.</span>
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl">
            Add certificates, awards, hackathons, and other achievements shown on your portfolio.
          </p>
        </div>

        <div className="flex gap-3">
          <StatCard label="Total" value={stats.total} />
          <StatCard label="Featured" value={stats.featured} />
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
        <h2 className="text-xl font-bold">Add New Achievement</h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title (e.g. React Certificate)"
            className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          />

          <input
            value={form.issuer}
            onChange={(e) => setForm({ ...form, issuer: e.target.value })}
            placeholder="Issuer (e.g. Coursera / Udemy)"
            className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            placeholder="Date (e.g. Feb 2025)"
            className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          />

          <input
            value={form.proofUrl}
            onChange={(e) => setForm({ ...form, proofUrl: e.target.value })}
            placeholder="Proof URL (optional)"
            className="w-full md:col-span-2 bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
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
          {saving ? "Saving..." : "Add Achievement"}
        </button>
      </div>

      {/* Filters */}
      <div className="mt-10 flex flex-wrap gap-3">
        <button
          onClick={() => setActiveCategory("All")}
          className={chipClass(activeCategory === "All")}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={chipClass(activeCategory === c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">All Achievements</h2>

        {filtered.length === 0 ? (
          <p className="text-gray-400 mt-3">No achievements found.</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((x) => (
              <div
                key={x._id}
                className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6 hover:border-red-500 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-white">{x.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {x.issuer || "—"} • {x.date || "—"}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge text={x.category} />
                      {x.featured && <Badge text="Featured" subtle />}
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

                {x.proofUrl && (
                  <div className="mt-4">
                    <a
                      href={x.proofUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-bold text-red-400 hover:text-red-300"
                    >
                      View Proof →
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
            <h2 className="text-xl font-bold">Edit Achievement</h2>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                placeholder="Title"
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <input
                value={editForm.issuer}
                onChange={(e) => setEditForm({ ...editForm, issuer: e.target.value })}
                placeholder="Issuer"
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <select
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({ ...editForm, category: e.target.value })
                }
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <input
                value={editForm.date}
                onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                placeholder="Date"
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <input
                value={editForm.proofUrl}
                onChange={(e) =>
                  setEditForm({ ...editForm, proofUrl: e.target.value })
                }
                placeholder="Proof URL"
                className="w-full md:col-span-2 bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
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
              <p className="text-sm text-gray-300">Featured</p>
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

export default AdminAchievements;

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
