"use client";

import { motion } from "framer-motion";

const highlights = [
  { label: "Based in", value: "Puerto Rico 🇵🇷" },
  { label: "Languages", value: "English & Spanish" },
  { label: "Experience", value: "Full Stack Development" },
  { label: "Focus", value: "Web Applications" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:py-0">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-16 items-start"
        >
          {/* Left — label + bio */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--accent)]" />
              <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
                About
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              Building things that work — and look good doing it.
            </h2>

            <div className="flex flex-col gap-4 text-[var(--muted)] leading-relaxed">
              <p>
                I&apos;m a full stack developer with a passion for crafting clean,
                performant web applications from the ground up. I care about
                both the code and the experience it produces.
              </p>
              <p>
                Whether it&apos;s a business site, a SaaS platform, or a custom
                tool, I focus on shipping things that are fast, maintainable,
                and built to grow.
              </p>
              <p>
                Fluent in English and Spanish — I&apos;m comfortable working with
                clients and teams across languages and time zones.
              </p>
            </div>
          </div>

          {/* Right — highlights */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col gap-1 p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]"
              >
                <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="text-sm font-medium text-[var(--foreground)]">
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
