import React, { useEffect, useState } from "react";
import axios from "axios";
import { Github, Linkedin, Instagram, Globe, Mail, Phone, MapPin } from "lucide-react";

const API = import.meta.env.VITE_API_URL;


const Contact = () => {
  const [settings, setSettings] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [loadingLinks, setLoadingLinks] = useState(true);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ✅ Fetch contact info + social links from backend
  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${API}/api/settings`);
      setSettings(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingLinks(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // ✅ Submit Contact Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");
      setSending(true);

      if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
        setError("All fields are required.");
        return;
      }

      const res = await axios.post(`${API}/api/contact`, form);

      setSuccess(res.data.message || "Message sent successfully ✅");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setSending(false);
    }
  };

  const socials = [
    { name: "GitHub", icon: <Github size={20} />, link: settings?.github },
    { name: "LinkedIn", icon: <Linkedin size={20} />, link: settings?.linkedin },
    { name: "Instagram", icon: <Instagram size={20} />, link: settings?.instagram },
    { name: "Blog", icon: <Globe size={20} />, link: settings?.blog },
  ].filter((s) => s.link);

  return (
    <section className="min-h-screen w-full px-4 md:px-8 lg:px-16 py-14">
      <div className="w-full max-w-6xl mx-auto">
        {/* ✅ Top Title */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Let’s Build Something <span className="text-red-500">Great</span>
          </h1>
          <p className="text-gray-400 mt-3 max-w-3xl leading-relaxed">
            Have a project idea or need a MERN + React developer? Send me a message
            and I’ll get back to you as soon as possible.
          </p>
        </div>

        {/* Alerts */}
        {(error || success) && (
          <div className="mt-8">
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

        {/* ✅ 2 Column Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Contact Form */}
          <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white">Send a Message</h2>
            <p className="text-gray-400 text-sm mt-1">
              Your message will be saved in Admin Dashboard + emailed to me.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your Name"
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Your Email"
                type="email"
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Your Message"
                rows={6}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl font-bold text-white disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* RIGHT: Info + Social */}
          <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white">Contact Info</h2>
            <p className="text-gray-400 text-sm mt-1">
              Prefer direct contact or social platforms? Here you go.
            </p>

            {/* Info Cards */}
            <div className="mt-6 space-y-4">
              {settings?.email && (
                <div className="flex items-center gap-3 bg-[#020617] border border-gray-800 rounded-xl px-4 py-4">
                  <Mail className="text-red-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-semibold text-white">{settings.email}</p>
                  </div>
                </div>
              )}

              {settings?.phone && (
                <div className="flex items-center gap-3 bg-[#020617] border border-gray-800 rounded-xl px-4 py-4">
                  <Phone className="text-red-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-semibold text-white">{settings.phone}</p>
                  </div>
                </div>
              )}

              {settings?.location && (
                <div className="flex items-center gap-3 bg-[#020617] border border-gray-800 rounded-xl px-4 py-4">
                  <MapPin className="text-red-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="font-semibold text-white">{settings.location}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="mt-10 border-t border-gray-800 pt-6">
              <h3 className="text-white font-bold">Social Links</h3>

              {loadingLinks ? (
                <p className="text-gray-400 text-sm mt-4">Loading links...</p>
              ) : socials.length === 0 ? (
                <p className="text-gray-400 text-sm mt-4">
                  No social links added yet. Add them from Admin Settings.
                </p>
              ) : (
                <div className="mt-4 flex gap-4 flex-wrap">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#020617] border border-gray-800 hover:border-red-500 hover:text-red-400 transition"
                      title={s.name}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Small Trust Line */}
            <div className="mt-8 bg-[#020617] border border-gray-800 rounded-xl p-5">
              <p className="text-sm text-gray-300 leading-relaxed">
                I focus on building clean UI, responsive websites, and scalable MERN
                applications. If you want a modern and professional website, let’s talk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
