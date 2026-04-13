import { fal } from "@fal-ai/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "images", "blog");

fal.config({ credentials: process.env.FAL_KEY });

const BLOG_IMAGES = [
  {
    slug: "towing-cost-guide-nh",
    prompt:
      "A flatbed tow truck on a dark rural New Hampshire highway at dusk, headlights blazing amber through light fog, thick pine forest lining both sides, warm golden light reflecting off wet asphalt, dramatic low angle shot from road level, cinematic moody atmosphere, photorealistic, 16:9 aspect ratio",
  },
  {
    slug: "break-down-route-3-coos-county",
    prompt:
      "Aerial drone view of a lonely two-lane highway cutting through dense autumn forest in New Hampshire, a single vehicle with hazard lights blinking orange pulled onto a narrow shoulder, late afternoon golden hour light filtering through trees, mountain ridgeline in background, photorealistic cinematic, 16:9 aspect ratio",
  },
  {
    slug: "vehicle-rust-repair-guide-nh",
    prompt:
      "Extreme close-up macro shot of rusted truck rocker panel with visible orange corrosion eating through metal, one section already cut away revealing fresh welded steel repair patch beneath, sparks from a grinder frozen mid-air, dark workshop background with warm tungsten work light, photorealistic detail, 16:9 aspect ratio",
  },
  {
    slug: "snowmobile-trail-breakdown-guide",
    prompt:
      "A snowmobile stopped on a snowy forest trail at twilight, blue-purple ambient light on snow, single warm amber headlight beam illuminating falling snowflakes, dense birch and pine trees creating a corridor, rider standing beside the machine checking the engine, breath visible in cold air, photorealistic winter atmosphere, 16:9 aspect ratio",
  },
  {
    slug: "mobile-mechanic-rural-nh",
    prompt:
      "A mechanic working under the hood of a pickup truck in a gravel driveway, portable LED work light casting warm golden glow on the engine bay, rural farmhouse and barn visible in soft background blur, autumn leaves on the ground, tool cart beside the truck, late afternoon light, photorealistic candid moment, 16:9 aspect ratio",
  },
  {
    slug: "off-road-recovery-northern-nh",
    prompt:
      "A heavy-duty wrecker truck winching a muddy SUV out of a deep rutted logging road, steel cable taut and gleaming, mud splashed on both vehicles, dense evergreen forest surrounding the scene, overcast sky with dramatic cloud break letting one shaft of golden light through, shot from the side showing the full recovery operation, photorealistic action, 16:9 aspect ratio",
  },
  {
    slug: "snowmobile-maintenance-checklist",
    prompt:
      "Overhead flat-lay view of snowmobile parts and tools arranged neatly on a dark workshop bench, new spark plugs, drive belt, carburetor cleaner, clutch weights, chain case oil bottle, torque wrench, shop rags, warm amber workshop lighting from above, organized and methodical, dark steel workbench surface, photorealistic product photography style, 16:9 aspect ratio",
  },
  {
    slug: "failed-nh-inspection-rust",
    prompt:
      "A New Hampshire state inspection sticker on a windshield with a red REJECTED stamp visible, shot from inside the cab looking out through the windshield at a blurred auto repair shop, raindrops on the glass, dashboard visible in foreground, muted tones with one pop of red from the rejection stamp, photorealistic shallow depth of field, 16:9 aspect ratio",
  },
  {
    slug: "choose-towing-company-trust",
    prompt:
      "Split composition, left half shows a professional tow truck operator in a high-visibility vest securing a vehicle with heavy chains at night under amber streetlight, right half fades to darkness showing a shadowy unmarked truck with no safety equipment, visual contrast between legitimate and illegitimate operators, cinematic lighting, photorealistic, 16:9 aspect ratio",
  },
  {
    slug: "diesel-truck-repair-northern-nh",
    prompt:
      "A Powerstroke diesel engine bay fully exposed with the hood up, mechanic gloved hands holding a fuel injector up to inspection under a bright amber trouble light, dark garage interior with tool pegboard in soft background, diesel fuel system components visible, oil-stained but organized workspace, photorealistic technical detail, 16:9 aspect ratio",
  },
];

async function generateImage(entry) {
  console.log(`⏳ Generating: ${entry.slug}...`);
  try {
    const result = await fal.subscribe("fal-ai/flux/schnell", {
      input: {
        prompt: entry.prompt,
        image_size: "landscape_16_9",
        num_images: 1,
      },
      logs: false,
    });

    const imageUrl = result.data.images[0].url;
    console.log(`✅ Got URL for ${entry.slug}: ${imageUrl}`);

    // Download the image
    const response = await fetch(imageUrl);
    const buffer = Buffer.from(await response.arrayBuffer());
    const outPath = path.join(OUT_DIR, `${entry.slug}.webp`);
    fs.writeFileSync(outPath, buffer);
    console.log(`💾 Saved: ${outPath}`);
    return { slug: entry.slug, success: true };
  } catch (err) {
    console.error(`❌ Failed ${entry.slug}:`, err.message || err);
    return { slug: entry.slug, success: false, error: err.message };
  }
}

async function main() {
  console.log(`\nGenerating ${BLOG_IMAGES.length} blog images via fal.ai...\n`);
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Run 3 at a time to avoid rate limits
  const results = [];
  for (let i = 0; i < BLOG_IMAGES.length; i += 3) {
    const batch = BLOG_IMAGES.slice(i, i + 3);
    const batchResults = await Promise.all(batch.map(generateImage));
    results.push(...batchResults);
  }

  console.log("\n── Summary ──");
  const succeeded = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);
  console.log(`✅ ${succeeded.length} succeeded`);
  if (failed.length > 0) {
    console.log(`❌ ${failed.length} failed:`);
    failed.forEach((f) => console.log(`   - ${f.slug}: ${f.error}`));
  }
}

main();
