"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = ["home", "about", "skills", "projects", "contact"];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((id) => document.getElementById(id));
      const current = sections.find(
        (s) => s && window.scrollY >= s.offsetTop - 200
      );
      if (current) setActiveSection(current.id);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#030712]/80 border-b border-[#1e293b]"
          : "bg-transparent"
      }`}
      style={{ padding: "1rem 2rem" }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="#home">
          <span
            className="font-display text-xl font-black bg-gradient-to-r from-indigo-500 to-violet-400 bg-clip-text text-transparent"
          >
            ZA
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                className={`text-sm font-medium uppercase tracking-widest transition-colors duration-200 ${
                  activeSection === section
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {section}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition-transform"
        >
          Hire Me ✦
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-400 hover:text-white"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0f172a] border-t border-[#1e293b] mt-2"
          >
            {navLinks.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3 text-sm uppercase tracking-wider text-slate-400 hover:text-white"
              >
                {section}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
