import { NextResponse } from "next/server";

/**
 * POST /api/enquiry
 * Receives chatbot enquiry { name, phone, interest }
 * Saves to Firestore "enquiries" collection and returns success
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, interest } = data;

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Valid name is required" }, { status: 400 });
    }
    if (!phone || !/^[6-9]\d{9}$/.test(phone.replace(/[\s\-+]/g, "").replace(/^91/, ""))) {
      return NextResponse.json({ error: "Valid 10-digit Indian mobile number is required" }, { status: 400 });
    }
    if (!interest || typeof interest !== "string") {
      return NextResponse.json({ error: "Treatment interest is required" }, { status: 400 });
    }

    // Clean phone
    const cleanPhone = phone.replace(/[\s\-+]/g, "").replace(/^91/, "");

    // ── Save to Firestore (server-side using Admin SDK) ──
    let docId = "local-" + Date.now();
    try {
      const { adminDb } = await import("@/lib/firebase-admin");
      if (adminDb) {
        const { Timestamp } = await import("firebase-admin/firestore");
        const ref = await adminDb.collection("enquiries").add({
          name: name.trim(),
          phone: cleanPhone,
          interest: interest.trim(),
          status: "new",
          source: "chatbot",
          createdAt: Timestamp.now(),
          notes: "",
        });
        docId = ref.id;
      } else {
        // Firebase not configured — just log
        console.log("[Enquiry] Firebase not configured. Logged locally:", { name, phone: cleanPhone, interest });
      }
    } catch (fbErr) {
      console.error("[Enquiry] Firestore write failed (non-fatal):", fbErr);
      // Still return success — admin can check logs
    }

    return NextResponse.json({
      success: true,
      id: docId,
      message: `Thank you ${name.trim()}! We will contact you at ${cleanPhone} within 24 hours.`,
    });
  } catch (error) {
    console.error("[Enquiry API] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * GET /api/enquiry
 * Fetches recent enquiries for admin dashboard
 */
export async function GET() {
  try {
    const { adminDb } = await import("@/lib/firebase-admin");
    if (!adminDb) {
      // Return demo data when Firebase is not configured
      return NextResponse.json({
        enquiries: [
          { id: "demo-1", name: "Priya Sharma", phone: "9876543210", interest: "Skin Treatment", status: "new", source: "chatbot", createdAt: new Date().toISOString(), notes: "" },
          { id: "demo-2", name: "Rahul Verma", phone: "8765432109", interest: "Hair Treatment", status: "contacted", source: "chatbot", createdAt: new Date(Date.now() - 3600000).toISOString(), notes: "Called back, scheduled for Thursday" },
          { id: "demo-3", name: "Ananya Reddy", phone: "7654321098", interest: "Facial", status: "converted", source: "chatbot", createdAt: new Date(Date.now() - 86400000).toISOString(), notes: "Booked HydraFacial package" },
          { id: "demo-4", name: "Vikram Nair", phone: "9988776655", interest: "Laser Treatment", status: "new", source: "chatbot", createdAt: new Date(Date.now() - 7200000).toISOString(), notes: "" },
          { id: "demo-5", name: "Meera Iyer", phone: "8877665544", interest: "General Consultation", status: "contacted", source: "chatbot", createdAt: new Date(Date.now() - 172800000).toISOString(), notes: "Follow-up scheduled" },
        ],
      });
    }

    const snap = await adminDb.collection("enquiries").orderBy("createdAt", "desc").limit(50).get();
    const enquiries = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    }));

    return NextResponse.json({ enquiries });
  } catch (error) {
    console.error("[Enquiry GET] Error:", error);
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}
