"use client";

import Link from "next/link";
import { CTA, meta } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import ScaleIn from "@/components/animations/ScaleIn";

export default function BookingPreview() {
  return (
    <section
      className="py-16 md:py-24"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.06), transparent 70%), var(--bg-base)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <FadeUp>
            <p
              className="mb-2 text-xs font-medium uppercase tracking-[0.1em]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent)",
              }}
            >
              Book Online
            </p>
            <h2
              className="text-h2 mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
              }}
            >
              Ready to Get Started?
            </h2>
            <p
              className="mb-8 text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              For scheduled work like restorations, body work, mechanical
              repairs, and pre-season service, book a time that works for you.
              For emergencies, just call.
            </p>
          </FadeUp>

          {/* Placeholder for BookingCalendar component */}
          <ScaleIn delay={0.15}>
            <div
              className="mb-8 rounded-xl border p-8"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <p
                className="mb-2 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                📅 Booking calendar loading here
              </p>
              <p
                className="mb-6 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Pick a date and time for your consultation or service
                appointment.
              </p>
              <Link
                href={CTA.booking}
                className="inline-flex items-center rounded-lg px-8 py-4 text-lg font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,160,23,0.4)]"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-base)",
                }}
              >
                Book an Appointment
              </Link>
            </div>
          </ScaleIn>

          <FadeUp delay={0.3}>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Emergency? Skip the calendar.{" "}
              <a
                href={CTA.primary}
                className="font-semibold underline transition-colors hover:text-[var(--accent)]"
                style={{ color: "var(--text-primary)" }}
              >
                Call {meta.phone} now.
              </a>
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
