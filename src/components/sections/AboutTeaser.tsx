"use client";

import Link from "next/link";
import { about, CTA } from "@/data/site";
import SlideIn from "@/components/animations/SlideIn";
import FadeUp from "@/components/animations/FadeUp";

export default function AboutTeaser() {
  // Extract just the first paragraph of the origin story
  const storyParagraphs = about.story.split("\n\n");
  const originSnippet = storyParagraphs[0];

  return (
    <section
      className="py-16 md:py-24"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.06), transparent 70%), var(--bg-base)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text block */}
          <SlideIn direction="left">
            <p
              className="mb-2 text-xs font-medium uppercase tracking-[0.1em]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent)",
              }}
            >
              {about.ownerTitle}
            </p>
            <h2
              className="text-h2 mb-6"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
              }}
            >
              Meet {about.ownerName}
            </h2>
            <p
              className="mb-8 text-lg leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--text-secondary)",
              }}
            >
              {originSnippet}
            </p>

            <Link
              href="/about"
              className="inline-flex items-center rounded-lg border px-6 py-3 text-base font-semibold transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{
                borderColor: "var(--text-secondary)",
                color: "var(--text-primary)",
              }}
            >
              Learn More About Zeek
            </Link>
          </SlideIn>

          {/* Beliefs list */}
          <SlideIn direction="right" delay={0.2}>
            <div
              className="rounded-xl border p-6"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <h3
                className="mb-4 text-lg font-semibold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-primary)",
                }}
              >
                What I Believe
              </h3>
              <ul className="space-y-4">
                {about.beliefs.map((belief) => (
                  <FadeUp key={belief.text} delay={0.1}>
                    <li className="flex items-start gap-3">
                      <span className="shrink-0 text-xl">{belief.emoji}</span>
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {belief.text}
                      </span>
                    </li>
                  </FadeUp>
                ))}
              </ul>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
