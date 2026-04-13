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
    <section
      className="min-h-screen pt-20"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Page header */}
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <p
          className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.15em]"
          style={{ color: "var(--accent)" }}
        >
          Official Merch
        </p>
        <h1
          className="font-[family-name:var(--font-barlow-condensed)] font-extrabold leading-none"
          style={{
            color: "var(--text-primary)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
          }}
        >
          Witt&apos;s Restoration Shop
        </h1>
        <p
          className="mt-3 max-w-2xl text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Rep the shop that answers at 2 AM. Branded gear built as tough as the
          trucks we pull.
        </p>
      </div>

      <ShopContent />
    </section>
  );
}
