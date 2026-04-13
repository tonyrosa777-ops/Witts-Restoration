// Hero.tsx — Server component (no "use client")
// Pattern: hero-server-client-animation-split.md
// All content from site.ts — SSR'd for SEO, no hardcoded strings
// Animation layers delegated to HeroEffects (client boundary)
// Layout: items-start, pt-24 md:pt-40, min-h-[100svh] (per Error #25)

import { siteConfig, hero, CTA } from "@/data/site";
import HeroEffects from "./HeroEffects";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-start overflow-hidden">
      <HeroEffects
        eyebrow={hero.eyebrow}
        tagline={siteConfig.tagline}
        subheadline={hero.subheadline}
        ctaPrimaryLabel={hero.ctaPrimary.label}
        ctaPrimaryHref={hero.ctaPrimary.href}
        ctaSecondaryLabel={hero.ctaSecondary.label}
        ctaSecondaryHref={hero.ctaSecondary.href}
        trustMicro={hero.trustMicro}
      />
    </section>
  );
}
