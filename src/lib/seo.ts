export const generateMetaTags = (data: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: "website" | "product" | "article";
    noindex?: boolean;
}) => {
    const {
        title = "سحر | متجر العناية والجمال",
        description = "متجر سحر للعناية والجمال - منتجات أصلية وخدمات مميزة",
        image = "/logo.svg",
        url = window.location.href,
        type = "website",
        noindex = false,
    } = data;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [{ url: image }],
            url,
            type,
            siteName: "سحر",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
        robots: noindex ? "noindex, nofollow" : "index, follow",
        canonical: url,
    };
};

export const generateProductSchema = (product: {
    name: string;
    image: string[];
    description: string;
    sku: string;
    brand: string;
    price: number;
    currency?: string;
    availability?: "InStock" | "OutOfStock";
    rating?: number;
    reviewCount?: number;
}) => {
    const {
        name,
        image,
        description,
        sku,
        brand,
        price,
        currency = "SAR",
        availability = "InStock",
        rating,
        reviewCount,
    } = product;

    const schema: any = {
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        image,
        description,
        sku,
        brand: {
            "@type": "Brand",
            name: brand,
        },
        offers: {
            "@type": "Offer",
            price,
            priceCurrency: currency,
            availability: `https://schema.org/${availability}`,
            seller: {
                "@type": "Organization",
                name: "سحر",
            },
        },
    };

    if (rating && reviewCount) {
        schema.aggregateRating = {
            "@type": "AggregateRating",
            ratingValue: rating,
            reviewCount,
        };
    }

    return schema;
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
};
