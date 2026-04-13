"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";

import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";

interface Article {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image?: string;
}

interface Props {
  articles: Article[];
  cta: { quiz: string; booking: string };
}

export default function BlogIndexClient({ articles, cta }: Props) {
  const featured = articles[0];
  const rest = articles.slice(1);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(rest.map((a) => a.category));
    return Array.from(cats).sort();
  }, [rest]);

  const filtered = useMemo(() => {
    if (!categoryFilter) return rest;
    return rest.filter((a) => a.category === categoryFilter);
  }, [rest, categoryFilter]);

  return (
    <>
      {/* ── Page Header ── */}
      <section
        className="py-16 md:py-24"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.08), transparent 70%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeUp>
            <h1 className="hero-shimmer font-display text-display mb-6">
              Blog
            </h1>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p
              className="mx-auto max-w-2xl text-lg md:text-xl leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Local knowledge for North Country drivers. Honest answers about
              towing costs, rust repair, snowmobile maintenance, and vehicle
              recovery in northern NH.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Featured Post (horizontal card) ── */}
      <section className="py-8 md:py-12" style={{ background: "var(--bg-elevated)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeUp>
            <Link
              href={`/blog/${featured.slug}`}
              className="group block"
            >
              <div
                className="overflow-hidden rounded-xl border transition-colors duration-300 group-hover:border-[rgba(212,160,23,0.2)] md:grid md:grid-cols-2"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "rgba(245,245,245,0.05)",
                }}
              >
                {featured.image && (
                  <div className="relative aspect-[16/9] md:aspect-auto overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 600px"
                      priority
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <p
                    className="mb-3 text-xs font-medium uppercase tracking-[0.1em]"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--accent)",
                    }}
                  >
                    Featured &middot; {featured.category}
                  </p>
                  <h2
                    className="mb-4 text-xl font-bold leading-tight md:text-2xl"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    className="mb-6 text-base leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {featured.excerpt}
                  </p>
                  <span
                    className="inline-flex text-sm font-semibold transition-colors group-hover:text-[var(--accent)]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Read More &rarr;
                  </span>
                </div>
              </div>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── Category Filter + Article Grid ── */}
      <section className="py-8 md:py-12 pb-16 md:pb-24" style={{ background: "var(--bg-elevated)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Category Filter */}
          <FadeUp>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              <button
                onClick={() => setCategoryFilter(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
                style={{
                  background: categoryFilter === null ? "var(--accent)" : "var(--bg-card)",
                  color: categoryFilter === null ? "var(--bg-base)" : "var(--text-secondary)",
                  fontFamily: "var(--font-body)",
                }}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    background: categoryFilter === cat ? "var(--accent)" : "var(--bg-card)",
                    color: categoryFilter === cat ? "var(--bg-base)" : "var(--text-secondary)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeUp>

          {/* Article Grid */}
          <StaggerContainer
            key={categoryFilter || "all"}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((article) => (
              <StaggerItem key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="group block h-full"
                >
                  <div
                    className="flex h-full flex-col overflow-hidden rounded-xl border transition-colors duration-300 group-hover:border-[rgba(212,160,23,0.2)]"
                    style={{
                      background: "var(--bg-card)",
                      borderColor: "rgba(245,245,245,0.05)",
                    }}
                  >
                    {article.image && (
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, var(--bg-card) 0%, transparent 50%)",
                          }}
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <p
                        className="mb-2 text-xs font-medium uppercase tracking-[0.1em]"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--accent)",
                        }}
                      >
                        {article.category}
                      </p>
                      <h3
                        className="mb-2 text-base font-bold leading-tight"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {article.title}
                      </h3>
                      <p
                        className="flex-1 text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {article.excerpt}
                      </p>
                      <span
                        className="mt-4 inline-flex text-sm font-semibold transition-colors group-hover:text-[var(--accent)]"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Read More &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filtered.length === 0 && (
            <p
              className="py-16 text-center text-lg"
              style={{ color: "var(--text-muted)" }}
            >
              No articles in this category yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
