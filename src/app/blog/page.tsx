import type { Metadata } from "next";
import { siteConfig, blogArticles, CTA } from "@/data/site";
import BlogIndexClient from "./BlogIndexClient";

export const metadata: Metadata = {
  title: "Blog",
  description: `Local guides, tips, and honest answers about towing, rust repair, snowmobile maintenance, and vehicle recovery in northern NH. From ${siteConfig.name}.`,
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: `Guides and articles from ${siteConfig.name}. Towing costs, rust repair, snowmobile tips, and more for North Country drivers.`,
  },
};

export default function BlogPage() {
  return <BlogIndexClient articles={blogArticles} cta={CTA} />;
}
