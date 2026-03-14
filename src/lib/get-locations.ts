import type { LocationData } from "@/types";
import { locations as fallbackLocations } from "@/data/locations";

/**
 * Fetch locations from Firebase (server-side).
 * Falls back to hardcoded data when Firebase is not configured
 * or collection is empty.
 */
export async function getLocations(): Promise<LocationData[]> {
  try {
    const { adminDb } = await import("@/lib/firebase-admin");
    if (!adminDb) return fallbackLocations;

    const snap = await adminDb
      .collection("locations")
      .orderBy("featured", "desc")
      .get();

    if (snap.empty) return fallbackLocations;

    return snap.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || undefined,
    })) as LocationData[];
  } catch (error) {
    console.error("[getLocations] Error, using fallback:", error);
    return fallbackLocations;
  }
}

/**
 * Fetch a single location by slug from Firebase.
 * Falls back to hardcoded data.
 */
export async function getLocationBySlug(slug: string): Promise<LocationData | undefined> {
  try {
    const { adminDb } = await import("@/lib/firebase-admin");
    if (!adminDb) return fallbackLocations.find((l) => l.slug === slug);

    const snap = await adminDb
      .collection("locations")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (snap.empty) {
      return fallbackLocations.find((l) => l.slug === slug);
    }

    const doc = snap.docs[0];
    return {
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || undefined,
    } as LocationData;
  } catch (error) {
    console.error("[getLocationBySlug] Error, using fallback:", error);
    return fallbackLocations.find((l) => l.slug === slug);
  }
}
