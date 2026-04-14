import { fal } from "@fal-ai/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, "..", "public", "og-image.jpg");

fal.config({ credentials: process.env.FAL_KEY });

const PROMPT =
  "Cinematic hero shot of a heavy-duty flatbed tow truck parked on a rural northern New Hampshire road at blue hour, amber rotating light bars glowing warm against deep twilight sky, dense pine forest and distant White Mountain ridgeline in the background, wet asphalt reflecting the amber lights, a classic American muscle car in mid-restoration strapped to the flatbed with polished chrome catching the last light, volumetric fog drifting low across the road, dramatic low-angle composition with strong negative space in the upper right for text overlay, rich cinematic color grading with teal shadows and amber highlights, ultra photorealistic, shot on 35mm, 1.91:1 aspect ratio";

async function main() {
  console.log("Generating OG image via fal.ai...");
  const result = await fal.subscribe("fal-ai/flux/dev", {
    input: {
      prompt: PROMPT,
      image_size: { width: 1200, height: 630 },
      num_images: 1,
      num_inference_steps: 28,
      guidance_scale: 3.5,
    },
    logs: false,
  });

  const imageUrl = result.data.images[0].url;
  console.log(`Got URL: ${imageUrl}`);

  const response = await fetch(imageUrl);
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(OUT_PATH, buffer);
  console.log(`Saved: ${OUT_PATH} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
