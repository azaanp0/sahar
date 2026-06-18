export function generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://sahar.sa/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/

# Disallow private areas
Disallow: /account/
Disallow: /checkout/
Disallow: /cart/

# Crawl-delay
Crawl-delay: 1`;
}
