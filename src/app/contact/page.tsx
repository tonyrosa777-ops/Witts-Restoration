import type { Metadata } from "next";
import { siteConfig, meta } from "@/data/site";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Get In Touch",
  description: `Contact ${siteConfig.name} in ${meta.city}, ${meta.state}. Call ${meta.phone} for 24/7 towing or use our contact form for quotes and questions.`,
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: `Reach ${siteConfig.name} for towing, auto body, restoration, and mechanical repair.`,
  },
};

export default function ContactPage() {
  return <ContactClient meta={meta} siteConfig={siteConfig} />;
}
