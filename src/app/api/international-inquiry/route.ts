import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("International inquiry:", data);
    return NextResponse.json({ success: true, message: "Inquiry received. Our international team will contact you within 48 hours." });
  } catch (error) {
    console.error("International inquiry API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
