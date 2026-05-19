"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  date: z.string().min(1, "Select a date"),
  time: z.string().min(1, "Select a time"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const today = new Date().toISOString().split("T")[0];

  async function onSubmit(data: FormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 px-6 md:py-0">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-16 items-start"
        >
          {/* Left — heading */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--accent)]" />
              <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
                Contact
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              Schedule an Interview
            </h2>
            <p className="text-[var(--muted)] leading-relaxed max-w-sm">
              Fill out the form and I&apos;ll receive a calendar invite directly.
              A Google Meet link will be included automatically.
            </p>

            <div className="flex flex-col gap-3 mt-4">
              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Google Calendar event created automatically
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Email invite sent to both parties
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Google Meet link included
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Available in English &amp; Spanish
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Interview Scheduled!</h3>
                <p className="text-sm text-[var(--muted)]">
                  Check your email — a calendar invite with a Google Meet link has been sent.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
                >
                  Schedule another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    {...register("name")}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                  {errors.name && (
                    <span className="text-xs text-red-400">{errors.name.message}</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="jane@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                  {errors.email && (
                    <span className="text-xs text-red-400">{errors.email.message}</span>
                  )}
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
                      Date
                    </label>
                    <input
                      {...register("date")}
                      type="date"
                      min={today}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                    {errors.date && (
                      <span className="text-xs text-red-400">{errors.date.message}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
                      Time
                    </label>
                    <input
                      {...register("time")}
                      type="time"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                    {errors.time && (
                      <span className="text-xs text-red-400">{errors.time.message}</span>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
                    Message{" "}
                    <span className="normal-case tracking-normal text-[var(--muted)] opacity-60">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    {...register("message")}
                    rows={3}
                    placeholder="Anything you'd like me to know beforehand..."
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-xs text-red-400">
                    Something went wrong. Please try again or contact me directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 rounded-xl bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Scheduling…" : "Schedule Interview"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
