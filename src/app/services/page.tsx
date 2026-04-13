import type { Metadata } from "next";
import { siteConfig, services } from "@/data/site";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: `Our Services`,
  description: `${siteConfig.name} offers 24/7 towing, auto body, vehicle restoration, mobile mechanic, custom fabrication, and snowmobile repair in Groveton, NH.`,
  openGraph: {
    title: `Our Services | ${siteConfig.name}`,
    description: `Full-service automotive shop: towing, body work, restoration, mechanical repair, and more.`,
  },
};

export default function ServicesPage() {
  return <ServicesClient services={services} />;
}
