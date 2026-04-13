import { NextResponse } from "next/server";

/**
 * POST /api/stripe/checkout
 *
 * Creates a Stripe Checkout session. When STRIPE_SECRET_KEY is set,
 * this will create a real session. Until then, returns a demo URL.
 */
export async function POST(request: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (stripeKey) {
    try {
      const body = await request.json();
      // TODO: Wire real Stripe checkout session creation
      // const stripe = new Stripe(stripeKey);
      // const session = await stripe.checkout.sessions.create({ ... });
      // return NextResponse.json({ url: session.url });
      console.log("[Stripe Checkout] Would create session with:", body);
    } catch (error) {
      console.error("[Stripe Checkout]", error);
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 },
      );
    }
  }

  /* Demo mode — return a placeholder URL */
  return NextResponse.json({
    url: "/shop?checkout=demo",
    message: "Demo mode — Stripe not configured. Set STRIPE_SECRET_KEY to enable real checkout.",
  });
}
