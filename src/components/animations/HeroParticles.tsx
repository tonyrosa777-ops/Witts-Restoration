"use client";
// Layer 1 — Canvas Particle System: Stars + Embers + Glimmers
// Adapted from Placed-Right-Fence HeroParticles.tsx
// Colors: gold (--accent #D4A017) on dark bg (--bg-base #0A0A0A)
// Mobile: 50% particle reduction per animation-specialist spec
// Cleanup: cancelAnimationFrame + ResizeObserver disconnect

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  targetOpacity: number;
  size: number;
  type: "star" | "ember";
  life: number;
  maxLife: number;
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animId: number;
    const particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Mobile detection — 50% particle reduction
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 70 : 145;
    const emberCount = isMobile ? 28 : 58;

    const W = canvas.width || window.innerWidth;
    const H = canvas.height || window.innerHeight;

    // Stars: slow drift + twinkle
    for (let i = 0; i < starCount; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        opacity: Math.random() * 0.4 + 0.05,
        targetOpacity: Math.random() * 0.4 + 0.05,
        size: Math.random() * 1.2 + 0.4,
        type: "star",
        life: 0,
        maxLife: Infinity,
      });
    }

    // Embers: rise upward, fade out
    function makeEmber(w: number, h: number): Particle {
      return {
        x: Math.random() * w,
        y: h + Math.random() * h * 0.3,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.45 + 0.2),
        opacity: 0,
        targetOpacity: Math.random() * 0.65 + 0.2,
        size: Math.random() * 1.8 + 0.8,
        type: "ember",
        life: 0,
        maxLife: Math.random() * 220 + 140,
      };
    }

    for (let i = 0; i < emberCount; i++) {
      const e = makeEmber(W, H);
      e.y = Math.random() * H;
      e.life = Math.random() * e.maxLife;
      particles.push(e);
    }

    // Glimmer state
    const glimmers: {
      x: number;
      y: number;
      size: number;
      opacity: number;
      age: number;
    }[] = [];

    function tick() {
      if (!canvas || !ctx) return;
      const cW = canvas.width;
      const cH = canvas.height;
      ctx.clearRect(0, 0, cW, cH);

      for (const p of particles) {
        if (p.type === "star") {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = cW;
          if (p.x > cW) p.x = 0;
          if (p.y < 0) p.y = cH;
          if (p.y > cH) p.y = 0;

          // Twinkle toward target
          p.opacity += (p.targetOpacity - p.opacity) * 0.018;
          if (Math.abs(p.opacity - p.targetOpacity) < 0.008) {
            p.targetOpacity = Math.random() * 0.38 + 0.04;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          // Gold-tinted stars: rgba(201, 168, 76) matches --accent warmth
          ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`;
          ctx.fill();
        } else if (p.type === "ember") {
          p.life += 1;
          p.x += p.vx;
          p.y += p.vy;
          p.vx += (Math.random() - 0.5) * 0.015;

          const progress = p.life / p.maxLife;
          if (progress < 0.2) {
            p.opacity = (progress / 0.2) * p.targetOpacity;
          } else if (progress < 0.7) {
            p.opacity = p.targetOpacity;
          } else {
            p.opacity = p.targetOpacity * (1 - (progress - 0.7) / 0.3);
          }

          if (p.life >= p.maxLife) {
            Object.assign(p, makeEmber(cW, cH));
          }

          if (p.opacity > 0.02) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 160, 23, ${p.opacity})`;
            ctx.fill();
          }
        }
      }

      // Spawn occasional glimmer
      if (Math.random() < 0.004) {
        glimmers.push({
          x: Math.random() * cW,
          y: Math.random() * cH,
          size: Math.random() * 5 + 3,
          opacity: 1,
          age: 0,
        });
      }

      // Draw + age glimmers — 4-point star burst
      for (let i = glimmers.length - 1; i >= 0; i--) {
        const g = glimmers[i];
        g.age += 1;
        g.opacity = Math.max(0, 1 - g.age / 28);

        if (g.opacity <= 0) {
          glimmers.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(g.x, g.y);
        ctx.globalAlpha = g.opacity * 0.7;
        for (let a = 0; a < 4; a++) {
          ctx.rotate(Math.PI / 4);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, g.size);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
