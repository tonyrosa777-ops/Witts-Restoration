"use client";

import { painPoints } from "@/data/site";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import ScaleIn from "@/components/animations/ScaleIn";

export default function PainPoints() {
  return (
    <section
      className="py-16 md:py-24"
      style={{ background: "var(--bg-elevated)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ScaleIn>
          <h2
            className="text-h2 mb-4 text-center"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            {painPoints.length} Problems. One Phone Call.
          </h2>
          <p
            className="mx-auto mb-12 max-w-2xl text-center text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Sound familiar? You're not alone. These are the calls Zeek gets
            every week.
          </p>
        </ScaleIn>

        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {painPoints.map((point) => (
            <StaggerItem key={point.title}>
              <div
                className="h-full rounded-xl border p-6 transition-colors duration-300 hover:border-[rgba(212,160,23,0.2)]"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "rgba(245,245,245,0.05)",
                }}
              >
                <span className="mb-3 block text-4xl">{point.emoji}</span>
                <h3
                  className="mb-2 text-lg font-semibold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-primary)",
                  }}
                >
                  {point.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {point.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
