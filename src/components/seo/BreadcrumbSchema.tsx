import { useEffect } from "react";

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbSchemaProps {
    items: BreadcrumbItem[];
}

const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
    useEffect(() => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                item: item.url
            }))
        };

        let script = document.getElementById("breadcrumb-schema") as HTMLScriptElement | null;
        if (!script) {
            script = document.createElement("script");
            script.id = "breadcrumb-schema";
            script.type = "application/ld+json";
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(schema);

        return () => {
            script?.remove();
        };
    }, [items]);

    return null;
};

export default BreadcrumbSchema;
