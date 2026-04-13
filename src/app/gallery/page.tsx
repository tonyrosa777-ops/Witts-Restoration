import type { Metadata } from "next";
import { seoMeta } from "@/data/site";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: seoMeta.gallery.title,
  description: seoMeta.gallery.description,
  openGraph: {
    title: seoMeta.gallery.title,
    description: seoMeta.gallery.description,
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
