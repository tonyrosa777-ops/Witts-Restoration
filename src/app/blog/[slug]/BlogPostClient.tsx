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
  article: Article;
  related: Article[];
  cta: { primary: string; quiz: string; booking: string };
  meta: { phone: string };
}

export default function BlogPostClient({
  article,
  related,
  cta,
  meta,
}: Props) {
  return (
    <main
      className="min-h-screen pt-20"
      style={{ background: "var(--bg-base)" }}
    >
      {/* ── Article Header ── */}
      <section
        className="py-16 md:py-24"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.08), transparent 70%), var(--bg-base)",
        }}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <FadeUp>
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center text-sm font-medium transition-colors hover:text-[var(--accent)]"
              style={{ color: "var(--text-secondary)" }}
            >
              &larr; Back to Blog
            </Link>
            <p
              className="mb-3 text-xs font-medium uppercase tracking-[0.1em]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent)",
              }}
            >
              {article.category}
            </p>
            <h1
              className="hero-shimmer text-h1 mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {article.title}
            </h1>
            <p
              className="text-sm"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--text-muted)",
              }}
            >
              Witt&apos;s Restoration LLC
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Header Image ── */}
      {article.image && (
        <section className="pb-4 md:pb-8">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <FadeUp delay={0.05}>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                />
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* ── Article Body (placeholder) ── */}
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <FadeUp delay={0.1}>
            <div
              className="rounded-xl border p-8 md:p-12"
              style={{
                background: "var(--bg-card)",
                borderColor: "rgba(245,245,245,0.05)",
              }}
            >
              <p
                className="text-lg leading-relaxed mb-8"
                style={{ color: "var(--text-secondary)" }}
              >
                {article.excerpt}
              </p>
              <div
                className="rounded-lg p-6"
                style={{
                  background: "var(--bg-elevated)",
                  borderLeft: "3px solid var(--accent)",
                }}
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  Full article content will be populated via Sanity CMS. This
                  page is scaffolded and ready for rich content including
                  headings, images, pull quotes, and inline CTAs.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA Block: Quiz + Call ── */}
      <section
        className="py-16 md:py-24"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(212,160,23,0.06), transparent 70%), var(--bg-elevated)",
        }}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <FadeUp>
            <p
              className="mb-2 text-xs font-medium uppercase tracking-[0.1em]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent)",
              }}
            >
              Ready to Get Started?
            </p>
            <h2
              className="text-h2 mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
              }}
            >
              What Does Your Vehicle Need?
            </h2>
            <p
              className="mb-8 text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Take a 60-second quiz for a personalized recommendation, or call
              Zeek directly to get it handled.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href={cta.quiz}
                className="inline-flex items-center rounded-lg px-8 py-4 text-lg font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,160,23,0.4)]"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-base)",
                }}
              >
                Start the Quiz
              </Link>
              <Link
                href={cta.primary}
                className="inline-flex items-center rounded-lg border px-6 py-3 text-base font-semibold transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                style={{
                  borderColor: "var(--text-secondary)",
                  color: "var(--text-primary)",
                }}
              >
                Call Zeek: {meta.phone}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Related Articles ── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeUp>
            <h2
              className="text-h2 mb-8 text-center"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
              }}
            >
              More Articles
            </h2>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((rel) => (
              <StaggerItem key={rel.slug}>
                <Link
                  href={`/blog/${rel.slug}`}
                  className="group block h-full"
                >
                  <div
                    className="flex h-full flex-col overflow-hidden rounded-xl border transition-colors duration-300 group-hover:border-[rgba(212,160,23,0.2)]"
                    style={{
                      background: "var(--bg-card)",
                      borderColor: "rgba(245,245,245,0.05)",
                    }}
                  >
                    {rel.image && (
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 400px"
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
                        {rel.category}
                      </p>
                      <h3
                        className="mb-3 text-lg font-bold leading-tight"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {rel.title}
                      </h3>
                      <p
                        className="flex-1 text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {rel.excerpt}
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
