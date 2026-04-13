import { NextResponse } from "next/server";

// Demo mode slot patterns
const SLOT_PATTERNS: string[][] = [
  ["9:00 AM", "10:30 AM", "1:00 PM"],
  ["10:00 AM", "1:00 PM", "3:30 PM"],
  ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
  ["10:30 AM", "1:00 PM", "3:00 PM"],
  ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
  ["11:00 AM", "1:30 PM", "3:00 PM"],
  ["9:00 AM", "10:00 AM", "1:00 PM", "2:30 PM", "4:00 PM"],
  ["10:00 AM", "11:30 AM", "2:00 PM"],
  ["9:00 AM", "11:00 AM", "1:00 PM", "3:30 PM"],
  ["10:30 AM", "12:00 PM", "2:30 PM", "4:00 PM"],
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get("date");

  if (!dateStr) {
    return NextResponse.json({ error: "Missing date parameter" }, { status: 400 });
  }

  const apiKey = process.env.CALENDLY_API_KEY;

  if (apiKey) {
    // TODO: Real Calendly API integration
    // const eventTypeUri = process.env.NEXT_PUBLIC_CALENDLY_EVENT_TYPE_URI;
    // Fetch available slots from Calendly API
  }

  // Demo mode: seeded fake availability
  const [yearStr, monthStr, dayStr] = dateStr.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  // Check if weekend
  const d = new Date(year, month - 1, day);
  if (d.getDay() === 0 || d.getDay() === 6) {
    return NextResponse.json({ slots: [] });
  }

  const seed = (year * 400 + month * 31 + day) % 10;
  const slots = SLOT_PATTERNS[seed].map((time) => ({
    time,
    available: true,
  }));

  return NextResponse.json({ slots });
}
