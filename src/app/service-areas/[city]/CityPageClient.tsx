"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig, meta } from "@/data/site";

interface ServiceArea {
  town: string;
  state: string;
  slug: string;
  population: string;
  distance: string;
  description: string;
}

interface Service {
  name: string;
  slug: string;
  emoji: string;
  tagline: string;
  shortDescription: string;
}

interface CityPageClientProps {
  area: ServiceArea;
  services: Service[];
}

// ── FAQ Accordion Item ──
function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: "var(--bg-card)",
        border: open
          ? "1px solid rgba(212,160,23,0.2)"
          : "1px solid transparent",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
      >
        <span
          className="font-display font-bold text-base md:text-lg pr-4"
          style={{ color: "var(--text-primary)" }}
        >
          {question}
        </span>
        <span
          className="flex-shrink-0 text-xl font-mono transition-transform duration-200"
          style={{
            color: "var(--accent)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? "400px" : "0",
          opacity: open ? 1 : 0,
        }}
      >
        <p
          className="px-5 pb-5 font-body text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function CityPageClient({
  area,
  services,
}: CityPageClientProps) {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(area.town + ", " + area.state)}&output=embed&hl=en`;

  const faqs = [
    {
      question: `Do you offer same-day service in ${area.town}?`,
      answer: `Yes. For emergencies, I'm rolling within minutes. For scheduled work like mechanical repair, body work, or restoration consultations, I can often fit you in the same day depending on the workload. Call me at ${meta.phone} and we'll work it out.`,
    },
    {
      question: `How much does towing cost in ${area.town}?`,
      answer: `Local towing starts at $75 plus $4 per mile from my shop in Groveton. Winch-outs start at $95. I'll always give you a clear price before I hook up. No surprises, no hidden fees. For ${area.town} specifically, the distance from Groveton is ${area.distance}, so you can estimate from there.`,
    },
    {
      question: `What areas of ${area.town} do you serve?`,
      answer: `All of ${area.town} and the surrounding roads. I know the back roads, logging roads, and every Route in the area. If you're stuck somewhere in or around ${area.town}, ${area.state}, I can get to you. I'm FMCSA licensed for interstate service too, so crossing state lines is no problem.`,
    },
  ];

  return (
    <div style={{ background: "var(--bg-base)" }}>
      {/* ── Section 1: Hero ── */}
      <section
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden"
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-widest"
            aria-label="Breadcrumb"
          >
            <Link
              href="/service-areas"
              className="transition-colors duration-200"
              style={{ color: "var(--accent)" }}
            >
              Service Areas
            </Link>
            <span style={{ color: "var(--text-muted)" }}>&#8250;</span>
            <span style={{ color: "var(--text-secondary)" }}>
              {area.town}, {area.state}
            </span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-shimmer font-display text-display mb-4"
            style={{
              color: "var(--text-primary)",
            }}
          >
            Towing &amp; Auto Services in {area.town}, {area.state}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-lg leading-relaxed mb-8 max-w-2xl"
            style={{ color: "var(--text-secondary)" }}
          >
            {area.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 items-center"
          >
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
              Get a Free Quote in {area.town}
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
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: City Info (2-column) ── */}
      <section
        className="py-16 md:py-24"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* LEFT — Copy + Trust checklist */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              <h2
                className="font-display font-bold uppercase mb-6"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  color: "var(--text-primary)",
                }}
              >
                Your Local Auto Experts in {area.town}
              </h2>
              <p
                className="font-body text-base leading-relaxed mb-4"
                style={{ color: "var(--text-secondary)" }}
              >
                {siteConfig.name} is based right in Groveton, NH, just{" "}
                {area.distance} from {area.town}. When you need a tow at 2 AM
                in a blizzard or a full frame-off restoration on your project
                truck, Zeek Witt is the guy who picks up the phone and shows up
                with the truck.
              </p>
              {/* [DEMO COPY — pending client review] */}
              <p
                className="font-body text-base leading-relaxed mb-8"
                style={{ color: "var(--text-secondary)" }}
              >
                Unlike chain shops or dispatch services, every job gets the same
                standard: it&apos;s great work or no work. No call centers, no
                runaround, no surprises. One shop, one guy, one call. From
                emergency roadside recovery to complete vehicle restorations,{" "}
                {area.town} residents get the same fast, honest, fully insured
                service that Groveton has trusted since day one.
              </p>

              {/* Trust checklist */}
              <ul className="space-y-3">
                {[
                  { emoji: "✅", text: `Licensed & insured (${meta.insurance})` },
                  { emoji: "✅", text: "Zero safety violations" },
                  { emoji: "✅", text: "24/7 emergency response" },
                  {
                    emoji: "✅",
                    text: `FMCSA licensed — all 50 states (USDOT ${meta.usdot})`,
                  },
                ].map((item) => (
                  <li
                    key={item.text}
                    className="flex items-start gap-3 font-body text-base"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <span className="flex-shrink-0 text-lg">{item.emoji}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* RIGHT — Google Maps + Info card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              <div className="rounded-2xl overflow-hidden h-64">
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${area.town}, ${area.state}`}
                />
              </div>

              {/* Info card */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid rgba(245,245,245,0.05)",
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p
                      className="font-mono text-xs uppercase tracking-widest mb-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Distance from Shop
                    </p>
                    <p
                      className="font-display font-bold text-lg"
                      style={{ color: "var(--accent)" }}
                    >
                      {area.distance}
                    </p>
                  </div>
                  <div>
                    <p
                      className="font-mono text-xs uppercase tracking-widest mb-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Population
                    </p>
                    <p
                      className="font-display font-bold text-lg"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {area.population}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Services Available ── */}
      <section
        className="py-16 md:py-24"
        style={{ background: "var(--bg-base)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.05), transparent 70%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--accent)" }}
            >
              Full-Service Auto Shop
            </p>
            <h2
              className="font-display font-bold uppercase"
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                color: "var(--text-primary)",
              }}
            >
              Services Available in {area.town}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  href={`/services/${service.slug}`}
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
                  <span className="text-3xl mb-3 block">{service.emoji}</span>
                  <h3
                    className="font-display font-bold uppercase mb-2"
                    style={{
                      fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="font-body text-sm leading-relaxed mb-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {service.shortDescription}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 font-body font-semibold text-sm transition-colors duration-200 group-hover:underline"
                    style={{ color: "var(--accent)" }}
                  >
                    Learn More &rarr;
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: FAQ ── */}
      <section
        className="py-16 md:py-24"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--accent)" }}
            >
              Common Questions
            </p>
            <h2
              className="font-display font-bold uppercase"
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                color: "var(--text-primary)",
              }}
            >
              {area.town} FAQ
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
              >
                <FAQItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <p
              className="font-body text-base mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              Have a different question? Call Zeek directly.
            </p>
            <a
              href={`tel:+1${meta.phoneRaw}`}
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
              Call {meta.phone}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
