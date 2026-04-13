"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { pricing, siteConfig } from "@/data/site";

// ──────────────────────────────────────────────
// Comparison chart data (Optimus standard structure)
// Categories: Foundation / Conversion / Content & SEO / Commerce / Support
// ──────────────────────────────────────────────

interface ComparisonRow {
  feature: string;
  starter: boolean;
  pro: boolean;
  premium: boolean;
}

interface ComparisonCategory {
  name: string;
  rows: ComparisonRow[];
}

const COMPARISON: ComparisonCategory[] = [
  {
    name: "Foundation",
    rows: [
      { feature: "Custom-designed homepage", starter: true, pro: true, premium: true },
      { feature: "Animated canvas hero", starter: true, pro: true, premium: true },
      { feature: "Service pages", starter: true, pro: true, premium: true },
      { feature: "About page", starter: true, pro: true, premium: true },
      { feature: "Contact page with click-to-call", starter: true, pro: true, premium: true },
      { feature: "FAQ page with schema markup", starter: true, pro: true, premium: true },
      { feature: "Mobile-first responsive design", starter: true, pro: true, premium: true },
    ],
  },
  {
    name: "Conversion",
    rows: [
      { feature: "Interactive quiz lead capture", starter: false, pro: true, premium: true },
      { feature: "Inline booking calendar", starter: false, pro: true, premium: true },
      { feature: "Sticky mobile click-to-call bar", starter: false, pro: true, premium: true },
      { feature: "Testimonials page (36 reviews)", starter: false, pro: true, premium: true },
      { feature: "Before/after gallery page", starter: false, pro: true, premium: true },
    ],
  },
  {
    name: "Content & SEO",
    rows: [
      { feature: "SEO foundation (meta, sitemap, schema)", starter: true, pro: true, premium: true },
      { feature: "Blog architecture (Sanity CMS)", starter: false, pro: true, premium: true },
      { feature: "9-10 SEO-optimized articles", starter: false, pro: true, premium: true },
      { feature: "Service area pages (8+ towns)", starter: false, pro: true, premium: true },
      { feature: "AEO optimization for AI search", starter: false, pro: true, premium: true },
    ],
  },
  {
    name: "Commerce",
    rows: [
      { feature: "Branded merchandise shop", starter: false, pro: false, premium: true },
      { feature: "Product pages with variant picker", starter: false, pro: false, premium: true },
      { feature: "Shopping cart and checkout", starter: false, pro: false, premium: true },
      { feature: "Inventory management", starter: false, pro: false, premium: true },
      { feature: "Automated order fulfillment", starter: false, pro: false, premium: true },
    ],
  },
  {
    name: "Support",
    rows: [
      { feature: "Google-ready in 60-90 days", starter: true, pro: true, premium: true },
      { feature: "Source code ownership", starter: true, pro: true, premium: true },
      { feature: "Deployment to Vercel", starter: true, pro: true, premium: true },
    ],
  },
];

// ──────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────

