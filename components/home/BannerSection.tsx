import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

interface Banner {
  id: string;
  title: string;
  titleAr: string;
  titleEn: string;
  description: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  ctaText: string;
  ctaTextAr: string;
  ctaTextEn: string;
  ctaLink: string;
  backgroundColor?: string;
}

interface BannerSectionProps {
  banners: Banner[];
}

export const BannerSection: React.FC<BannerSectionProps> = ({ banners }) => {
  if (banners.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative rounded-xl overflow-hidden"
              style={{ backgroundColor: banner.backgroundColor || '#F8F8F8' }}
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center p-8">
                <div className="text-white max-w-md">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{banner.title}</h3>
                  <p className="text-lg mb-6 text-gray-100">{banner.description}</p>
                  <Link to={banner.ctaLink}>
                    <Button variant="primary" size="md">
                      {banner.ctaText}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
