"use client";

import Link from "next/link";
import { blogArticles } from "@/data/site";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import FadeUp from "@/components/animations/FadeUp";

export default function BlogPreview() {
  const featured = blogArticles.slice(0, 3);

  return (
    <section
      className="py-16 md:py-24"
      style={{ background: "var(--bg-elevated)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <FadeUp>
          <p
            className="mb-2 text-center text-xs font-medium uppercase tracking-[0.1em]"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--accent)",
            }}
          >
            From the Blog
          </p>
          <h2
            className="text-h2 mb-12 text-center"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            Local Guides for North Country Drivers
          </h2>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((article) => (
            <StaggerItem key={article.slug}>
              <Link
                href={`/blog/${article.slug}`}
                className="group block h-full"
              >
                <div
                  className="flex h-full flex-col rounded-xl border p-6 transition-colors duration-300 group-hover:border-[rgba(212,160,23,0.2)]"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "rgba(245,245,245,0.05)",
                  }}
                >
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
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center rounded-lg border px-6 py-3 text-base font-semibold transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{
                borderColor: "var(--text-secondary)",
                color: "var(--text-primary)",
              }}
            >
              View All Articles
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
