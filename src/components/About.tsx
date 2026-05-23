"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

const skills = [
  "WordPress", "React", "Next.js", "Azure", "Firebase",
  "Web Applications", "Hosting Management", "Professional Email", "DNS & Domains",
];

export default function About() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section id="about" className="py-24 px-6 md:py-0">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-16"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[var(--accent)]" />
            <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
              {a.label}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl border border-[var(--border)] bg-[var(--card)] overflow-hidden p-8 sm:p-10"
          >
            <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[var(--accent)]/5 blur-3xl" />
            <div className="relative flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
                    {a.workLabel}
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)] mt-2">
                    {a.role}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl font-semibold text-[var(--accent)]">ICS</span>
                    <span className="text-[var(--muted)]">·</span>
                    <span className="text-sm text-[var(--muted)]">{a.location}</span>
                  </div>
                </div>
                <div className="shrink-0 self-start px-4 py-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-sm font-medium">
                  {a.dateRange}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {a.responsibilities.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    <span className="text-sm text-[var(--muted)] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="text-xs px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:border-[var(--accent)]/50 hover:text-[var(--foreground)] transition-colors cursor-default">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col gap-5">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
                {a.bioHeading}
              </h3>
              <div className="flex flex-col gap-4 text-[var(--muted)] leading-relaxed text-sm">
                {a.bio.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {a.stats.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex flex-col gap-2 p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]"
                >
                  <div className="flex items-center gap-2">
                    {item.available ? (
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                    ) : (
                      <span className="text-base leading-none">{item.icon}</span>
                    )}
                    <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[var(--foreground)]">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
