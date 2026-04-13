"use client";

import Link from "next/link";
import { services } from "@/data/site";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import FadeUp from "@/components/animations/FadeUp";

export default function ServicesPreview() {
  const featured = services.slice(0, 3);

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
            What I Do
          </p>
          <h2
            className="text-h2 mb-4 text-center"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            Services Built for the North Country
          </h2>
          <p
            className="mx-auto mb-12 max-w-2xl text-center text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Towing, body work, mechanical repair, restorations, and more. One
            shop, one guy, one standard.
          </p>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((service) => (
            <StaggerItem key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group block h-full"
              >
                <div
                  className="flex h-full flex-col rounded-xl border p-6 transition-colors duration-300 group-hover:border-[rgba(212,160,23,0.2)]"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "rgba(245,245,245,0.05)",
                  }}
                >
                  <span className="mb-3 block text-4xl">{service.emoji}</span>
                  <h3
                    className="mb-1 text-xl font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="mb-1 text-xs font-medium"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--accent)",
                    }}
                  >
                    {service.startingAt !== "Quote required"
                      ? `Starting at ${service.startingAt}`
                      : service.startingAt}
                  </p>
                  <p
                    className="mt-2 flex-1 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {service.shortDescription}
                  </p>
                  <span
                    className="mt-4 inline-flex text-sm font-semibold transition-colors group-hover:text-[var(--accent)]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Learn More &rarr;
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center rounded-lg border px-6 py-3 text-base font-semibold transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{
                borderColor: "var(--text-secondary)",
                color: "var(--text-primary)",
              }}
            >
              View All {services.length} Services
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
