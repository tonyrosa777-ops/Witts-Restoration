"use client";
// Layer 2 — WittsCanvas: Headlight Beams in Snow
//
// Two converging headlight beams cut through falling gold snow particles
// on the dark canvas. Evokes the nighttime snowstorm tow truck photo mood
// (design-system.md Section 6) and the 24/7 emergency towing identity.
//
// Brand axes: Raw(70%) = weather/conditions, not polished geometry
//             Urgent(30%) = forward-pointing beams = "on my way"
//             Intimate(25%) = single truck, personal rescue
//
// 5-phase lifecycle (per Pattern #28):
//   STREAM — snow particles spawn at top, drift down through beam cones
//   RISE   — beam cones expand with springOut easing from center point
//   COOL   — beams transition from white-hot to warm gold
//   ARC    — light halos pulse outward from beam origins
//   IDLE   — gentle breathing on beam intensity + continuous snowfall
//
// Mobile: 50% snow particle reduction, getLayout breakpoint function
// Cleanup: cancelAnimationFrame + ResizeObserver disconnect

import { useEffect, useRef } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface SnowParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  inBeam: boolean; // brightens when inside a beam cone
}

interface BeamHalo {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  born: number;
}

type Phase = "stream" | "rise" | "cool" | "arc" | "idle";

// ─── Spring easing (Pattern #28) ────────────────────────────────────────────

function springOut(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return 1 - Math.pow(2, -9 * t) * Math.cos(t * 10 * Math.PI * 0.68);
}

// ─── Heat color interpolation ───────────────────────────────────────────────

function heatRGB(t: number): [number, number, number] {
  // white-hot → warm gold → settled gold
  const c = Math.max(0, Math.min(1, t));
  const r = Math.round(255 - (255 - 212) * c);
  const g = Math.round(255 - (255 - 160) * c);
  const b = Math.round(255 - (255 - 23) * c);
  return [r, g, b];
}

// ─── Layout breakpoints (Pattern #6) ────────────────────────────────────────

interface Layout {
  snowCount: number;
  beamOriginLX: number;
  beamOriginRX: number;
  beamOriginY: number;
  beamSpread: number;
  beamLength: number;
  isMobile: boolean;
}

