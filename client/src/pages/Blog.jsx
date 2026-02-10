import React from "react";

const Blog = () => {
  const blogUrl = "https://hardik-blog.vercel.app"; // replace

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-extrabold">
        Blog <span className="text-red-500">.</span>
      </h1>

      <p className="text-gray-400 mt-2">
        I share what I learn about React, MERN stack, freelancing, and building real projects.
      </p>

      <div className="mt-10 bg-[#0b1220] border border-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold">My Blog Website</h2>
        <p className="text-gray-400 mt-3 leading-relaxed">
          My blog is currently hosted on Vercel. I’ll move it to a custom domain after getting my first clients.
        </p>

        <div className="mt-6">
          <a
            href={blogUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl font-bold text-white inline-block"
          >
            Visit Blog →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
