"use client";
// Rising Gold Ash — full-viewport ambient particle canvas
// ~40 particles drift upward and fade, gold-tinted on dark backgrounds
// Mobile: reduced count, respects prefers-reduced-motion

import { useEffect, useRef } from "react";

interface Ash {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export default function RisingAsh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animId: number;
    const particles: Ash[] = [];
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 18 : 40;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    function spawn(): Ash {
      const w = canvas?.width || window.innerWidth;
      const h = canvas?.height || window.innerHeight;
      return {
        x: Math.random() * w,
        y: h + Math.random() * 20,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(0.3 + Math.random() * 0.5),
        size: 1.5 + Math.random() * 2,
        opacity: 0,
        life: 0,
        maxLife: 200 + Math.random() * 300,
      };
    }

    // Seed initial particles spread across the viewport
    for (let i = 0; i < COUNT; i++) {
      const p = spawn();
      p.y = Math.random() * (canvas.height || window.innerHeight);
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    function draw() {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Fade in first 20%, fade out last 30%
        const progress = p.life / p.maxLife;
        if (progress < 0.2) {
          p.opacity = progress / 0.2;
        } else if (progress > 0.7) {
          p.opacity = (1 - progress) / 0.3;
        } else {
          p.opacity = 1;
        }

        // Recycle dead particles
        if (p.life >= p.maxLife || p.y < -10) {
          particles[i] = spawn();
          continue;
        }

        // Draw ash particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 160, 23, ${p.opacity * 0.35})`;
        ctx.fill();

        // Subtle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 160, 23, ${p.opacity * 0.08})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%" }}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
