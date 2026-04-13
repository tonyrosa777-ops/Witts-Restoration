"use client";
// HeroEffects — Client component wrapper for all hero animation layers
// Pattern: hero-server-client-animation-split.md
// Keeps "use client" boundary tight — Hero.tsx stays a server component
//
// Layer 1: HeroParticles (canvas stars + embers + glimmers)
// Layer 2: WittsCanvas (headlight beams in snow)
// Layer 3: Framer Motion stagger text (handled inline in Hero.tsx via this wrapper)

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import HeroParticles from "@/components/animations/HeroParticles";
import WittsCanvas from "@/components/animations/WittsCanvas";

// Stagger animation variants — consistent with animation-specialist spec
const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
});

const fadeCTA = (delay: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
});

interface HeroEffectsProps {
  eyebrow: string;
  tagline: string;
  subheadline: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  trustMicro: string[];
}

export default function HeroEffects({
  eyebrow,
  tagline,
  subheadline,
  ctaPrimaryLabel,
  ctaPrimaryHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
  trustMicro,
}: HeroEffectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <>
      {/* Layer 1 — Canvas particle system (z-0) */}
      <HeroParticles />

      {/* Layer 2 — Brand canvas animation (z-5) */}
      <WittsCanvas />

      {/* Layer 3 — Framer Motion stagger text (z-10) */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-24 pb-20 md:pt-40 md:pb-32"
      >
        <motion.p
          className="text-eyebrow font-mono text-[var(--text-muted)] mb-4"
          variants={fadeUp(0)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          className="text-display font-display hero-shimmer mb-6"
          style={{ color: "var(--text-primary)" }}
          variants={fadeUp(0)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {tagline}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl max-w-2xl mb-8"
          style={{ color: "var(--text-secondary)" }}
          variants={fadeUp(0.15)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {subheadline}
        </motion.p>

        {/* CTA pair */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <motion.a
            href={ctaPrimaryHref}
            className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-bold transition-all duration-300"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--bg-base)",
            }}
            variants={fadeCTA(0.3)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{
              boxShadow: "0 0 20px rgba(212,160,23,0.4)",
            }}
          >
            {ctaPrimaryLabel}
          </motion.a>

          <motion.a
            href={ctaSecondaryHref}
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold border transition-all duration-300"
            style={{
              borderColor: "var(--text-secondary)",
              color: "var(--text-primary)",
            }}
            variants={fadeCTA(0.4)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {ctaSecondaryLabel}
          </motion.a>
        </div>

        {/* Trust micro-badges */}
        <motion.div
          className="flex flex-wrap gap-4 text-sm"
          style={{ color: "var(--text-muted)" }}
          variants={fadeUp(0.5)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {trustMicro.map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </>
  );
}
