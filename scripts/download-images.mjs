import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";
import http from "http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const srcDir = path.join(root, "src");
const outDir = path.join(root, "public", "images");
const manifestPath = path.join(root, "src", "data", "imageManifest.json");

const FULL_URL_RE = /https:\/\/cdn\.(?:salla\.sa|files\.salla\.network)[^\s`'"\\)]+/g;
const TEMPLATE_RE = /\$\{(SALLA|CDN)\}([^`'"\\)\s]+)/g;

function collectFiles(dir, files = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) collectFiles(full, files);
        else if (/\.(tsx?|jsx?)$/.test(entry.name)) files.push(full);
    }
    return files;
}

function loadConstants() {
    const catalog = fs.readFileSync(path.join(srcDir, "data", "catalog.ts"), "utf8");
    const salla = catalog.match(/const SALLA = "([^"]+)"/)?.[1];
    const cdn = catalog.match(/const CDN = "([^"]+)"/)?.[1];
    return { SALLA: salla ?? "", CDN: cdn ?? "" };
}

function extractUrls() {
    const constants = loadConstants();
    const urls = new Set();

    for (const file of collectFiles(srcDir)) {
        const content = fs.readFileSync(file, "utf8");

        for (const m of content.matchAll(FULL_URL_RE)) {
            const u = m[0].replace(/[,;)]+$/, "");
            if (u.split("/").pop()?.includes(".")) urls.add(u);
        }

        for (const m of content.matchAll(TEMPLATE_RE)) {
            const base = constants[m[1]];
            const suffix = m[2];
            if (base && suffix) urls.add(`${base}${suffix}`);
        }
    }

    return [...urls];
}

function filenameFromUrl(url) {
    const parts = url.split("/");
    const last = parts[parts.length - 1].split("?")[0];
    if (last && last.includes(".")) return last.replace(/[^a-zA-Z0-9._-]/g, "_");
    return `img-${Buffer.from(url).toString("base64url").slice(0, 16)}.webp`;
}

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const mod = url.startsWith("https") ? https : http;
        const req = mod.get(url, { headers: { "User-Agent": "Mozilla/5.0 Saher/1.0", Referer: "https://daralamirat.com.sa/" } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                download(res.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            if (res.statusCode !== 200) {
                reject(new Error(`${res.statusCode}`));
                return;
            }
            const file = fs.createWriteStream(dest);
            res.pipe(file);
            file.on("finish", () => file.close(() => resolve(dest)));
            file.on("error", reject);
        });
        req.on("error", reject);
        req.setTimeout(45000, () => req.destroy(new Error("timeout")));
    });
}

async function main() {
    fs.mkdirSync(outDir, { recursive: true });
    const urls = extractUrls();
    if (fs.existsSync(path.join(root, "scripts", "live-urls.txt"))) {
        for (const line of fs.readFileSync(path.join(root, "scripts", "live-urls.txt"), "utf8").split("\n")) {
            if (line.trim()) urls.push(line.trim());
        }
    }
    const uniqueUrls = [...new Set(urls)];
    const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};
    let ok = 0;
    let fail = 0;
    const failed = [];

    console.log(`Found ${uniqueUrls.length} unique image URLs`);

    for (const url of uniqueUrls) {
        const name = filenameFromUrl(url);
        const dest = path.join(outDir, name);
        const local = `/images/${name}`;

        if (fs.existsSync(dest) && fs.statSync(dest).size > 500) {
            manifest[url] = local;
            ok++;
            continue;
        }

        try {
            await download(url, dest);
            if (fs.statSync(dest).size < 100) throw new Error("too small");
            manifest[url] = local;
            ok++;
            if (ok % 10 === 0) process.stdout.write(`${ok} `);
        } catch (e) {
            fail++;
            failed.push({ url, err: e.message });
        }
    }

    const defaultImg = path.join(outDir, "8f9923bb-afdd-431f-98dd-12b9a239b903.webp");
    for (const url of uniqueUrls) {
        if (!manifest[url] && fs.existsSync(defaultImg)) {
            const name = filenameFromUrl(url);
            const dest = path.join(outDir, name);
            fs.copyFileSync(defaultImg, dest);
            manifest[url] = `/images/${name}`;
            ok++;
        }
    }

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`\nDone: ${ok} ok, ${fail} failed`);
    if (failed.length) {
        console.log("Failed URLs:");
        failed.slice(0, 10).forEach((f) => console.log(`  ${f.err} — ${f.url.slice(0, 80)}...`));
        if (failed.length > 10) console.log(`  ... and ${failed.length - 10} more`);
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
