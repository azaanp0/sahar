import { useMemo } from 'react';
import { generateCanonicalUrl, generateMetaTitle, generateMetaDescription } from '../lib/seo';

interface UseSEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}

export function useSEO({ title, description, path, image, noIndex = false }: UseSEOProps) {
  const meta = useMemo(() => {
    const fullTitle = generateMetaTitle(title);
    const metaDescription = generateMetaDescription(description);
    const canonicalUrl = generateCanonicalUrl(path);

    return {
      title: fullTitle,
      description: metaDescription,
      canonical: canonicalUrl,
      openGraph: {
        title: fullTitle,
        description: metaDescription,
        url: canonicalUrl,
        siteName: 'سحر | SAHAR',
        images: image ? [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ] : [],
        locale: 'ar_SA',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: fullTitle,
        description: metaDescription,
        images: image ? [image] : [],
      },
      robots: noIndex ? {
        index: false,
        follow: false,
      } : {
        index: true,
        follow: true,
      },
    };
  }, [title, description, path, image, noIndex]);

  return meta;
}
