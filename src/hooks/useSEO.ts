import { useEffect } from "react";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: "website" | "product" | "article";
    noindex?: boolean;
    nofollow?: boolean;
}

export const useSEO = ({
    title,
    description,
    image,
    url,
    type = "website",
    noindex = false,
    nofollow = false
}: SEOProps) => {
    useEffect(() => {
        const fullTitle = title ? `${title} | سحر` : "سحر | متجر العناية والجمال";
        const desc = description || "متجر سحر للعناية والجمال - منتجات أصلية وخدمات مميزة";
        const img = image || "/logo.svg";
        const pageUrl = url || window.location.href;

        // Set document title
        document.title = fullTitle;

        // Helper function to set meta tags
        const setMeta = (name: string, content: string, property = false) => {
            const attr = property ? "property" : "name";
            let el = document.querySelector(`meta[${attr}="${name}"]`);
            if (!el) {
                el = document.createElement("meta");
                el.setAttribute(attr, name);
                document.head.appendChild(el);
            }
            el.setAttribute("content", content);
        };

        // Basic meta tags
        setMeta("description", desc);
        setMeta("robots", noindex ? (nofollow ? "noindex, nofollow" : "noindex") : (nofollow ? "nofollow" : "index, follow"));

        // Open Graph tags
        setMeta("og:title", fullTitle, true);
        setMeta("og:description", desc, true);
        setMeta("og:image", img, true);
        setMeta("og:type", type, true);
        setMeta("og:url", pageUrl, true);
        setMeta("og:site_name", "سحر", true);

        // Twitter Card tags
        setMeta("twitter:card", "summary_large_image");
        setMeta("twitter:title", fullTitle);
        setMeta("twitter:description", desc);
        setMeta("twitter:image", img);

        // Canonical link
        let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
        if (!canonical) {
            canonical = document.createElement("link");
            canonical.rel = "canonical";
            document.head.appendChild(canonical);
        }
        canonical.href = pageUrl;

        return () => {
            // Cleanup is optional since meta tags persist
        };
    }, [title, description, image, url, type, noindex, nofollow]);
};
