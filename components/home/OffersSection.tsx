import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { ProductCard } from '../product/ProductCard';
import { Button } from '../ui/Button';

interface OffersSectionProps {
  products: Product[];
  title: string;
  subtitle?: string;
  link?: string;
  linkText?: string;
}

export const OffersSection: React.FC<OffersSectionProps> = ({
  products,
  title,
  subtitle,
  link,
  linkText,
}) => {
  if (products.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
          {link && linkText && (
            <Link to={link}>
              <Button variant="outline" size="md">
                {linkText}
              </Button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
