import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;


const Achievements = () => {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const categories = useMemo(() => {
    const set = new Set(items.map((x) => x.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [items]);

  const featured = useMemo(() => items.filter((x) => x.featured), [items]);

  const filtered = useMemo(() => {
    if (active === "All") return items;
    return items.filter((x) => x.category === active);
  }, [items, active]);

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
    <section className="min-h-screen w-full px-4 md:px-8 lg:px-16 py-14">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Achievements <span className="text-red-500">.</span>
        </h1>
        <p className="text-gray-400 mt-3 max-w-3xl leading-relaxed">
          Certifications, awards, and achievements that reflect consistent learning and growth.
        </p>

        {error && (
          <div className="mt-8 bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Featured */}
        {featured.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold">
              Featured <span className="text-red-500">Highlights</span>
            </h2>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((x) => (
                <div
                  key={x._id}
                  className="bg-gradient-to-br from-[#0b1220] to-[#020617] border border-gray-800 rounded-2xl p-6 hover:border-red-500 transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-extrabold text-white">{x.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {x.issuer || "—"} • {x.date || "—"}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs bg-red-600 text-white px-3 py-1 rounded-full font-bold">
                        Featured
                      </span>
                      <span className="text-xs bg-[#020617] border border-gray-800 px-3 py-1 rounded-full text-gray-200">
                        {x.category}
                      </span>
                    </div>
                  </div>

                  {x.proofUrl && (
                    <div className="mt-5">
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
          </div>
        )}

        {/* Filters */}
        <div className="mt-14 flex flex-wrap gap-3">
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

        {/* List */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6">
              <p className="text-gray-400">
                No achievements found in <span className="text-white">{active}</span>.
              </p>
            </div>
          ) : (
            filtered.map((x) => (
              <div
                key={x._id}
                className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6 hover:border-red-500 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-extrabold text-white">{x.title}</h3>
                  <span className="text-xs bg-[#020617] border border-gray-800 px-3 py-1 rounded-full text-gray-200">
                    {x.category}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mt-2">
                  {x.issuer || "—"} • {x.date || "—"}
                </p>

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
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
