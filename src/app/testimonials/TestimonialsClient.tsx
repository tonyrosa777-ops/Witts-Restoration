"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import RisingAsh from "@/components/animations/RisingAsh";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/animations/StaggerContainer";

interface Testimonial {
  name: string;
  text: string;
  service: string;
  featured: boolean;
}

interface Props {
  testimonials: Testimonial[];
  meta: { phone: string };
  cta: { primary: string; booking: string };
}

const PER_PAGE = 9;

export default function TestimonialsClient({ testimonials, meta, cta }: Props) {
  const [page, setPage] = useState(0);
  const [serviceFilter, setServiceFilter] = useState<string | null>(null);

  // Get unique service types
  const serviceTypes = useMemo(() => {
    const types = new Set(testimonials.map((t) => t.service));
    return Array.from(types).sort();
  }, [testimonials]);

  // Filter and paginate
  const filtered = useMemo(() => {
    if (!serviceFilter) return testimonials;
    return testimonials.filter((t) => t.service === serviceFilter);
  }, [testimonials, serviceFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const currentPage = Math.min(page, totalPages - 1);
  const pageItems = filtered.slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE);

  // Featured testimonial (first featured one)
  const featured = testimonials.find((t) => t.featured);

  return (
    <>
      {/* Featured Quote Header */}
      <section
        className="relative overflow-hidden py-16 md:py-24"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.08), transparent 70%)",
        }}
      >
        <RisingAsh />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <FadeUp>
            <h1 className="hero-shimmer font-display text-display mb-8">
              Testimonials
            </h1>
          </FadeUp>
          {featured && (
            <FadeUp delay={0.15}>
              <blockquote className="relative">
                <span
                  className="text-6xl font-display absolute -top-4 -left-2 opacity-20"
                  style={{ color: "var(--accent)" }}
                >
                  &ldquo;
                </span>
                <p
                  className="font-body text-xl md:text-2xl leading-relaxed italic"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {featured.text}
                </p>
                <footer className="mt-4">
                  <span
                    className="font-display text-base font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {featured.name}
                  </span>
                  <span
                    className="font-mono text-xs ml-3 px-2 py-1 rounded"
                    style={{
                      background: "rgba(212,160,23,0.1)",
                      color: "var(--accent)",
                    }}
                  >
                    {featured.service}
                  </span>
                </footer>
              </blockquote>
            </FadeUp>
          )}
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-elevated)" }}>
        <div className="mx-auto max-w-7xl px-6">
          {/* Service Filter */}
          <FadeUp>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              <button
                onClick={() => {
                  setServiceFilter(null);
                  setPage(0);
                }}
                className="px-4 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200 cursor-pointer"
                style={{
                  background: serviceFilter === null ? "var(--accent)" : "var(--bg-card)",
                  color: serviceFilter === null ? "var(--bg-base)" : "var(--text-secondary)",
                }}
              >
                All
              </button>
              {serviceTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setServiceFilter(type);
                    setPage(0);
                  }}
                  className="px-4 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    background: serviceFilter === type ? "var(--accent)" : "var(--bg-card)",
                    color: serviceFilter === type ? "var(--bg-base)" : "var(--text-secondary)",
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </FadeUp>

          {/* Testimonial Grid: 3 cols x 3 rows = 9 per page */}
          <StaggerContainer
            key={`${currentPage}-${serviceFilter}`}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {pageItems.map((testimonial, i) => (
              <StaggerItem key={`${testimonial.name}-${i}`}>
                <div
                  className="rounded-xl p-6 h-full flex flex-col transition-all duration-300"
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
                    className="font-body text-sm leading-relaxed flex-1 mb-4"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="font-display text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {testimonial.name}
                    </span>
                    <span
                      className="font-mono text-xs px-2 py-1 rounded"
                      style={{
                        background: "rgba(212,160,23,0.1)",
                        color: "var(--accent)",
                      }}
                    >
                      {testimonial.service}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Pagination */}
          {totalPages > 1 && (
            <FadeIn delay={0.2}>
              <div className="flex items-center justify-center gap-2 mt-10">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className="w-10 h-10 rounded-lg font-mono text-sm font-medium transition-all duration-200 cursor-pointer"
                    style={{
                      background: currentPage === i ? "var(--accent)" : "var(--bg-card)",
                      color: currentPage === i ? "var(--bg-base)" : "var(--text-secondary)",
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </FadeIn>
          )}
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
              Ready to see for yourself?
            </h2>
            <p
              className="font-body text-lg mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Join the growing list of happy customers. Call Zeek or book online.
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
