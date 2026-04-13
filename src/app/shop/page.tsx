import type { Metadata } from "next";
import ShopContent from "@/components/shop/ShopContent";


export const metadata: Metadata = {
  title: "Shop — Witt's Restoration Merch",
  description:
    "Grab branded Witt's Restoration gear — tees, hoodies, hats, stickers, mugs, and more. Rep the North Country's toughest shop.",
  openGraph: {
    title: "Shop — Witt's Restoration Merch",
    description:
      "Branded merch from Witt's Restoration LLC. Tees, hoodies, hats, stickers, and more.",
  },
};

export default function ShopPage() {
  return (
    <>
      {/* Page Header */}
      <section
        className="py-16 md:py-24"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.08), transparent 70%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="hero-shimmer font-display text-display mb-6">
            Shop
          </h1>
          <p
            className="mx-auto max-w-2xl text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Rep the shop that answers at 2 AM. Branded gear built as tough as
            the trucks we pull.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: "var(--bg-elevated)" }}>
        <ShopContent />
      </section>
    </>
  );
}
