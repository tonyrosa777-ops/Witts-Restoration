"use client";
import { useState } from "react";
import FadeUp from "@/components/animations/FadeUp";
import RisingAsh from "@/components/animations/RisingAsh";


interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  faq: FaqItem[];
  meta: { phone: string };
  cta: { primary: string };
}

export default function FaqClient({ faq, meta, cta }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {/* Page Header */}
      <section
        className="relative overflow-hidden py-16 md:py-24"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.08), transparent 70%)",
        }}
      >
        <RisingAsh />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <FadeUp>
            <h1 className="hero-shimmer font-display text-display text-center">
              Frequently Asked Questions
            </h1>
            <p
              className="font-body text-lg text-center mt-4"
              style={{ color: "var(--text-secondary)" }}
            >
              Straight answers. No runaround.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-elevated)" }}>
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-3">
            {faq.map((item, i) => (
              <FadeUp key={i} delay={i * 0.03}>
                <div
                  className="rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid transparent",
                    ...(openIndex === i
                      ? { borderColor: "rgba(212,160,23,0.15)" }
                      : {}),
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span
                      className="font-display text-base font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.question}
                    </span>
                    <span
                      className="text-xl flex-shrink-0 transition-transform duration-300"
                      style={{
                        color: "var(--accent)",
                        transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: openIndex === i ? "500px" : "0",
                      opacity: openIndex === i ? 1 : 0,
                    }}
                  >
                    <p
                      className="px-6 pb-5 font-body text-base leading-relaxed"
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

      {/* CTA */}
      <section
        className="py-16 md:py-24"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.08), transparent 70%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-h2 mb-4" style={{ color: "var(--text-primary)" }}>
              Still have questions?
            </h2>
            <p
              className="font-body text-lg mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Call Zeek directly. No phone tree, no voicemail maze. Just a real person who can help.
            </p>
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
          </FadeUp>
        </div>
      </section>
    </>
  );
}
