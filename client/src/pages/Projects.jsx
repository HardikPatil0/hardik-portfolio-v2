import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  // ✅ Get all categories from DB (dynamic)
  const categories = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => {
      const type = (p.type || "General").trim();
      if (type) set.add(type);
    });

    return ["All", ...Array.from(set)];
  }, [projects]);

  const featured = useMemo(() => projects.filter((p) => p.featured), [projects]);

  const filteredProjects = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => (p.type || "General").trim() === active);
  }, [projects, active]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-[#0b1220] border border-gray-800 rounded-2xl px-6 py-4">
          <p className="text-gray-300 font-semibold">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full px-4 md:px-8 lg:px-16 py-14">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Projects <span className="text-red-500">.</span>
            </h1>
            <p className="text-gray-400 mt-3 max-w-3xl leading-relaxed">
              A collection of my work across frontend, full-stack MERN, and CMS-based
              websites. Each project focuses on clean UI, scalability and real-world features.
            </p>
          </div>

          <div className="bg-[#0b1220] border border-gray-800 rounded-2xl px-5 py-4">
            <p className="text-xs text-gray-400">Total Projects</p>
            <p className="text-2xl font-extrabold text-white">{projects.length}</p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-8 bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Featured */}
        {featured.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">
                Featured <span className="text-red-500">Projects</span>
              </h2>
              <p className="text-sm text-gray-500 hidden md:block">
                Highlighted work for clients and recruiters
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((p) => (
                <div
                  key={p._id}
                  className="relative overflow-hidden bg-gradient-to-br from-[#0b1220] to-[#020617]
                  border border-gray-800 rounded-2xl p-6 hover:border-red-500 transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-white">{p.title}</h3>
                      <p className="text-gray-400 mt-2">{p.desc}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs bg-red-600 text-white px-3 py-1 rounded-full font-bold">
                        Featured
                      </span>
                      <span className="text-xs bg-[#020617] border border-gray-800 px-3 py-1 rounded-full text-gray-200">
                        {(p.type || "General").trim()}
                      </span>
                    </div>
                  </div>

                  {/* Tech */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {(p.tech || []).slice(0, 10).map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-black/30 border border-gray-700 px-3 py-1 rounded-full text-gray-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 flex gap-3 flex-wrap">
                    {p.live ? (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-red-600 hover:bg-red-700 transition px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                      >
                        Live Demo
                      </a>
                    ) : (
                      <button
                        disabled
                        className="bg-gray-700 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-300 cursor-not-allowed"
                      >
                        Live Demo
                      </button>
                    )}

                    {p.github ? (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#020617] border border-gray-800 hover:border-red-500 transition px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                      >
                        GitHub
                      </a>
                    ) : (
                      <button
                        disabled
                        className="bg-[#020617] border border-gray-800 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-400 cursor-not-allowed"
                      >
                        GitHub
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories (Dynamic Filters) */}
        <div className="mt-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-2xl font-bold">
              All <span className="text-red-500">Projects</span>
            </h2>

            <div className="flex flex-wrap gap-3">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`px-5 py-2 rounded-full text-sm font-bold border transition ${
                    active === c
                      ? "bg-red-600 border-red-600 text-white"
                      : "bg-[#0b1220] border-gray-800 text-gray-300 hover:border-red-500"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.length === 0 ? (
              <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6">
                <p className="text-gray-400">
                  No projects found in <span className="text-white">{active}</span>.
                </p>
              </div>
            ) : (
              filteredProjects.map((p) => (
                <div
                  key={p._id}
                  className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6 hover:border-red-500 transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-extrabold text-white">{p.title}</h3>
                    <span className="text-xs bg-[#020617] border border-gray-800 px-3 py-1 rounded-full text-gray-200">
                      {(p.type || "General").trim()}
                    </span>
                  </div>

                  <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                    {p.desc}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(p.tech || []).slice(0, 8).map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-black/30 border border-gray-700 px-3 py-1 rounded-full text-gray-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-3 flex-wrap">
                    {p.live ? (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl text-sm font-bold text-white"
                      >
                        Live
                      </a>
                    ) : (
                      <button
                        disabled
                        className="bg-gray-700 px-4 py-2 rounded-xl text-sm font-bold text-gray-300 cursor-not-allowed"
                      >
                        Live
                      </button>
                    )}

                    {p.github ? (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#020617] border border-gray-800 hover:border-red-500 transition px-4 py-2 rounded-xl text-sm font-bold text-white"
                      >
                        GitHub
                      </a>
                    ) : (
                      <button
                        disabled
                        className="bg-[#020617] border border-gray-800 px-4 py-2 rounded-xl text-sm font-bold text-gray-400 cursor-not-allowed"
                      >
                        GitHub
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
