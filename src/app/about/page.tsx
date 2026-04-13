import type { Metadata } from "next";
import { siteConfig, about, stats, meta, CTA } from "@/data/site";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: `About ${siteConfig.name}`,
  description: `Meet Zeek Witt, owner and operator of ${siteConfig.name} in ${meta.city}, ${meta.state}. ${about.ownerTitle}. 24/7 towing, auto body, restoration, and mobile mechanic.`,
  openGraph: {
    title: `About ${siteConfig.name}`,
    description: `Meet Zeek Witt, owner and operator of ${siteConfig.name} in ${meta.city}, ${meta.state}.`,
  },
};

export default function AboutPage() {
  return (
    <AboutClient
      siteConfig={siteConfig}
      about={about}
      stats={stats}
      meta={meta}
      cta={CTA}
    />
  );
}
