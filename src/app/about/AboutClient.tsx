"use client";
import FadeUp from "@/components/animations/FadeUp";

import SlideIn from "@/components/animations/SlideIn";
import CountUp from "@/components/animations/CountUp";
import FadeIn from "@/components/animations/FadeIn";
import Link from "next/link";

interface AboutProps {
  siteConfig: { name: string };
  about: {
    ownerName: string;
    ownerTitle: string;
    story: string;
    beliefs: { emoji: string; text: string }[];
    whoWeServe: string;
    whyUs: string[];
    founderSpotlight: string;
  };
  stats: { emoji: string; value: number; suffix: string; label: string; source: string }[];
  meta: { phone: string; phoneRaw: string };
  cta: { primary: string; booking: string };
}

export default function AboutClient({ siteConfig, about, stats, meta, cta }: AboutProps) {
  const storyParagraphs = about.story.split("\n\n");

  return (
    <>
      {/* Page Header */}
      <section
        className="py-16 md:py-24"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.08), transparent 70%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <h1 className="hero-shimmer font-display text-display text-center">
              About {siteConfig.name}
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-elevated)" }}>
        <div className="mx-auto max-w-4xl px-6">
          <FadeUp>
            <h2 className="font-display text-h2 mb-8" style={{ color: "var(--text-primary)" }}>
              The Story
            </h2>
          </FadeUp>
          {storyParagraphs.map((paragraph, i) => (
            <SlideIn key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
              <p
                className="font-body text-lg mb-6 leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {paragraph}
              </p>
            </SlideIn>
          ))}
        </div>
      </section>

      {/* Beliefs / Values */}
      <section
        className="py-16 md:py-24"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.06), transparent 70%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6">
          <FadeUp>
            <h2 className="font-display text-h2 mb-10 text-center" style={{ color: "var(--text-primary)" }}>
              What I Believe
            </h2>
          </FadeUp>
          <div className="space-y-6">
            {about.beliefs.map((belief, i) => (
              <SlideIn key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.08}>
                <div
                  className="flex items-start gap-4 rounded-xl p-6 transition-all duration-300"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(212,160,23,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5">{belief.emoji}</span>
                  <p className="font-body text-base" style={{ color: "var(--text-secondary)" }}>
                    {belief.text}
                  </p>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-elevated)" }}>
        <div className="mx-auto max-w-4xl px-6">
          <SlideIn direction="left">
            <h2 className="font-display text-h2 mb-6" style={{ color: "var(--text-primary)" }}>
              Who I Built This For
            </h2>
          </SlideIn>
          <SlideIn direction="right" delay={0.15}>
            <p
              className="font-body text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {about.whoWeServe}
            </p>
          </SlideIn>
        </div>
      </section>

      {/* Why Us */}
      <section
        className="py-16 md:py-24"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.06), transparent 70%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6">
          <FadeUp>
            <h2 className="font-display text-h2 mb-10 text-center" style={{ color: "var(--text-primary)" }}>
              Why Witt&apos;s
            </h2>
          </FadeUp>
          <div className="space-y-6">
            {about.whyUs.map((reason, i) => (
              <SlideIn key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                <div
                  className="rounded-xl p-6 transition-all duration-300"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(212,160,23,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  <p className="font-body text-base" style={{ color: "var(--text-secondary)" }}>
                    {reason}
                  </p>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Spotlight */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-elevated)" }}>
        <div className="mx-auto max-w-4xl px-6">
          <SlideIn direction="left">
            <h2 className="font-display text-h2 mb-6" style={{ color: "var(--text-primary)" }}>
              {about.ownerName}
            </h2>
            <p
              className="font-mono text-eyebrow mb-4"
              style={{ color: "var(--accent)" }}
            >
              {about.ownerTitle}
            </p>
          </SlideIn>
          <SlideIn direction="right" delay={0.15}>
            <p
              className="font-body text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {about.founderSpotlight}
            </p>
          </SlideIn>
        </div>
      </section>

      {/* Stats Row */}
      <section
        className="py-16 md:py-24"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.08), transparent 70%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="text-center">
                  <span className="text-3xl block mb-2">{stat.emoji}</span>
                  <span
                    className="font-display text-h2 block"
                    style={{ color: "var(--accent)" }}
                  >
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </span>
                  <span
                    className="font-body text-sm block mt-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-elevated)" }}>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-h2 mb-4" style={{ color: "var(--text-primary)" }}>
              Ready to get started?
            </h2>
            <p
              className="font-body text-lg mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Whether it&apos;s an emergency tow or a restoration project, give Zeek a call.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={cta.primary}
                className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-bold transition-all duration-300"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-base)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(212,160,23,0.4)";
                  e.currentTarget.style.filter = "brightness(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.filter = "none";
                }}
              >
                Call {meta.phone}
              </a>
              <Link
                href={cta.booking}
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold transition-all duration-300"
                style={{
                  border: "1px solid var(--text-secondary)",
                  color: "var(--text-primary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--text-secondary)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
              >
                Book Online
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
