import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminUnlock = () => {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleUnlock = async (e) => {
    e.preventDefault();
    setError("");

    if (!key.trim()) {
      setError("Admin key is required.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/admin/unlock", {
        key,
      });

      localStorage.setItem("adminToken", res.data.token);

      navigate("/admin-panel-9xHardik/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unlock failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0b1220] border border-gray-800 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        <p className="text-gray-400 mt-2 text-sm">
          Enter the admin key to unlock dashboard.
        </p>

        {error && (
          <p className="mt-4 text-red-500 text-sm font-semibold">{error}</p>
        )}

        <form onSubmit={handleUnlock} className="mt-6 space-y-4">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter Admin Key"
            className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl font-bold text-white disabled:opacity-60"
          >
            {loading ? "Unlocking..." : "Unlock Dashboard"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminUnlock;
