/**
 * ═══════════════════════════════════════════════════════════════
 * AEGLE — Replace Image URLs in Data Files
 * ═══════════════════════════════════════════════════════════════
 *
 * After running seed-images.ts, this script reads the generated
 * seed-url-mapping.json and replaces all old URLs in your data
 * files (doctors.ts, departments.ts, services.ts, locations.ts)
 * with the new Firebase Storage URLs.
 *
 * USAGE:
 *   npx tsx scripts/replace-image-urls.ts
 *   npx tsx scripts/replace-image-urls.ts --dry-run
 */

import * as fs from "fs";
import * as path from "path";

const isDryRun = process.argv.includes("--dry-run");

console.log("\n═══════════════════════════════════════════");
console.log("  AEGLE — Replace Image URLs");
console.log("═══════════════════════════════════════════\n");

// Load URL mapping
const mappingPath = path.resolve(process.cwd(), "scripts/seed-url-mapping.json");
if (!fs.existsSync(mappingPath)) {
  console.error("❌ seed-url-mapping.json not found.");
  console.error("   Run seed-images.ts first to generate the mapping.\n");
  process.exit(1);
}

const mapping: Record<string, string> = JSON.parse(fs.readFileSync(mappingPath, "utf-8"));
const entries = Object.entries(mapping);

if (entries.length === 0) {
  console.log("⚠️  No URL mappings found. Nothing to replace.\n");
  process.exit(0);
}

console.log(`📄 Loaded ${entries.length} URL mappings`);
console.log(`🔧 Mode: ${isDryRun ? "DRY RUN" : "LIVE (files will be modified)"}\n`);

// Data files to process
const dataFiles = [
  "src/data/doctors.ts",
  "src/data/departments.ts",
  "src/data/services.ts",
  "src/data/locations.ts",
  "src/lib/constants.ts",
];

let totalReplacements = 0;

for (const relPath of dataFiles) {
  const filePath = path.resolve(process.cwd(), relPath);
  if (!fs.existsSync(filePath)) {
    console.log(`  ⏭️  Skipping ${relPath} (not found)`);
    continue;
  }

  let content = fs.readFileSync(filePath, "utf-8");
  let fileReplacements = 0;

  for (const [oldUrl, newUrl] of entries) {
    // Count occurrences
    const regex = new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    const matches = content.match(regex);
    if (matches) {
      fileReplacements += matches.length;
      if (!isDryRun) {
        content = content.replace(regex, newUrl);
      }
    }
  }

  if (fileReplacements > 0) {
    if (!isDryRun) {
      fs.writeFileSync(filePath, content, "utf-8");
    }
    console.log(`  ✅ ${relPath} — ${fileReplacements} URL(s) ${isDryRun ? "would be " : ""}replaced`);
    totalReplacements += fileReplacements;
  } else {
    console.log(`  ⏭️  ${relPath} — no matching URLs`);
  }
}

console.log(`\n📊 Total: ${totalReplacements} replacements ${isDryRun ? "would be made" : "made"}`);

if (isDryRun) {
  console.log("\nRun without --dry-run to apply changes.\n");
} else {
  console.log("\n✅ Done! Your data files now use Firebase Storage URLs.");
  console.log("   Run 'npm run build' to verify.\n");
}
