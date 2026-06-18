import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import { Product } from '../../types/product';

interface RelatedProductsProps {
  products: Product[];
  title: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, title }) => {
  if (products.length === 0) return null;

  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
