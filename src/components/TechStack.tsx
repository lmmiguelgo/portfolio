"use client";

import { motion } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiGreensock,
  SiNodedotjs, SiFirebase, SiGit, SiGithub, SiVercel, SiDocker,
  SiLinux, SiStripe, SiWordpress, SiGoogle,
} from "react-icons/si";
import { FiCloud } from "react-icons/fi";
import { useLanguage } from "./LanguageProvider";

const CATEGORIES = [
  {
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "var(--icon-white)" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
      { name: "Framer Motion", icon: SiFramer, color: "var(--icon-white)" },
      { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
    ],
  },
  {
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "WordPress", icon: SiWordpress, color: "#21759B" },
    ],
  },
  {
    items: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "var(--icon-white)" },
      { name: "Vercel", icon: SiVercel, color: "var(--icon-white)" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
      { name: "Azure", icon: FiCloud, color: "#0078D4" },
    ],
  },
  {
    items: [
      { name: "Google APIs", icon: SiGoogle, color: "#4285F4" },
      { name: "Stripe", icon: SiStripe, color: "#635BFF" },
    ],
  },
];

export default function TechStack() {
  const { t } = useLanguage();
  const s = t.stack;

  return (
    <section id="stack" className="py-24 px-6 bg-[var(--card)] md:py-0">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-12"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--accent)]" />
              <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
                {s.label}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              {s.heading}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {CATEGORIES.map((cat, ci) => (
              <motion.div
                key={ci}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: ci * 0.1 }}
                className="flex flex-col gap-5"
              >
                <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest">
                  {s.categories[ci]}
                </span>
                <div className="flex flex-col gap-2">
                  {cat.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.name}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--accent)]/50 hover:bg-[var(--card-hover)] transition-all duration-200 cursor-default group"
                      >
                        <Icon
                          size={20}
                          style={{ color: item.color }}
                          className="shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <span className="text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
