// Homepage — Witt's Restoration LLC
// Section rhythm: dark/light alternation per design-system.md Section 4
// Sections will be composed here by the frontend build agents

import { siteConfig, hero } from "@/data/site";

export default function HomePage() {
  return (
    <>
      {/* Hero — dark (bg-base) */}
      <section
        className="relative min-h-screen flex items-start pt-24 md:pt-40"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p
            className="text-eyebrow mb-4"
            style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
          >
            {hero.eyebrow}
          </p>
          <h1
            className="hero-shimmer text-display max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {siteConfig.tagline}
          </h1>
          <p
            className="mt-6 text-xl max-w-2xl leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {hero.subheadline}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+18027515786"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-lg font-bold transition-all hover:shadow-lg"
              style={{
                background: "var(--accent)",
                color: "var(--bg-base)",
              }}
            >
              📞 {hero.ctaPrimary}
            </a>
            <a
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-base font-semibold border transition-all"
              style={{
                borderColor: "var(--text-secondary)",
                color: "var(--text-primary)",
              }}
            >
              {hero.ctaSecondary}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-6">
            {hero.trustMicro.map((item, i) => (
              <span
                key={i}
                className="text-sm"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
