import { NextResponse } from "next/server";

// Stub API route for contact form submissions
// TODO: Wire to Resend or another email provider for production

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Basic server-side validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // TODO: Send email via Resend
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "contact@wittsrestoration.com",
    //   to: "zw25wr@gmail.com",
    //   subject: `New contact form submission from ${name}`,
    //   html: `<p><strong>Name:</strong> ${name}</p>
    //          <p><strong>Email:</strong> ${email}</p>
    //          <p><strong>Phone:</strong> ${phone}</p>
    //          <p><strong>Message:</strong> ${message}</p>`,
    // });

    console.log("Contact form submission:", { name, email, phone, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
