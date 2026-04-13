"use client";

import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import seededProducts from "@/lib/printful-seeded-products.json";

const featured = seededProducts.slice(0, 3);

export default function ShopTeaser() {
  return (
    <section
      className="py-20 md:py-28"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.06), transparent 70%), var(--bg-base)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <FadeUp>
          <div className="text-center mb-12">
            <p
              className="mb-3 text-xs font-medium uppercase tracking-[0.1em]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent)",
              }}
            >
              Merch
            </p>
            <h2
              className="text-h2 mb-3"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
              }}
            >
              Rep the Shop
            </h2>
            <p
              className="mx-auto max-w-xl text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Branded gear for the crew that keeps the North Country moving.
              Tees, hoodies, and hats — built tough, just like the shop.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-10">
          {featured.map((product) => (
            <StaggerItem key={product.id}>
              <Link href="/shop" className="group block">
                <div
                  className="overflow-hidden rounded-xl border transition-colors duration-300 group-hover:border-[rgba(212,160,23,0.2)]"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "rgba(245,245,245,0.05)",
                  }}
                >
                  {/* Placeholder image area */}
                  <div
                    className="relative aspect-square w-full overflow-hidden"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 50%, rgba(212,160,23,0.06), var(--bg-elevated))",
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl opacity-20">👕</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3
                      className="text-sm font-bold leading-tight mb-1"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-sm font-bold"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--accent)",
                      }}
                    >
                      ${product.price}
                    </p>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.15}>
          <div className="text-center">
            <Link
              href="/shop"
              className="inline-flex items-center rounded-lg border px-6 py-3 text-base font-semibold transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{
                borderColor: "var(--text-secondary)",
                color: "var(--text-primary)",
              }}
            >
              Browse All Gear &rarr;
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
