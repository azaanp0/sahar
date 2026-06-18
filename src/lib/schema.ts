export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "سحر",
    description: "متجر سحر للعناية والجمال - منتجات أصلية وخدمات مميزة",
    url: "https://sahar.sa",
    logo: "https://sahar.sa/logo.svg",
    contactPoint: {
        "@type": "ContactPoint",
        telephone: "+966XXXXXXXXXX",
        contactType: "customer service",
        email: "info@sahar.sa",
    },
    sameAs: [
        "https://www.instagram.com/sahar",
        "https://www.twitter.com/sahar",
        "https://www.facebook.com/sahar",
    ],
};

export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "سحر",
    url: "https://sahar.sa",
    potentialAction: {
        "@type": "SearchAction",
        target: "https://sahar.sa/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
    },
};

export const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "سحر",
    image: "https://sahar.sa/logo.svg",
    telephone: "+966XXXXXXXXXX",
    email: "info@sahar.sa",
    address: {
        "@type": "PostalAddress",
        streetAddress: "الرياض، المملكة العربية السعودية",
        addressLocality: "الرياض",
        addressRegion: "الرياض",
        postalCode: "12345",
        addressCountry: "SA",
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "$$",
};
