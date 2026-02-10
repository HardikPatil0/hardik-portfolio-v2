import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Github,
  Linkedin,
  Instagram,
  Globe,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;


const Footer = () => {
  const [settings, setSettings] = useState(null);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${API}/api/settings`);
      setSettings(res.data);
    } catch (err) {
      console.log("Footer settings error:", err.message);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const socials = [
    { name: "GitHub", icon: <Github size={18} />, link: settings?.github },
    { name: "LinkedIn", icon: <Linkedin size={18} />, link: settings?.linkedin },
    { name: "Instagram", icon: <Instagram size={18} />, link: settings?.instagram },
    { name: "Blog", icon: <Globe size={18} />, link: settings?.blog },
  ].filter((s) => s.link);

  return (
    <footer className="mt-20 border-t border-gray-800 bg-[#020617]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-14">
        {/* TOP CTA BAR */}
        <div className="bg-gradient-to-br from-[#0b1220] to-[#020617] border border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Let’s build something <span className="text-red-500">great</span>.
            </h2>
            <p className="text-gray-400 mt-2 text-sm md:text-base max-w-xl leading-relaxed">
              I help businesses and individuals create fast, modern and responsive
              web applications using React, Tailwind, Node.js and MongoDB.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-2xl font-bold text-white"
          >
            Contact Me <ArrowRight size={18} />
          </Link>
        </div>

        {/* MAIN GRID */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand / Intro */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-extrabold text-white">
              {settings?.portfolioName || "Hardik Patil"}
              <span className="text-red-500">.</span>
            </h3>

            <p className="text-gray-400 mt-3 text-sm leading-relaxed">
              MERN Stack Developer focused on building clean UI, scalable backend,
              and client-ready web solutions.
            </p>

            {/* Social */}
            <div className="mt-5 flex gap-3 flex-wrap">
              {socials.length === 0 ? (
                <p className="text-gray-600 text-xs">
                  Add social links from Admin Settings.
                </p>
              ) : (
                socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[#0b1220] border border-gray-800 hover:border-red-500 hover:text-red-400 transition"
                    title={s.name}
                  >
                    {s.icon}
                  </a>
                ))
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg">Quick Links</h4>
            <ul className="mt-4 space-y-3 text-gray-400 text-sm">
              <li>
                <Link to="/" className="hover:text-red-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-red-400 transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-red-400 transition">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-red-400 transition">
                  Experience
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-red-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services (Freelancing focused) */}
          <div>
            <h4 className="text-white font-bold text-lg">Services</h4>
            <ul className="mt-4 space-y-3 text-gray-400 text-sm">
              <li className="hover:text-gray-200 transition">
                React + Tailwind Landing Pages
              </li>
              <li className="hover:text-gray-200 transition">
                Full-Stack MERN Web Apps
              </li>
              <li className="hover:text-gray-200 transition">
                Admin Dashboards (CMS Style)
              </li>
              <li className="hover:text-gray-200 transition">
                Sanity CMS Integration
              </li>
              <li className="hover:text-gray-200 transition">
                API Integration + Auth
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg">Contact</h4>

            <div className="mt-4 space-y-4 text-sm text-gray-300">
              {/* Email */}
              {settings?.email && (
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-red-400 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-xs">Email</p>
                    <p className="font-semibold text-white">{settings.email}</p>
                  </div>
                </div>
              )}

              {/* Phone */}
              {settings?.phone && (
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-red-400 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-xs">Phone</p>
                    <p className="font-semibold text-white">{settings.phone}</p>
                  </div>
                </div>
              )}

              {/* Location */}
              {settings?.location && (
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-red-400 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-xs">Location</p>
                    <p className="font-semibold text-white">{settings.location}</p>
                  </div>
                </div>
              )}

              {/* Small Note */}
              <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  Available for freelance projects and internships. Fast delivery,
                  clean UI, and scalable backend.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-14 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="text-gray-300 font-semibold">
              {settings?.portfolioName || "Hardik Patil"}
            </span>
            . All rights reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Built with{" "}
            <span className="text-gray-300 font-semibold">React</span> +{" "}
            <span className="text-gray-300 font-semibold">Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
