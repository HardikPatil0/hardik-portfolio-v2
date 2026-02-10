import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    try {
      setError("");
      const res = await axios.get(`${API}/api/contact`);
      setMessages(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return messages;

    return messages.filter((m) => {
      return (
        (m.name || "").toLowerCase().includes(q) ||
        (m.email || "").toLowerCase().includes(q) ||
        (m.message || "").toLowerCase().includes(q)
      );
    });
  }, [messages, search]);

  const unreadCount = useMemo(
    () => messages.filter((m) => !m.isRead).length,
    [messages]
  );

  const handleDelete = async (id) => {
    try {
      setSuccess("");
      setError("");

      await axios.delete(`${API}/api/contact/${id}`);

      setSuccess("Message deleted ✅");
      setSelected(null);
      fetchMessages();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete message");
    }
  };

  const handleMarkRead = async (id, isRead) => {
    try {
      setSuccess("");
      setError("");

      await axios.patch(`${API}/api/contact/${id}/read`, { isRead });

      fetchMessages();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update message");
    }
  };

  const openMessage = async (msg) => {
    setSelected(msg);

    // auto mark read when opened
    if (!msg.isRead) {
      await handleMarkRead(msg._id, true);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-[#0b1220] border border-gray-800 rounded-2xl px-6 py-4">
          <p className="text-gray-300 font-semibold">Loading messages...</p>
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
            Messages <span className="text-red-500">.</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Contact form messages from your portfolio website.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-[#0b1220] border border-gray-800 rounded-2xl px-5 py-4">
            <p className="text-xs text-gray-400">Total</p>
            <p className="text-2xl font-extrabold text-white">{messages.length}</p>
          </div>

          <div className="bg-[#0b1220] border border-gray-800 rounded-2xl px-5 py-4">
            <p className="text-xs text-gray-400">Unread</p>
            <p className="text-2xl font-extrabold text-red-400">{unreadCount}</p>
          </div>
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

      {/* Search */}
      <div className="mt-8 bg-[#0b1220] border border-gray-800 rounded-2xl p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-xl font-bold">Inbox</h2>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, message..."
            className="w-full md:w-96 bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.length === 0 ? (
          <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400">No messages found.</p>
          </div>
        ) : (
          filtered.map((m) => (
            <button
              key={m._id}
              onClick={() => openMessage(m)}
              className={`text-left bg-[#0b1220] border rounded-2xl p-6 transition hover:border-red-500 ${
                m.isRead ? "border-gray-800" : "border-red-500"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-extrabold text-white">
                    {m.name || "Unknown"}
                  </h3>
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

              <p className="text-gray-400 mt-3 text-sm leading-relaxed line-clamp-3">
                {m.message}
              </p>

              <p className="mt-4 text-xs text-gray-500">
                {m.createdAt ? new Date(m.createdAt).toLocaleString() : ""}
              </p>
            </button>
          ))
        )}
      </div>

      {/* View Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50">
          <div className="w-full max-w-2xl bg-[#0b1220] border border-gray-800 rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-white">
                  {selected.name}
                </h2>
                <p className="text-sm text-gray-400">{selected.email}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {selected.createdAt
                    ? new Date(selected.createdAt).toLocaleString()
                    : ""}
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="bg-[#020617] border border-gray-800 hover:border-gray-600 transition px-4 py-2 rounded-xl font-bold text-sm"
              >
                Close
              </button>
            </div>

            <div className="mt-6 bg-[#020617] border border-gray-800 rounded-2xl p-5">
              <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                {selected.message}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 justify-end">
              <a
                href={`mailto:${selected.email}?subject=Reply to your message`}
                className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-xl font-bold text-sm"
              >
                Reply
              </a>

              <button
                onClick={() => handleMarkRead(selected._id, false)}
                className="bg-[#020617] border border-gray-800 hover:border-red-500 transition px-5 py-2 rounded-xl font-bold text-sm"
              >
                Mark Unread
              </button>

              <button
                onClick={() => handleDelete(selected._id)}
                className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-xl font-bold text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminMessages;
