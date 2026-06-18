import { useEffect } from "react";

interface MetaTagsProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    canonical?: string;
    type?: "website" | "product" | "article";
    noindex?: boolean;
    nofollow?: boolean;
}

const MetaTags = ({
    title,
    description,
    image,
    url,
    canonical,
    type = "website",
    noindex = false,
    nofollow = false
}: MetaTagsProps) => {
    useEffect(() => {
        const fullTitle = title ? `${title} | سحر` : "سحر | متجر العناية والجمال";
        const desc = description || "متجر سحر للعناية والجمال - منتجات أصلية وخدمات مميزة";
        const img = image || "/saher-logo.png";
        const pageUrl = url || window.location.href;
        const canonicalUrl = canonical || pageUrl;

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
        let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
        if (!canonicalLink) {
            canonicalLink = document.createElement("link");
            canonicalLink.rel = "canonical";
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.href = canonicalUrl;

        // Schema.org structured data
        const schema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "سحر | SAHAR",
            description: desc,
            url: canonicalUrl,
            logo: "https://sahar.sa/saher-logo.png",
            sameAs: [
                "https://instagram.com/sahar",
                "https://twitter.com/sahar",
                "https://tiktok.com/@sahar"
            ],
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+966-XXXXXXXXXX",
                contactType: "customer service"
            }
        };

        let schemaScript = document.querySelector("#schema-org") as HTMLScriptElement | null;
        if (!schemaScript) {
            schemaScript = document.createElement("script");
            schemaScript.id = "schema-org";
            schemaScript.type = "application/ld+json";
            document.head.appendChild(schemaScript);
        }
        schemaScript.textContent = JSON.stringify(schema);

        return () => {
            // Cleanup is optional since meta tags persist
        };
    }, [title, description, image, url, canonical, type, noindex, nofollow]);

    return null;
};

export default MetaTags;
