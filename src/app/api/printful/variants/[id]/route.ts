import { NextResponse } from "next/server";
import seededProducts from "@/lib/printful-seeded-products.json";

/**
 * GET /api/printful/variants/[id]
 *
 * Returns variants for a specific product. Falls back to seeded data
 * when PRINTFUL_API_KEY is not configured.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const apiKey = process.env.PRINTFUL_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch(
        `https://api.printful.com/store/products/${id}`,
        {
          headers: { Authorization: `Bearer ${apiKey}` },
          next: { revalidate: 300 },
        },
      );

      if (!res.ok) {
        throw new Error(`Printful API error: ${res.status}`);
      }

      const data = await res.json();
      return NextResponse.json(data.result?.sync_variants ?? []);
    } catch (error) {
      console.error("[Printful Variants]", error);
      /* Fall through to seeded data */
    }
  }

  /* Seeded fallback */
  const product = seededProducts.find((p) => p.id === id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product.variants);
}
