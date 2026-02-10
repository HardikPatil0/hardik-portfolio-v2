import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

const AdminProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState(null);

  // Basic profile form
  const [form, setForm] = useState({
    name: "",
    title: "",
    intro: "",
    skillsText: "",
  });

  // Uploads
  const [imageFile, setImageFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  // Home Controls
  const [showBadge, setShowBadge] = useState(true);
  const [badgeText, setBadgeText] = useState("");

  const [links, setLinks] = useState({
    github: "",
    linkedin: "",
  });

  const [stats, setStats] = useState({
    projects: "",
    internships: "",
    openSource: "",
  });

  const [services, setServices] = useState([
    { title: "", desc: "" },
    { title: "", desc: "" },
    { title: "", desc: "" },
  ]);

  // Alerts
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch Profile
  const fetchProfile = async () => {
    try {
      setError("");
      const res = await axios.get(`${API}/api/profile`);

      setProfile(res.data);

      setForm({
        name: res.data.name || "",
        title: res.data.title || "",
        intro: res.data.intro || "",
        skillsText: (res.data.skills || []).join(", "),
      });

      setShowBadge(res.data.showBadge ?? true);
      setBadgeText(res.data.badgeText || "");

      setLinks(
        res.data.links || {
          github: "",
          linkedin: "",
        }
      );

      setStats(
        res.data.stats || {
          projects: "",
          internships: "",
          openSource: "",
        }
      );

      if (res.data.services && res.data.services.length === 3) {
        setServices(res.data.services);
      } else {
        setServices([
          { title: "Frontend Development", desc: "" },
          { title: "Backend + APIs", desc: "" },
          { title: "CMS + Client Updates", desc: "" },
        ]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Save Text + Home Controls
  const handleSaveAll = async () => {
    try {
      setSuccess("");
      setError("");
      setSaving(true);

      const skills = form.skillsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await axios.put(`${API}/api/profile`, {
        name: form.name,
        title: form.title,
        intro: form.intro,
        skills,

        showBadge,
        badgeText,

        stats,
        links,

        services,
      });

      setProfile(res.data.profile);
      setSuccess("Profile updated ✅");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // Upload Image
  const handleUploadImage = async () => {
    try {
      if (!imageFile) {
        setError("Please select an image first.");
        return;
      }

      setSuccess("");
      setError("");
      setSaving(true);

      const fd = new FormData();
      fd.append("image", imageFile);

      const res = await axios.post(`${API}/api/profile/upload-image`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProfile(res.data.profile);
      setSuccess("Profile image uploaded ✅");
      setImageFile(null);
    } catch (err) {
      setError(err.response?.data?.message || "Image upload failed");
    } finally {
      setSaving(false);
    }
  };

  // Upload Resume
  const handleUploadResume = async () => {
    try {
      if (!resumeFile) {
        setError("Please select a PDF resume first.");
        return;
      }

      setSuccess("");
      setError("");
      setSaving(true);

      const fd = new FormData();
      fd.append("resume", resumeFile);

      const res = await axios.post(`${API}/api/profile/upload-resume`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProfile(res.data.profile);
      setSuccess("Resume uploaded ✅");
      setResumeFile(null);
    } catch (err) {
      setError(err.response?.data?.message || "Resume upload failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading profile...</div>;
  }

  return (
    <section>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">
            Profile Settings <span className="text-red-500">.</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Control Home page content + uploads from here.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl font-bold text-white disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
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

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Preview */}
        <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold">Preview</h2>
          <p className="text-gray-400 text-sm mt-1">
            Live preview of profile + uploads.
          </p>

          <div className="mt-6 flex flex-col items-center">
            <div className="w-36 h-36 rounded-2xl overflow-hidden border border-gray-700 bg-[#0f172a] flex items-center justify-center">
              {profile?.profileImage ? (
                <img
                  src={`${API}${profile.profileImage}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-gray-500 text-sm">No Image</p>
              )}
            </div>

            <h3 className="mt-4 font-bold text-white text-lg">
              {form.name || "Your Name"}
            </h3>
            <p className="text-gray-400 text-sm">{form.title || "Your Title"}</p>

            <p className="text-gray-300 text-sm mt-4 text-center leading-relaxed">
              {form.intro || "Your intro will show here..."}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {form.skillsText
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
                .slice(0, 10)
                .map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-[#0f172a] border border-gray-700 px-3 py-1 rounded-full text-gray-200"
                  >
                    {skill}
                  </span>
                ))}
            </div>

            {profile?.resumePdf && (
              <a
                href={`${API}${profile.resumePdf}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 text-sm font-bold text-red-400 hover:text-red-300"
              >
                View Uploaded Resume →
              </a>
            )}
          </div>
        </div>

        {/* RIGHT: Editor */}
        <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6 lg:col-span-2">
          <h2 className="text-xl font-bold">Edit Home Page Content</h2>
          <p className="text-gray-400 text-sm mt-1">
            Everything here will reflect on your portfolio Home page.
          </p>

          {/* Basic Inputs */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />

            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title (Example: MERN Stack Developer)"
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <textarea
            value={form.intro}
            onChange={(e) => setForm({ ...form, intro: e.target.value })}
            placeholder="Short intro (Home page description)"
            rows={5}
            className="mt-4 w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          />

          <input
            value={form.skillsText}
            onChange={(e) => setForm({ ...form, skillsText: e.target.value })}
            placeholder="Skills (comma separated) e.g. React, Tailwind, Node, MongoDB, Sanity"
            className="mt-4 w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          />

          {/* Badge Controls */}
          <div className="mt-8 bg-[#020617] border border-gray-800 rounded-2xl p-6">
            <h3 className="font-bold text-lg">Home Badge</h3>

            <div className="flex items-center gap-3 mt-4">
              <input
                type="checkbox"
                checked={showBadge}
                onChange={(e) => setShowBadge(e.target.checked)}
              />
              <p className="text-sm text-gray-300">Show badge on Home page</p>
            </div>

            <input
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              placeholder="Badge text"
              className="mt-4 w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          {/* Links */}
          <div className="mt-8 bg-[#020617] border border-gray-800 rounded-2xl p-6">
            <h3 className="font-bold text-lg">Links</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <input
                value={links.github}
                onChange={(e) => setLinks({ ...links, github: e.target.value })}
                placeholder="GitHub URL"
                className="bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <input
                value={links.linkedin}
                onChange={(e) =>
                  setLinks({ ...links, linkedin: e.target.value })
                }
                placeholder="LinkedIn URL (optional)"
                className="bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 bg-[#020617] border border-gray-800 rounded-2xl p-6">
            <h3 className="font-bold text-lg">Stats</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <input
                value={stats.projects}
                onChange={(e) => setStats({ ...stats, projects: e.target.value })}
                placeholder="Projects (e.g. 10+)"
                className="bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <input
                value={stats.internships}
                onChange={(e) =>
                  setStats({ ...stats, internships: e.target.value })
                }
                placeholder="Internships (e.g. 2)"
                className="bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <input
                value={stats.openSource}
                onChange={(e) =>
                  setStats({ ...stats, openSource: e.target.value })
                }
                placeholder="Open Source (e.g. Active)"
                className="bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Services */}
          <div className="mt-8 bg-[#020617] border border-gray-800 rounded-2xl p-6">
            <h3 className="font-bold text-lg">Services (3 Cards)</h3>

            {services.map((service, i) => (
              <div key={i} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={service.title}
                  onChange={(e) => {
                    const updated = [...services];
                    updated[i].title = e.target.value;
                    setServices(updated);
                  }}
                  placeholder={`Service ${i + 1} Title`}
                  className="bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
                />

                <input
                  value={service.desc}
                  onChange={(e) => {
                    const updated = [...services];
                    updated[i].desc = e.target.value;
                    setServices(updated);
                  }}
                  placeholder={`Service ${i + 1} Description`}
                  className="bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
                />
              </div>
            ))}
          </div>

          {/* Uploads */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image */}
            <div className="bg-[#020617] border border-gray-800 rounded-2xl p-5">
              <h3 className="font-bold">Upload Profile Image</h3>
              <p className="text-gray-400 text-sm mt-1">
                PNG/JPG/JPEG/WEBP supported.
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="mt-4 w-full text-sm text-gray-300"
              />

              <button
                type="button"
                onClick={handleUploadImage}
                disabled={saving}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl font-bold text-white disabled:opacity-60"
              >
                Upload Image
              </button>
            </div>

            {/* Resume */}
            <div className="bg-[#020617] border border-gray-800 rounded-2xl p-5">
              <h3 className="font-bold">Upload Resume (PDF)</h3>
              <p className="text-gray-400 text-sm mt-1">Only PDF allowed.</p>

              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="mt-4 w-full text-sm text-gray-300"
              />

              <button
                type="button"
                onClick={handleUploadResume}
                disabled={saving}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl font-bold text-white disabled:opacity-60"
              >
                Upload Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProfile;
