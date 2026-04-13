import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, testimonials, faq, siteConfig, meta, CTA } from "@/data/site";
import ServiceDetailClient from "./ServiceDetailClient";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.name}`,
    description: `${service.shortDescription} ${siteConfig.name} in ${meta.city}, ${meta.state}. ${service.startingAt !== "Quote required" ? `Starting at ${service.startingAt}.` : "Get a free quote."}`,
    openGraph: {
      title: `${service.name} | ${siteConfig.name}`,
      description: service.shortDescription,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedTestimonials = testimonials.filter(
    (t) => t.service === service.name
  );

  // FAQ doesn't have service tags in data, but we can match keywords
  const relatedFaq = faq.filter((q) => {
    const text = (q.question + " " + q.answer).toLowerCase();
    const keywords = service.name.toLowerCase().split(/\s+/);
    return keywords.some((kw) => kw.length > 3 && text.includes(kw));
  });

  return (
    <ServiceDetailClient
      service={service}
      relatedTestimonials={relatedTestimonials}
      relatedFaq={relatedFaq}
      meta={meta}
      cta={CTA}
    />
  );
}
