"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDF_URL = "/resume.pdf";

export default function Resume() {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="resume" className="py-24 px-6 bg-[var(--card)] md:py-0">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 md:gap-4"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-[var(--accent)]" />
                <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
                  Resume
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
                My Résumé
              </h2>
            </div>

            <a
              href={PDF_URL}
              download
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--accent)] text-[var(--accent)] text-sm font-medium hover:bg-[var(--accent)] hover:text-white transition-all self-start sm:self-auto"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>
          </div>

          {/* PDF Viewer */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-full max-w-2xl rounded-2xl border border-[var(--border)] overflow-hidden bg-[var(--background)] shadow-2xl md:max-h-[calc(100vh-260px)] md:overflow-y-auto">
              {!loaded && (
                <div className="flex items-center justify-center h-96 text-[var(--muted)] text-sm">
                  Loading résumé…
                </div>
              )}
              <Document
                file={PDF_URL}
                onLoadSuccess={({ numPages }) => {
                  setNumPages(numPages);
                  setLoaded(true);
                }}
                onLoadError={() => setLoaded(true)}
                className="flex flex-col items-center"
              >
                <Page
                  pageNumber={currentPage}
                  width={Math.min(
                    typeof window !== "undefined" ? window.innerWidth - 80 : 460,
                    460
                  )}
                  renderAnnotationLayer
                  renderTextLayer
                />
              </Document>
            </div>

            {/* Page controls */}
            {numPages > 1 && (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] disabled:opacity-30 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <span className="text-sm text-[var(--muted)] font-mono">
                  {currentPage} / {numPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
                  disabled={currentPage === numPages}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] disabled:opacity-30 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
