"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/site";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

interface TimeSlot {
  time: string;
  available: boolean;
}

type BookingStep = "calendar" | "time" | "confirm" | "success";

// ──────────────────────────────────────────────
// Demo mode: seeded fake availability
// (year*400 + month*31 + day) % 10 maps to slot patterns
// ──────────────────────────────────────────────

const SLOT_PATTERNS: string[][] = [
  ["9:00 AM", "10:30 AM", "1:00 PM"],
  ["10:00 AM", "1:00 PM", "3:30 PM"],
  ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
  ["10:30 AM", "1:00 PM", "3:00 PM"],
  ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
  ["11:00 AM", "1:30 PM", "3:00 PM"],
  ["9:00 AM", "10:00 AM", "1:00 PM", "2:30 PM", "4:00 PM"],
  ["10:00 AM", "11:30 AM", "2:00 PM"],
  ["9:00 AM", "11:00 AM", "1:00 PM", "3:30 PM"],
  ["10:30 AM", "12:00 PM", "2:30 PM", "4:00 PM"],
];

function getDemoSlots(year: number, month: number, day: number): TimeSlot[] {
  const seed = (year * 400 + month * 31 + day) % 10;
  return SLOT_PATTERNS[seed].map((time) => ({ time, available: true }));
}

function isWeekend(year: number, month: number, day: number): boolean {
  const d = new Date(year, month, day);
  return d.getDay() === 0 || d.getDay() === 6;
}

// ──────────────────────────────────────────────
// Calendar helpers
// ──────────────────────────────────────────────

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ──────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────

