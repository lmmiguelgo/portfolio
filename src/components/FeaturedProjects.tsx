"use client";

import { motion } from "framer-motion";

const projects = [
  {
    name: "Gordon & Associates",
    url: "https://www.gordonandassociates.biz",
    description:
      "Professional business website for Gordon & Associates, featuring a clean presentation of services, team, and contact information.",
    tags: ["Web Design", "Business", "Responsive"],
    gradient: "from-indigo-500/20 to-purple-500/20",
  },
  {
    name: "SecSolInt",
    url: "https://secsolint.com",
    description:
      "Corporate web presence for a security solutions company, built to communicate trust and professionalism to enterprise clients.",
    tags: ["Corporate", "Security", "Web Dev"],
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    name: "Aizen Fire",
    url: "https://aizenfire.com",
    description:
      "Dynamic website for Aizen Fire, designed to showcase services and engage visitors with a bold, modern layout.",
    tags: ["Web Design", "Services", "Modern UI"],
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    name: "Q-Metrx",
    url: "https://q-metrx.com",
    description:
      "Platform for Q-Metrx, focused on delivering a clear and effective digital experience that supports the company's core offering.",
    tags: ["Platform", "Web App", "TypeScript"],
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    name: "IcsTek",
    url: "https://icstek.com",
    description:
      "Technology company website for IcsTek, presenting their solutions portfolio with a professional and accessible interface.",
    tags: ["Tech", "Corporate", "Web Dev"],
    gradient: "from-violet-500/20 to-fuchsia-500/20",
  },
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-24 px-6 md:py-0">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8 md:gap-6"
        >
          {/* Header */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--accent)]" />
              <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
                Work
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              Featured Projects
            </h2>
          </div>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-hover)] hover:border-[var(--accent)]/40 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient thumbnail */}
                <div
                  className={`h-40 md:h-24 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}
                >
                  <div className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                      opacity: 0.04,
                    }}
                  />
                  <span className="font-mono text-xs text-[var(--muted)] tracking-widest opacity-60">
                    {new URL(project.url).hostname}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 p-5 flex-1">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
                  >
                    View Site
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
