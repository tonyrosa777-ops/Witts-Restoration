"use client";

import Link from "next/link";
import { finalCTA } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import ScaleIn from "@/components/animations/ScaleIn";

export default function FinalCTA() {
  return (
    <section
      className="py-16 md:py-24"
      style={{
        background: "var(--bg-elevated)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <FadeUp>
            <h2
              className="text-h2 mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
              }}
            >
              {finalCTA.headline}
            </h2>
            <p
              className="mb-8 text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              {finalCTA.subtext}
            </p>
          </FadeUp>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ScaleIn delay={0.15}>
              <a
                href={finalCTA.cta.href}
                className="inline-flex items-center rounded-lg px-8 py-4 text-lg font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,160,23,0.4)]"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-base)",
                }}
              >
                {finalCTA.cta.label}
              </a>
            </ScaleIn>

            <ScaleIn delay={0.25}>
              <Link
                href={finalCTA.ctaSecondary.href}
                className="inline-flex items-center rounded-lg border px-6 py-3 text-base font-semibold transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                style={{
                  borderColor: "var(--text-secondary)",
                  color: "var(--text-primary)",
                }}
              >
                {finalCTA.ctaSecondary.label}
              </Link>
            </ScaleIn>
          </div>
        </div>
      </div>
    </section>
  );
}
