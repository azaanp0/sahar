import React from 'react';
import { Link } from 'react-router-dom';
import { Brand } from '../../types/api';

interface BrandCarouselProps {
  brands: Brand[];
}

export const BrandCarousel: React.FC<BrandCarouselProps> = ({ brands }) => {
  if (brands.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          الماركات المميزة
        </h2>

        <div className="flex items-center gap-8 overflow-x-auto pb-4 scrollbar-hide">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/brand/${brand.slug}`}
              className="flex-shrink-0 group"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow flex items-center justify-center p-4">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
