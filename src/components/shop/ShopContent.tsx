"use client";

import { useEffect, useState, useMemo } from "react";
import { useCart } from "@/lib/cart";

/* ── Types ───────────────────────────────────────────────── */

interface Variant {
  id: string;
  size: string;
  color: string;
  inStock: boolean;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  variants: Variant[];
}

type CategoryFilter = "All" | "Apparel" | "Accessories";

const CATEGORIES: CategoryFilter[] = ["All", "Apparel", "Accessories"];

/* ── Component ───────────────────────────────────────────── */

export default function ShopContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const { addItem } = useCart();

  /* Fetch products — API first, seeded fallback */
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/printful/products");
        if (!res.ok) throw new Error("API error");
        const data = (await res.json()) as Product[];
        if (!cancelled) setProducts(data);
      } catch {
        /* Fallback to seeded data */
        try {
          const seeded = await import("@/lib/printful-seeded-products.json");
          if (!cancelled) setProducts(seeded.default as Product[]);
        } catch {
          /* Absolute fallback — empty */
          if (!cancelled) setProducts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  /* Initialize default variant selections */
  useEffect(() => {
    const defaults: Record<string, string> = {};
    for (const p of products) {
      if (p.variants.length > 0 && !selectedVariants[p.id]) {
        defaults[p.id] = p.variants[0].id;
      }
    }
    if (Object.keys(defaults).length > 0) {
      setSelectedVariants((prev) => ({ ...defaults, ...prev }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? products
        : products.filter((p) => p.category === activeCategory),
    [products, activeCategory],
  );

  /* Get unique sizes and colors for a product */
  function getUniqueSizes(product: Product): string[] {
    return [...new Set(product.variants.map((v) => v.size))];
  }

  function getUniqueColors(product: Product): string[] {
    return [...new Set(product.variants.map((v) => v.color))];
  }

  function getSelectedVariant(product: Product): Variant | undefined {
    return product.variants.find((v) => v.id === selectedVariants[product.id]);
  }

  function selectVariantByAttributes(
    product: Product,
    size?: string,
    color?: string,
  ) {
    const current = getSelectedVariant(product);
    const targetSize = size ?? current?.size ?? product.variants[0]?.size;
    const targetColor = color ?? current?.color ?? product.variants[0]?.color;

    const match = product.variants.find(
      (v) => v.size === targetSize && v.color === targetColor,
    );
    if (match) {
      setSelectedVariants((prev) => ({ ...prev, [product.id]: match.id }));
    }
  }

  function handleAddToCart(product: Product) {
    const variant = getSelectedVariant(product);
    if (!variant) return;

    addItem({
      productId: product.id,
      variantId: variant.id,
      name: product.name,
      price: product.price,
      size: variant.size,
      color: variant.color,
      imageUrl: product.imageUrl,
    });
  }

  /* ── Loading skeleton ─────────────────────────────────── */
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl p-4"
              style={{ background: "var(--bg-card)" }}
            >
              <div
                className="mb-4 h-48 rounded-lg"
                style={{ background: "var(--bg-base)" }}
              />
              <div
                className="mb-2 h-5 w-3/4 rounded"
                style={{ background: "var(--bg-elevated)" }}
              />
              <div
                className="mb-4 h-4 w-1/2 rounded"
                style={{ background: "var(--bg-elevated)" }}
              />
              <div
                className="h-10 rounded-lg"
                style={{ background: "var(--bg-elevated)" }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Category filter tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-200"
            style={{
              background:
                activeCategory === cat ? "var(--accent)" : "var(--bg-card)",
              color:
                activeCategory === cat
                  ? "var(--bg-base)"
                  : "var(--text-secondary)",
              boxShadow:
                activeCategory === cat
                  ? "0 0 16px rgba(212,160,23,0.25)"
                  : "none",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => {
          const variant = getSelectedVariant(product);
          const sizes = getUniqueSizes(product);
          const colors = getUniqueColors(product);

          return (
            <div
              key={product.id}
              className="group flex flex-col rounded-xl transition-all duration-300"
              style={{
                background: "var(--bg-card)",
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(212,160,23,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "transparent";
              }}
            >
              {/* Image placeholder */}
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-t-xl"
                style={{ background: "var(--bg-base)" }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = "none";
                    /* Show fallback text */
                    const parent = img.parentElement;
                    if (parent && !parent.querySelector(".placeholder-text")) {
                      const span = document.createElement("span");
                      span.className =
                        "placeholder-text absolute inset-0 flex items-center justify-center text-4xl";
                      span.textContent = product.category === "Apparel" ? "👕" : "🧢";
                      parent.appendChild(span);
                    }
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                {/* Category tag */}
                <span
                  className="mb-2 inline-block w-fit rounded-md px-2 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-[0.65rem] uppercase tracking-widest"
                  style={{
                    background: "rgba(212,160,23,0.1)",
                    color: "var(--accent)",
                  }}
                >
                  {product.category}
                </span>

                <h3
                  className="mb-1 font-[family-name:var(--font-barlow-condensed)] text-lg font-bold leading-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {product.name}
                </h3>

                <p
                  className="mb-4 line-clamp-2 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {product.description}
                </p>

                {/* Variant pickers */}
                <div className="mb-4 flex flex-col gap-3">
                  {/* Size picker */}
                  {sizes.length > 1 && (
                    <div>
                      <label
                        className="mb-1 block text-xs font-medium"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Size
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {sizes.map((s) => (
                          <button
                            key={s}
                            onClick={() =>
                              selectVariantByAttributes(product, s, undefined)
                            }
                            className="rounded-md px-2.5 py-1 text-xs font-medium transition-all"
                            style={{
                              background:
                                variant?.size === s
                                  ? "var(--accent)"
                                  : "var(--bg-elevated)",
                              color:
                                variant?.size === s
                                  ? "var(--bg-base)"
                                  : "var(--text-secondary)",
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Color picker */}
                  {colors.length > 1 && (
                    <div>
                      <label
                        className="mb-1 block text-xs font-medium"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Color
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {colors.map((c) => (
                          <button
                            key={c}
                            onClick={() =>
                              selectVariantByAttributes(product, undefined, c)
                            }
                            className="rounded-md px-2.5 py-1 text-xs font-medium transition-all"
                            style={{
                              background:
                                variant?.color === c
                                  ? "var(--accent)"
                                  : "var(--bg-elevated)",
                              color:
                                variant?.color === c
                                  ? "var(--bg-base)"
                                  : "var(--text-secondary)",
                            }}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Price + Add to Cart */}
                <div className="mt-auto flex items-center justify-between gap-3">
                  <span
                    className="font-[family-name:var(--font-jetbrains-mono)] text-xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    ${product.price.toFixed(2)}
                  </span>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="rounded-lg px-5 py-2.5 text-sm font-bold transition-all duration-200 hover:brightness-110"
                    style={{
                      background: "var(--accent)",
                      color: "var(--bg-base)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 20px rgba(212,160,23,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state for filtered results */}
      {filtered.length === 0 && !loading && (
        <div className="py-20 text-center">
          <span className="mb-4 block text-5xl">🏪</span>
          <p
            className="text-lg font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            No products in this category yet.
          </p>
          <button
            onClick={() => setActiveCategory("All")}
            className="mt-4 text-sm font-semibold transition-colors"
            style={{ color: "var(--accent)" }}
          >
            View all products
          </button>
        </div>
      )}
    </div>
  );
}
