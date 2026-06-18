/**
 * Resolve image URLs to local bundled assets when available.
 * Falls back to direct CDN in dev via Vite proxy, or CDN in production.
 */
import imageManifest from "@/data/imageManifest.json";

const manifest = imageManifest as Record<string, string>;

export const proxyImageUrl = (url: string | undefined): string => {
    if (!url) return "/placeholder.svg";
    if (url.startsWith("/") || url.startsWith("data:")) return url;

    const local = manifest[url];
    if (local) return local;

    if (import.meta.env.DEV) {
        if (url.includes("cdn.salla.sa")) {
            return url.replace("https://cdn.salla.sa", "/cdn");
        }
        if (url.includes("cdn.files.salla.network/homepage")) {
            return url.replace("https://cdn.files.salla.network/homepage", "/homepage");
        }
    }

    return url;
};
