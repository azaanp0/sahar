import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Product } from '../../types/product';
import { generateProductSchema } from '../../lib/schema';

interface ProductSchemaProps {
  product: Product;
}

export const ProductSchema: React.FC<ProductSchemaProps> = ({ product }) => {
  const schema = generateProductSchema(product);

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
