"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 relative overflow-hidden md:h-screen"
    >
      {/* Background grid decoration */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Accent glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--accent)] opacity-[0.06] blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          {/* Language badges */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border border-[var(--border)] text-[var(--muted)]">
              <span>🇺🇸</span> English
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border border-[var(--border)] text-[var(--muted)]">
              <span>🇪🇸</span> Español
            </span>
          </div>

          {/* Greeting */}
          <p className="font-mono text-sm text-[var(--accent)] tracking-widest uppercase">
            Hello, world —
          </p>

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-none text-[var(--foreground)]">
            Miguel
            <br />
            González
          </h1>

          {/* Title */}
          <p className="text-xl sm:text-2xl text-[var(--muted)] font-light max-w-xl">
            Full Stack Developer building fast, purposeful web applications.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors"
            >
              View Work
            </a>
            <a
              href="#resume"
              className="px-6 py-3 rounded-full border border-[var(--border)] text-sm font-medium text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              Resume
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full border border-[var(--border)] text-sm font-medium text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              Schedule Interview
            </a>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
