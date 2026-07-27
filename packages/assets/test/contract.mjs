import { existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const files = [
  "logos/eyeagle-wordmark-dark.png",
  "logos/eyeagle-wordmark-light.png",
  "logos/eyeagle-lockup-dark.png",
  "logos/eyeagle-lockup-light.png",
];

for (const file of files) {
  const path = resolve(root, file);
  if (!existsSync(path) || statSync(path).size === 0) throw new Error(`Missing or empty asset: ${file}`);
}

console.log(`Checked ${files.length} EyEagle logo assets.`);
