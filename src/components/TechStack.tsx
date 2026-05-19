"use client";

import { motion } from "framer-motion";

const categories = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "REST APIs", "GraphQL", "PostgreSQL"],
  },
  {
    label: "Tools & Infra",
    items: ["Git", "GitHub", "Vercel", "Docker", "Linux"],
  },
  {
    label: "Integrations",
    items: ["Google APIs", "Stripe", "Auth systems", "CMS platforms"],
  },
];

export default function TechStack() {
  return (
    <section id="stack" className="py-24 px-6 bg-[var(--card)] md:py-0">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-10 md:gap-8"
        >
          {/* Header */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--accent)]" />
              <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
                Stack
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              Technologies I work with
            </h2>
          </div>

          {/* Categories */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, ci) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: ci * 0.1 }}
                className="flex flex-col gap-4"
              >
                <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest">
                  {cat.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--muted)] bg-[var(--background)] hover:text-[var(--foreground)] hover:border-[var(--accent)] transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
