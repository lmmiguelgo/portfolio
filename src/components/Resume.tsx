"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import { FiDownload, FiMaximize2, FiMinimize2, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const PDF_URL = "/resume.pdf";

function PageControls({
  current, total,
  onPrev, onNext,
}: {
  current: number; total: number;
  onPrev: () => void; onNext: () => void;
}) {
  if (total <= 1) return null;
  return (
    <div className="flex items-center gap-4">
      <motion.button
        onClick={onPrev} disabled={current === 1}
        className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] disabled:opacity-25 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
      >
        <FiChevronLeft size={15} />
      </motion.button>
      <span className="text-sm text-[var(--muted)] font-mono tabular-nums">
        {current} / {total}
      </span>
      <motion.button
        onClick={onNext} disabled={current === total}
        className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] disabled:opacity-25 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
      >
        <FiChevronRight size={15} />
      </motion.button>
    </div>
  );
}

export default function Resume() {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [viewerWidth, setViewerWidth] = useState(460);

  useEffect(() => {
    const calc = () => setViewerWidth(Math.min(window.innerWidth - 80, 460));
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const fsWidth = typeof window !== "undefined"
    ? Math.min(window.innerWidth * 0.82, 860)
    : 860;

  const prev = useCallback(() => setCurrentPage((p) => Math.max(1, p - 1)), []);
  const next = useCallback(() => setCurrentPage((p) => Math.min(numPages, p + 1)), [numPages]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const docProps = {
    file: PDF_URL,
    onLoadSuccess: ({ numPages }: { numPages: number }) => { setNumPages(numPages); setLoaded(true); },
    onLoadError: () => setLoaded(true),
    className: "flex flex-col items-center",
  };

  return (
    <>
      {/* ── Section ───────────────────────────────────────── */}
      <section id="resume" className="relative py-24 px-6 bg-[var(--card)] md:py-0 overflow-hidden">

        {/* Animated background orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
              opacity: 0.045,
              top: "-10%", left: "10%",
            }}
            animate={{ x: [0, 60, -30, 0], y: [0, -40, 60, 0], scale: [1, 1.15, 0.9, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, #818cf8 0%, transparent 70%)",
              opacity: 0.035,
              bottom: "5%", right: "5%",
            }}
            animate={{ x: [0, -50, 30, 0], y: [0, 50, -30, 0], scale: [1, 0.88, 1.12, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full"
            style={{
              background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
              opacity: 0.03,
              top: "40%", left: "50%",
            }}
            animate={{ x: [0, 40, -60, 0], y: [0, -60, 30, 0], scale: [1, 1.2, 0.85, 1] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5 md:gap-4"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-px bg-[var(--accent)]" />
                  <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
                    Resume
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
                  My Resume
                </h2>
                <p className="text-sm text-[var(--muted)] max-w-sm">
                  Full stack developer with experience in web development,
                  cloud integrations, and modern frameworks.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <motion.button
                  onClick={() => setFullscreen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--border)] text-[var(--muted)] text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                >
                  <FiMaximize2 size={13} />
                  Full Screen
                </motion.button>
                <motion.a
                  href={PDF_URL}
                  download
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-hover)] transition-all shadow-lg shadow-[var(--accent)]/25"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                >
                  <FiDownload size={13} />
                  Download PDF
                </motion.a>
              </div>
            </div>

            {/* PDF viewer */}
            <div className="flex flex-col items-center gap-3">
              <motion.div
                className="relative w-full max-w-2xl rounded-2xl border border-[var(--border)] overflow-hidden bg-[var(--background)] shadow-2xl shadow-black/40 md:max-h-[calc(100vh-280px)] md:overflow-y-auto"
                whileHover={{ boxShadow: "0 25px 60px -10px rgba(99,102,241,0.15), 0 0 0 1px rgba(99,102,241,0.12)" }}
                transition={{ duration: 0.3 }}
              >
                {!loaded && (
                  <div className="flex flex-col items-center justify-center h-80 gap-3 text-[var(--muted)]">
                    <motion.div
                      className="w-6 h-6 rounded-full border-2 border-[var(--accent)] border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="text-xs font-mono tracking-wider">Loading…</span>
                  </div>
                )}
                <Document {...docProps}>
                  <Page
                    pageNumber={currentPage}
                    width={viewerWidth}
                    renderAnnotationLayer
                    renderTextLayer
                  />
                </Document>
              </motion.div>

              <PageControls
                current={currentPage} total={numPages}
                onPrev={prev} onNext={next}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Fullscreen overlay ────────────────────────────── */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col"
            onClick={(e) => { if (e.target === e.currentTarget) setFullscreen(false); }}
          >
            {/* Fullscreen header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
              <span className="font-mono text-xs text-white/50 tracking-widest uppercase">
                Resume — Miguel González
              </span>
              <div className="flex items-center gap-3">
                <motion.a
                  href={PDF_URL}
                  download
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-xs font-medium hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                >
                  <FiDownload size={12} />
                  Download
                </motion.a>
                <motion.button
                  onClick={() => setFullscreen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all"
                  whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
                  aria-label="Close fullscreen"
                >
                  <FiX size={16} />
                </motion.button>
              </div>
            </div>

            {/* Fullscreen PDF */}
            <div className="flex-1 overflow-y-auto flex flex-col items-center py-8 px-4 gap-4">
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="rounded-xl overflow-hidden shadow-2xl"
              >
                <Document {...docProps}>
                  <Page
                    pageNumber={currentPage}
                    width={fsWidth}
                    renderAnnotationLayer
                    renderTextLayer
                  />
                </Document>
              </motion.div>

              <PageControls
                current={currentPage} total={numPages}
                onPrev={prev} onNext={next}
              />

              <p className="text-xs text-white/25 font-mono mt-2">
                Press Esc to close · ← → to navigate
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
