import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig, blogArticles, CTA, meta } from "@/data/site";
import BlogPostClient from "./BlogPostClient";

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = blogArticles.find((a) => a.slug === params.slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | ${siteConfig.name}`,
      description: article.excerpt,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = blogArticles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const related = blogArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <BlogPostClient
      article={article}
      related={related}
      cta={CTA}
      meta={meta}
    />
  );
}
