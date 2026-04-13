"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import RisingAsh from "@/components/animations/RisingAsh";
import { siteConfig, meta } from "@/data/site";

interface ServiceArea {
  town: string;
  state: string;
  slug: string;
  population: string;
  distance: string;
  description: string;
}

interface ServiceAreasClientProps {
  serviceAreas: ServiceArea[];
}

export default function ServiceAreasClient({
  serviceAreas,
}: ServiceAreasClientProps) {
  return (
    <div style={{ background: "var(--bg-base)" }}>
      {/* ── Hero ── */}
      <section
        className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden"
        style={{ background: "var(--bg-base)" }}
      >
        {/* Ambient radial gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.08), transparent 70%)",
          }}
        />
        <RisingAsh />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--accent)" }}
          >
            {siteConfig.name} — Service Coverage
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-shimmer font-display text-display mb-6"
            style={{
              color: "var(--text-primary)",
            }}
          >
            Towing &amp; Auto Services Across the North Country
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            From Groveton to Colebrook, across the Connecticut River into
            Vermont. Zeek covers the North Country with 24/7 towing, auto body,
            restoration, and mobile mechanic services.
          </motion.p>
        </div>
      </section>

      {/* ── Town Grid ── */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-elevated)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceAreas.map((area, i) => (
              <motion.div
                key={area.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="group block h-full rounded-xl p-6 transition-all duration-300"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(212,160,23,0.2)";
                    e.currentTarget.style.boxShadow =
                      "0 0 24px rgba(212,160,23,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <h2
                    className="font-display font-bold uppercase mb-1"
                    style={{
                      fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {area.town}, {area.state}
                  </h2>

                  <div className="flex flex-wrap gap-3 mb-3">
                    <span
                      className="font-mono text-xs uppercase tracking-wider"
                      style={{ color: "var(--accent)" }}
                    >
                      📍 {area.distance}
                    </span>
                    <span
                      className="font-mono text-xs uppercase tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      👥 Pop. {area.population}
                    </span>
                  </div>

                  <p
                    className="font-body text-sm leading-relaxed mb-4"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {area.description}
                  </p>

                  <span
                    className="inline-flex items-center gap-1 font-body font-semibold text-sm transition-colors duration-200 group-hover:underline"
                    style={{ color: "var(--accent)" }}
                  >
                    View Services &rarr;
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Not in our area? CTA ── */}
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={{ background: "var(--bg-base)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(212,160,23,0.06), transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-display font-bold uppercase mb-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "var(--text-primary)",
            }}
          >
            Not in Our Area? Call Us Anyway.
          </h2>
          <p
            className="font-body text-lg leading-relaxed mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            I&apos;m FMCSA licensed to operate in all 50 states. If you need a
            long-distance tow or interstate haul, I can get your vehicle where
            it needs to go. Call and we&apos;ll figure it out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-display font-bold uppercase text-lg transition-all duration-200"
              style={{
                background: "var(--accent)",
                color: "var(--bg-base)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(212,160,23,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Get a Free Quote
            </Link>
            <a
              href={`tel:+1${meta.phoneRaw}`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-mono font-medium text-base transition-colors duration-200"
              style={{
                border: "1px solid var(--text-secondary)",
                color: "var(--text-primary)",
              }}
            >
              📞 {meta.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
