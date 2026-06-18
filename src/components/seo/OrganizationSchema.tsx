import { useEffect } from "react";

interface OrganizationSchemaProps {
    name?: string;
    description?: string;
    url?: string;
    logo?: string;
    phone?: string;
    email?: string;
    address?: {
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
    };
}

const OrganizationSchema = ({
    name = "سحر",
    description = "متجر سحر للعناية والجمال - منتجات أصلية وخدمات مميزة",
    url = "https://sahar.sa",
    logo = "/saher-logo.png",
    phone = "+966XXXXXXXXXX",
    email = "info@sahar.sa",
    address
}: OrganizationSchemaProps) => {
    useEffect(() => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            name,
            description,
            url,
            logo,
            contactPoint: {
                "@type": "ContactPoint",
                telephone: phone,
                contactType: "customer service",
                email
            },
            ...(address ? {
                address: {
                    "@type": "PostalAddress",
                    ...address
                }
            } : {}),
            sameAs: [
                "https://www.instagram.com/sahar",
                "https://www.twitter.com/sahar",
                "https://www.facebook.com/sahar"
            ]
        };

        let script = document.getElementById("organization-schema") as HTMLScriptElement | null;
        if (!script) {
            script = document.createElement("script");
            script.id = "organization-schema";
            script.type = "application/ld+json";
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(schema);

        return () => {
            script?.remove();
        };
    }, [name, description, url, logo, phone, email, address]);

    return null;
};

export default OrganizationSchema;
