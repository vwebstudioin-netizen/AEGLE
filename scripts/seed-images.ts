/**
 * ═══════════════════════════════════════════════════════════════
 * AEGLE — Image Seed Script
 * ═══════════════════════════════════════════════════════════════
 *
 * Downloads images from external URLs and uploads them to
 * Firebase Storage. Outputs a URL mapping file so you can
 * update data files with the new Storage URLs.
 *
 * USAGE:
 *   npx tsx scripts/seed-images.ts
 *   npx tsx scripts/seed-images.ts --dry-run        (preview only)
 *   npx tsx scripts/seed-images.ts --config custom.json
 *
 * REQUIRES:
 *   - Firebase Admin credentials in .env.local
 *   - npm install tsx (or use ts-node)
 *
 * HOW TO ADD YOUR OWN IMAGES:
 *   1. Edit the SEED_IMAGES array below
 *   2. Add entries: { url: "https://...", path: "folder/name.jpg" }
 *   3. Run the script
 *   4. Copy the generated URLs from the output
 */

import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import * as http from "http";

/* ── Load .env.local ── */
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex > 0) {
      const key = trimmed.slice(0, eqIndex).trim();
      let value = trimmed.slice(eqIndex + 1).trim();
      // Remove surrounding quotes
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
  console.log("✅ Loaded .env.local");
} else {
  console.log("⚠️  No .env.local found — using environment variables");
}

/* ═══════════════════════════════════════════════════════════════
   SEED IMAGES — EDIT THIS ARRAY
   
   Add your image URLs here. Each entry needs:
   - url:  Source image URL (any website, Unsplash, Google, etc.)
   - path: Firebase Storage destination path
   - alt:  Description (for reference)
   
   FOLDER STRUCTURE IN STORAGE:
   - doctors/         → Doctor profile photos
   - departments/     → Department/category images  
   - services/        → Treatment/service images
   - locations/       → Clinic location photos
   - products/        → Shop product images
   - gallery/         → Before/after, clinic gallery
   - hero/            → Homepage hero banners
   - blog/            → Blog post images
   ═══════════════════════════════════════════════════════════════ */

interface SeedImage {
  url: string;        // Source URL to download from
  path: string;       // Firebase Storage path (e.g. "doctors/dr-surekha.jpg")
  alt: string;        // Description for reference
}

const SEED_IMAGES: SeedImage[] = [
  // ── Doctors ──
  {
    url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    path: "doctors/dr-surekha.jpg",
    alt: "Dr. Surekha — Chief Dermatologist",
  },
  {
    url: "https://images.unsplash.com/photo-1594824476967-48c8b964f137?w=400",
    path: "doctors/dr-nithya.jpg",
    alt: "Dr. Nithya — Senior Dermatologist",
  },

  // ── Departments ──
  {
    url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600",
    path: "departments/skin-treatments.jpg",
    alt: "Skin Treatments department",
  },
  {
    url: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600",
    path: "departments/face-treatments.jpg",
    alt: "Face Treatments department",
  },
  {
    url: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600",
    path: "departments/facials.jpg",
    alt: "Facials department",
  },
  {
    url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600",
    path: "departments/hair-treatments.jpg",
    alt: "Hair Treatments department",
  },
  {
    url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600",
    path: "departments/body-treatments.jpg",
    alt: "Body Treatments department",
  },
  {
    url: "https://images.unsplash.com/photo-1612532275473-6e4b5d600025?w=600",
    path: "departments/laser-treatments.jpg",
    alt: "Laser Treatments department",
  },
  {
    url: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600",
    path: "departments/plastic-surgery.jpg",
    alt: "Plastic Surgery department",
  },
  {
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600",
    path: "departments/cosmetic-dermatology.jpg",
    alt: "Cosmetic Dermatology department",
  },
  {
    url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600",
    path: "departments/aesthetic-therapeutic.jpg",
    alt: "Aesthetic & Therapeutic department",
  },

  // ── Locations ──
  {
    url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600",
    path: "locations/koramangala-flagship.jpg",
    alt: "Koramangala Flagship Clinic",
  },
  {
    url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600",
    path: "locations/indiranagar.jpg",
    alt: "Indiranagar Clinic",
  },
  {
    url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600",
    path: "locations/whitefield.jpg",
    alt: "Whitefield Clinic",
  },

  // ── Sample Products ──
  // (Add your product image URLs here when ready)
  // {
  //   url: "https://example.com/vitamin-c-serum.jpg",
  //   path: "products/vitamin-c-serum.jpg",
  //   alt: "AEGLE Vitamin C Serum",
  // },

  // ── Hero / Gallery ──
  // {
  //   url: "https://example.com/hero-banner.jpg",
  //   path: "hero/homepage-banner.jpg",
  //   alt: "Homepage hero banner",
  // },
];

/* ═══════════════════════════════════════════════════════════════
   SCRIPT LOGIC — Don't edit below unless customizing
   ═══════════════════════════════════════════════════════════════ */

const isDryRun = process.argv.includes("--dry-run");
const customConfig = process.argv.find((a) => a.startsWith("--config="))?.split("=")[1];

