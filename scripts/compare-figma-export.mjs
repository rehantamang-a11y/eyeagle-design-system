import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const gitPath = resolve(root, "packages/tokens/src/tokens.json");
const figmaPath = resolve(root, "figma/ultimate-ds-web-export.json");
const gitContract = JSON.parse(await readFile(gitPath, "utf8"));
const figmaExport = JSON.parse(await readFile(figmaPath, "utf8"));

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

const gitTokens = flatten(gitContract);
const figmaTokens = flatten(figmaExport.tokens ?? figmaExport);
const differences = [];
const propertyNames = new Map([
  ["fontSize", "font-size"],
  ["lineHeight", "line-height"],
  ["fontWeight", "font-weight"],
  ["letterSpacing", "letter-spacing"],
]);
const normalizePath = (path) => path.split("/").map((part) => propertyNames.get(part) ?? part).join("/");
const figmaStrictDescriptions = figmaExport.metadata?.descriptionSource === "figma";
function resolveGitValue(value, seen = new Set()) {
  if (typeof value !== "string" || !/^\{.+\}$/.test(value)) return value;
  const target = value.slice(1, -1);
  if (seen.has(target)) throw new Error(`Circular alias in comparison: ${target}`);
  const token = gitTokens.get(target);
  if (!token) throw new Error(`Missing alias target in Git: ${target}`);
  return resolveGitValue(token.$value, new Set([...seen, target]));
}

for (const [exportPath, figmaToken] of figmaTokens) {
  const path = normalizePath(exportPath);
  const gitToken = gitTokens.get(path);
  if (!gitToken) {
    differences.push(`${exportPath}: present in Figma export but missing in Git`);
    continue;
  }
  for (const key of figmaStrictDescriptions ? ["$type", "$value", "$description"] : ["$type", "$value"]) {
    const gitValue = key === "$value" ? resolveGitValue(gitToken[key]) : gitToken[key];
    if (JSON.stringify(figmaToken[key]) !== JSON.stringify(gitValue)) {
      differences.push(`${exportPath}: ${key} differs (Figma ${JSON.stringify(figmaToken[key])}, Git ${JSON.stringify(gitValue)})`);
    }
  }
}

const normalizedFigmaPaths = new Set([...figmaTokens.keys()].map(normalizePath));
const uncovered = [...gitTokens.keys()].filter((path) => !normalizedFigmaPaths.has(path));
if (differences.length) {
  console.error(`Figma comparison failed with ${differences.length} difference(s):`);
  for (const difference of differences) console.error(`- ${difference}`);
  process.exit(1);
}

console.log(`Compared ${figmaTokens.size} exported Figma tokens successfully.`);
if (uncovered.length) console.warn(`${uncovered.length} Git tokens are outside this export snapshot and remain unreviewed.`);
