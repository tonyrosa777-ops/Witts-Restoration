"use client";

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

  return (
    <main
      className="min-h-screen pt-20"
      style={{ background: "var(--bg-base)" }}
    >
      {/* ── Page Header ── */}
      <section
        className="py-16 md:py-24"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.08), transparent 70%), var(--bg-base)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <FadeUp>
            <p
              className="mb-3 text-xs font-medium uppercase tracking-[0.1em]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent)",
              }}
            >
              Guides &amp; Articles
            </p>
            <h1
              className="hero-shimmer text-h1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Blog
            </h1>
            <p
              className="mx-auto mt-4 max-w-2xl text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Local knowledge for North Country drivers. Honest answers about
              towing costs, rust repair, snowmobile maintenance, and vehicle
              recovery in northern NH.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Featured Post ── */}
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeUp>
            <Link
              href={`/blog/${featured.slug}`}
              className="group block"
            >
              <div
                className="overflow-hidden rounded-xl border transition-colors duration-300 group-hover:border-[rgba(212,160,23,0.2)]"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "rgba(245,245,245,0.05)",
                }}
              >
                {featured.image && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 1280px"
                      priority
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, var(--bg-card) 0%, transparent 40%)",
                      }}
                    />
                  </div>
                )}
                <div className="p-8 md:p-12">
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
                    className="mb-4 text-2xl font-bold leading-tight md:text-3xl"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    className="mb-6 max-w-3xl text-lg leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {featured.excerpt}
                  </p>
                  <span
                    className="inline-flex text-base font-semibold transition-colors group-hover:text-[var(--accent)]"
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

      {/* ── Article Grid ── */}
      <section className="py-8 md:py-12 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {rest.map((article) => (
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
                          sizes="(max-width: 768px) 100vw, 640px"
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
                    <div className="flex flex-1 flex-col p-6">
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
                        className="mb-3 text-lg font-bold leading-tight"
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
        </div>
      </section>
    </main>
  );
}
