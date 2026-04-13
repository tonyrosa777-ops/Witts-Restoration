import { NextResponse } from "next/server";
import seededProducts from "@/lib/printful-seeded-products.json";

/**
 * GET /api/printful/products
 *
 * Returns the product catalog. When PRINTFUL_API_KEY is set, this will
 * fetch from the Printful API. Until then, returns seeded product data
 * so the shop renders a real-looking grid during demo.
 */
export async function GET() {
  const apiKey = process.env.PRINTFUL_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch("https://api.printful.com/store/products", {
        headers: { Authorization: `Bearer ${apiKey}` },
        next: { revalidate: 300 }, // cache for 5 minutes
      });

      if (!res.ok) {
        throw new Error(`Printful API error: ${res.status}`);
      }

      const data = await res.json();
      return NextResponse.json(data.result ?? []);
    } catch (error) {
      console.error("[Printful Products]", error);
      /* Fall through to seeded data */
    }
  }

  return NextResponse.json(seededProducts);
}
