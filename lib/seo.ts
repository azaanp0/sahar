export function generateCanonicalUrl(path: string, baseUrl: string = 'https://sahar.sa'): string {
  return `${baseUrl}${path}`;
}

export function generateMetaTitle(title: string, siteName: string = 'سحر | SAHAR'): string {
  return `${title} | ${siteName}`;
}

export function generateMetaDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength - 3) + '...';
}

export function generateProductAltText(productName: string, brand: string): string {
  return `${productName} من ${brand}`;
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'سحر | SAHAR',
    url: 'https://sahar.sa',
    logo: 'https://sahar.sa/logo.png',
    description: 'متجر سحر للعناية والجمال - أجمل المنتجات بأفضل الأسعار',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+966XXXXXXXXXX',
      contactType: 'customer service',
      availableLanguage: ['Arabic', 'English'],
    },
    sameAs: [
      'https://instagram.com/sahar.sa',
      'https://twitter.com/sahar_sa',
      'https://facebook.com/sahar.sa',
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'سحر | SAHAR',
    url: 'https://sahar.sa',
    description: 'متجر سحر للعناية والجمال - أجمل المنتجات بأفضل الأسعار',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://sahar.sa/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}
