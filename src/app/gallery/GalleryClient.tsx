"use client";

import { useState } from "react";
import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";

import { siteConfig } from "@/data/site";

// ── Gallery data (seeded — replace with real photos post-launch) ──
// [DEMO COPY — pending client review]

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description: string;
}

const CATEGORIES = [
  "All",
  "Restoration",
  "Towing & Recovery",
  "Body & Paint",
  "Mechanical",
  "Snowmobile & ATV",
];

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "1972 Chevy C10 — Full Frame-Off Restoration",
    category: "Restoration",
    description:
      "Complete teardown to bare frame. New floor pans, rocker panels, cab corners. Reassembled with factory-correct hardware. 14-month build.",
  },
  {
    id: 2,
    title: "Midnight Recovery — Route 3 Rollover",
    category: "Towing & Recovery",
    description:
      "Single-vehicle rollover at 1:30 AM during a nor'easter. Uprighted, loaded, and cleared in under 90 minutes. No secondary incidents.",
  },
  {
    id: 3,
    title: "Rocker Panel Rust Repair — 2015 Tacoma",
    category: "Body & Paint",
    description:
      "Driver-side rocker completely rotted through. Cut, patched with 16-gauge steel, seam-sealed, primed, and color-matched. Passed NH inspection same week.",
  },
  {
    id: 4,
    title: "Duramax Injector Replacement",
    category: "Mechanical",
    description:
      "Full set of injectors replaced on a 2008 LMM Duramax. Diagnosed with fuel pressure testing — injector #6 was dumping raw fuel. Runs clean now.",
  },
  {
    id: 5,
    title: "Ski-Doo Rev Clutch Rebuild",
    category: "Snowmobile & ATV",
    description:
      "Primary and secondary clutch disassembled, cleaned, new weights and spring. Belt alignment set. Trail-tested at 40 miles, no belt slip.",
  },
  {
    id: 6,
    title: "1985 Ford F-250 — Cab and Bed Restoration",
    category: "Restoration",
    description:
      "Cab removed from frame. Every rust spot cut and replaced. New bed floor welded in. Factory two-tone repaint. This truck will outlast its third owner.",
  },
  {
    id: 7,
    title: "Logging Road Recovery — Stuck Excavator",
    category: "Towing & Recovery",
    description:
      "Cat 308 sunk axle-deep in spring mud on a private logging road. Double-winched with deadman anchor. Equipment back on solid ground in 3 hours.",
  },
  {
    id: 8,
    title: "Quarter Panel Replacement — 2019 Ram 1500",
    category: "Body & Paint",
    description:
      "Deer strike damage. Full quarter panel cut and replaced, blended into adjacent panels. Color match verified in daylight and fluorescent. Insurance-approved repair.",
  },
  {
    id: 9,
    title: "Powerstroke Turbo Replacement",
    category: "Mechanical",
    description:
      "6.0L Powerstroke blowing blue smoke. Turbo shaft play confirmed. Replaced with upgraded turbo, new up-pipes, and exhaust back-pressure valve delete. Boost holds steady.",
  },
  {
    id: 10,
    title: "Polaris Sportsman — Full Engine Rebuild",
    category: "Snowmobile & ATV",
    description:
      "Top and bottom end rebuild on a 2016 Sportsman 570. New piston, rings, timing chain, water pump seal. Compression back to factory spec.",
  },
  {
    id: 11,
    title: "Headlight Restoration — Before & After",
    category: "Body & Paint",
    description:
      "Severely hazed and yellowed headlights wet-sanded through 4 grits, polished, and UV-sealed. Like-new clarity for $99. No replacement needed.",
  },
  {
    id: 12,
    title: "Winter Ditch Recovery — Lancaster",
    category: "Towing & Recovery",
    description:
      "Subaru Outback slid off Route 2 into a 4-foot snowbank. Pulled straight back with a snatch block redirect. No body damage. Driver was home for dinner.",
  },
  {
    id: 13,
    title: "Custom Bumper Fabrication — Jeep CJ-7",
    category: "Restoration",
    description:
      "Designed and fabricated a heavy-duty front bumper from 3/16\" plate steel. Integrated winch mount, D-ring tabs, and light bar mount. Powder-coated satin black.",
  },
  {
    id: 14,
    title: "Brake Line Replacement — Mobile Service",
    category: "Mechanical",
    description:
      "Rusted-through brake line on a 2012 Silverado — customer couldn't drive to a shop. Replaced all four lines on-site in the driveway. Bled, tested, road-ready same day.",
  },
  {
    id: 15,
    title: "Arctic Cat ZR — Track and Suspension",
    category: "Snowmobile & ATV",
    description:
      "New 137\" Camoplast track, fresh hyfax, rebuilt rear suspension with new shocks. Alignment set to factory spec. Ready for another 5,000 trail miles.",
  },
  {
    id: 16,
    title: "Flatbed Interstate Haul — NH to VT",
    category: "Towing & Recovery",
    description:
      "Long-distance flatbed transport of a non-running project truck from Colebrook, NH to St. Johnsbury, VT. Secured, strapped, delivered without a scratch. FMCSA licensed.",
  },
];

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* ── Page Header ── */}
      <section
        className="py-16 md:py-24"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.08), transparent 70%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeUp>
            <h1 className="hero-shimmer font-display text-display mb-6">
              Gallery
            </h1>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p
              className="mx-auto max-w-2xl text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Real jobs. Real results. Every photo is from work done by{" "}
              {siteConfig.name} — no stock images, no borrowed portfolios.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Category Filter ── */}
      <section className="py-8" style={{ background: "var(--bg-elevated)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <FadeUp delay={0.05}>
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 border"
                  style={{
                    background:
                      activeCategory === cat
                        ? "rgba(212,160,23,0.12)"
                        : "var(--bg-card)",
                    borderColor:
                      activeCategory === cat
                        ? "var(--accent)"
                        : "rgba(245,245,245,0.05)",
                    color:
                      activeCategory === cat
                        ? "var(--accent)"
                        : "var(--text-secondary)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Gallery Grid ── */}
      <section className="py-8 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <StaggerItem key={item.id}>
                <div
                  className="group overflow-hidden rounded-xl border transition-colors duration-300 hover:border-[rgba(212,160,23,0.2)]"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "rgba(245,245,245,0.05)",
                  }}
                >
                  {/* Placeholder image area */}
                  <div
                    className="relative aspect-[4/3] w-full overflow-hidden"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 50%, rgba(212,160,23,0.06), var(--bg-elevated))",
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl opacity-30">📷</span>
                    </div>
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, var(--bg-card) 0%, transparent 50%)",
                      }}
                    />
                  </div>

                  <div className="p-5">
                    <p
                      className="mb-2 text-xs font-medium uppercase tracking-[0.1em]"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--accent)",
                      }}
                    >
                      {item.category}
                    </p>
                    <h3
                      className="mb-2 text-base font-bold leading-tight"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filtered.length === 0 && (
            <p
              className="py-16 text-center text-lg"
              style={{ color: "var(--text-muted)" }}
            >
              No items in this category yet.
            </p>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-16 md:py-24"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(212,160,23,0.06), transparent 70%), var(--bg-elevated)",
        }}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <FadeUp>
            <p
              className="mb-2 text-xs font-medium uppercase tracking-[0.1em]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent)",
              }}
            >
              Your Project Could Be Next
            </p>
            <h2
              className="text-h2 mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
              }}
            >
              Ready to Get It Fixed?
            </h2>
            <p
              className="mb-8 text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Whether it&apos;s a full restoration, a rust repair, or just
              getting your truck out of a ditch — Zeek&apos;s got it from here.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/booking"
                className="inline-flex items-center rounded-lg px-8 py-4 text-lg font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,160,23,0.4)]"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-base)",
                }}
              >
                Book Your Free Estimate
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center rounded-lg border px-6 py-3 text-base font-semibold transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                style={{
                  borderColor: "var(--text-secondary)",
                  color: "var(--text-primary)",
                }}
              >
                Take the Quiz
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
