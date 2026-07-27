import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = await readFile(resolve(root, "src/index.js"), "utf8");
const components = ["ey-button", "ey-icon-button", "ey-nav-bar", "ey-mobile-menu", "ey-text-input", "ey-select", "ey-card", "ey-status-badge"];
const tokens = ["--ey-color-bg-brand", "--ey-color-text-inverse", "--ey-color-border-focus", "--ey-radius-full", "--ey-size-touch-min"];
const missing = components.filter((name) => !source.includes(`customElements.define("${name}"`));
const missingTokens = tokens.filter((token) => !source.includes(token));
if (missing.length || missingTokens.length) { console.error(JSON.stringify({ missing, missingTokens }, null, 2)); process.exit(1); }
console.log(`Checked ${components.length} v1 Web Components and ${tokens.length} token references.`);
