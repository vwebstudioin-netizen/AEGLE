import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Portal message:", data);
    return NextResponse.json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Portal message API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
