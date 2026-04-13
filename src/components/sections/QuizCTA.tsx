"use client";

import Link from "next/link";
import { quizCTA, CTA } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import ScaleIn from "@/components/animations/ScaleIn";

export default function QuizCTA() {
  return (
    <section
      className="py-16 md:py-24"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.06), transparent 70%), var(--bg-base)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <FadeUp>
            <p
              className="mb-2 text-xs font-medium uppercase tracking-[0.1em]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent)",
              }}
            >
              60-Second Quiz
            </p>
            <h2
              className="text-h2 mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
              }}
            >
              {quizCTA.headline}
            </h2>
            <p
              className="mb-8 text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              {quizCTA.subtext}
            </p>
          </FadeUp>

          <ScaleIn delay={0.2}>
            <Link
              href={CTA.quiz}
              className="inline-flex items-center rounded-lg px-8 py-4 text-lg font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,160,23,0.4)]"
              style={{
                background: "var(--accent)",
                color: "var(--bg-base)",
              }}
            >
              {quizCTA.cta.label}
            </Link>
          </ScaleIn>
        </div>
      </div>
    </section>
  );
}
