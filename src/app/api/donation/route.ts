import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // In production: save to Firestore, process via Razorpay, send thank-you email
    console.log("Donation received:", data);
    return NextResponse.json({ success: true, message: "Thank you for your generous donation!" });
  } catch (error) {
    console.error("Donation API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
