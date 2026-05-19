"use client";

import dynamic from "next/dynamic";

const Resume = dynamic(() => import("./Resume"), {
  ssr: false,
  loading: () => (
    <section id="resume" className="py-24 px-6 bg-[var(--card)] md:py-0">
      <div className="max-w-6xl mx-auto flex items-center justify-center h-64 text-[var(--muted)] text-sm">
        Loading résumé…
      </div>
    </section>
  ),
});

export default function ResumeLazy() {
  return <Resume />;
}
