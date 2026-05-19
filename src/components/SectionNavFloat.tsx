"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const SECTIONS = ["hero", "about", "stack", "projects", "resume", "contact"];
const DURATION = 0.8;
const EASE = "power3.inOut";
const WHEEL_THRESHOLD = 8;
const COOLDOWN_MS = 800;

export default function SectionNavFloat() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const isDesktop = useRef(false);
  const isAnimating = useRef(false);
  const currentIdxRef = useRef(0);

  const navigate = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(SECTIONS.length - 1, idx));
    if (clamped === currentIdxRef.current && isAnimating.current) return;

    const target = document.getElementById(SECTIONS[clamped]);
    if (!target) return;

    isAnimating.current = true;
    currentIdxRef.current = clamped;
    setCurrentIdx(clamped);

    gsap.to(window, {
      scrollTo: { y: target, autoKill: false },
      duration: DURATION,
      ease: EASE,
      onComplete: () => {
        setTimeout(() => {
          isAnimating.current = false;
        }, COOLDOWN_MS);
      },
    });
  }, []);

  // Sync current section from scroll position (for external navigation)
  useEffect(() => {
    const sync = () => {
      if (isAnimating.current) return;
      const mid = window.innerHeight / 2;
      let active = 0;
      SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.getBoundingClientRect().top <= mid) active = i;
      });
      if (active !== currentIdxRef.current) {
        currentIdxRef.current = active;
        setCurrentIdx(active);
      }
    };
    window.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => window.removeEventListener("scroll", sync);
  }, []);

  // Desktop: wheel → GSAP navigate
  useEffect(() => {
    const checkDesktop = () => {
      isDesktop.current = window.innerWidth >= 768;
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    const onWheel = (e: WheelEvent) => {
      if (!isDesktop.current) return;
      e.preventDefault();
      if (isAnimating.current) return;
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;
      navigate(currentIdxRef.current + (e.deltaY > 0 ? 1 : -1));
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", checkDesktop);
    };
  }, [navigate]);

  // Desktop: keyboard navigate
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isDesktop.current) return;
      const down = ["ArrowDown", "PageDown", " "].includes(e.key);
      const up = ["ArrowUp", "PageUp"].includes(e.key);
      if (!down && !up) return;
      // Only intercept when not focused on a form element
      const tag = (e.target as HTMLElement)?.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;
      e.preventDefault();
      navigate(currentIdxRef.current + (down ? 1 : -1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  // Desktop: intercept in-page anchor clicks → GSAP navigate
  useEffect(() => {
    const onAnchorClick = (e: MouseEvent) => {
      if (!isDesktop.current) return;
      const anchor = (e.currentTarget as HTMLAnchorElement);
      const hash = anchor.getAttribute("href") ?? "";
      if (!hash.startsWith("#")) return;
      const idx = SECTIONS.indexOf(hash.slice(1));
      if (idx === -1) return;
      e.preventDefault();
      navigate(idx);
    };

    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    anchors.forEach((a) => a.addEventListener("click", onAnchorClick));
    return () => anchors.forEach((a) => a.removeEventListener("click", onAnchorClick));
  }, [navigate]);

  const canGoUp = currentIdx > 0;
  const canGoDown = currentIdx < SECTIONS.length - 1;

  return (
    <>
      {/* Floating Schedule CTA — hidden on last section (Contact) */}
      <motion.div
        className="fixed z-40 bottom-20 left-4 md:bottom-auto md:left-auto md:right-8 md:top-1/2 md:-translate-y-1/2"
        animate={{ opacity: currentIdx === SECTIONS.length - 1 ? 0 : 1, scale: currentIdx === SECTIONS.length - 1 ? 0.8 : 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ pointerEvents: currentIdx === SECTIONS.length - 1 ? "none" : "auto" }}
      >
        <motion.a
          href="#contact"
          title="Schedule an Interview"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[var(--accent)] text-white text-xs font-medium shadow-xl shadow-[var(--accent)]/25 hover:bg-[var(--accent-hover)] transition-colors md:rounded-2xl md:flex-col md:px-3.5 md:py-4 md:gap-3"
          animate={{ y: [0, -7, 0] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          whileHover={{ scale: 1.06, y: 0, transition: { duration: 0.15 } }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="md:hidden">Schedule</span>
          <span
            className="hidden md:block text-[10px] tracking-widest font-mono uppercase"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Schedule Interview
          </span>
        </motion.a>
      </motion.div>

      {/* Mobile section nav — bottom-right, hidden on desktop */}
      <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-2 md:hidden">
        <motion.button
          onClick={() => canGoUp && navigate(currentIdx - 1)}
          disabled={!canGoUp}
          className="w-11 h-11 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)]/90 backdrop-blur text-[var(--foreground)] disabled:opacity-25 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-lg"
          whileTap={{ scale: 0.88 }}
          aria-label="Previous section"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>

        <motion.button
          onClick={() => canGoDown && navigate(currentIdx + 1)}
          disabled={!canGoDown}
          className="w-11 h-11 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)]/90 backdrop-blur text-[var(--foreground)] disabled:opacity-25 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-lg"
          whileTap={{ scale: 0.88 }}
          aria-label="Next section"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.button>
      </div>

      {/* Persistent scroll indicator — bottom center, hidden on last section */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 text-[var(--muted)] pointer-events-none"
        animate={{ opacity: currentIdx === SECTIONS.length - 1 ? 0 : 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <span className="text-xs tracking-widest uppercase font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
}
