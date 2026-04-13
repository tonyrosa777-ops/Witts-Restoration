"use client";
import { useState } from "react";
import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import SlideIn from "@/components/animations/SlideIn";
import FadeIn from "@/components/animations/FadeIn";

interface Service {
  name: string;
  slug: string;
  emoji: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  whoItsFor: string;
  startingAt: string;
  cta: { label: string; href: string };
}

interface Testimonial {
  name: string;
  text: string;
  service: string;
  featured: boolean;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  service: Service;
  relatedTestimonials: Testimonial[];
  relatedFaq: FaqItem[];
  meta: { phone: string; phoneRaw: string };
  cta: { primary: string; booking: string };
}

export default function ServiceDetailClient({
  service,
  relatedTestimonials,
  relatedFaq,
  meta,
  cta,
}: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section
        className="py-16 md:py-24"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.08), transparent 70%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeUp>
            <span className="text-6xl block mb-4">{service.emoji}</span>
            <h1 className="hero-shimmer font-display text-display">
              {service.name}
            </h1>
            <p
              className="font-body text-lg mt-4"
              style={{ color: "var(--text-secondary)" }}
            >
              {service.tagline}
            </p>
          </FadeUp>
          {service.startingAt !== "Quote required" && (
            <FadeUp delay={0.2}>
              <span
                className="inline-block mt-6 font-mono text-sm px-4 py-2 rounded-lg"
                style={{
                  background: "rgba(212,160,23,0.1)",
                  color: "var(--accent)",
                  border: "1px solid rgba(212,160,23,0.2)",
                }}
              >
                Starting at {service.startingAt}
              </span>
            </FadeUp>
          )}
        </div>
      </section>

      {/* Full Description */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-elevated)" }}>
        <div className="mx-auto max-w-4xl px-6">
          <SlideIn direction="left">
            <h2 className="font-display text-h2 mb-6" style={{ color: "var(--text-primary)" }}>
              What This Covers
            </h2>
            <p
              className="font-body text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {service.fullDescription}
            </p>
          </SlideIn>
        </div>
      </section>

      {/* Who It's For */}
      <section
        className="py-16 md:py-24"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.06), transparent 70%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6">
          <SlideIn direction="right">
            <h2 className="font-display text-h2 mb-6" style={{ color: "var(--text-primary)" }}>
              Who This Is For
            </h2>
            <p
              className="font-body text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {service.whoItsFor}
            </p>
          </SlideIn>
        </div>
      </section>

      {/* Related Testimonials */}
      {relatedTestimonials.length > 0 && (
        <section className="py-16 md:py-24" style={{ background: "var(--bg-elevated)" }}>
          <div className="mx-auto max-w-7xl px-6">
            <FadeUp>
              <h2
                className="font-display text-h2 mb-10 text-center"
                style={{ color: "var(--text-primary)" }}
              >
                What People Say
              </h2>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTestimonials.slice(0, 6).map((testimonial, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div
                    className="rounded-xl p-6 h-full transition-all duration-300"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid rgba(245,245,245,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(212,160,23,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(245,245,245,0.05)";
                    }}
                  >
                    <p
                      className="font-body text-sm leading-relaxed mb-4"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <p
                      className="font-display text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {testimonial.name}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related FAQ */}
      {relatedFaq.length > 0 && (
        <section
          className="py-16 md:py-24"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.06), transparent 70%)",
          }}
        >
          <div className="mx-auto max-w-4xl px-6">
            <FadeUp>
              <h2
                className="font-display text-h2 mb-10 text-center"
                style={{ color: "var(--text-primary)" }}
              >
                Common Questions
              </h2>
            </FadeUp>
            <div className="space-y-3">
              {relatedFaq.map((item, i) => (
                <FadeUp key={i} delay={i * 0.05}>
                  <div
                    className="rounded-xl overflow-hidden transition-all duration-300"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid transparent",
                      ...(openFaq === i
                        ? { borderColor: "rgba(212,160,23,0.15)" }
                        : {}),
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left px-6 py-4 flex items-center justify-between cursor-pointer"
                    >
                      <span
                        className="font-display text-base font-semibold pr-4"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.question}
                      </span>
                      <span
                        className="text-xl flex-shrink-0 transition-transform duration-300"
                        style={{
                          color: "var(--accent)",
                          transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{
                        maxHeight: openFaq === i ? "500px" : "0",
                        opacity: openFaq === i ? 1 : 0,
                      }}
                    >
                      <p
                        className="px-6 pb-4 font-body text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-elevated)" }}>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-h2 mb-4" style={{ color: "var(--text-primary)" }}>
              {service.cta.label}
            </h2>
            <p
              className="font-body text-lg mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Call Zeek directly or book a time online.
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