export default function PricingPage() {
  // ROI Calculator state
  const [jobValue, setJobValue] = useState(pricing.roiCalculator.jobValueDefault);
  const [clientsPerMonth, setClientsPerMonth] = useState(
    pricing.roiCalculator.clientsPerMonthDefault
  );
  const [selectedTier, setSelectedTier] = useState<number>(1); // Pro by default

  const roiData = useMemo(() => {
    const monthlyRevenue = jobValue * clientsPerMonth;
    const tierPrice = pricing.tiers[selectedTier].price;
    const breakEvenMonths = Math.ceil(tierPrice / monthlyRevenue) || 1;
    const yearROI = ((monthlyRevenue * 12 - tierPrice) / tierPrice) * 100;

    return {
      monthlyRevenue,
      breakEvenMonths: Math.min(breakEvenMonths, 12),
      yearROI: Math.max(yearROI, 0),
    };
  }, [jobValue, clientsPerMonth, selectedTier]);

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5 },
  };

  return (
    <div
      className="min-h-screen pt-24 pb-16"
      style={{ background: "var(--bg-base)" }}
    >
      {/* ── HEADER ── */}
      <section className="text-center mb-16 px-4">
        <motion.div {...fadeUp}>
          <span
            className="inline-block text-xs tracking-widest uppercase mb-3"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--accent)",
            }}
          >
            Optimus Website Packages
          </span>
          <h1
            className="text-h2 mb-3"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            One Website. Built to Dominate.
          </h1>
          <p
            className="text-base max-w-lg mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-secondary)",
            }}
          >
            Every package is custom-built for {siteConfig.name}. Not a
            template. Not a Wix site. A real competitive weapon.
          </p>
        </motion.div>
      </section>

      {/* ── TIER CARDS ── */}
      <section className="max-w-6xl mx-auto px-4 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricing.tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              {...fadeUp}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative rounded-xl p-6 flex flex-col border"
              style={{
                background: tier.featured
                  ? "var(--bg-card)"
                  : "var(--bg-elevated)",
                borderColor: tier.featured
                  ? "var(--accent)"
                  : "rgba(245,245,245,0.05)",
                boxShadow: tier.featured
                  ? "0 0 30px rgba(212,160,23,0.12)"
                  : "none",
              }}
            >
              {/* Badge */}
              {tier.badge && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold tracking-wider uppercase px-4 py-1 rounded-full"
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg-base)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {tier.badge}
                </span>
              )}

              <div className="mb-6 pt-2">
                <h3
                  className="text-h3 mb-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-primary)",
                  }}
                >
                  {tier.name}
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {tier.headline}
                </p>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-4xl font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: tier.featured
                        ? "var(--accent)"
                        : "var(--text-primary)",
                    }}
                  >
                    ${tier.price.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Feature list */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {tier.features.map((feature, fIdx) => {
                  const isIncluded = feature.startsWith("\u2705");
                  return (
                    <li
                      key={fIdx}
                      className="flex items-start gap-2 text-sm"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: isIncluded
                          ? "var(--text-secondary)"
                          : "var(--text-muted)",
                      }}
                    >
                      <span className="flex-shrink-0 mt-0.5">
                        {feature.slice(0, feature.indexOf(" "))}
                      </span>
                      <span>
                        {feature.slice(feature.indexOf(" ") + 1)}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* CTA */}
              <Link
                href={tier.cta.href}
                className="block w-full text-center rounded-lg px-6 py-3 font-bold transition-all duration-200"
                style={{
                  background: tier.featured
                    ? "var(--accent)"
                    : "transparent",
                  color: tier.featured
                    ? "var(--bg-base)"
                    : "var(--text-primary)",
                  border: tier.featured
                    ? "none"
                    : "1px solid var(--text-secondary)",
                }}
                onMouseEnter={(e) => {
                  if (tier.featured) {
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(212,160,23,0.4)";
                    e.currentTarget.style.filter = "brightness(1.1)";
                  } else {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "var(--accent)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (tier.featured) {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.filter = "none";
                  } else {
                    e.currentTarget.style.borderColor =
                      "var(--text-secondary)";
                    e.currentTarget.style.color = "var(--text-primary)";
                  }
                }}
              >
                {tier.cta.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ROI CALCULATOR ── */}
      <section
        className="py-20 mb-24"
        style={{
          background: "var(--bg-elevated)",
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.06), transparent 70%)",
        }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2
              className="text-h2 mb-2"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
              }}
            >
              {pricing.roiCalculator.headline}
            </h2>
            <p
              className="text-base"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--text-secondary)",
              }}
            >
              {pricing.roiCalculator.subtitle}
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="space-y-8">
            {/* Job value slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {pricing.roiCalculator.jobValueLabel}
                </label>
                <span
                  className="text-lg font-bold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent)",
                  }}
                >
                  ${jobValue.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={pricing.roiCalculator.jobValueMin}
                max={pricing.roiCalculator.jobValueMax}
                step={50}
                value={jobValue}
                onChange={(e) => setJobValue(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--accent) ${((jobValue - pricing.roiCalculator.jobValueMin) / (pricing.roiCalculator.jobValueMax - pricing.roiCalculator.jobValueMin)) * 100}%, var(--bg-card) ${((jobValue - pricing.roiCalculator.jobValueMin) / (pricing.roiCalculator.jobValueMax - pricing.roiCalculator.jobValueMin)) * 100}%)`,
                  accentColor: "var(--accent)",
                }}
              />
            </div>

            {/* Clients per month slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {pricing.roiCalculator.clientsPerMonthLabel}
                </label>
                <span
                  className="text-lg font-bold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent)",
                  }}
                >
                  {clientsPerMonth}
                </span>
              </div>
              <input
                type="range"
                min={pricing.roiCalculator.clientsPerMonthMin}
                max={pricing.roiCalculator.clientsPerMonthMax}
                step={1}
                value={clientsPerMonth}
                onChange={(e) => setClientsPerMonth(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--accent) ${((clientsPerMonth - pricing.roiCalculator.clientsPerMonthMin) / (pricing.roiCalculator.clientsPerMonthMax - pricing.roiCalculator.clientsPerMonthMin)) * 100}%, var(--bg-card) ${((clientsPerMonth - pricing.roiCalculator.clientsPerMonthMin) / (pricing.roiCalculator.clientsPerMonthMax - pricing.roiCalculator.clientsPerMonthMin)) * 100}%)`,
                  accentColor: "var(--accent)",
                }}
              />
            </div>

            {/* Package selector */}
            <div>
              <label
                className="block text-sm mb-3"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--text-secondary)",
                }}
              >
                Package
              </label>
              <div className="grid grid-cols-3 gap-2">
                {pricing.tiers.map((tier, idx) => (
                  <button
                    key={tier.name}
                    onClick={() => setSelectedTier(idx)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 border"
                    style={{
                      background:
                        selectedTier === idx
                          ? "rgba(212,160,23,0.12)"
                          : "var(--bg-card)",
                      borderColor:
                        selectedTier === idx
                          ? "var(--accent)"
                          : "rgba(245,245,245,0.05)",
                      color:
                        selectedTier === idx
                          ? "var(--accent)"
                          : "var(--text-secondary)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {tier.name}
                  </button>
                ))}
              </div>
            </div>

            {/* ROI Output */}
            <div
              className="grid grid-cols-3 gap-4 rounded-xl p-6 border"
              style={{
                background: "var(--bg-card)",
                borderColor: "rgba(212,160,23,0.15)",
              }}
            >
              <div className="text-center">
                <p
                  className="text-2xl font-bold mb-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--accent)",
                  }}
                >
                  ${roiData.monthlyRevenue.toLocaleString()}
                </p>
                <p
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-muted)",
                  }}
                >
                  Monthly Revenue
                </p>
              </div>
              <div className="text-center">
                <p
                  className="text-2xl font-bold mb-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--accent)",
                  }}
                >
                  {roiData.breakEvenMonths} mo
                </p>
                <p
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-muted)",
                  }}
                >
                  Break-Even
                </p>
              </div>
              <div className="text-center">
                <p
                  className="text-2xl font-bold mb-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--accent)",
                  }}
                >
                  {Math.round(roiData.yearROI)}%
                </p>
                <p
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-muted)",
                  }}
                >
                  12-Month ROI
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── COMPARISON CHART ── */}
      <section className="max-w-5xl mx-auto px-4 mb-24">
        <motion.div {...fadeUp} className="text-center mb-10">
          <h2
            className="text-h2 mb-2"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            Full Feature Comparison
          </h2>
          <p
            className="text-base"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-secondary)",
            }}
          >
            Everything included in each package, side by side.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="rounded-xl overflow-hidden border"
          style={{
            background: "var(--bg-card)",
            borderColor: "rgba(245,245,245,0.05)",
          }}
        >
          {/* Header row */}
          <div
            className="grid grid-cols-4 gap-0 px-4 py-3 border-b"
            style={{
              background: "var(--bg-elevated)",
              borderColor: "rgba(245,245,245,0.05)",
            }}
          >
            <div
              className="text-sm font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-muted)",
              }}
            >
              Feature
            </div>
            {pricing.tiers.map((tier) => (
              <div
                key={tier.name}
                className="text-sm font-bold text-center"
                style={{
                  fontFamily: "var(--font-display)",
                  color: tier.featured
                    ? "var(--accent)"
                    : "var(--text-primary)",
                }}
              >
                {tier.name}
              </div>
            ))}
          </div>

          {COMPARISON.map((category, catIdx) => (
            <div key={category.name}>
              {/* Category header */}
              <div
                className="px-4 py-2 border-b"
                style={{
                  background:
                    catIdx % 2 === 0
                      ? "rgba(212,160,23,0.04)"
                      : "transparent",
                  borderColor: "rgba(245,245,245,0.05)",
                }}
              >
                <span
                  className="text-xs tracking-widest uppercase font-bold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent)",
                  }}
                >
                  {category.name}
                </span>
              </div>

              {/* Feature rows */}
              {category.rows.map((row, rowIdx) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-4 gap-0 px-4 py-2.5 border-b"
                  style={{
                    borderColor: "rgba(245,245,245,0.03)",
                    background:
                      rowIdx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                  }}
                >
                  <div
                    className="text-sm"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {row.feature}
                  </div>
                  <div className="text-center text-sm">
                    {row.starter ? (
                      <span style={{ color: "var(--accent)" }}>✅</span>
                    ) : (
                      <span style={{ color: "var(--text-muted)" }}>✗</span>
                    )}
                  </div>
                  <div className="text-center text-sm">
                    {row.pro ? (
                      <span style={{ color: "var(--accent)" }}>✅</span>
                    ) : (
                      <span style={{ color: "var(--text-muted)" }}>✗</span>
                    )}
                  </div>
                  <div className="text-center text-sm">
                    {row.premium ? (
                      <span style={{ color: "var(--accent)" }}>✅</span>
                    ) : (
                      <span style={{ color: "var(--text-muted)" }}>✗</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="text-center px-4 pb-12">
        <motion.div {...fadeUp}>
          <h2
            className="text-h2 mb-3"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            Ready to Build Something Real?
          </h2>
          <p
            className="text-base mb-8 max-w-lg mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-secondary)",
            }}
          >
            Every package is built from scratch for your business. No
            templates. No shortcuts. Book a call to talk through your
            options.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-bold transition-all duration-200"
            style={{
              background: "var(--accent)",
              color: "var(--bg-base)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(212,160,23,0.4)";
              e.currentTarget.style.filter = "brightness(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.filter = "none";
            }}
          >
            Book a Call
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
