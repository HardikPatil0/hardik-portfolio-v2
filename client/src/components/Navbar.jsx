import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Achievements", path: "/achievements" },
  { name: "Goals", path: "/goals" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-semibold transition ${
      isActive
        ? "bg-red-600 text-white"
        : "text-gray-300 hover:text-white hover:bg-[#0b1220]"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur border-b transition ${
        scrolled
          ? "bg-[#020617]/80 border-gray-800 shadow-lg shadow-black/20"
          : "bg-[#020617]/50 border-gray-900"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo (more left spacing + safe width) */}
        <Link to="/" className="flex flex-col leading-tight min-w-[140px]">
          <span className="text-xl font-extrabold tracking-wide text-white">
            Hardik<span className="text-red-500">.</span>
          </span>
          <span className="text-xs text-gray-400 font-medium">
            MERN Stack Developer
          </span>
        </Link>

        {/* Desktop Links (extra gap so logo doesn't touch Home) */}
        <div className="hidden md:flex items-center gap-3 ml-6">
          {links.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClass}>
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA only */}
        <div className="hidden md:flex items-center">
          <NavLink
            to="/contact"
            className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-xl text-white font-extrabold text-sm"
          >
            Hire Me
          </NavLink>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-[#0b1220] border border-gray-800 hover:border-red-500 transition text-gray-200"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-800 bg-[#020617]">
          <div className="max-w-6xl mx-auto px-4 py-5">
            <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-4 flex flex-col gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-semibold transition ${
                      isActive
                        ? "bg-red-600 text-white"
                        : "text-gray-300 hover:bg-[#020617] hover:text-white"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-3 w-full bg-red-600 hover:bg-red-700 transition px-4 py-3 rounded-xl text-white font-extrabold text-center"
              >
                Hire Me
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