export default function BookingCalendar() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<{
    year: number;
    month: number;
    day: number;
  } | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<BookingStep>("calendar");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Calendar grid data
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [daysInMonth, firstDay]);

  // Check if a day is in the past
  const isPast = useCallback(
    (day: number) => {
      const check = new Date(viewYear, viewMonth, day);
      const todayStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      return check < todayStart;
    },
    [viewYear, viewMonth, today]
  );

  // Check if a day has available slots (not weekend, not past)
  const hasAvailability = useCallback(
    (day: number) => {
      if (isPast(day)) return false;
      if (isWeekend(viewYear, viewMonth, day)) return false;
      return true;
    },
    [viewYear, viewMonth, isPast]
  );

  const navigateMonth = useCallback(
    (delta: number) => {
      let newMonth = viewMonth + delta;
      let newYear = viewYear;
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      } else if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
      setViewMonth(newMonth);
      setViewYear(newYear);
    },
    [viewMonth, viewYear]
  );

  const handleDateSelect = useCallback(
    (day: number) => {
      if (!hasAvailability(day)) return;
      setSelectedDate({ year: viewYear, month: viewMonth, day });
      setSelectedTime(null);
      setStep("time");
    },
    [viewYear, viewMonth, hasAvailability]
  );

  const handleTimeSelect = useCallback((time: string) => {
    setSelectedTime(time);
    setStep("confirm");
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedDate || !selectedTime) return;
      setSubmitting(true);

      try {
        const res = await fetch("/api/calendly/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: `${selectedDate.year}-${String(selectedDate.month + 1).padStart(2, "0")}-${String(selectedDate.day).padStart(2, "0")}`,
            time: selectedTime,
            ...formData,
          }),
        });

        if (res.ok) {
          setStep("success");
        }
      } catch {
        // Demo mode always succeeds
        setStep("success");
      } finally {
        setSubmitting(false);
      }
    },
    [selectedDate, selectedTime, formData]
  );

  const handleBackToCalendar = useCallback(() => {
    setStep("calendar");
    setSelectedDate(null);
    setSelectedTime(null);
  }, []);

  const handleBackToTime = useCallback(() => {
    setStep("time");
    setSelectedTime(null);
  }, []);

  const slots = selectedDate
    ? getDemoSlots(selectedDate.year, selectedDate.month, selectedDate.day)
    : [];

  const isDateSelected = (day: number) =>
    selectedDate?.year === viewYear &&
    selectedDate?.month === viewMonth &&
    selectedDate?.day === day;

  const formatSelectedDate = () => {
    if (!selectedDate) return "";
    return `${MONTH_NAMES[selectedDate.month]} ${selectedDate.day}, ${selectedDate.year}`;
  };

  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{
        background: "var(--bg-card)",
        borderColor: "rgba(245,245,245,0.05)",
      }}
    >
      <AnimatePresence mode="wait">
        {/* ── CALENDAR STEP ── */}
        {step === "calendar" && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigateMonth(-1)}
                className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--bg-elevated)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                &larr;
              </button>
              <h3
                className="text-lg font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-primary)",
                }}
              >
                {MONTH_NAMES[viewMonth]} {viewYear}
              </h3>
              <button
                onClick={() => navigateMonth(1)}
                className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--bg-elevated)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                &rarr;
              </button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAY_NAMES.map((d) => (
                <div
                  key={d}
                  className="text-center text-xs py-1"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-muted)",
                  }}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} className="h-10" />;
                }

                const available = hasAvailability(day);
                const selected = isDateSelected(day);
                const past = isPast(day);
                const weekend = isWeekend(viewYear, viewMonth, day);

                return (
                  <button
                    key={day}
                    onClick={() => handleDateSelect(day)}
                    disabled={!available}
                    className="relative h-10 flex flex-col items-center justify-center rounded-lg text-sm font-medium transition-all duration-200"
                    style={{
                      background: selected
                        ? "var(--accent)"
                        : "transparent",
                      color: selected
                        ? "var(--bg-base)"
                        : past || weekend
                          ? "var(--text-muted)"
                          : "var(--text-primary)",
                      cursor: available ? "pointer" : "default",
                    }}
                    onMouseEnter={(e) => {
                      if (available && !selected) {
                        e.currentTarget.style.background =
                          "rgba(212,160,23,0.15)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!selected) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    {day}
                    {available && !selected && (
                      <span
                        className="absolute bottom-0.5 w-1 h-1 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <p
              className="text-xs mt-4 text-center"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--text-muted)",
              }}
            >
              Select a date to see available times
            </p>
          </motion.div>
        )}

        {/* ── TIME SLOT STEP ── */}
        {step === "time" && selectedDate && (
          <motion.div
            key="time"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="p-6"
          >
            <button
              onClick={handleBackToCalendar}
              className="text-sm font-medium mb-4 transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              &larr; Back to calendar
            </button>

            <h3
              className="text-lg font-bold mb-1"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
              }}
            >
              {formatSelectedDate()}
            </h3>
            <p
              className="text-sm mb-6"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--text-secondary)",
              }}
            >
              Choose a time that works for you
            </p>

            <div className="grid grid-cols-2 gap-3">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => handleTimeSelect(slot.time)}
                  className="rounded-xl px-4 py-3 text-center font-medium transition-all duration-200 border"
                  style={{
                    background:
                      selectedTime === slot.time
                        ? "rgba(212,160,23,0.12)"
                        : "var(--bg-elevated)",
                    borderColor:
                      selectedTime === slot.time
                        ? "var(--accent)"
                        : "rgba(245,245,245,0.05)",
                    color:
                      selectedTime === slot.time
                        ? "var(--accent)"
                        : "var(--text-primary)",
                    fontFamily: "var(--font-mono)",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedTime !== slot.time) {
                      e.currentTarget.style.borderColor =
                        "rgba(212,160,23,0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedTime !== slot.time) {
                      e.currentTarget.style.borderColor =
                        "rgba(245,245,245,0.05)";
                    }
                  }}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── CONFIRM STEP ── */}
        {step === "confirm" && selectedDate && selectedTime && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="p-6"
          >
            <button
              onClick={handleBackToTime}
              className="text-sm font-medium mb-4 transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              &larr; Back to time slots
            </button>

            <div
              className="rounded-lg px-4 py-3 mb-6"
              style={{
                background: "rgba(212,160,23,0.08)",
                border: "1px solid rgba(212,160,23,0.15)",
              }}
            >
              <p
                className="text-sm"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent)",
                }}
              >
                {formatSelectedDate()} at {selectedTime}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label
                  className="block text-xs tracking-widest uppercase mb-1.5"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-muted)",
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid rgba(245,245,245,0.15)",
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-body)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(212,160,23,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(245,245,245,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="block text-xs tracking-widest uppercase mb-1.5"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-muted)",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid rgba(245,245,245,0.15)",
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-body)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(212,160,23,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(245,245,245,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  className="block text-xs tracking-widest uppercase mb-1.5"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-muted)",
                  }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid rgba(245,245,245,0.15)",
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-body)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(212,160,23,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(245,245,245,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  placeholder="(555) 555-5555"
                />
              </div>

              {/* Service type */}
              <div>
                <label
                  className="block text-xs tracking-widest uppercase mb-1.5"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-muted)",
                  }}
                >
                  Service Type
                </label>
                <select
                  required
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 appearance-none"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid rgba(245,245,245,0.15)",
                    color: formData.service
                      ? "var(--text-primary)"
                      : "var(--text-muted)",
                    fontFamily: "var(--font-body)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(212,160,23,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(245,245,245,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.name}>
                      {s.emoji} {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg px-8 py-4 text-lg font-bold transition-all duration-200 mt-2"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-base)",
                  opacity: submitting ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(212,160,23,0.4)";
                    e.currentTarget.style.filter = "brightness(1.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.filter = "none";
                }}
              >
                {submitting ? "Booking..." : "Confirm Booking"}
              </button>
            </form>
          </motion.div>
        )}

        {/* ── SUCCESS STEP ── */}
        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="p-6 text-center py-12"
          >
            <div className="text-5xl mb-4">✅</div>
            <h3
              className="text-h3 mb-2"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
              }}
            >
              You're Booked
            </h3>
            <p
              className="text-sm mb-6"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--text-secondary)",
              }}
            >
              {formatSelectedDate()} at {selectedTime}
            </p>
            <p
              className="text-sm mb-8"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--text-muted)",
              }}
            >
              Zeek will confirm your appointment shortly. If you need to
              reschedule, call (802) 751-5786.
            </p>
            <button
              onClick={() => {
                setStep("calendar");
                setSelectedDate(null);
                setSelectedTime(null);
                setFormData({ name: "", email: "", phone: "", service: "" });
              }}
              className="text-sm font-medium transition-colors"
              style={{ color: "var(--accent)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.filter = "brightness(1.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.filter = "none")
              }
            >
              Book Another Appointment
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
