"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import {
  FiHome, FiUser, FiCode, FiBriefcase,
  FiFileText, FiMail, FiSun, FiMoon,
} from "react-icons/fi";

const NAV = [
  { id: "hero",     label: "Home",     icon: FiHome },
  { id: "about",    label: "About",    icon: FiUser },
  { id: "stack",    label: "Stack",    icon: FiCode },
  { id: "projects", label: "Projects", icon: FiBriefcase },
  { id: "resume",   label: "Resume",   icon: FiFileText },
  { id: "contact",  label: "Contact",  icon: FiMail },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [activeId, setActiveId] = useState("hero");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => {
      const mid = window.innerHeight / 2;
      let active = "hero";
      NAV.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.getBoundingClientRect().top <= mid) active = id;
      });
      setActiveId(active);
    };
    window.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => window.removeEventListener("scroll", sync);
  }, []);

  return (
    <>
      {/* ── Desktop left sidebar ─────────────────────────────── */}
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-16 z-50 flex-col items-center justify-between py-6 border-r border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">

        {/* Logo */}
        <a
          href="#hero"
          className="font-mono text-xs font-bold text-[var(--accent)] tracking-widest hover:opacity-70 transition-opacity"
        >
          MG
        </a>

        {/* Nav items */}
        <div className="flex flex-col items-center gap-1.5">
          {NAV.map(({ id, label, icon: Icon }) => {
            const isActive = activeId === id;
            return (
              <div
                key={id}
                className="relative flex items-center"
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Active bar on the left edge */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="active-bar"
                      className="absolute -left-6 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-[var(--accent)]"
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon button */}
                <motion.a
                  href={`#${id}`}
                  aria-label={label}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors duration-150 ${
                    isActive
                      ? "bg-[var(--accent)]/15 text-[var(--accent)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-hover)]"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Icon size={17} />
                </motion.a>

                {/* Tooltip label */}
                <AnimatePresence>
                  {hoveredId === id && (
                    <motion.div
                      initial={{ opacity: 0, x: -6, scale: 0.94 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -6, scale: 0.94 }}
                      transition={{ duration: 0.14, ease: "easeOut" }}
                      className="absolute left-14 pointer-events-none z-50"
                    >
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--card)] border border-[var(--border)] shadow-2xl shadow-black/40">
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        )}
                        <span className="text-xs font-medium text-[var(--foreground)] whitespace-nowrap">
                          {label}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Theme toggle */}
        <motion.button
          onClick={toggle}
          aria-label="Toggle theme"
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)]/50 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.18 }}
            >
              {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* ── Mobile top bar ────────────────────────────────────── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/90 backdrop-blur border-b border-[var(--border)]">
        <div className="h-14 px-5 flex items-center justify-between">
          <a
            href="#hero"
            className="font-mono text-xs font-bold text-[var(--accent)] tracking-widest"
          >
            MG<span className="text-[var(--foreground)]">.</span>
          </a>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)]"
          >
            {theme === "dark" ? <FiSun size={14} /> : <FiMoon size={14} />}
          </button>
        </div>
      </header>
    </>
  );
}
