import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/studio/", "/pricing"],
    },
    sitemap: "https://wittsrestoration.com/sitemap.xml",
  };
}
