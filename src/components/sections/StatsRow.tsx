"use client";

import { stats } from "@/data/site";
import CountUp from "@/components/animations/CountUp";
import FadeUp from "@/components/animations/FadeUp";

export default function StatsRow() {
  return (
    <section
      className="py-16 md:py-24"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.06), transparent 70%), var(--bg-base)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <FadeUp>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="mb-2 block text-3xl">{stat.emoji}</span>
                <div
                  className="text-4xl font-extrabold md:text-5xl"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--accent)",
                  }}
                >
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p
                  className="mt-2 text-sm font-medium"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
