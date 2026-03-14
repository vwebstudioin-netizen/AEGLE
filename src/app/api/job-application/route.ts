import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // In production: save to Firestore, send confirmation email
    console.log("Job application:", data);
    return NextResponse.json({ success: true, message: "Application received. We will review and contact you." });
  } catch (error) {
    console.error("Job application API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
