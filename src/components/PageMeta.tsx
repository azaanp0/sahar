import { useEffect } from "react";
import { SITE } from "@/data/catalog";

interface PageMetaProps {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
}

const PageMeta = ({ title, description, image, type = "website" }: PageMetaProps) => {
    const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.fullName}`;
    const desc = description ?? SITE.description;
    const img = image ?? `${SITE.url}${SITE.logo}`;

    useEffect(() => {
        document.title = fullTitle;

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

        setMeta("description", desc);
        setMeta("og:title", fullTitle, true);
        setMeta("og:description", desc, true);
        setMeta("og:image", img, true);
        setMeta("og:type", type, true);
        setMeta("og:url", window.location.href, true);
        setMeta("twitter:card", "summary_large_image");
        setMeta("twitter:title", fullTitle);
        setMeta("twitter:description", desc);

        let script = document.getElementById("structured-data") as HTMLScriptElement | null;
        if (!script) {
            script = document.createElement("script");
            script.id = "structured-data";
            script.type = "application/ld+json";
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE.fullName,
            description: SITE.description,
            url: SITE.url,
            logo: `${SITE.url}${SITE.logo}`,
        });
    }, [fullTitle, desc, img, type]);

    return null;
};

export default PageMeta;
