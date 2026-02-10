import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState(null);

  const [form, setForm] = useState({
    portfolioName: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    instagram: "",
    blog: "",
  });

  const [logoFile, setLogoFile] = useState(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fetchSettings = async () => {
    try {
      setError("");
      const res = await axios.get(`${API}/api/settings`);
      setSettings(res.data);

      setForm({
        portfolioName: res.data.portfolioName || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        location: res.data.location || "",
        github: res.data.github || "",
        linkedin: res.data.linkedin || "",
        instagram: res.data.instagram || "",
        blog: res.data.blog || "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      setSuccess("");
      setError("");
      setSaving(true);

      const res = await axios.put(`${API}/api/settings`, form);

      setSettings(res.data.settings);
      setSuccess("Settings updated ✅");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  const handleUploadLogo = async () => {
    try {
      if (!logoFile) {
        setError("Please select a logo image first.");
        return;
      }

      setSuccess("");
      setError("");
      setSaving(true);

      const fd = new FormData();
      fd.append("logo", logoFile);

      const res = await axios.post(`${API}/api/settings/upload-logo`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSettings(res.data.settings);
      setSuccess("Logo uploaded ✅");
      setLogoFile(null);
    } catch (err) {
      setError(err.response?.data?.message || "Logo upload failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white">Loading settings...</p>;

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">
            Settings <span className="text-red-500">.</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Manage portfolio links, contact info, and logo.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl font-bold text-white disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

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

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preview */}
        <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold">Preview</h2>

          <div className="mt-6 flex flex-col items-center">
            <div className="w-28 h-28 rounded-2xl overflow-hidden border border-gray-700 bg-[#0f172a] flex items-center justify-center">
              {settings?.logo ? (
                <img
                  src={`${API}${settings.logo}`}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-gray-500 text-sm">No Logo</p>
              )}
            </div>

            <h3 className="mt-4 font-bold text-white text-lg">
              {form.portfolioName || "Portfolio Name"}
            </h3>

            <div className="mt-4 text-sm text-gray-300 space-y-2 text-center">
              <p>{form.email || "Email not set"}</p>
              <p>{form.phone || "Phone not set"}</p>
              <p>{form.location || "Location not set"}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6 lg:col-span-2">
          <h2 className="text-xl font-bold">Edit Settings</h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={form.portfolioName}
              onChange={(e) => setForm({ ...form, portfolioName: e.target.value })}
              placeholder="Portfolio Name"
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />

            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Location"
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />

            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />

            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone"
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
              placeholder="GitHub Link"
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />

            <input
              value={form.linkedin}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              placeholder="LinkedIn Link"
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />

            <input
              value={form.instagram}
              onChange={(e) => setForm({ ...form, instagram: e.target.value })}
              placeholder="Instagram Link"
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />

            <input
              value={form.blog}
              onChange={(e) => setForm({ ...form, blog: e.target.value })}
              placeholder="Blog Website Link"
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          {/* Upload logo */}
          <div className="mt-8 bg-[#020617] border border-gray-800 rounded-2xl p-5">
            <h3 className="font-bold">Upload Logo</h3>
            <p className="text-gray-400 text-sm mt-1">PNG/JPG/JPEG/WEBP supported.</p>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files[0])}
              className="mt-4 w-full text-sm text-gray-300"
            />

            <button
              type="button"
              onClick={handleUploadLogo}
              disabled={saving}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl font-bold text-white disabled:opacity-60"
            >
              Upload Logo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminSettings;
