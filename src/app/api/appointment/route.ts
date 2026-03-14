import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { department, location, visitType, doctor, date, time, patientName, patientEmail, patientPhone } = data;

    if (!department || !location || !visitType || !date || !time || !patientName || !patientEmail || !patientPhone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // In production: save to Firestore, send confirmation email, notify scheduling
    console.log("Appointment request:", data);

    return NextResponse.json({
      success: true,
      message: "Appointment request received. Our scheduling team will confirm within 24 hours.",
      appointmentId: `APT-${Date.now()}`,
    });
  } catch (error) {
    console.error("Appointment API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
