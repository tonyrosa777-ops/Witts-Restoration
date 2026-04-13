import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { date, time, name, email, phone, service } = body;

  if (!date || !time || !name || !email) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const apiKey = process.env.CALENDLY_API_KEY;

  if (apiKey) {
    // TODO: Real Calendly API integration
    // Submit booking via Calendly API
    // const eventTypeUri = process.env.NEXT_PUBLIC_CALENDLY_EVENT_TYPE_URI;
  }

  // Demo mode: return success
  return NextResponse.json({
    success: true,
    booking: {
      date,
      time,
      name,
      email,
      phone: phone || null,
      service: service || null,
      confirmationId: `DEMO-${Date.now()}`,
    },
  });
}
