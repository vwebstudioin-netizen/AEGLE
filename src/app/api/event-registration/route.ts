import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Event registration:", data);
    return NextResponse.json({ success: true, message: "Registration confirmed. Details sent to your email." });
  } catch (error) {
    console.error("Event registration API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
