import fs from "fs";
import path from "path";

const manifest = JSON.parse(fs.readFileSync("src/data/imageManifest.json", "utf8"));
const catalog = fs.readFileSync("src/data/catalog.ts", "utf8");
const SALLA = catalog.match(/const SALLA = "([^"]+)"/)?.[1];
const CDN = catalog.match(/const CDN = "([^"]+)"/)?.[1];

const urls = new Set();
const re1 = /https:\/\/cdn\.(?:salla\.sa|files\.salla\.network)[^\s`'"\\)]+/g;
const re2 = /\$\{(SALLA|CDN)\}([^`'"\\)\s]+)/g;

for (const file of fs.readdirSync("src", { recursive: true })) {
    if (!/\.(tsx?|jsx?)$/.test(file)) continue;
    const c = fs.readFileSync(path.join("src", file), "utf8");
    for (const m of c.matchAll(re1)) {
        const u = m[0].replace(/[,;)]+$/, "");
        if (u.split("/").pop()?.includes(".")) urls.add(u);
    }
    for (const m of c.matchAll(re2)) urls.add((m[1] === "SALLA" ? SALLA : CDN) + m[2]);
}

const missing = [...urls].filter((u) => !manifest[u]);
console.log(`Missing ${missing.length}/${urls.size}:`);
missing.forEach((u) => console.log(u));
