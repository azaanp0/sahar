import { useEffect } from "react";

interface CanonicalTagProps {
    url?: string;
}

const CanonicalTag = ({ url }: CanonicalTagProps) => {
    useEffect(() => {
        const canonicalUrl = url || window.location.href;
        
        let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
        if (!canonical) {
            canonical = document.createElement("link");
            canonical.rel = "canonical";
            document.head.appendChild(canonical);
        }
        canonical.href = canonicalUrl;

        return () => {
            canonical?.remove();
        };
    }, [url]);

    return null;
};

export default CanonicalTag;
