import { NextResponse } from "next/server";
import type { LocationData } from "@/types";

/**
 * GET  /api/locations — Fetch all locations
 * POST /api/locations — Create a new location
 */

/* ── Fallback demo locations when Firebase is unset ── */
function getDemoLocations(): Partial<LocationData>[] {
  return [
    {
      id: "bangalore-flagship",
      name: "AEGLE Flagship Clinic — Koramangala",
      slug: "bangalore-flagship",
      type: "flagship",
      description: "Our main clinic with all premium treatments, advanced laser rooms, and a full surgical suite.",
      address: { street: "123, 80 Feet Rd, Koramangala 4th Block", city: "Bangalore", state: "Karnataka", zip: "560034", country: "IN" },
      coordinates: { lat: 12.9352, lng: 77.6245 },
      phone: "8050507755",
      email: "koramangala@aegleclinic.in",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
      hours: [
        { day: "Monday", open: "09:00", close: "20:00", isClosed: false },
        { day: "Tuesday", open: "09:00", close: "20:00", isClosed: false },
        { day: "Wednesday", open: "09:00", close: "20:00", isClosed: false },
        { day: "Thursday", open: "09:00", close: "20:00", isClosed: false },
        { day: "Friday", open: "09:00", close: "20:00", isClosed: false },
        { day: "Saturday", open: "09:00", close: "18:00", isClosed: false },
        { day: "Sunday", open: "10:00", close: "16:00", isClosed: false },
      ],
      departments: ["skin", "face", "facials", "hair", "body", "lasers"],
      services: ["Laser Hair Removal", "Chemical Peels", "Botox", "PRP Therapy"],
      amenities: ["Free WiFi", "Complimentary Beverages", "Valet Parking", "Prayer Room"],
      parkingInfo: "Free valet parking available. Self-park in basement (200 spots).",
      accessibilityFeatures: ["Wheelchair accessible", "Elevator access", "Braille signage"],
      erAvailable: false,
      featured: true,
    },
  ];
}

/* ── GET: Fetch all locations ── */
export async function GET() {
  try {
    const { adminDb } = await import("@/lib/firebase-admin");
    if (!adminDb) {
      return NextResponse.json({ locations: getDemoLocations() });
    }

    const snap = await adminDb
      .collection("locations")
      .orderBy("featured", "desc")
      .get();

    const locations = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || undefined,
    }));

    // If no locations in DB yet, return demo data
    if (locations.length === 0) {
      return NextResponse.json({ locations: getDemoLocations() });
    }

    return NextResponse.json({ locations });
  } catch (error) {
    console.error("[Locations GET] Error:", error);
    return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
  }
}

/* ── POST: Create a new location ── */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, type, description, address, coordinates, phone, email, image, hours, departments, services, amenities, parkingInfo, publicTransit, accessibilityFeatures, erAvailable, featured } = body;

    if (!name || !address?.street || !address?.city || !phone) {
      return NextResponse.json(
        { error: "Name, address (street + city), and phone are required" },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const locationData = {
      name,
      slug,
      type: type || "branch",
      description: description || "",
      address: {
        street: address.street,
        city: address.city,
        state: address.state || "",
        zip: address.zip || "",
        country: address.country || "IN",
      },
      coordinates: coordinates || { lat: 0, lng: 0 },
      phone,
      fax: body.fax || "",
      email: email || "",
      image: image || "",
      images: body.images || [],
      hours: hours || [],
      departments: departments || [],
      services: services || [],
      amenities: amenities || [],
      parkingInfo: parkingInfo || "",
      publicTransit: publicTransit || "",
      accessibilityFeatures: accessibilityFeatures || [],
      erAvailable: erAvailable || false,
      featured: featured || false,
    };

    const { adminDb } = await import("@/lib/firebase-admin");

    if (!adminDb) {
      return NextResponse.json({
        success: true,
        id: "demo-" + Date.now(),
        location: { id: "demo-" + Date.now(), ...locationData },
        message: "Demo mode — location not persisted",
      });
    }

    const { Timestamp } = await import("firebase-admin/firestore");
    const ref = await adminDb.collection("locations").add({
      ...locationData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return NextResponse.json({
      success: true,
      id: ref.id,
      location: { id: ref.id, ...locationData },
    });
  } catch (error) {
    console.error("[Locations POST] Error:", error);
    return NextResponse.json({ error: "Failed to create location" }, { status: 500 });
  }
}

/* ── PUT: Update a location ── */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Location ID is required" }, { status: 400 });
    }

    const { adminDb } = await import("@/lib/firebase-admin");
    if (!adminDb) {
      return NextResponse.json({ success: true, message: "Demo mode — update simulated" });
    }

    // Regenerate slug if name changed
    if (updates.name) {
      updates.slug = updates.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    const { Timestamp } = await import("firebase-admin/firestore");
    await adminDb.collection("locations").doc(id).update({
      ...updates,
      updatedAt: Timestamp.now(),
    });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("[Locations PUT] Error:", error);
    return NextResponse.json({ error: "Failed to update location" }, { status: 500 });
  }
}

/* ── DELETE: Remove a location ── */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Location ID is required" }, { status: 400 });
    }

    const { adminDb } = await import("@/lib/firebase-admin");
    if (!adminDb) {
      return NextResponse.json({ success: true, message: "Demo mode — delete simulated" });
    }

    await adminDb.collection("locations").doc(id).delete();

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("[Locations DELETE] Error:", error);
    return NextResponse.json({ error: "Failed to delete location" }, { status: 500 });
  }
}
