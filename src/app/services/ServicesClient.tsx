"use client";
import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";

import StaggerContainer, { StaggerItem } from "@/components/animations/StaggerContainer";
import RisingAsh from "@/components/animations/RisingAsh";

interface Service {
  name: string;
  slug: string;
  emoji: string;
  shortDescription: string;
  startingAt: string;
}

export default function ServicesClient({ services }: { services: Service[] }) {
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
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <FadeUp>
            <h1 className="hero-shimmer font-display text-display text-center">
              Our Services
            </h1>
            <p
              className="font-body text-lg text-center mt-4 max-w-2xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              One shop. One guy. Everything your vehicle needs.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Service Cards Grid */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-elevated)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="block rounded-xl p-6 h-full transition-all duration-300"
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
                  <span className="text-4xl block mb-4">{service.emoji}</span>
                  <h2
                    className="font-display text-h4 mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {service.name}
                  </h2>
                  <p
                    className="font-body text-sm mb-4 leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {service.shortDescription}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4">
                    <span
                      className="font-mono text-sm font-medium"
                      style={{ color: "var(--accent)" }}
                    >
                      {service.startingAt}
                    </span>
                    <span
                      className="font-body text-sm font-semibold"
                      style={{ color: "var(--accent)" }}
                    >
                      Learn More &rarr;
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
