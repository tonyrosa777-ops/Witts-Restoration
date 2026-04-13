import { NextResponse } from "next/server";

/**
 * POST /api/stripe/webhook
 *
 * Handles Stripe webhook events (payment completed, refunds, etc.).
 * When STRIPE_WEBHOOK_SECRET is set, this will verify and process
 * real webhook payloads. Until then, logs the event.
 */
export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (webhookSecret) {
    try {
      const body = await request.text();
      const sig = request.headers.get("stripe-signature");

      // TODO: Wire real Stripe webhook verification
      // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
      // const event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
      // Handle event.type (checkout.session.completed, etc.)

      console.log("[Stripe Webhook] Received event, signature:", sig?.slice(0, 20));
      console.log("[Stripe Webhook] Body length:", body.length);

      return NextResponse.json({ received: true });
    } catch (error) {
      console.error("[Stripe Webhook] Verification failed:", error);
      return NextResponse.json(
        { error: "Webhook verification failed" },
        { status: 400 },
      );
    }
  }

  /* Demo mode — log and acknowledge */
  console.log("[Stripe Webhook] Demo mode — event received but not processed.");
  return NextResponse.json({
    received: true,
    message: "Demo mode — Stripe webhook not configured.",
  });
}
