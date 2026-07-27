import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = resolve(root, "packages/tokens/src/tokens.json");
const cssPath = resolve(root, "packages/tokens/src/index.css");
const allowedTypes = new Set(["color", "cubicBezier", "dimension", "duration", "fontFamily", "fontWeight", "number", "opacity", "shadow"]);
const errors = [];

let contract;
try {
  contract = JSON.parse(await readFile(sourcePath, "utf8"));
} catch (error) {
  console.error(`Could not parse ${sourcePath}: ${error.message}`);
  process.exit(1);
}

function flatten(node, path = [], output = new Map()) {
  if (!node || typeof node !== "object") return output;
  if (Object.hasOwn(node, "$value")) {
    output.set(path.join("/"), node);
    return output;
  }
  for (const [key, value] of Object.entries(node)) {
    if (!key.startsWith("$")) flatten(value, [...path, key], output);
  }
  return output;
}

const tokens = flatten(contract);
const colorPattern = /^(#(?:[\da-f]{3,8})|rgba?\([^)]*\)|hsla?\([^)]*\)|transparent)$/i;
const dimensionPattern = /^-?(?:\d+(?:\.\d+)?)(?:px|rem|em|%)$/;
const aliasPattern = /^\{([^}]+)\}$/;

function isAlias(value) {
  return typeof value === "string" && aliasPattern.test(value);
}

function validateValue(path, token) {
  const { $type: type, $value: value } = token;
  if (!allowedTypes.has(type)) errors.push(`${path}: unsupported or missing $type \"${type ?? ""}\"`);
  if (value === undefined) return;
  if (isAlias(value)) {
    const target = value.slice(1, -1);
    if (!tokens.has(target)) errors.push(`${path}: alias target does not exist: ${value}`);
    return;
  }
  if (type === "color" && (typeof value !== "string" || !colorPattern.test(value))) errors.push(`${path}: invalid color value ${JSON.stringify(value)}`);
  if (type === "dimension" && (typeof value !== "string" || !dimensionPattern.test(value))) errors.push(`${path}: invalid dimension value ${JSON.stringify(value)}`);
  if (type === "duration" && (typeof value !== "string" || !/^\d+(?:\.\d+)?ms$/.test(value))) errors.push(`${path}: invalid duration value ${JSON.stringify(value)}`);
  if (type === "cubicBezier" && (!Array.isArray(value) || value.length !== 4 || value.some((part) => typeof part !== "number"))) errors.push(`${path}: cubicBezier must contain four numbers`);
  if ((type === "fontWeight" || type === "number") && typeof value !== "number") errors.push(`${path}: ${type} must be numeric`);
  if (type === "opacity" && (typeof value !== "number" || value < 0 || value > 1)) errors.push(`${path}: opacity must be between 0 and 1`);
  if (type === "fontFamily" && typeof value !== "string") errors.push(`${path}: fontFamily must be a string`);
  if (type === "shadow" && typeof value !== "string") errors.push(`${path}: shadow must be a string or alias`);
}

for (const [path, token] of tokens) {
  if (!token.$description) errors.push(`${path}: missing $description`);
  validateValue(path, token);
}

try {
  await access(cssPath, constants.F_OK);
  const css = await readFile(cssPath, "utf8");
  for (const path of tokens.keys()) {
    const variable = `--ey-${path.replaceAll("/", "-")}`;
    if (!css.includes(variable)) errors.push(`Generated CSS is missing ${variable}`);
  }
} catch {
  console.warn("Generated CSS is not present yet; run pnpm tokens:build before packaging.");
}

if (errors.length) {
  console.error(`Token validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${tokens.size} tokens successfully.`);
