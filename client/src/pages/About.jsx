import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-extrabold">
        About <span className="text-red-500">.</span>
      </h1>

      <p className="text-gray-400 mt-2">
        A quick introduction about me and what I build.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left */}
        <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold">Hi, I’m Hardik Patil</h2>

          <p className="text-gray-300 mt-4 leading-relaxed">
            I’m a <span className="text-white font-semibold">MERN Stack Developer</span>{" "}
            focused on building modern, responsive and scalable web applications.
            I enjoy working on frontend UI as well as backend APIs.
          </p>

          <p className="text-gray-300 mt-4 leading-relaxed">
            Along with MERN, I also build client-friendly websites using{" "}
            <span className="text-white font-semibold">Sanity CMS</span>, so clients can
            update content easily without changing code.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="/Hardik-Patil-Resume.pdf"
              download
              className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl font-bold text-white text-center"
            >
              Download Resume
            </a>

            <Link
              to="/contact"
              className="border border-gray-700 hover:border-red-500 hover:bg-[#0b1220] transition px-6 py-3 rounded-xl font-bold text-white text-center"
            >
              Contact Me
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold">What I can build</h2>

          <div className="mt-6 space-y-5 text-gray-300">
            <div>
              <h3 className="font-bold text-white">Frontend Development</h3>
              <p className="text-sm text-gray-400 mt-1">
                React + Tailwind websites with clean UI and responsive design.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white">Full-Stack MERN Apps</h3>
              <p className="text-sm text-gray-400 mt-1">
                Authentication, dashboards, REST APIs, MongoDB integration.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white">Sanity CMS Websites</h3>
              <p className="text-sm text-gray-400 mt-1">
                Dynamic content websites that clients can manage easily.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white">Bug Fixing + Improvements</h3>
              <p className="text-sm text-gray-400 mt-1">
                Fix UI bugs, improve performance, and enhance user experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Extra Highlights */}
      <div className="mt-12 bg-[#0b1220] border border-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold">Highlights</h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
          <div className="border border-gray-800 rounded-2xl p-6">
            <h3 className="font-bold text-white">Clean Code</h3>
            <p className="text-sm text-gray-400 mt-2">
              Maintainable structure, reusable components, and good practices.
            </p>
          </div>

          <div className="border border-gray-800 rounded-2xl p-6">
            <h3 className="font-bold text-white">Responsive UI</h3>
            <p className="text-sm text-gray-400 mt-2">
              Mobile-first layouts that look great on all devices.
            </p>
          </div>

          <div className="border border-gray-800 rounded-2xl p-6">
            <h3 className="font-bold text-white">Fast Delivery</h3>
            <p className="text-sm text-gray-400 mt-2">
              Quick iteration, clear communication, and on-time output.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
