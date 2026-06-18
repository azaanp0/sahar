import { useEffect } from "react";

interface ProductSchemaProps {
    name: string;
    image: string[];
    description: string;
    sku: string;
    brand: string;
    price: number;
    currency?: string;
    availability?: "InStock" | "OutOfStock" | "PreOrder";
    rating?: number;
    reviewCount?: number;
}

const ProductSchema = ({
    name,
    image,
    description,
    sku,
    brand,
    price,
    currency = "SAR",
    availability = "InStock",
    rating,
    reviewCount
}: ProductSchemaProps) => {
    useEffect(() => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Product",
            name,
            image,
            description,
            sku,
            brand: {
                "@type": "Brand",
                name: brand
            },
            offers: {
                "@type": "Offer",
                price,
                priceCurrency: currency,
                availability: `https://schema.org/${availability}`,
                seller: {
                    "@type": "Organization",
                    name: "سحر"
                }
            },
            ...(rating && reviewCount ? {
                aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: rating,
                    reviewCount
                }
            } : {})
        };

        let script = document.getElementById("product-schema") as HTMLScriptElement | null;
        if (!script) {
            script = document.createElement("script");
            script.id = "product-schema";
            script.type = "application/ld+json";
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(schema);

        return () => {
            script?.remove();
        };
    }, [name, image, description, sku, brand, price, currency, availability, rating, reviewCount]);

    return null;
};

export default ProductSchema;
