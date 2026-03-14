import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Referral submitted:", data);
    return NextResponse.json({ success: true, message: "Referral received. Our team will coordinate the transfer." });
  } catch (error) {
    console.error("Referral API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
