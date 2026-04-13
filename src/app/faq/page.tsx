import type { Metadata } from "next";
import { siteConfig, faq, meta, CTA } from "@/data/site";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: `Common questions about ${siteConfig.name} services: towing costs, service area, rust repair, diesel work, snowmobile repair, and more.`,
  openGraph: {
    title: `FAQ | ${siteConfig.name}`,
    description: `Get answers about towing, auto body, restoration, and mechanical repair in ${meta.city}, ${meta.state}.`,
  },
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    }),
  },
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
      <FaqClient faq={faq} meta={meta} cta={CTA} />
    </>
  );
}
