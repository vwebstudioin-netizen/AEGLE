import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Review submitted:", data);
    return NextResponse.json({ success: true, message: "Thank you for your review!" });
  } catch (error) {
    console.error("Review API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
