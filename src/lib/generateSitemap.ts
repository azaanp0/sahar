import type { Product, Category, Brand } from "@/types";

interface SitemapEntry {
    url: string;
    lastModified?: string;
    changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority?: number;
}

export function generateSitemap(entries: SitemapEntry[]): string {
    const baseUrl = "https://sahar.sa";
    const currentDate = new Date().toISOString();

    const xmlEntries = entries.map((entry) => {
        return `
    <url>
        <loc>${baseUrl}${entry.url}</loc>
        <lastmod>${entry.lastModified || currentDate}</lastmod>
        <changefreq>${entry.changeFrequency || "weekly"}</changefreq>
        <priority>${entry.priority || 0.5}</priority>
    </url>`;
    }).join("");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
}

export function generateProductSitemap(products: Product[]): string {
    const entries: SitemapEntry[] = products.map((product) => ({
        url: product.href,
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return generateSitemap(entries);
}

export function generateCategorySitemap(categories: Category[]): string {
    const entries: SitemapEntry[] = categories.map((category) => ({
        url: `/category/${category.slug}`,
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    return generateSitemap(entries);
}

export function generateBrandSitemap(brands: Brand[]): string {
    const entries: SitemapEntry[] = brands.map((brand) => ({
        url: `/brand/${brand.slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    return generateSitemap(entries);
}
