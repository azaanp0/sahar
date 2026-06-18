import fs from "fs";
import https from "https";

const CDN = "https://cdn.files.salla.network/homepage/1945128061";

const html = await new Promise((resolve, reject) => {
    https.get("https://daralamirat.com.sa/ar", { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => resolve(d));
    }).on("error", reject);
});

const all = [...html.matchAll(/homepage\/1945128061\/[a-f0-9-]+\.(webp|gif|png|jpg)/gi)].map((m) => `${CDN}/${m[0].split("/").pop()}`);
fs.writeFileSync("scripts/live-urls.txt", [...new Set(all)].join("\n"));

const replacements = {
    "a9e63f3f-5e91-4a44-aa94-4869285a5a49.webp": "99d49e55-17fe-4511-9465-e3936d62f381.webp",
    "cc5c2cce-aab5-4040-bfde-5d33bbde2e48.webp": "7db3b64b-4637-4e11-86c2-cd218aae0686.webp",
    "08b7d9da-6cc0-460e-bc31-fc1b1b1e7e2f.webp": "bd79121d-d4b4-4efa-955f-6fc82b96f6dc.webp",
    "e0cb96c7-b2e9-438c-803f-0a1a44c83d57.webp": "671e0ed0-dd83-408a-a729-82b6f0c72d91.webp",
    "9e0a7562-8226-4e5f-9a41-0e9bab576e82.webp": "c20f08de-b2ce-43c9-8a61-ffb1f6d8f928.webp",
    "0cf0d2ed-4af2-4b31-a6f0-d1a706f26e31.webp": "b66c579e-6abb-4277-aaba-3034da10cc91.webp",
    "f9df2f2f-a1be-4fcd-b42e-3e2f11c6c89f.webp": "1c436c7b-5427-45ea-8b37-1c0803b0b2e3.webp",
    "b1b3be64-f9f4-48a6-a62f-2e3cd40f33b6.webp": "d3c86631-b33f-489f-a10d-83f2d226667d.webp",
    "c0e0b6e2-ff7f-4e61-bce6-e0f8b7c3cc9b.webp": "262e721c-d6dc-4e26-9e7f-86530d448530.webp",
    "5f8e0f25-a9b8-4f10-af50-19f04e7d6a2b.webp": "02388ca7-3c78-4e67-9540-f6d1a819a281.webp",
    "4e7c1de3-cb84-4c8c-b5ab-6e6f87a0d2b4.webp": "033caa56-88bf-4305-84f7-3f4abf7458f0.webp",
    "f7e4e4d4-fca0-4d36-b03a-9b84b45ef3fd.webp": "9303e6d8-0229-4282-aba8-d4638d7f2b95.webp",
    "35c547d4-a1ef-40cf-bcac-e7f2dbdc4ff0.webp": "42e85534-e0b3-481d-bd4b-085e8aadb2a9.webp",
    "8cde4d6b-e63d-41c6-b70b-d3aff3f26440.webp": "e85faed1-ebc8-4f2b-a1d9-8a5d6fce95e1.webp",
    "3b7a31bc-6da3-4da3-b8f3-b3f9c0e89291.webp": "1a49d4eb-7c8b-406c-8249-fb9df2110eac.webp",
    "68b36d97-6e27-44cf-98cd-a2e5dd5e7c4c.webp": "63b4c8df-0904-4183-9cd8-de6a8de93951.webp",
    "9b2c59c7-6b0a-4f0c-a2d1-98a6e19a62fb.webp": "010315dc-b2e5-4593-8180-f0045fb58fdf.webp",
    "19a55e88-d1b3-4f07-a1c9-ccf1bd028d85.webp": "3daf2c63-d173-47f3-886c-df7a51e7b106.webp",
    "af26f965-bdd6-4048-a61d-e1e3038ff69d.webp": "0a561bb8-74f8-407c-a38f-5f025978fe36.webp",
    "a16a7f94-4b4f-4a94-9c94-10e19d42399b.webp": "79effd43-090e-4b34-a347-d2d8db5dac2c.webp",
    "7e29c2e5-62e9-4c32-8832-97a1fe67c9d3.webp": "606f4f69-32d4-44ef-b2be-f0278d8c6267.webp",
    "c3e47949-3fba-4b0c-905b-ab3c2ec20fc5.webp": "4ea0b835-d719-4584-a1b9-449b91c5cd01.gif",
    "6d1ea3c0-26ab-42a3-b42c-49a5c6f62f4e.webp": "91659785-534f-4e52-835f-0740bf3c0539.gif",
    "51a6b85a-5063-4a5e-9b3f-4fb9a1a0e3d9.webp": "4f611269-c917-4d25-a91d-5ee351679329.gif",
};

for (const file of ["src/data/catalog.ts", "src/pages/Index.tsx"]) {
    let content = fs.readFileSync(file, "utf8");
    for (const [oldFile, newFile] of Object.entries(replacements)) {
        content = content.replaceAll(oldFile, newFile);
    }
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
}
