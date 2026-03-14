import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { firstName, lastName, email, phone, department, subject, message } = data;

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // In production: save to Firestore and send confirmation email
    console.log("Contact form submission:", { firstName, lastName, email, phone, department, subject, message });

    return NextResponse.json({ success: true, message: "Message received. We will respond within 24 hours." });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
