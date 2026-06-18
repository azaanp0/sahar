export interface Product {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  titleEn: string;
  description: string;
  descriptionAr: string;
  descriptionEn: string;
  brand: string;
  brandSlug: string;
  category: string;
  categorySlug: string;
  subcategory?: string;
  subcategorySlug?: string;
  price: number;
  salePrice?: number;
  discount?: number;
  currency: string;
  images: string[];
  thumbnail: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isLiked: boolean;
  isNew: boolean;
  isTrending: boolean;
  hasOffer: boolean;
  offerType?: 'discount' | '1plus1' | 'gift' | 'bundle';
  badges: string[];
  variants: ProductVariant[];
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'color' | 'size' | 'other';
  values: VariantValue[];
}

export interface VariantValue {
  id: string;
  value: string;
  valueAr: string;
  valueEn: string;
  color?: string;
  image?: string;
  stock: number;
  priceModifier?: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  date: string;
}

export interface ProductFilter {
  category?: string;
  brand?: string;
  priceRange?: [number, number];
  rating?: number;
  inStock?: boolean;
  onSale?: boolean;
  tags?: string[];
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular';
}
