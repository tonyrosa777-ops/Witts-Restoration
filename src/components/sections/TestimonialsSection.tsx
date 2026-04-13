"use client";

import Link from "next/link";
import { testimonials, CTA } from "@/data/site";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import FadeUp from "@/components/animations/FadeUp";

export default function TestimonialsSection() {
  const featured = testimonials.filter((t) => t.featured).slice(0, 4);

  return (
    <section
      className="py-16 md:py-24"
      style={{ background: "var(--bg-elevated)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <FadeUp>
          <p
            className="mb-2 text-center text-xs font-medium uppercase tracking-[0.1em]"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--accent)",
            }}
          >
            Real Customers. Real Words.
          </p>
          <h2
            className="text-h2 mb-12 text-center"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            What People Are Saying
          </h2>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((testimonial) => (
            <StaggerItem key={testimonial.name}>
              <div
                className="flex h-full flex-col rounded-xl border p-6 transition-colors duration-300 hover:border-[rgba(212,160,23,0.2)]"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "rgba(245,245,245,0.05)",
                }}
              >
                <p
                  className="flex-1 text-sm italic leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="mt-4 border-t pt-4" style={{ borderColor: "rgba(245,245,245,0.08)" }}>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {testimonial.service}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href={CTA.testimonials}
              className="inline-flex items-center rounded-lg border px-6 py-3 text-base font-semibold transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{
                borderColor: "var(--text-secondary)",
                color: "var(--text-primary)",
              }}
            >
              See All Testimonials
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
