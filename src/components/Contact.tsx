"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import DatePicker from "./DatePicker";
import { useLanguage } from "./LanguageProvider";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  date: z.string().min(1, "Select a date"),
  time: z.string().min(1, "Select a time"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;
type Status = "idle" | "loading" | "success" | "error";

function getAvailableSlots(dateStr: string): string[] {
  if (!dateStr) return [];
  const date = new Date(dateStr + "T00:00:00");
  const day = date.getDay(); // 0=Sun, 6=Sat
  const isWeekend = day === 0 || day === 6;

  if (isWeekend) {
    const slots: string[] = [];
    for (let h = 9; h <= 19; h++) {
      slots.push(`${String(h).padStart(2, "0")}:00`);
      if (h < 19) slots.push(`${String(h).padStart(2, "0")}:30`);
    }
    return slots;
  }

  // Weekdays: 12–2 PM and 6–8 PM (1-hour interviews)
  return ["12:00", "12:30", "13:00", "18:00", "18:30", "19:00"];
}

function formatSlot(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

const CHECK = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--accent)"
    strokeWidth="2"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CLOCK = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const today = new Date().toISOString().split("T")[0];
  const selectedDate = watch("date");
  const selectedTime = watch("time");
  const availableSlots = getAvailableSlots(selectedDate);

  useEffect(() => {
    if (selectedTime && !availableSlots.includes(selectedTime)) {
      setValue("time", "");
    }
  }, [selectedDate, selectedTime, availableSlots, setValue]);

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
                {c.label}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              {c.heading}
            </h2>
            <p className="text-[var(--muted)] leading-relaxed max-w-sm">
              {c.description}
            </p>

            {/* Availability card */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-widest">
                {CLOCK}
                {c.availability.title}
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm font-medium text-[var(--foreground)] whitespace-nowrap">
                    {c.availability.weekday}
                  </span>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm text-[var(--muted)]">{c.availability.weekdaySlot1}</span>
                    <span className="text-sm text-[var(--muted)]">{c.availability.weekdaySlot2}</span>
                  </div>
                </div>
                <div className="h-px bg-[var(--border)]" />
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {c.availability.weekend}
                  </span>
                  <span className="text-sm text-[var(--muted)]">{c.availability.weekendSlot}</span>
                </div>
              </div>
              <p className="text-xs text-[var(--muted)] opacity-70">
                {c.availability.timezone}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {c.features.map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm text-[var(--muted)]">
                  {CHECK} {f}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  {c.success.heading}
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  {c.success.body}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
                >
                  {c.success.again}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
                    {c.form.name}
                  </label>
                  <input
                    {...register("name")}
                    placeholder={c.form.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                  {errors.name && (
                    <span className="text-xs text-red-400">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
                    {c.form.email}
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder={c.form.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                  {errors.email && (
                    <span className="text-xs text-red-400">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
                      {c.form.date}
                    </label>
                    <DatePicker
                      value={selectedDate || ""}
                      onChange={(date) => setValue("date", date, { shouldValidate: true })}
                      min={today}
                    />
                    {errors.date && (
                      <span className="text-xs text-red-400">
                        {errors.date.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
                      {c.form.time}
                    </label>
                    <select
                      {...register("time")}
                      disabled={!selectedDate}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {selectedDate ? c.form.timePlaceholder : c.form.timeNoDate}
                      </option>
                      {availableSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {formatSlot(slot)}
                        </option>
                      ))}
                    </select>
                    {errors.time && (
                      <span className="text-xs text-red-400">
                        {errors.time.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
                    {c.form.message}{" "}
                    <span className="normal-case tracking-normal text-[var(--muted)] opacity-60">
                      {c.form.messageOptional}
                    </span>
                  </label>
                  <textarea
                    {...register("message")}
                    rows={3}
                    placeholder={c.form.messagePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-xs text-red-400">{c.form.error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 rounded-xl bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? c.form.submitting : c.form.submit}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