function getLayout(W: number, H: number): Layout {
  if (W < 640) {
    // Mobile — fewer particles, beams positioned for portrait orientation
    return {
      snowCount: 60,
      beamOriginLX: W * 0.28,
      beamOriginRX: W * 0.72,
      beamOriginY: Math.min(H * 0.82, 680),
      beamSpread: W * 0.45,
      beamLength: H * 0.65,
      isMobile: true,
    };
  }
  if (W < 1024) {
    // Tablet
    return {
      snowCount: 90,
      beamOriginLX: W * 0.58,
      beamOriginRX: W * 0.78,
      beamOriginY: H * 0.78,
      beamSpread: W * 0.35,
      beamLength: H * 0.7,
      isMobile: false,
    };
  }
  // Desktop — beams on the right half to leave text area clear
  return {
    snowCount: 120,
    beamOriginLX: W * 0.58,
    beamOriginRX: W * 0.78,
    beamOriginY: H * 0.78,
    beamSpread: W * 0.3,
    beamLength: H * 0.72,
    isMobile: false,
  };
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function WittsCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // ── State ─────────────────────────────────────────────────────────────
    let raf: number;
    let t0: number | null = null;
    let snow: SnowParticle[] = [];
    let halos: BeamHalo[] = [];
    let phase: Phase = "stream";
    let layout: Layout = getLayout(800, 600);

    // ── Timing ────────────────────────────────────────────────────────────
    const STREAM_DUR = 800;
    const RISE_DUR = 600;
    const COOL_DUR = 1400;
    const ARC_DUR = 600;

    // ── Build snow field ──────────────────────────────────────────────────
    function buildSnow(lout: Layout, W: number, H: number) {
      snow = [];
      for (let i = 0; i < lout.snowCount; i++) {
        snow.push(makeSnow(W, H, true));
      }
    }

    function makeSnow(W: number, H: number, scatter: boolean): SnowParticle {
      return {
        x: Math.random() * W,
        y: scatter ? Math.random() * H : -Math.random() * 40,
        vx: (Math.random() - 0.5) * 0.4 - 0.15, // slight leftward wind
        vy: Math.random() * 0.8 + 0.3,
        size: Math.random() * 2.2 + 0.6,
        opacity: Math.random() * 0.5 + 0.15,
        inBeam: false,
      };
    }

    // ── Check if point is inside a beam cone ──────────────────────────────
    function isInBeam(
      px: number,
      py: number,
      beamX: number,
      beamY: number,
      spread: number,
      length: number,
      beamExpand: number
    ): boolean {
      const dy = beamY - py;
      if (dy < 0 || dy > length) return false;
      const progress = dy / length;
      const halfWidth = progress * spread * 0.5 * beamExpand;
      return Math.abs(px - beamX) < halfWidth;
    }

    // ── Resize ────────────────────────────────────────────────────────────
    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      layout = getLayout(canvas.width, canvas.height);
      buildSnow(layout, canvas.width, canvas.height);
      t0 = null;
      phase = "stream";
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // ── Draw beam cone ────────────────────────────────────────────────────
    function drawBeam(
      originX: number,
      originY: number,
      spread: number,
      length: number,
      expand: number,
      beamColor: [number, number, number],
      beamAlpha: number
    ) {
      const topY = originY - length * expand;
      const halfSpread = spread * 0.5 * expand;

      // Beam gradient — bright at origin, fading upward
      const grad = ctx.createLinearGradient(originX, originY, originX, topY);
      grad.addColorStop(
        0,
        `rgba(${beamColor[0]},${beamColor[1]},${beamColor[2]},${(beamAlpha * 0.22).toFixed(3)})`
      );
      grad.addColorStop(
        0.3,
        `rgba(${beamColor[0]},${beamColor[1]},${beamColor[2]},${(beamAlpha * 0.12).toFixed(3)})`
      );
      grad.addColorStop(
        1,
        `rgba(${beamColor[0]},${beamColor[1]},${beamColor[2]},0)`
      );

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(originX - 4, originY);
      ctx.lineTo(originX - halfSpread, topY);
      ctx.lineTo(originX + halfSpread, topY);
      ctx.lineTo(originX + 4, originY);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Soft glow at origin point
      const glow = ctx.createRadialGradient(
        originX,
        originY,
        0,
        originX,
        originY,
        30
      );
      glow.addColorStop(
        0,
        `rgba(${beamColor[0]},${beamColor[1]},${beamColor[2]},${(beamAlpha * 0.35).toFixed(3)})`
      );
      glow.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(originX, originY, 30, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
      ctx.restore();
    }

    // ── Main tick ─────────────────────────────────────────────────────────
    function tick(now: number) {
      if (!canvas || !ctx) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (t0 === null) t0 = now;
      const elapsed = now - t0;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // ── Phase transitions ───────────────────────────────────────────────
      if (phase === "stream" && elapsed >= STREAM_DUR) phase = "rise";
      if (phase === "rise" && elapsed >= STREAM_DUR + RISE_DUR) phase = "cool";
      if (phase === "cool" && elapsed >= STREAM_DUR + RISE_DUR + COOL_DUR)
        phase = "arc";
      if (
        phase === "arc" &&
        elapsed >= STREAM_DUR + RISE_DUR + COOL_DUR + ARC_DUR
      )
        phase = "idle";

      // ── Beam expansion (RISE phase) ─────────────────────────────────────
      let beamExpand = 0;
      if (phase === "stream") {
        beamExpand = 0.15 + (elapsed / STREAM_DUR) * 0.15; // subtle glow during stream
      } else if (phase === "rise") {
        const rt = (elapsed - STREAM_DUR) / RISE_DUR;
        beamExpand = 0.3 + springOut(rt) * 0.7;
      } else {
        beamExpand = 1;
      }

      // ── Beam color (COOL phase) ─────────────────────────────────────────
      let coolingT = 0;
      if (phase === "cool") {
        coolingT = (elapsed - STREAM_DUR - RISE_DUR) / COOL_DUR;
      } else if (phase === "arc" || phase === "idle") {
        coolingT = 1;
      }
      const beamColor = heatRGB(coolingT);

      // ── Idle breathing ──────────────────────────────────────────────────
      let breathe = 1;
      if (phase === "idle") {
        breathe = 0.85 + Math.sin(elapsed * 0.0008) * 0.15;
      }

      const beamAlpha = beamExpand * breathe;

      // ── Draw beams ──────────────────────────────────────────────────────
      drawBeam(
        layout.beamOriginLX,
        layout.beamOriginY,
        layout.beamSpread,
        layout.beamLength,
        beamExpand,
        beamColor,
        beamAlpha
      );
      drawBeam(
        layout.beamOriginRX,
        layout.beamOriginY,
        layout.beamSpread,
        layout.beamLength,
        beamExpand,
        beamColor,
        beamAlpha
      );

      // ── ARC phase — emit halos ──────────────────────────────────────────
      if (phase === "arc" && halos.length < 4) {
        const arcElapsed = elapsed - STREAM_DUR - RISE_DUR - COOL_DUR;
        if (arcElapsed < 200 || (arcElapsed > 300 && halos.length < 4)) {
          halos.push({
            x: layout.beamOriginLX,
            y: layout.beamOriginY,
            radius: 5,
            maxRadius: 80,
            opacity: 0.5,
            born: now,
          });
          halos.push({
            x: layout.beamOriginRX,
            y: layout.beamOriginY,
            radius: 5,
            maxRadius: 80,
            opacity: 0.5,
            born: now,
          });
        }
      }

      // ── Draw + update halos ─────────────────────────────────────────────
      for (let i = halos.length - 1; i >= 0; i--) {
        const h = halos[i];
        const age = (now - h.born) / 800;
        if (age >= 1) {
          halos.splice(i, 1);
          continue;
        }
        h.radius = 5 + (h.maxRadius - 5) * age;
        h.opacity = 0.5 * (1 - age);

        ctx.save();
        ctx.beginPath();
        ctx.arc(h.x, h.y, h.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212, 160, 23, ${h.opacity.toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // ── Update + draw snow particles ────────────────────────────────────
      for (const p of snow) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.y > H + 10) {
          Object.assign(p, makeSnow(W, H, false));
        }
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;

        // Check if inside either beam — brighten if so
        p.inBeam =
          isInBeam(
            p.x,
            p.y,
            layout.beamOriginLX,
            layout.beamOriginY,
            layout.beamSpread,
            layout.beamLength,
            beamExpand
          ) ||
          isInBeam(
            p.x,
            p.y,
            layout.beamOriginRX,
            layout.beamOriginY,
            layout.beamSpread,
            layout.beamLength,
            beamExpand
          );

        const alpha = p.inBeam
          ? Math.min(1, p.opacity * 2.5) * beamAlpha
          : p.opacity * 0.4;
        const particleSize = p.inBeam ? p.size * 1.3 : p.size;

        if (alpha < 0.02) continue;

        ctx.beginPath();
        ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);

        if (p.inBeam) {
          // Bright gold in beam
          ctx.fillStyle = `rgba(212, 160, 23, ${alpha.toFixed(3)})`;
        } else {
          // Muted white outside beam
          ctx.fillStyle = `rgba(200, 200, 210, ${alpha.toFixed(3)})`;
        }
        ctx.fill();

        // Soft halo on in-beam particles
        if (p.inBeam && alpha > 0.15) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, particleSize * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 160, 23, ${(alpha * 0.12).toFixed(3)})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
      aria-hidden="true"
    />
  );
}
