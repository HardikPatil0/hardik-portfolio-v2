import React from "react";
import { Link } from "react-router-dom";

const goals = [
  {
    title: "Quality & Professional Work",
    points: [
      "Deliver clean and maintainable code",
      "Build responsive UI that works on all devices",
      "Focus on performance and user experience",
      "Follow best practices in frontend + backend development",
    ],
  },
  {
    title: "Reliable Communication",
    points: [
      "Clear project updates and progress tracking",
      "On-time delivery with realistic timelines",
      "Understanding client requirements properly",
      "Professional and transparent work process",
    ],
  },
  {
    title: "Strong Technical Growth",
    points: [
      "Improve MERN stack development skills",
      "Build scalable backend APIs and databases",
      "Learn and apply modern UI/UX patterns",
      "Stay updated with new technologies and tools",
    ],
  },
  {
    title: "Long-Term Vision",
    points: [
      "Build long-term client relationships",
      "Work on real-world projects that solve problems",
      "Contribute to open source and community learning",
      "Grow as a developer and deliver better solutions over time",
    ],
  },
];

const Goals = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-extrabold">
        Work Values <span className="text-red-500">.</span>
      </h1>

      <p className="text-gray-400 mt-2">
        The principles I follow while building projects and working with clients.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((g) => (
          <div
            key={g.title}
            className="bg-[#0b1220] border border-gray-800 rounded-2xl p-8 hover:border-red-500 transition"
          >
            <h2 className="text-xl font-bold">{g.title}</h2>

            <ul className="mt-5 space-y-3 text-gray-300">
              {g.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="text-red-500 font-bold">✓</span>
                  <span className="text-gray-300">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 bg-[#0b1220] border border-gray-800 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold">Let’s build something great</h2>
        <p className="text-gray-400 mt-2">
          If you need a modern website or MERN application, feel free to contact me.
        </p>

        <Link
          to="/contact"
          className="mt-6 inline-block bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl font-bold text-white"
        >
          Contact Me
        </Link>
      </div>
    </section>
  );
};

export default Goals;
    