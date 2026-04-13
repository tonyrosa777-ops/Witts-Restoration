import type { Metadata } from "next";
import { siteConfig, testimonials, meta, CTA } from "@/data/site";
import TestimonialsClient from "./TestimonialsClient";

export const metadata: Metadata = {
  title: "Testimonials",
  description: `Read what customers say about ${siteConfig.name}. Real reviews from real people in ${meta.county}, ${meta.state} and beyond.`,
  openGraph: {
    title: `Testimonials | ${siteConfig.name}`,
    description: `Customer testimonials for ${siteConfig.name}. Towing, auto body, restoration, and mechanical repair.`,
  },
};

export default function TestimonialsPage() {
  return (
    <TestimonialsClient
      testimonials={testimonials}
      meta={meta}
      cta={CTA}
    />
  );
}
