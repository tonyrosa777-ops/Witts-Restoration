import type { Metadata } from "next";
import { seoMeta } from "@/data/site";
import BookingCalendar from "@/components/BookingCalendar";

export const metadata: Metadata = {
  title: seoMeta.booking.title,
  description: seoMeta.booking.description,
};

export default function BookingPage() {
  return (
    <div
      className="min-h-screen pt-24 pb-16"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <div className="text-center mb-8">
          <span
            className="inline-block text-xs tracking-widest uppercase mb-3"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--accent)",
            }}
          >
            Book an Appointment
          </span>
          <h1
            className="hero-shimmer font-display text-display mb-3"
            style={{
              color: "var(--text-primary)",
            }}
          >
            Schedule Your Service
          </h1>
          <p
            className="text-base"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-secondary)",
            }}
          >
            Pick a date and time that works for you. Consultations,
            mechanical work, body work, and pre-season service.
          </p>
        </div>
        <BookingCalendar />
      </div>
    </div>
  );
}
