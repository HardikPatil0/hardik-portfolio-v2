import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const Experience = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const grouped = useMemo(() => {
    const map = {};
    for (const x of data) {
      const key = x.type || "Other";
      if (!map[key]) map[key] = [];
      map[key].push(x);
    }
    return map;
  }, [data]);

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
    <section className="min-h-screen w-full px-4 md:px-8 lg:px-16 py-14">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Experience <span className="text-red-500">.</span>
        </h1>
        <p className="text-gray-400 mt-3 max-w-3xl leading-relaxed">
          My journey through internships, freelance work, and practical development
          experience — focused on building real-world applications with clean UI and
          scalable backend systems.
        </p>

        {error && (
          <div className="mt-8 bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {data.length === 0 ? (
          <div className="mt-10 bg-[#0b1220] border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400">No experience added yet.</p>
          </div>
        ) : (
          <div className="mt-12 space-y-12">
            {Object.keys(grouped).map((type) => (
              <div key={type}>
                <h2 className="text-2xl font-bold">
                  {type} <span className="text-red-500">.</span>
                </h2>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {grouped[type].map((x) => (
                    <div
                      key={x._id}
                      className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6 hover:border-red-500 transition"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-extrabold text-white">
                            {x.role}
                          </h3>
                          <p className="text-gray-400 text-sm mt-1">{x.company}</p>

                          {(x.startDate || x.endDate) && (
                            <p className="text-gray-500 text-xs mt-2">
                              {x.startDate || "—"} → {x.endDate || "—"}
                            </p>
                          )}
                        </div>

                        <span className="text-xs bg-red-600/20 border border-red-600 text-red-300 px-3 py-1 rounded-full font-bold">
                          {x.type}
                        </span>
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
                        <div className="mt-5">
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
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