// Load custom config if provided
let images = SEED_IMAGES;
if (customConfig) {
  const configPath = path.resolve(process.cwd(), customConfig);
  if (fs.existsSync(configPath)) {
    const raw = fs.readFileSync(configPath, "utf-8");
    images = JSON.parse(raw);
    console.log(`📄 Loaded ${images.length} images from ${customConfig}`);
  } else {
    console.error(`❌ Config file not found: ${configPath}`);
    process.exit(1);
  }
}

/* ── Download helper ── */
function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const request = client.get(url, { headers: { "User-Agent": "AEGLE-Seed/1.0" } }, (response) => {
      // Follow redirects
      if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        downloadImage(response.headers.location).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }
      const chunks: Buffer[] = [];
      response.on("data", (chunk: Buffer) => chunks.push(chunk));
      response.on("end", () => resolve(Buffer.concat(chunks)));
      response.on("error", reject);
    });
    request.on("error", reject);
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

/* ── Detect content type from URL ── */
function getContentType(url: string, filePath: string): string {
  const ext = path.extname(filePath).toLowerCase() || path.extname(new URL(url).pathname).toLowerCase();
  const map: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".avif": "image/avif",
  };
  return map[ext] || "image/jpeg";
}

/* ── Main ── */
async function main() {
  console.log("\n═══════════════════════════════════════════");
  console.log("  AEGLE — Image Seed Script");
  console.log("═══════════════════════════════════════════\n");
  console.log(`📦 Images to process: ${images.length}`);
  console.log(`🔧 Mode: ${isDryRun ? "DRY RUN (preview only)" : "LIVE (uploading to Firebase Storage)"}`);
  console.log("");

  if (isDryRun) {
    console.log("┌──────────────────────────────────────────────────────────┐");
    console.log("│  DRY RUN — No images will be downloaded or uploaded      │");
    console.log("└──────────────────────────────────────────────────────────┘\n");
    for (const img of images) {
      console.log(`  📸 ${img.path}`);
      console.log(`     ← ${img.url}`);
      console.log(`     📝 ${img.alt}\n`);
    }
    console.log(`\nTotal: ${images.length} images would be uploaded.`);
    console.log("Run without --dry-run to execute.\n");
    return;
  }

  // Check Firebase credentials
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

  if (!projectId || !clientEmail || !privateKey) {
    console.error("❌ Firebase Admin credentials not found in .env.local");
    console.error("   Required: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY");
    console.error("\n   To preview without uploading, use: --dry-run\n");
    process.exit(1);
  }

  if (!storageBucket) {
    console.error("❌ NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET not set in .env.local");
    process.exit(1);
  }

  // Initialize Firebase Admin
  const { initializeApp, getApps, cert } = await import("firebase-admin/app");
  const { getStorage } = await import("firebase-admin/storage");

  let app;
  if (getApps().length === 0) {
    app = initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
      storageBucket,
    });
  } else {
    app = getApps()[0];
  }

  const bucket = getStorage(app).bucket();
  console.log(`🪣 Storage bucket: ${bucket.name}\n`);

  // Process each image
  const results: { path: string; url: string; alt: string; success: boolean; error?: string }[] = [];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const progress = `[${i + 1}/${images.length}]`;

    try {
      process.stdout.write(`${progress} ⬇️  Downloading ${img.path}...`);

      // Download
      const buffer = await downloadImage(img.url);
      const contentType = getContentType(img.url, img.path);

      process.stdout.write(` (${(buffer.length / 1024).toFixed(0)} KB) `);

      // Upload to Firebase Storage
      const file = bucket.file(img.path);
      await file.save(buffer, {
        metadata: { contentType },
        public: true,
      });

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${img.path}`;

      console.log(`✅ → ${publicUrl}`);
      results.push({ path: img.path, url: publicUrl, alt: img.alt, success: true });
      successCount++;
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      console.log(` ❌ FAILED: ${errMsg}`);
      results.push({ path: img.path, url: "", alt: img.alt, success: false, error: errMsg });
      failCount++;
    }
  }

  // Summary
  console.log("\n═══════════════════════════════════════════");
  console.log("  SEED COMPLETE");
  console.log("═══════════════════════════════════════════");
  console.log(`  ✅ Uploaded: ${successCount}`);
  console.log(`  ❌ Failed:   ${failCount}`);
  console.log(`  📦 Total:    ${images.length}`);

  // Write URL mapping file
  const mappingPath = path.resolve(process.cwd(), "scripts/seed-url-mapping.json");
  const mapping: Record<string, string> = {};
  for (const r of results) {
    if (r.success) {
      // Find the original URL for this path
      const original = images.find((img) => img.path === r.path);
      if (original) {
        mapping[original.url] = r.url;
      }
    }
  }

  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2), "utf-8");
  console.log(`\n📄 URL mapping saved to: scripts/seed-url-mapping.json`);
  console.log("   Use this to find-and-replace old URLs with new Firebase Storage URLs.\n");

  // Also write a detailed results file
  const detailsPath = path.resolve(process.cwd(), "scripts/seed-results.json");
  fs.writeFileSync(
    detailsPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        bucket: bucket.name,
        total: images.length,
        success: successCount,
        failed: failCount,
        images: results,
      },
      null,
      2
    ),
    "utf-8"
  );
  console.log(`📋 Detailed results: scripts/seed-results.json\n`);

  if (failCount > 0) {
    console.log("⚠️  Some images failed. Check the URLs and retry.\n");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
