import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API}/api/profile`);
      setProfile(res.data);
    } catch (error) {
      console.log("Home profile fetch error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 font-semibold">Loading...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full px-4 md:px-8 lg:px-16 py-12">
      <div className="w-full max-w-6xl mx-auto">
        {/* Badge */}
        {profile?.showBadge && (
          <div className="flex justify-center md:justify-start">
            <div className="inline-flex items-center gap-2 bg-[#0b1220] border border-gray-800 px-4 py-2 rounded-full text-sm text-gray-300">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              {profile?.badgeText || "Available for Freelance Projects"}
            </div>
          </div>
        )}

        {/* HERO */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight text-center md:text-left">
              Hi, I’m{" "}
              <span className="text-red-500">
                {profile?.name || "Hardik Patil"}
              </span>
              <br />
              <span className="text-white">
                {profile?.title || "MERN Stack Developer"}
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-gray-300 text-center md:text-left leading-relaxed">
              {profile?.intro ||
                "I build modern, responsive, and scalable web applications using React, Tailwind, Node.js, MongoDB and Sanity CMS."}
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {profile?.resumePdf ? (
                <a
                  href={`${API}${profile.resumePdf}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl font-bold text-white text-center"
                >
                  Download Resume
                </a>
              ) : (
                <button
                  disabled
                  className="bg-gray-700 px-6 py-3 rounded-xl font-bold text-white opacity-60 cursor-not-allowed"
                >
                  Resume Not Uploaded
                </button>
              )}

              <a
                href="/contact"
                className="border border-gray-700 hover:border-red-500 hover:bg-[#0b1220] transition px-6 py-3 rounded-xl font-bold text-white text-center"
              >
                Contact Me
              </a>

              {profile?.links?.github && (
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#0b1220] border border-gray-800 hover:border-red-500 transition px-6 py-3 rounded-xl font-bold text-white text-center"
                >
                  GitHub
                </a>
              )}
            </div>

            {/* Skills */}
            <div className="mt-10">
              <p className="text-gray-400 text-sm font-semibold text-center md:text-left">
                Tech Stack I Use
              </p>

              <div className="mt-3 flex flex-wrap gap-3 justify-center md:justify-start">
                {(profile?.skills || []).slice(0, 12).map((skill) => (
                  <span
                    key={skill}
                    className="bg-[#0b1220] text-gray-200 px-4 py-2 rounded-full text-sm border border-gray-800 hover:border-red-500 transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-3">
              {[
                { label: "Projects", value: profile?.stats?.projects || "10+" },
                {
                  label: "Internships",
                  value: profile?.stats?.internships || "2",
                },
                {
                  label: "Open Source",
                  value: profile?.stats?.openSource || "Active",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-[#0b1220] border border-gray-800 rounded-2xl p-4 text-center hover:border-red-500 transition"
                >
                  <p className="text-xl font-extrabold text-white">{s.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 bg-red-600/20 blur-2xl rounded-full"></div>

              <div className="relative bg-[#0b1220] p-4 rounded-3xl border border-gray-800 shadow-lg">
                {profile?.profileImage ? (
                  <img
                    src={`${API}${profile.profileImage}`}
                    alt={profile?.name}
                    className="w-72 sm:w-80 md:w-96 h-[420px] rounded-2xl object-cover border border-gray-800"
                  />
                ) : (
                  <div className="w-72 sm:w-80 md:w-96 h-[420px] rounded-2xl bg-[#0f172a] flex items-center justify-center border border-gray-700">
                    <p className="text-gray-500 font-semibold">
                      No Image Uploaded
                    </p>
                  </div>
                )}

                <div className="mt-4 bg-[#020617] border border-gray-800 rounded-2xl p-4">
                  <p className="text-sm font-bold text-white">
                    Clean UI + Scalable Backend
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    React • Tailwind • Node • MongoDB • Sanity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mt-20 bg-[#0b1220] border border-gray-800 rounded-3xl p-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center">
            What I can build for you
          </h2>

          <p className="text-gray-400 mt-3 text-center max-w-3xl mx-auto">
            I help clients build fast, responsive, and modern web apps — from
            landing pages to full-stack dashboards.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {(profile?.services || []).slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="bg-[#020617] border border-gray-800 rounded-2xl p-6 hover:border-red-500 transition"
              >
                <h3 className="text-lg font-bold text-white">
                  {item.title || "Service Title"}
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  {item.desc || "Service description..."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
