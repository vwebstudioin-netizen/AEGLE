import { NextResponse } from "next/server";

/**
 * POST /api/products — Create a product (with image upload to Firebase Storage)
 * GET  /api/products — Fetch all products for admin/shop
 */

/* ── GET: Fetch products ── */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const active = searchParams.get("active");

    const { adminDb } = await import("@/lib/firebase-admin");
    if (!adminDb) {
      // Demo data when Firebase is not configured
      return NextResponse.json({
        products: getDemoProducts(),
      });
    }

    let query = adminDb.collection("products").orderBy("createdAt", "desc");

    if (category) {
      query = query.where("category", "==", category) as typeof query;
    }
    if (featured === "true") {
      query = query.where("featured", "==", true) as typeof query;
    }
    if (active !== null) {
      query = query.where("active", "==", active !== "false") as typeof query;
    }

    const snap = await query.limit(100).get();
    const products = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || undefined,
    }));

    return NextResponse.json({ products });
  } catch (error) {
    console.error("[Products GET] Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

/* ── POST: Create product ── */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const longDescription = formData.get("longDescription") as string;
    const price = parseFloat(formData.get("price") as string);
    const comparePrice = formData.get("comparePrice") ? parseFloat(formData.get("comparePrice") as string) : undefined;
    const category = formData.get("category") as string;
    const tags = formData.get("tags") ? (formData.get("tags") as string).split(",").map((t) => t.trim()) : [];
    const sku = formData.get("sku") as string;
    const stock = parseInt(formData.get("stock") as string) || 0;
    const featured = formData.get("featured") === "true";
    const active = formData.get("active") !== "false";
    const brand = (formData.get("brand") as string) || "AEGLE";
    const weight = formData.get("weight") as string;
    const volume = formData.get("volume") as string;
    const ingredients = formData.get("ingredients") as string;
    const howToUse = formData.get("howToUse") as string;
    const suitableFor = formData.get("suitableFor") ? (formData.get("suitableFor") as string).split(",").map((s) => s.trim()) : [];

    // Validate
    if (!name || !description || !price || !category) {
      return NextResponse.json({ error: "Name, description, price, and category are required" }, { status: 400 });
    }

    // Handle image upload to Firebase Storage
    const imageFile = formData.get("image") as File | null;
    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
      const { adminStorage } = await import("@/lib/firebase-admin");
      if (adminStorage) {
        const bucket = adminStorage.bucket();
        const fileName = `products/${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
        const buffer = Buffer.from(await imageFile.arrayBuffer());

        const file = bucket.file(fileName);
        await file.save(buffer, {
          metadata: {
            contentType: imageFile.type,
          },
        });

        // Make file publicly readable
        await file.makePublic();
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      } else {
        console.log("[Products] Firebase Storage not configured. Image not uploaded.");
      }
    }

    // Generate slug
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const productData = {
      name,
      slug,
      description,
      longDescription: longDescription || "",
      price,
      comparePrice,
      currency: "INR",
      category,
      tags,
      images: imageUrl ? [imageUrl] : [],
      thumbnail: imageUrl || "",
      sku: sku || `AEGLE-${Date.now()}`,
      stock,
      featured,
      active,
      rating: 0,
      reviewCount: 0,
      weight: weight || "",
      volume: volume || "",
      ingredients: ingredients || "",
      howToUse: howToUse || "",
      suitableFor,
      brand,
    };

    const { adminDb } = await import("@/lib/firebase-admin");
    let docId = "local-" + Date.now();

    if (adminDb) {
      const { Timestamp } = await import("firebase-admin/firestore");
      const ref = await adminDb.collection("products").add({
        ...productData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      docId = ref.id;
    } else {
      console.log("[Products] Firebase not configured. Product logged:", productData);
    }

    return NextResponse.json({
      success: true,
      id: docId,
      product: { id: docId, ...productData },
    });
  } catch (error) {
    console.error("[Products POST] Error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

/* ── PUT: Update product ── */
export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const { adminDb } = await import("@/lib/firebase-admin");
    if (!adminDb) {
      return NextResponse.json({ success: true, message: "Demo mode — update simulated" });
    }

    // Build update object from provided fields
    const updates: Record<string, unknown> = {};
    const fields = ["name", "description", "longDescription", "category", "sku", "brand", "weight", "volume", "ingredients", "howToUse"];
    for (const field of fields) {
      const val = formData.get(field);
      if (val !== null) updates[field] = val;
    }
    if (formData.get("price")) updates.price = parseFloat(formData.get("price") as string);
    if (formData.get("comparePrice")) updates.comparePrice = parseFloat(formData.get("comparePrice") as string);
    if (formData.get("stock")) updates.stock = parseInt(formData.get("stock") as string);
    if (formData.get("featured") !== null) updates.featured = formData.get("featured") === "true";
    if (formData.get("active") !== null) updates.active = formData.get("active") !== "false";
    if (formData.get("tags")) updates.tags = (formData.get("tags") as string).split(",").map((t) => t.trim());
    if (formData.get("suitableFor")) updates.suitableFor = (formData.get("suitableFor") as string).split(",").map((s) => s.trim());

    // Handle new image upload
    const imageFile = formData.get("image") as File | null;
    if (imageFile && imageFile.size > 0) {
      const { adminStorage } = await import("@/lib/firebase-admin");
      if (adminStorage) {
        const bucket = adminStorage.bucket();
        const fileName = `products/${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const file = bucket.file(fileName);
        await file.save(buffer, { metadata: { contentType: imageFile.type } });
        await file.makePublic();
        const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        updates.thumbnail = imageUrl;
        updates.images = [imageUrl];
      }
    }

    // Update slug if name changed
    if (updates.name) {
      updates.slug = (updates.name as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }

    const { Timestamp } = await import("firebase-admin/firestore");
    updates.updatedAt = Timestamp.now();

    await adminDb.collection("products").doc(id).update(updates);

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("[Products PUT] Error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

/* ── DELETE: Remove product ── */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const { adminDb } = await import("@/lib/firebase-admin");
    if (!adminDb) {
      return NextResponse.json({ success: true, message: "Demo mode — delete simulated" });
    }

    // Get product to delete its image from storage
    const doc = await adminDb.collection("products").doc(id).get();
    if (doc.exists) {
      const data = doc.data();
      if (data?.thumbnail) {
        try {
          const { adminStorage } = await import("@/lib/firebase-admin");
          if (adminStorage) {
            const bucket = adminStorage.bucket();
            const url = new URL(data.thumbnail);
            const filePath = decodeURIComponent(url.pathname.split(`${bucket.name}/`)[1] || "");
            if (filePath) await bucket.file(filePath).delete().catch(() => {});
          }
        } catch {
          // Image cleanup is non-fatal
        }
      }
      await adminDb.collection("products").doc(id).delete();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Products DELETE] Error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

/* ── Demo products ── */
function getDemoProducts() {
  return [
    {
      id: "demo-1",
      name: "AEGLE Vitamin C Serum",
      slug: "aegle-vitamin-c-serum",
      description: "Brightening serum with 20% Vitamin C for radiant, even-toned skin.",
      price: 1299,
      comparePrice: 1599,
      currency: "INR",
      category: "Serums",
      tags: ["brightening", "vitamin-c", "bestseller"],
      images: [],
      thumbnail: "",
      sku: "AEGLE-VCS-001",
      stock: 45,
      featured: true,
      active: true,
      rating: 4.8,
      reviewCount: 124,
      brand: "AEGLE",
      createdAt: new Date().toISOString(),
    },
    {
      id: "demo-2",
      name: "HydraGlow Moisturiser SPF 30",
      slug: "hydraglow-moisturiser-spf-30",
      description: "Lightweight daily moisturiser with SPF 30 sun protection.",
      price: 899,
      comparePrice: 1099,
      currency: "INR",
      category: "Moisturisers",
      tags: ["spf", "moisturiser", "daily"],
      images: [],
      thumbnail: "",
      sku: "AEGLE-HGM-002",
      stock: 68,
      featured: true,
      active: true,
      rating: 4.7,
      reviewCount: 89,
      brand: "AEGLE",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "demo-3",
      name: "Retinol Night Repair Cream",
      slug: "retinol-night-repair-cream",
      description: "Advanced retinol formula for overnight skin renewal and anti-aging.",
      price: 1799,
      comparePrice: 2199,
      currency: "INR",
      category: "Creams",
      tags: ["retinol", "anti-aging", "night-care"],
      images: [],
      thumbnail: "",
      sku: "AEGLE-RNR-003",
      stock: 32,
      featured: false,
      active: true,
      rating: 4.9,
      reviewCount: 67,
      brand: "AEGLE",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: "demo-4",
      name: "Niacinamide Pore Minimiser",
      slug: "niacinamide-pore-minimiser",
      description: "10% Niacinamide serum to minimise pores and control oil.",
      price: 799,
      currency: "INR",
      category: "Serums",
      tags: ["niacinamide", "pore-care", "oil-control"],
      images: [],
      thumbnail: "",
      sku: "AEGLE-NPM-004",
      stock: 56,
      featured: false,
      active: true,
      rating: 4.6,
      reviewCount: 43,
      brand: "AEGLE",
      createdAt: new Date(Date.now() - 259200000).toISOString(),
    },
    {
      id: "demo-5",
      name: "Derma Cleansing Gel",
      slug: "derma-cleansing-gel",
      description: "Gentle pH-balanced cleansing gel for sensitive skin.",
      price: 599,
      comparePrice: 749,
      currency: "INR",
      category: "Cleansers",
      tags: ["cleanser", "sensitive-skin", "gentle"],
      images: [],
      thumbnail: "",
      sku: "AEGLE-DCG-005",
      stock: 80,
      featured: true,
      active: true,
      rating: 4.5,
      reviewCount: 156,
      brand: "AEGLE",
      createdAt: new Date(Date.now() - 345600000).toISOString(),
    },
  ];
}
