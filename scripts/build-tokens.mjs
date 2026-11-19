import { readFile, writeFile, mkdir } from "node:fs/promises";
const root = new URL("../", import.meta.url);
const tokens = JSON.parse(
  await readFile(new URL("config/tokens.json", root), "utf8"),
);
const vars = Object.entries(tokens.colors).map(([k, v]) => `  --${k}: ${v};`);
vars.push(
  ...tokens.gradient.dark.map((v, i) => `  --gradient-${i + 1}: ${v};`),
  `  --gradient-fallback: ${tokens.colors.primary};`,
  `  --radius: ${tokens.radius}px;`,
);
await mkdir(new URL("frontend/src/styles/", root), { recursive: true });
await writeFile(
  new URL("frontend/src/styles/_tokens.scss", root),
  `/* Generated from config/tokens.json. */\n:root {\n${vars.join("\n")}\n}\n`,
);
console.log("CSS variables generated from config/tokens.json.");
