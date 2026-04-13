// Homepage — Witt's Restoration LLC
//
// ═══════════════════════════════════════════════
// SECTION RHYTHM MAP (dark/light alternation)
// Per design-system.md Section 4 + CLAUDE.md Section Alternation Rule
// No two adjacent sections share the same background.
// ═══════════════════════════════════════════════
//  1. Hero              — dark  (bg-base)
//  2. PainPoints        — light (bg-elevated)
//  3. AboutTeaser       — dark  (bg-base + radial gradient)
//  4. ServicesPreview   — light (bg-elevated)
//  5. StatsRow          — dark  (bg-base + radial gradient)
//  6. Testimonials      — light (bg-elevated)
//  7. QuizCTA           — dark  (bg-base + radial gradient)
//  8. BlogPreview       — light (bg-elevated)
//  9. ShopTeaser        — dark  (bg-base + radial gradient)
// 10. BookingPreview    — light (bg-elevated)
// 11. FinalCTA          — dark  (bg-base + radial gradient)
// ═══════════════════════════════════════════════

import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";
import AboutTeaser from "@/components/sections/AboutTeaser";
import ServicesPreview from "@/components/sections/ServicesPreview";
import StatsRow from "@/components/sections/StatsRow";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import QuizCTA from "@/components/sections/QuizCTA";
import BlogPreview from "@/components/sections/BlogPreview";
import ShopTeaser from "@/components/sections/ShopTeaser";
import BookingPreview from "@/components/sections/BookingPreview";
import FinalCTA from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — dark (bg-base) — 3-layer animation stack */}
      <Hero />

      {/* 2. Pain Points — light (bg-elevated) */}
      <PainPoints />

      {/* 3. About/Founder teaser — dark (bg-base + radial gradient) */}
      <AboutTeaser />

      {/* 4. Services preview — light (bg-elevated) */}
      <ServicesPreview />

      {/* 5. Stats row — dark (bg-base + radial gradient) */}
      <StatsRow />

      {/* 6. Testimonials — light (bg-elevated) */}
      <TestimonialsSection />

      {/* 7. Quiz CTA — dark (bg-base + radial gradient) */}
      <QuizCTA />

      {/* 8. Blog preview — light (bg-elevated) */}
      <BlogPreview />

      {/* 9. Shop teaser — dark (bg-base + radial gradient) */}
      <ShopTeaser />

      {/* 10. Booking preview — light (bg-elevated) */}
      <BookingPreview />

      {/* 11. Final CTA — dark (bg-base + radial gradient) */}
      <FinalCTA />
    </>
  );
}
