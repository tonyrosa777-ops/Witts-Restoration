// Homepage — Witt's Restoration LLC
// Section rhythm: dark/light alternation per design-system.md Section 4
// Additional sections will be composed here by the frontend build agents

import Hero from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <>
      {/* Hero — dark (bg-base) — 3-layer animation stack */}
      <Hero />

      {/* Remaining homepage sections to be added by Stage 1E:
          - Pain Points (light)
          - About/Founder teaser (dark)
          - Services preview (light)
          - Stats row (dark)
          - Testimonials (light)
          - Quiz CTA (dark)
          - Blog preview (light)
          - Booking preview (dark)
          - Final CTA (dark)
      */}
    </>
  );
}
