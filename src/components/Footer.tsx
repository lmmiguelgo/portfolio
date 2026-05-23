"use client";

import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] py-10 px-6 md:hidden">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-[var(--muted)]">
          <span className="font-mono font-semibold text-[var(--accent)]">MG.</span>
          <span className="hidden sm:block opacity-30">—</span>
          <span>Miguel González · {t.footer.role}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
          <span className="flex items-center gap-1.5">
            <span>🇺🇸</span> EN
            <span className="opacity-30 mx-1">/</span>
            <span>🇪🇸</span> ES
          </span>
          <span className="opacity-30">·</span>
          <span>© {year}</span>
        </div>
      </div>
    </footer>
  );
}
